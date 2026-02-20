const sequelize = require("../../db");
const models = require("../../db/models");
const { Comment } = require("../../db/models");
const { checkPostExist } = require("../post/post.service");
const { checkUserExist } = require("../user/user.service");
async function createComment(comment) {
  const userExist = await checkUserExist({ id: comment.userId });
  if (!userExist) throw new Error("User not found", { cause: 404 });
  const postExist = checkPostExist({ id: comment.postId });
  if (!postExist) throw new Error("Post not found", { cause: 404 });
  const newComment = await Comment.create(comment);
  return newComment;
}

async function createComments(comments) {
  const newComments = await Comment.bulkCreate(comments);
  return newComments;
}

async function updateComment(commentId, data) {
  const comment = await Comment.findOne({ where: { id: commentId } });
  if (!comment) throw new Error("Comment not found", { cause: 404 });

  if (comment.userId != data.userId)
    throw new Error("you are not authorized to update this comment", {
      cause: 403,
    });
  const updatedComment = await Comment.update(data, {
    where: { id: commentId },
  });
  return updatedComment;
}

module.exports = {
  createComment,
  createComments,
  updateComment,
};
