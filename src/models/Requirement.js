const { DataTypes } = require("sequelize");
const sequelize = require("../utils/connection");

const Requirement = sequelize.define(
  "requirements",
  {
    requirement: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = Requirement;