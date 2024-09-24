const { DataTypes } = require("sequelize");
const sequelize = require("../utils/connection");

const Title = sequelize.define(
  "titles",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
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