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
        User.findOne(
          {
            $or: [
              {
                email: {
                  $regex: new RegExp(
                    `^${req.body.recovery.toLowerCase().trim()}$`,
                    "i"
                  ),
                },
              },
              {
                username: {
                  $regex: new RegExp(
                    `^${req.body.recovery.toLowerCase().trim()}$`,
                    "i"
                  ),
                },
              },
            ],
          },
          (err, user) => {
            if (err) {
              return next(err);
            } else if (!user) {
              return res
                .status(401)
                .json(`Could not find user: ${req.body.username}`);
            } else if (
              user.username.toLowerCase() !==
                req.body.recovery.toLowerCase().trim() &&
              user.email.toLowerCase() !==
                req.body.recovery.toLowerCase().trim()
            ) {
              return res
                .status(401)
                .json(`Could not find user: ${req.body.username}`);
            } else {
              user.recoveryToken = crypto.randomBytes(32).toString("hex");
              const expires = new Date();
              expires.setHours(expires.getHours() + 24);
              user.recoveryExpiration = expires;
              user.save();
              transporter.sendMail(
                templates.passRecovery(
                  user.email,
                  user.username,
                  user.recoveryToken
                )
              );
            }

            return res.json(true);
          }
        );
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
}
