const { DataTypes } = require('sequelize');
const sequelize = require("../utils/connection");

const Budget = sequelize.define('Budget', {
  amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  }
}, {
  timestamps: true
});

module.exports = Budget;
