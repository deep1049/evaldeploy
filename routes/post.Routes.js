const express = require("express");

const { postModel } = require("../model/postModel");
const postRouter = express.Router();

postRouter.get("/", async (req, res) => {
  const query = req.query;
  try {
    const user = await postModel.find(query);
    res.send(user);
  } catch (error) {
    res.send({ msg: "unable to get posts", error });
  }
});
postRouter.post("/create", async (req, res) => {
  const payload = req.body;
  try {
    const posts = new postModel(payload);
    await posts.save();
    res.send("post created");
  } catch (err) {
    console.log("err ", err);
    res.send("have erron in post creation");
  }
});

postRouter.patch("/update/:id", async (req, res) => {
  const userid = req.body.userid;
  const id = req.params.id;
  const value = req.body;
  try {
    const post = await postModel.find({ _id: id });
    if (userid !== post[0].userid) {
      res.send("not user authorised");
    } else {
      await postModel.findByIdAndUpdate({ _id: id }, value);
      res.send("msg:updated");
    }
  } catch (error) {
    console.log("err ", err);
    res.send("have erron in post updation");
  }
});
postRouter.delete("/delete/:id", async (req, res) => {
  const userid = req.body.userid;
  const id = req.params.id;

  try {
    const post = await postModel.find({ _id: id });
    if (userid !== post.userid) {
      res.send("not user authorised");
    } else {
      await postModel.findByIdAndDelete({ _id: id }, value);
      res.send("msg:deleted");
    }
  } catch (error) {
    console.log("err ", err);
    res.send("have erron in post deletion");
  }
});

module.exports = { postRouter };
