const players_list = require("../models/players_list");

const getAllPrices = async (req, res) => {
  try {
    let data = await players_list.getAllPrices();
    res.status(200).json({ status: 200, data });
  } catch (error) {
    res.status(300).json({ status: 300, message: "Algo ha ido mal" });
  }
};

module.exports = { getAllPrices };
