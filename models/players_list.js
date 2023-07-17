const pool = require("../utils/db_conn");
const players_list = require("./queries/players_list.queries");

const getPlayersPrice = async (player_link) => {
  let client, result;
  try {
    client = await pool.connect();
    let data = await client.query(players_list.getPrice, [player_link]);
    result = data.rows[0];
  } catch (error) {
    result = error;
  } finally {
    client.release();
  }
  return result;
};

const getAllPrices = async () => {
  let client, result;
  try {
    client = await pool.connect();
    let data = await client.query(players_list.getPlayers);
    result = data.rows;
  } catch (error) {
    result = error;
  } finally {
    client.release();
  }
  return result;
};

const addPlayer = async (obj) => {
  let { player_link, player_price } = obj;
  let client, result;
  try {
    client = await pool.connect();
    let data = await client.query(players_list.addPlayerToList, [
      player_price,
      player_link,
    ]);
    result = data.rows[0];
  } catch (error) {
    console.log(error);
    result = error;
  } finally {
    client.release();
  }
  return result;
};
module.exports = { getPlayersPrice, addPlayer, getAllPrices };
