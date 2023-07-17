const Player = require("../models/players-mongo.js");

const getPlayers = async (req, res) => {
  let data;
  try {
    if (req.query.name) {
      let { name } = req.query;
      let regex = new RegExp(`${name}`, "gi");
      data = await Player.find({ link: regex }, "-_id -__v").sort({ _id: 1 });
    } else {
      data = await Player.find({}, "-_id -__v");
    }
    res.status(200).json({ response: 200, data });
  } catch (error) {
    res.status(300).json({ message: "Algo ha ido mal" });
  }
};

module.exports = { getPlayers };
