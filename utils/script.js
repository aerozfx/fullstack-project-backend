const Player = require("../models/players-mongo");

const getDocumentsAmount = async () => {
  return await Player.countDocuments({ firstName: { $ne: null } });
};

module.exports = { getDocumentsAmount };
