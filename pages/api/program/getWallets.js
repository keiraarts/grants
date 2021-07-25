import auth from "../../../src/server/services/authorization-service";
import dbConnect from "../../../utils/dbConnect";
import Organizer from "../../../models/organizerModel";
import ProgramApplicant from "../../../models/programApplicantModel";
import Program from "../../../models/programModel";

export default async function handler(req, res) {
  const { method } = req;
  await dbConnect();

  switch (method) {
    case "POST":
      try {
        const jwt = auth(req.headers.authorization, res, (jwt) => jwt);
        const organizer = await Organizer.findOne({
          _id: req.body.org,
          admins: jwt.id,
        });
        if (!organizer) return res.json({ error: "Authentication error" });
        const program = await Program.findById(req.body.program);
        if (!program) return res.json({ error: "Authentication error" });

        let query;
        if (req.body.type === "minted") {
          query = { published: true };
        } else {
          return res.json({ error: "Issue retrieving wallets" });
        }

        const applicants = await ProgramApplicant.find({
          program: program.id,
          ...query,
        }).populate("user", "artistName wallet");

        let wallets = [];
        applicants.forEach((applicant) => {
          wallets.push([
            applicant.user.artistName,
            applicant.user.wallet,
            applicant.order,
          ]);
        });

        return res.json({ success: wallets });
      } catch (error) {
        console.log('wtf', error);
        res.status(400).json({ success: false });
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
}
