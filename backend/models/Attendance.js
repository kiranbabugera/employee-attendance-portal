const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Attendance = sequelize.define("Attendance", {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  checkIn: {
    type: DataTypes.DATE,
  },
  checkOut: {
    type: DataTypes.DATE,
  },
});

module.exports = Attendance;