const express = require("express");
const router = express.Router();

// Import controller functions
const { register, login } = require("../controllers/authController");

// ✅ Register route
router.post("/register", register);

// ✅ Login route
router.post("/login", login);

// ✅ Optional test route (for browser check)
router.get("/", (req, res) => {
  res.send("Auth route working ✅");
});

module.exports = router;