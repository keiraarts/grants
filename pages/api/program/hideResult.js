import auth from "../../../src/server/services/authorization-service";
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
        const jwt = auth(req.headers.authorization, res, (jwt) => jwt);
        const organizer = await Organizer.findOne({ admins: jwt.id });
        if (!organizer) return res.json({ error: "Authentication error" });

        return Program.findById(req.body.program, (err, program) => {
          if (!program.organizers.find((e) => e.equals(organizer._id)))
            return res.json({ error: "Authentication error" });

          program.hideResults = req.body.hideResults;
          program.save();
          return err
            ? res.status(500).json(err)
            : res.json({ success: "Updated" });
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
