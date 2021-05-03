import dbConnect from "../../../utils/dbConnect";
import ProgramApplicant from "../../../models/programApplicantModel";
import Program from "../../../models/programModel";
import set from "lodash/set";

export default async function handler(req, res) {
  const { method } = req;
  await dbConnect();

  switch (method) {
    case "GET":
      let programs = await Program.find({ exhibiting: true })
        .populate("organizers")
        .populate(
          "curators",
          "artistName first last instagram twitter website"
        );

      const galleries = programs.map(async (program) => {
        const gallery = await ProgramApplicant.find(
          { program: program._id, published: true },
          (err, gallery) => {
            gallery.forEach((e) => (e.tokenId = e.order));
            return gallery;
          }
        )
          .select(
            "-approved -rejected -program -statement -additional -ineligible -flagged -approvalCount -rejectCount -emailed -accepted"
          )
          .populate(
            "user",
            "artistName birthYear country city website twitter instagram"
          )
          .sort("order");

        return { program, gallery };
      });

      const merged = await Promise.all(galleries);
      res.json(merged);
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
}
