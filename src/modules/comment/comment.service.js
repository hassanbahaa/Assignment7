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
 const newComments =  await Comment.bulkCreate(comments);
    return newComments;
}

module.exports = {
    createComment,
    createComments
}