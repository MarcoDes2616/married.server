const { DataTypes } = require("sequelize");
const sequelize = require("../utils/connection");

const Comment = sequelize.define(
  "comment",
  {
    comment: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Comment;