const { Sequelize } = require("sequelize");
const sequelize = new Sequelize("posts_app_a7", "root", "", {
  host: "localhost",
  dialect: "mysql",
}); // Example for sqlite

function connectToDB() {
  sequelize
    .authenticate()
    .then(() => {
      console.log("Connection has been established successfully.");
    })
    .catch((err) => {
      console.error("Unable to connect to the database:", err);
    });
}

module.exports = {
  sequelize,
  connectToDB,
};
