const { DataTypes } = require("sequelize");
const sequelize = require("../utils/connection");

const Notes = sequelize.define(
  "notes",
  {
    note: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Notes;