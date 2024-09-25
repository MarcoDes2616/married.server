const Guests = require("./Guests");
const Role = require("./Role");
const Title = require("./Title");

const initModels = () => {
  // Role 1 ----- * Users
  Title.hasMany(Guests, { foreignKey: "titleId" });
  Guests.belongsTo(Title, { foreignKey: "titleId" });

  Role.hasMany(Guests, { foreignKey: "roleId" });
  Guests.belongsTo(Role, { foreignKey: "roleId" });

};

module.exports = initModels;