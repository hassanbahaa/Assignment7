const express = require("express");
const { connectToDB, sequelize } = require("./db"); // Import the database connection
const { User, Post, Comment } = require("./db/models/");
const { userRouter } = require("./modules/user/user.controller");
const { postRouter } = require("./modules/post/post.controller");

const app = express();
connectToDB(); // Connect to the database
sequelize.sync();
app.use(express.json());
const port = 3000;

app.use("/user", userRouter);
app.use("/post", postRouter);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
