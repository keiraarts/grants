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
import jsonwebtoken from "jsonwebtoken";
import ethers from "ethers";
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
        User.findOne({ recoveryToken: req.body.token }, (err, user) => {
          if (err) {
            return next(err);
          } else if (!user) {
            return res.status(401).json({ error: `Invalid request` });
          }

          user.salt = new Buffer(
            crypto.randomBytes(16).toString("base64"),
            "base64"
          );
          user.password = crypto
            .pbkdf2Sync(req.body.password, user.salt, 10000, 64, "sha1")
            .toString("base64");
          user.save();

          return res.json({ success: "Password changed" });
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
