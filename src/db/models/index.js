const userModel = require("./user.model");
const postModel = require("./post.model");
const commentModel = require("./comment.model");

module.exports = {
  User: userModel.User,
  Post: postModel.Post,
  Comment: commentModel.Comment,
};
