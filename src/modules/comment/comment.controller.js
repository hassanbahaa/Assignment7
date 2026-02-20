const router = require("express").Router();
const { Comment } = require("../../db/models");
const {createComment,createComments, updateComment } = require("./comment.service");


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
}});


router.patch("/:id",async (req,res)=>{
    const commentId = req.params.id;

    const  {postId,...data}  = req.body;
    try {
        const result = await updateComment(commentId,data);
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