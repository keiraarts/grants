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
    case "GET":
      try {
        auth(req.headers.authorization, res, (jwt) => {
          User.findById(jwt.id, (err, user) => {
            if (err) return res.json(err);
            if (!user)
              return res.status(401).json({ err: "Authentication error" });
            else {
              return ProgramApplicant.find({ user: user._id }, (err2, data) => {
                if (err2) return res.status(500).json(err);
                return res.json({ user, applications: data });
              }).select(
                "-flagged -approvalCount -rejectCount -rejected -approved"
              );
            }
          }).select("-password -salt -emailToken -committee");
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
