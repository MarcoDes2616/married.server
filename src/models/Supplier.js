const { DataTypes } = require("sequelize");
const sequelize = require("../utils/connection");

const Supplier = sequelize.define(
  "suppliers",
  {
    full_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = Supplier;