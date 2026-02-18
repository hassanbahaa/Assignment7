const express = require("express");
const { connectToDB } = require("./db"); // Import the database connection
const { User } = require("./db/models/user.model");
const app = express();
connectToDB(); // Connect to the database
User.sync();
app.use(express.json());
const port = 3000;

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
