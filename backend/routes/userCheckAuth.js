import jwt from "jsonwebtoken";
import userModel from "../models/userModel";

const checkUserAuth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    res.send({
      message: "You must be logged in!",
    });
  } else {
    const token = authorization.replace("Bearer ", "");
    jwt.verify(token, "MY_SECRET_KEY", async (err, data) => {
      if (err) {
        res.send({
          message: "You must be logged in!",
          err: err.message,
        });
      } else {
        const { userId } = data;
        const user = await userModel.findOne({_id: userId });
        req.user = user;
        next();
      }
    });
  }
};
