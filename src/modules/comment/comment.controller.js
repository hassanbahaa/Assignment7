const router = require("express").Router();
const {
  createComments,
  updateComment,
  findOrCreate,
  commentSearch,
  newestComments,
  getCommentByPk,
} = require("../../modules");

router.post("/", async (req, res) => {
  const comments = req.body.comments;
  try {
    const newComments = await createComments(comments);
    res.status(201).json({
      message: "Comments created successfully",
      success: true,
    });
  } catch (error) {
    res
      .status(error.cause || 500)
      .json({ message: error.message, success: false });
  }
});

router.post("/find-or-create", async (req, res) => {
  const comment = req.body;
  try {
    const newComment = await findOrCreate(comment);
    res.status(201).json({
      message: `Comment ${
        newComment[1] ? "created" : "retrieved"
      } successfully`,
      success: true,
      data: { comment: newComment[0], created: newComment[1] },
    });
  } catch (error) {
    res
      .status(error.cause || 500)
      .json({ message: error.message, success: false });
  }
});

router.get("/search", async (req, res) => {
  const search = req.query.word;
  try {
    const comments = await commentSearch(search);
    res.status(200).json({
      message: "Comments found successfully",
      success: true,
      data: { count: comments[1], comments: comments[0] },
    });
  } catch (error) {
    res
      .status(error.cause || 500)
      .json({ message: error.message, success: false });
  }
});

router.get("/newest/:postId", async (req, res) => {
  const postId = req.params.postId;
  try {
    const result = await newestComments(postId);
    res.status(200).json({
      message: "Comments found successfully",
      success: true,
      data: { comments: result },
    });
  } catch (error) {
    res
      .status(error.cause || 500)
      .json({ message: error.message, success: false });
  }
});

router.get("/details/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const comment = await getCommentByPk(id);
    res.status(200).json({
      message: "Comment found successfully",
      success: true,
      data: { comment },
    });
  } catch (error) {
    res
      .status(error.cause || 500)
      .json({ message: error.message, success: false });
  }
});

router.patch("/:id", async (req, res) => {
  const commentId = req.params.id;

  const { postId, ...data } = req.body;
  try {
    const result = await updateComment(commentId, data);
    console.log(result);
    res.status(200).json({
      message: "Comment updated successfully",
      success: true,
    });
  } catch (error) {
    res
      .status(error.cause || 500)
      .json({ message: error.message, success: false });
  }
});
module.exports = { commentRouter: router };
