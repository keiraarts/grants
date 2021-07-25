import auth from "../../../src/server/services/authorization-service";
import templates from "../../../src/server/emails/templates";
import dbConnect from "../../../utils/dbConnect";

import Program from "../../../models/programModel";
import ProgramApplicant from "../../../models/programApplicantModel";
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

        const program = await Program.findById(req.body.program);
        if (!program) return res.json({ error: "Could not find data" });

        return ProgramApplicant.findById(req.body.id, (err2, data) => {
          if (err2) return res.status(500).json(err);
          else {
            const index = data.scores.findIndex((e) => e.user.equals(jwt.id));
            if (index >= 0) {
              data.scores.splice(index, 1);

              let score = 0;
              data.scores.forEach((item) => {
                let individualScore = 0;
                program.advancedMetrics.forEach((e) => {
                  let foundScore =
                    item.score[e.metric.toLowerCase().replace(/\s+/g, "")];
                  if (foundScore) {
                    individualScore += (e.weight * foundScore) / 100;
                  }
                });

                score += individualScore / program.advancedMetrics.length;
              });

              data.score = Number(score / data.scores.length || 0).toFixed(2) || 0;
              data.save();
            }

            return res.json(true);
          }
        });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
}
