import auth from "../../../src/server/services/authorization-service";
import templates from "../../../src/server/emails/templates";
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
        const organizer = await Organizer.findOne({
          _id: req.body.org,
          admins: jwt.id,
        });
        if (!organizer) return res.json({ error: "Authentication error" });
        const program = await Program.findById(req.body.id);
        if (!program) return res.json({ error: "Authentication error" });

        program.passByVotes = req.body.passByVotes;
        program.blindVoting = req.body.blindVoting;
        program.topThreshold = req.body.topThreshold;
        program.voteThreshold = req.body.voteThreshold;
        program.save();

        res.json({ success: "Program updated" });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
}
