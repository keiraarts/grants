import dbConnect from "../../utils/dbConnect";
import User from "../../models/userModel";
import jsonwebtoken from "jsonwebtoken";

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
                    `^${req.body.username.toLowerCase().trim()}$`,
                    "i"
                  ),
                },
              },
              {
                username: {
                  $regex: new RegExp(
                    `^${req.body.username.toLowerCase().trim()}$`,
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
                req.body.username.toLowerCase().trim() &&
              user.email.toLowerCase() !== req.body.username.toLowerCase().trim()
            ) {
              return res
                .status(401)
                .json(`Could not find user: ${req.body.username}`);
            } else if (user.hashPassword(req.body.password) !== user.password) {
              return res.status(401).json("Invalid password");
            } else if (user.banned) {
              return res.status(401).json("Your account is banned");
            }
      
            const token = jsonwebtoken.sign(
              {
                id: user.id,
                username: user.username,
                wallet: user.wallet,
              },
              process.env.JWT
            );
      
            return res.json({
              username: user.username,
              id: user.id,
              token,
              wallet: user.wallet,
              committee: user.committee,
            });
          }
        );
      } catch (error) {
        console.log('GOT ERR', error);
        res.status(400).json({ success: false });
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
}
