import auth from "../../../src/server/services/authorization-service";
import auth from "../../../src/server/emails/templates";
import dbConnect from "../../../utils/dbConnect";

import ProgramApplicant from "../../../models/programApplicantModel";
import Organizer from "../../../models/organizerModel";
import Program from "../../../models/programModel";
import User from "../../../models/userModel";

import getMediaDimensions from "get-media-dimensions";
import { videoResize } from "node-video-resize";
import gifResize from "@gumlet/gif-resize";
import { promisify } from "util";
import { Duplex } from "stream";
import nodemailer from "nodemailer";
import hbjs from "handbrake-js";
import crypto from "crypto";
import jimp from "jimp";
import fs from "fs";

export default async function handler(req, res) {
  const { method } = req;
  await dbConnect();

  switch (method) {
    case "POST":
      try {
        const program = await Program.findOne({ url: req.body.program })
          .populate("organizers")
          .populate(
            "curators",
            "artistName first last instagram twitter website"
          );
        return ProgramApplicant.find(
          { program: program._id, published: true },
          (err, gallery) => {
            gallery.forEach((e) => {
              e.tokenId = e.order;
            });
            return err
              ? res.status(500).json(err)
              : res.json({
                  gallery,
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
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
}
