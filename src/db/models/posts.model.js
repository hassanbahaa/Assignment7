const { sequelize } = require("..");

const { DataTypes } = require("sequelize");

const Post = sequelize.define("Post", {
  title: { type: DataTypes.STRING, allowNull: false },
  content: { type: DataTypes.TEXT, allowNull: false },
  //userId: {  },
});
module.exports = { Post };
