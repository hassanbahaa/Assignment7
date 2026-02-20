const sequelize = require("../../db");
const { Post } = require("../../db/models");
const { checkUserExist } = require("../user/user.service");

async function createPost(post) {
  const userExist = await checkUserExist({ id: post.userId });
  if (!userExist) throw new Error("User not found", { cause: 404 });
  // using new instant and save
  const newPost = new Post(post);
  await newPost.save();
  return newPost;
}

module.exports = {
  createPost,
};
