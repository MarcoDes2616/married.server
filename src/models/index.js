const Guests = require("./Guests");
const Title = require("./Title");

const initModels = () => {
  // Role 1 ----- * Users
  Title.hasMany(Guests, { foreignKey: "titleId" });
  Guests.belongsTo(Title, { foreignKey: "titleId" });

};

module.exports = initModels;