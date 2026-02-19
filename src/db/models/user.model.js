const { sequelize } = require("..");

const { DataTypes, ENUM } = require("sequelize");

const User = sequelize.define(
  "User",
  {
    name: { type: DataTypes.STRING, allowNull: false },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: { isEmail: true },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        checkPasswordLength(value) {
          if (value.length <= 6) {
            throw new Error("Password must be longer than 6 characters");
          }
        },
      },
    },
    role: { type: DataTypes.ENUM("user", "admin") },
  },
  {
    hooks: {
      beforeCreate(user) {
        if (user.name.length <= 2) {
          throw new Error("Name must be longer than 2 characters");
        }
      },
    },
  }
);
module.exports = { User };
