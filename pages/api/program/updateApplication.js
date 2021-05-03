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
        auth(req.headers.authorization, res, (jwt) => {
          User.findById(jwt.id, (err, user) => {
            if (!user)
              return res.status(401).json({ err: "Authentication error" });
            return ProgramApplicant.findOne(
              { user: user._id },
              (err, applicant) => {
                applicant.minted = req.body.minted;
                applicant.description = req.body.description;
                applicant.name = req.body.name;
                applicant.title = req.body.title;
                applicant.save();
                user.artistName = req.body.name;
                user.birthYear = req.body.birthYear;
                user.save();
                return res.json("Application updated");
              }
            );
          });
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
