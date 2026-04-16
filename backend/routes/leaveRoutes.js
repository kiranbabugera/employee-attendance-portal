const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");
const Leave = require("../models/Leave");
const { Op } = require("sequelize");

// ✅ APPLY LEAVE
router.post("/", auth, async (req, res) => {
  try {
    console.log("REQUEST BODY:", req.body);

    const { reason, fromDate, toDate } = req.body;

    // ✅ BASIC VALIDATION
    if (!reason || !fromDate || !toDate) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    // ✅ DATE VALIDATION
    if (new Date(fromDate) > new Date(toDate)) {
      return res.status(400).json({
        message: "From date cannot be after To date",
      });
    }

    // ✅ CHECK OVERLAPPING LEAVES
    const existingLeave = await Leave.findOne({
      where: {
        userId: req.user.id,
        [Op.or]: [
          {
            fromDate: {
              [Op.between]: [fromDate, toDate],
            },
          },
          {
            toDate: {
              [Op.between]: [fromDate, toDate],
            },
          },
        ],
      },
    });

    if (existingLeave) {
      return res.status(400).json({
        message: "Leave already applied for selected dates",
      });
    }

    const leave = await Leave.create({
      userId: req.user.id,
      reason,
      fromDate,
      toDate,
    });

    res.json({
      message: "Leave applied successfully ✅",
      leave,
    });
  } catch (err) {
    console.log("ERROR:", err);
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
    console.error(err);
    res.status(500).json({ message: "Failed to fetch leaves" });
  }
});

module.exports = router;