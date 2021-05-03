import dbConnect from "../../../utils/dbConnect";
import Program from "../../../models/programModel";

export default async function handler(req, res) {
  const { method } = req;
  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const programs = await Program.find({ active: true })
          .select(
            `organizers name url exhibiting tagline description total open close closeApplication`
          )
          .populate("organizers")
          .sort("order");

        if (!programs) return res.status(503).json({ success: false });

        res.status(200).json(programs);
      } catch (error) {
        console.error(error);
        res.status(400).json({ success: false, message: "fetch failed" });
      }

      break;

    default:
      res.status(400).json({ success: false, message: "route not matched" });
      break;
  }
}
