const Leave = require("../models/Leave");

exports.applyLeave = async (req, res) => {
  try {
    console.log("USER:", req.user); // 🔍 DEBUG

    const { reason } = req.body;

    if (!req.user || !req.user.id) {
      return res.status(400).json({ message: "User not found in token" });
    }

    const leave = await Leave.create({
      userId: req.user.id,
      reason,
    });

    res.json(leave);
  } catch (err) {
    console.error("ERROR:", err); // 🔥 IMPORTANT
    res.status(500).json({ message: "Server error" });
  }
};

exports.getLeaves = async (req, res) => {
  try {
    const leaves = await Leave.findAll({
      where: { userId: req.user.id },
    });

    res.json(leaves);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};