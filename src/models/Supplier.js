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
    defaultScope: {
      attributes: { exclude: ['guest_token'] } // Excluir guest_token en la respuesta por defecto
    },
    scopes: {
      withGuestToken: {
        attributes: { include: ['guest_token'] } // Scope opcional para incluir guest_token cuando se necesite
      }
    }
  }
);

module.exports = Supplier;