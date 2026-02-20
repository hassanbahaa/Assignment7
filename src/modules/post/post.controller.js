const router = require("express").Router();
const {
  createPost,
  deletePost,
  getAllPosts,
  getPostsWithCount,
} = require("../../modules");

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
router.get("/details", async (req, res) => {
  // get post with id and retrieve comments and authour details
  try {
    const posts = await getAllPosts();
    res.status(200).json({
      message: "Posts retrieved successfully",
      success: true,
      data: { posts },
    });
  } catch (error) {
    res
      .status(error.cause || 500)
      .json({ message: error.message, success: false });
  }
});

router.get("/comment-count", async (req, res) => {
  try {
    const posts = await getPostsWithCount();
    res.status(200).json({
      message: "Posts retrieved successfully",
      success: true,
      data: { posts },
    });
  } catch (error) {
    res
      .status(error.cause || 500)
      .json({ message: error.message, success: false });
  }
});

// TODO : delete post by id
router.delete("/:id", async (req, res) => {
  const postId = req.params.id;
  const userId = req.get("userId");

  try {
    console.log("the sended data", userId);
    const result = await deletePost(postId, userId);
    res.status(200).json({
      message: "Post deleted successfully",
      success: true,
      data: { postId },
    });
  } catch (error) {
    res
      .status(error.cause || 500)
      .json({ message: error.message, success: false });
  }
});

module.exports = { postRouter: router };
