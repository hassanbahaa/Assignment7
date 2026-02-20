const sequelize = require("sequelize");
const models = require("../../db/models");
const { Comment } = require("../../db/models");
const { checkPostExist } = require("../post/post.service");
const { checkUserExist } = require("../user/user.service");
const { User } = require("../../db/models/user.model");
const { Post } = require("../../db/models/post.model");
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

async function findOrCreate(comment) {
  const newComment = await Comment.findOrCreate({
    where: {
      userId: comment.userId,
      postId: comment.postId,
      content: comment.content,
    },
  });
  return newComment;
}

async function commentSearch(search) {
  console.log(search);
  const { count, rows } = await Comment.findAndCountAll({
    where: {
      content: {
        [sequelize.Op.like]: `%${search}%`,
      },
    },
  });

  const comments = [rows, count];

  if (count == 0) throw new Error("No Comments found", { cause: 404 });
  return comments;
}

async function newestComments(postId) {
  const postExist = await checkPostExist({ id: postId });
  if (!postExist) throw new Error("Post not found", { cause: 404 });
  const comments = await Comment.findAll({
    where: {
      postId: postId,
    },
    order: [["createdAt", "DESC"]],
    limit: 3,
  });
  if (comments.length == 0)
    throw new Error("No Comments found on this post", { cause: 404 });
  return comments;
}

async function getCommentByPk(pk) {
  const comment = await Comment.findOne({
    where: { id: pk },
    attributes: ["id", "content"],
    include: [
      { model: User, attributes: ["id", "name", "email"] },
      { model: Post, attributes: ["id", "title", "content"] },
    ],
  });
  if (!comment) throw new Error("Comment not found", { cause: 404 });
  return comment;
}

module.exports = {
  createComment,
  createComments,
  updateComment,
  findOrCreate,
  commentSearch,
  newestComments,
  getCommentByPk,
};
