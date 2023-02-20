const express = require("express");
const { connection } = require("./db");
const { userRouter } = require("./routes/user.Routes");
const { postRouter } = require("./routes/post.Routes");
const { authenticate } = require("./middlewares/middleware");
require("dotenv").config();

const app = express();
const cors = require("cors");
app.use(cors({ origin: "*" }));
app.use(express.json());
app.get("/", (req, res) => {
  res.send("welcome to home page");
});
app.use("/users", userRouter);
app.use(authenticate);
app.use("/posts", postRouter);

app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log("connected to db");
    console.log(`server running at ${process.env.port}`);
  } catch (error) {
    console.log("not able to connect");
  }
});
