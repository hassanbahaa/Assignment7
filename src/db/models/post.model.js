const { sequelize } = require("..");

const { DataTypes, Model } = require("sequelize");
const { User } = require("./user.model");

class Post extends Model {}

Post.init(
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
  },
  {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: "Post", // We need to choose the model name
  }
);

// associations.js
User.hasMany(Post, { foreignKey: "userId" });
Post.belongsTo(User, { foreignKey: "userId" });

module.exports = { Post };
