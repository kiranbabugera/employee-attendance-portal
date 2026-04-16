const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");
const Leave = require("../models/Leave");

// ✅ APPLY LEAVE
router.post("/", auth, async (req, res) => {
  try {
    console.log("REQUEST BODY:", req.body);

    const { reason, fromDate, toDate } = req.body;

    if (!reason || !fromDate || !toDate) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const leave = await Leave.create({
      userId: req.user.id,
      reason,
      fromDate,
      toDate,
    });

    res.json({
      message: "Leave applied successfully",
      leave,
    });
  } catch (err) {
    console.log("ERROR:", err); // ✅ DEBUG LOG
    res.status(500).json({
      message: "Leave failed",
    });
  }
});

// ✅ GET LEAVES
router.get("/", auth, async (req, res) => {
  try {
    const leaves = await Leave.findAll({
      where: { userId: req.user.id },
      order: [["createdAt", "DESC"]],
    });

    res.json(leaves);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to fetch leaves" });
  }
});

module.exports = router;