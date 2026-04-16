const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Leave = sequelize.define("Leave", {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  reason: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  fromDate: {
    type: DataTypes.DATEONLY, // ✅ IMPORTANT
    allowNull: false,
  },
  toDate: {
    type: DataTypes.DATEONLY, // ✅ IMPORTANT
    allowNull: false,
  },
});

module.exports = Leave;