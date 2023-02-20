const express = require("express");
const { userModel } = require("../model/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userRouter = express.Router();

userRouter.get("/", async (req, res) => {
  const query = req.query;
  try {
    const user = await userModel.find(query);
    res.send(user);
  } catch (error) {
    res.send({ msg: "unable to get user", error });
  }
});
userRouter.post("/register", async (req, res) => {
  const { name, email, gender, password, age, city } = req.body;
  const emailPresent = await userModel.find({ email });
  if (emailPresent?.email) {
    res.send({
      msg: `${emailPresent} present already register with another email address`,
    });
  } else {
    try {
      bcrypt.hash(password, 5, async (err, hash) => {
        const user = new userModel({
          name,
          email,
          gender,
          password: hash,
          age,
          city,
        });
        await user.save();
        res.send("user register successfully");
      });
    } catch (error) {
      console.log("not register", error);
      res.send({ msg: "not register " });
    }
  }
});
userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await userModel.find({ email });
    if (user.length > 0) {
      bcrypt.compare(password, user[0].password, async (err, result) => {
        if (result) {
          const token = jwt.sign({ userid: user[0]._id }, "masai");
          res.send({ msg: "login success", token: token });
        }
      });
    }
  } catch (error) {
    console.log("not login", error);
    res.send({ msg: "not login " });
  }
});
module.exports = { userRouter };
