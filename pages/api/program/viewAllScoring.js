import auth from "../../../src/server/services/authorization-service";
import dbConnect from "../../../utils/dbConnect";

import ProgramApplicant from "../../../models/programApplicantModel";
import Program from "../../../models/programModel";
import User from "../../../models/userModel";

export default async function handler(req, res) {
  const { method } = req;
  await dbConnect();

  switch (method) {
    case "POST":
      try {
        const jwt = auth(req.headers.authorization, res, (jwt) => jwt);
        const user = await User.findById(jwt.id);
        if (!user) return res.json({ error: "Authentication error" });

        const isCurator = await Program.find({ curators: user._id });
        if (!isCurator) return res.json({ error: "Authentication error" });

        return ProgramApplicant.find(
          {
            program: req.body.program,
            ineligible: { $ne: true },
            finalized: { $ne: true },
          },
          (err, data) => {
            const unscored = [],
              scored = [];
            data.forEach((e) => {
              if (e.scores.find((g) => g.user.equals(jwt.id))) scored.push(e);
              else unscored.push(e);
            });

            const myScores = scored.sort((a, b) => {
              let foundA, foundB;
              a.scores.forEach((e) => {
                if (e.user.equals(jwt.id)) foundA = e;
              });
              b.scores.forEach((e) => {
                if (e.user.equals(jwt.id)) foundB = e;
              });
              return foundA.userScore > foundB.userScore ? -1 : 1;
            });

            return err
              ? res.status(500).json(err)
              : res.json({ unscored, scored: myScores });
          }
        ).populate(
          "user",
          "artistName birthYear country city website twitter instagram"
        );
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
}
