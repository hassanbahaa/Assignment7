const router = require("express").Router();
const { Comment } = require("../../db/models");
const {createComment,createComments } = require("./comment.service");


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
   

})
module.exports = { commentRouter: router };