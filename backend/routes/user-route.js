const express = require("express");
const router = express.Router();
const {
  addUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
} = require("./../userHandlers/userHandle.js");

router.post("/users", async (req, res) => {
  try {
    const createdUser = await addUser(req.body);
    res.status(201).json({
      message: "User created successfully",
      user: createdUser,
    });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({
      message: "Failed to create user",
      error: error.message,
    });
  }
});

// router.get("/users", async (req, res) => {
//   let users = await getUsers();
//   res.send(users);
// });

router.get("/users", async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;
  try {
    const result = await getUsers(page, limit);
    res.json(result);
  } catch (err) {
    console.error("Pagination error:", err);
    res.status(500).send("Server Error");
  }
});
router.get("/users/:id", async (req, res) => {
  console.log("id:", req.params["id"]);
  let user = await getUser(req.params["id"]);
  if (!user) {
    return res.status(404).send("User not found");
  }
  res.send(user);
});
router.put("/users/:id", async (req, res) => {
  console.log("id:", req.params["id"]);
  const user = await updateUser(req.params["id"], req.body);
  if (!user) {
    return res.status(404).send("User not found");
  }
  res.send(user);
});

router.delete("/users/:id", async (req, res) => {
  console.log("id:", req.params["id"]);
  const user = await deleteUser(req.params["id"]);

  res.send(user);
});

module.exports = router;
