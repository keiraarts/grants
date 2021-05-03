import dbConnect from "../../../../../utils/dbConnect";
import ProgramApplicant from "../../../../../models/programApplicantModel";
import Program from "../../../../../models/programModel";
import probe from "probe-image-size";

export default async function handler(req, res) {
  const { url = "gallery", id = "148" } = req.query;
  const { method } = req;
  await dbConnect();

  switch (method) {
    case "GET":
      const program = await Program.findOne({ url })
        .populate("organizers")
        .populate(
          "curators",
          "artistName first last instagram twitter website"
        );

      return await ProgramApplicant.findOne(
        { program: program._id, order: id.toString(), published: true },
        async (err, gallery) => {
          let imageMetadata = { width: 500, height: 500 };
          gallery.tokenId = gallery.order;

          try {
            imageMetadata = await probe(
              `https://cdn.grants.art/${gallery.artWeb}`
            );
          } catch (error) {
            console.error(error);
          }

          return err
            ? res.status(400).json(err)
            : res.json({
                gallery,
                imageMetadata,
                contract: program.contractAddress,
                curators: program.curators,
                name: program.name,
                description: program.description,
                organizer: program.organizers[0].name,
                organizerUrl: program.organizers[0].url,
              });
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

    default:
      res.status(400).json({ success: false });
      break;
  }
}
