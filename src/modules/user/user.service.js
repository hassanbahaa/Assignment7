const { sequelize } = require("../../db");
const { User } = require("../../db/models");

// Service function to create a new user
async function createUser(data) {
  let { email } = data;
  const userExist = await checkUserExist({ email });
  if (userExist) {
    throw new Error("User already exist", { cause: 409 });
  }
  const user = User.build(data);
  await user.save();
  return user;
}

async function getUserByEmail(email) {
  return await User.findOne({
    where: { email },
    attributes: { exclude: ["password"] },
  });
}

async function getUserByPk(pk) {
  return await User.findOne({
    where: { id: pk },
    attributes: { exclude: ["password", "role"] },
  });
}

async function checkUserExist(filter) {
  const result = await User.findOne({ where: filter });
  if (!result) return false;
  return true;
}

async function upsertUser(data) {
  return await User.upsert(data, {
    validate: false,
  });
}

module.exports = {
  createUser,
  checkUserExist,
  upsertUser,
  getUserByEmail,
  getUserByPk,
};
