const { sequelize } = require("..");

const { DataTypes, Model } = require("sequelize");
const { User } = require("./user.model");
const { Post } = require("./post.model");

class Comment extends Model {}

Comment.init(
  {
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
    postId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Post,
        key: "id",
      },
    },
  },
  {
    sequelize,
    modelName: "Comment",
  }
);

User.hasMany(Comment, { foreignKey: "userId" });
Comment.belongsTo(User, { foreignKey: "userId" });
Post.hasMany(Comment, { foreignKey: "postId" });
Comment.belongsTo(Post, { foreignKey: "postId" });

module.exports = { Comment };
