const router = require("express").Router();
const { Post } = require("../../db/models");
const { createPost } = require("./post.service");

router.post("/", async (req, res) => {
  const post = req.body;
  console.log("the sended data", post);
  try {
    const newPost = await createPost(post);
    res.status(201).json({
      message: "Post created successfully",
      success: true,
      data: { postId: newPost.id },
    });
  } catch (error) {
    res
      .status(error.cause || 500)
      .json({ message: error.message, success: false });
  }
});

module.exports = { postRouter: router };
