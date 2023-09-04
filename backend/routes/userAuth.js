import express from "express";
import userModel from "../models/userModel.js";
import bcrypt from "bcrypt"; //used to encrypt passwords
import jwt from "jsonwebtoken"; // gives us tokens(very long string that contains data)
import { checkAdminAuth } from "./checkAuth.js";

const router = express.Router();
const saltRound = 10;

router.post("/register", (req, res) => {
  try {
    if (!req.body || !req.body.password) {
      res.send({
        message: "User details not found",
      });
    }






    bcrypt.hash(req.body.password, saltRound, async (err, hash) => {
      if (err) {
        console.log(err);
      } //logic for storing to db
      const newUser = new userModel({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hash,
      });
      const user = await newUser.save();
      const token = jwt.sign({ userId: user._id }, "MY_SECRET_KEY");
      res.send({
        message: "User Created Successfully",
        data: hash,
        token: token,
      });
    });
  } catch (error) {
    res.send({
      message: "Error Ocurred",
      data: error.message,
    });
  }
});
router.post("/login", async (req, res) => {
  if (!req.body.email || !req.body.password) {
    res.send({
      message: "wrong password or email",
    });
  } else {
    const user = await userModel.findOne({ email: req.body.email });
    if (!user) {
      res.send({
        message: "wrong passord or email",
      });
    } else {
      bcrypt.compare(req.body.password, user.password, (err, response) => {
        if (err) {
          console.log(err);
        }
        if (response === false) {
          res.send({
            message: "wrong passwprd or email",
          });
        } else if (response === true) {
          const token = jwt.sign({ userId: user._id }, "MY_SECRET_KEY");
          res.send({
            message: "user authenticated successfully",
            data: user,
            token: token,
          });
        }
      });
    }
  }
});

router.get("/users", checkAdminAuth, async (req, res) => {
  try {
    const users = await userModel.find();
    res.send({
      message: "Users found successfully",
      loggedInAdmin:req.admin,
      data: users,
    });


    
  } catch (error) {
    res.send({
      message: "Error occurred",
      data: error.message,
    });
  }
});
export default router;
