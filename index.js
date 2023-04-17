const { connection } = require("./config/db");
const express = require("express");
const {userRouter}=require("./routes/user.route")
const {blogRouter}=require("./routes/blog.route")
const app = express();
require("dotenv").config();
app.use(express.json());
app.use("/blog",blogRouter)
app.use('/user',userRouter)


app.listen(process.env.port, async () => {
  try {
    await connection
    console.log("connected to db");
  } catch (err) {
    console.log(err);
  }
  console.log("server is running")
});