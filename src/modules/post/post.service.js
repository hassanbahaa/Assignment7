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

async function deletePost(postId,userId) {
  if (!userId) throw new Error("User Id is required", { cause: 400 });
  // check if post exist
  const postExist = await checkPostExist({ id: postId });
  if (!postExist) throw new Error("Post not found", { cause: 404 });
  // check for authorship

  const post = await Post.findOne({ where: { id: postId } });
  console.log({postId: postId, userId: userId, post: post.userId});
  if (post.userId != userId) throw new Error("you are not authorized to delete this post", { cause: 403 });

  await Post.destroy({ where: { id: postId } });
  return true;
  
}

async function checkPostExist(filter) {
  const result = await Post.findOne({ where: filter });
  if (!result) return false;
  return true;
}


module.exports = {
  createPost,
  deletePost,
  checkPostExist
};
