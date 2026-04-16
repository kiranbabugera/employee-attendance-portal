const express = require("express");
const cors = require("cors");
require("dotenv").config();

const sequelize = require("./config/db");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require("./routes/authRoutes");
const attendanceRoutes = require("./routes/attendanceRoutes");
const leaveRoutes = require("./routes/leaveRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/leave", leaveRoutes);

// ✅ Root route (for browser test)
app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

// Port (Render uses dynamic port)
const PORT = process.env.PORT || 5000;

// ✅ Start server only after DB connects
sequelize
  .authenticate()
  .then(() => {
    console.log("✅ Database connected");

    return sequelize.sync(); // optional but useful
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ DB connection failed:", err);
  });