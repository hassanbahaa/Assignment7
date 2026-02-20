const router = require("express").Router();
const {
  createUser,
  upsertUser,
  getUserByEmail,
  getUserByPk,
} = require("../../modules");

// Create a new user
router.post("/signup", async (req, res) => {
  try {
    const result = await createUser(req.body);
    res.status(201).json({
      message: "User created successfully",
      success: true,
      data: { userId: result.id },
    });
  } catch (error) {
    res
      .status(error.cause || 500)
      .json({ message: error.message, success: false });
  }
});

router.get("/by-email", async (req, res) => {
  const { email } = req.query;
  try {
    const user = await getUserByEmail(email);
    if (!user) {
      return res.status(404).json({ message: "no User found", success: false });
    }
    res
      .status(200)
      .json({ message: "User found", success: true, data: { user } });
  } catch (error) {
    res
      .status(error.cause || 500)
      .json({ message: error.message, success: false });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await getUserByPk(id);
    if (!user) {
      return res.status(404).json({ message: "no User found", success: false });
    }
    res
      .status(200)
      .json({ message: "User found", success: true, data: { user } });
  } catch (error) {
    res
      .status(error.cause || 500)
      .json({ message: error.message, success: false });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await upsertUser({ ...req.body, id });
    res.status(200).json({
      message: `User ${result[1] ? "created" : "updated"} successfully`,
      success: true,
      data: { userId: id },
    });
  } catch (error) {
    res
      .status(error.cause || 500)
      .json({ message: error.message, success: false });
  }
});

module.exports = { userRouter: router };
