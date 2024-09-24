const { DataTypes } = require("sequelize");
const sequelize = require("../utils/connection");

const Title = sequelize.define(
  "titles",
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = Title;