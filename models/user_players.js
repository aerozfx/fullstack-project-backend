const pool = require("../utils/db_conn");
const players = require("./queries/user_players.queries");

const buyPlayer = async (obj) => {
  let { link, user_id } = obj;
  let client, result;
  try {
    client = await pool.connect();
    let data = await client.query(players.buyPlayer, [link, user_id]);
    result = data.rows[0];
  } catch (error) {
    result = error;
  } finally {
    client.release();
  }

  return result;
};

const getPlayersBoughtByUser = async (user_id) => {
  let client, result;
  try {
    client = await pool.connect();
    let data = await client.query(players.getPlayersByUserId, [user_id]);
    result = data.rows;
  } catch (error) {
    result = error.stack;
  } finally {
    client.release();
  }
  return result;
};

module.exports = { buyPlayer, getPlayersBoughtByUser };
