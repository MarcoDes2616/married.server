const { DataTypes } = require("sequelize");
const sequelize = require("../utils/connection");

const Guests = sequelize.define(
  "guests",
  {
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    guest_token: {
      type: DataTypes.TEXT,
      allowNull: true,
      // Se puede eliminar o mantener para futuras referencias.
    },
    invitation_sent_at: {
      type: DataTypes.DATE,
      allowNull: true,
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

module.exports = Guests;

