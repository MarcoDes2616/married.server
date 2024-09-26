const Comment = require("./Comment");
const Guests = require("./Guests");
const Requirement = require("./Requirement");
const Role = require("./Role");
const Supplier = require("./Supplier");
const Title = require("./Title");

const initModels = () => {
  // Role 1 ----- * Users
  Title.hasMany(Guests, { foreignKey: "titleId" });
  Guests.belongsTo(Title, { foreignKey: "titleId" });

  Role.hasMany(Guests, { foreignKey: "roleId" });
  Guests.belongsTo(Role, { foreignKey: "roleId" });

  Supplier.hasMany(Comment, { foreignKey: "supplierId" });
  Comment.belongsTo(Supplier, { foreignKey: "supplierId" });

  Supplier.hasOne(Requirement, { foreignKey: "supplierId" });
  Requirement.belongsTo(Supplier, { foreignKey: "supplierId" });

};

module.exports = initModels;