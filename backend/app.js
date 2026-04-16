const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require("./routes/authRoutes");
const attendanceRoutes = require("./routes/attendanceRoutes");
const leaveRoutes = require("./routes/leaveRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/leave", leaveRoutes);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
const User = require("./models/User");

(async () => {
  await User.destroy({ where: { username: "kiran" } });

  await User.create({
    username: "kiran",
    password: "1234",
  });

  console.log("User reset done");
})();