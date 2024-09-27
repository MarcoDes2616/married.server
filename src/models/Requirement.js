const { DataTypes } = require("sequelize");
const sequelize = require("../utils/connection");

const Requirement = sequelize.define(
  "requirements",
  {
    requirement: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2), // Decimal type for storing prices (up to 10 digits with 2 decimal places)
      allowNull: true,
    },
  },
  {
    timestamps: false, // Disable timestamps if not needed
  }
);

module.exports = Requirement;
