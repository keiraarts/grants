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
    case "GET":
      try {
        const jwt = auth(req.headers.authorization, res, (jwt) => jwt);
        const user = await User.findById(jwt.id);
        if (!user) return res.json({ error: "Authentication error" });

        const isCurator = await Program.find({ curators: user._id });
        if (!isCurator) return res.json({ error: "Authentication error" });

        return ProgramApplicant.findById(req.body.id, (err2, data) => {
          if (err2) return res.status(500).json(err);
          else {
            if (req.body.type === "approve") {
              const index = data.approved.findIndex((e) => e.equals(jwt.id));
              if (index >= 0) {
                data.approved.splice(index, 1);
                data.approvalCount--;
                data.save();
              }
            } else if (req.body.type === "reject") {
              const index = data.rejected.findIndex((e) => e.equals(jwt.id));
              if (index >= 0) {
                data.rejected.splice(index, 1);
                data.rejectCount--;
                data.save();
              }
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
