const express = require("express");
const router = express.Router();
const { Op } = require("sequelize");

const auth = require("../middleware/authMiddleware");
const Attendance = require("../models/Attendance");

// ✅ CHECK IN (only once per day)
router.post("/checkin", auth, async (req, res) => {
  try {
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    const todayEnd = new Date();
    todayEnd.setHours(23, 59, 59, 999);

    const existing = await Attendance.findOne({
      where: {
        userId: req.user.id,
        checkIn: {
          [Op.between]: [todayStart, todayEnd],
        },
      },
    });

    if (existing) {
      return res.status(400).json({
        message: "Already checked in today",
      });
    }

    const record = await Attendance.create({
      userId: req.user.id,
      checkIn: new Date(),
    });

    res.json({ message: "Checked In", record });
  } catch (err) {
    res.status(500).json({ message: "Check-in failed" });
  }
});

// ✅ CHECK OUT
router.post("/checkout", auth, async (req, res) => {
  try {
    const record = await Attendance.findOne({
      where: { userId: req.user.id },
      order: [["createdAt", "DESC"]],
    });

    if (!record) {
      return res.status(404).json({
        message: "No check-in found",
      });
    }

    record.checkOut = new Date();
    await record.save();

    res.json({ message: "Checked Out", record });
  } catch (err) {
    res.status(500).json({ message: "Check-out failed" });
  }
});

// ✅ GET ATTENDANCE
router.get("/", auth, async (req, res) => {
  const data = await Attendance.findAll({
    where: { userId: req.user.id },
    order: [["createdAt", "DESC"]],
  });

  res.json(data);
});

module.exports = router;