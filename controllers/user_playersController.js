const playersBought = require("../models/user_players");
const currency = require("../models/currency");
const players_list = require("../models/players_list");
const user_players = require("../models/user_players");
const { decodeJWT } = require("../utils/jwtDecoder");
const Player = require("../models/players-mongo");

const buyPlayer = async (req, res) => {
  let token = decodeJWT(req.cookies["access-token"]);
  try {
    if (token) {
      let { user_id } = token;
      let { link } = req.body;
      try {
        let userCoins = await currency.getCurrency(user_id);
        let playerPrice = await players_list.getPlayersPrice(link);
        let amount =
          userCoins["user_currency"] - Number(playerPrice["player_price"]);

        let ownedPlayers = await user_players.getPlayersBoughtByUser(user_id);
        ownedPlayers = ownedPlayers.map((ele) => ele.player_link);
        if (amount >= 0 && !ownedPlayers.includes(link)) {
          let data = await playersBought.buyPlayer({ link, user_id });
          let actual_currency = await currency.updateCurrency({
            user_id,
            amount,
          });
          res.status(200).json({ ...data, ...actual_currency });
        } else {
          res.status(401).json({
            error:
              amount <= 0
                ? "Faltan fondos. Por favor, ráscate el bolsillo"
                : ownedPlayers.includes(link)
                ? "Ya tienes este jugador"
                : "",
            message: "No puedes comprar este jugador.",
          });
        }
      } catch (error) {
        res.status(300).json({ message: error.stack });
      }
    } else {
      throw new Error();
    }
  } catch (error) {
    res.status(401).json({ message: "No hay token" });
  }
};

const getPlayersBought = async (req, res) => {
  let token = decodeJWT(req.cookies["access-token"]);
  if (token) {
    let { user_id } = token;
    try {
      let players = await playersBought.getPlayersBoughtByUser(user_id);
      let links = players.map((ele) => ele["player_link"]);
      let data = await Player.find({ link: { $in: links } }, "-_id -__v");
      res.status(200).json({ response: 200, message: data });
    } catch (error) {
      res.status(400).json({
        message: error.detail,
      });
    }
  } else {
    res.status(200).json({ error: "no hay token", message: "no hay token" });
  }
};

module.exports = { buyPlayer, getPlayersBought };
