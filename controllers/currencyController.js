const currency = require("../models/currency");
const player = require("../models/user_players");
const { decodeJWT } = require("../utils/jwtDecoder");

const buyPlayer = async (req, res) => {
  let { email, playerPrice } = req.body;
  try {
    let data = await player.buyPlayer({ email, playerPrice });
    res.status.json({ status: 200, message: data });
  } catch (error) {
    res.status(400).json({ status: 400, message: error.detail });
  }
};

const getCurrency = async (req, res) => {
  let token = decodeJWT(req.cookies["access-token"]);
  if (token) {
    let { user_id } = token;
    try {
      let data = await currency.getCurrency(user_id);
      res.status(200).json({ status: 200, message: data });
    } catch (error) {
      res.status(400).json({ status: 400, message: error });
    }
  } else {
    res.status(403).json({
      status: 403,
      message: "No hay token",
    });
  }
};

const addCurrency = async (req, res) => {
  let { user_id, amount } = req.body;
  try {
    if (amount < 0) {
      res.status(400).json({ message: "La cantidad debe ser positiva!" });
    } else {
      let prevCurrency = await currency.getCurrency(user_id);
      amount = amount + prevCurrency;
      let data = await currency.addCurrency({ user_id, amount });
      res.status(200).json({
        status: 200,
        message: `Nueva cantidad: ${data["user_currency"]}`,
      });
    }
  } catch (error) {
    res
      .status(400)
      .json({ status: 400, message: `No se ha podido añadir la cantidad` });
  }
};
module.exports = { buyPlayer, getCurrency, addCurrency };
