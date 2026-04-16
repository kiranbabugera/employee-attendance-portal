const Attendance = require("../models/Attendance");

// ✅ CHECK-IN
exports.checkIn = async (req, res) => {
  try {
    const today = new Date().toISOString().split("T")[0];

    const existing = await Attendance.findOne({
      where: {
        userId: req.user.id,
        date: today,
      },
    });

    if (existing) {
      return res.status(400).json({ message: "Already checked in today" });
    }

    const record = await Attendance.create({
      userId: req.user.id,
      date: today,
      checkIn: new Date(),
    });

    res.json(record);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ CHECK-OUT
exports.checkOut = async (req, res) => {
  try {
    const today = new Date().toISOString().split("T")[0];

    const record = await Attendance.findOne({
      where: {
        userId: req.user.id,
        date: today,
      },
    });

    if (!record || record.checkOut) {
      return res.status(400).json({ message: "Invalid checkout" });
    }

    record.checkOut = new Date();
    await record.save();

    res.json(record);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ TIMESHEET (Extra - useful for assignment)
exports.getTimesheet = async (req, res) => {
  try {
    const records = await Attendance.findAll({
      where: { userId: req.user.id },
      order: [["date", "DESC"]],
    });

    res.json(records);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};