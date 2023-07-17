const currencyQueries = require("./queries/currency.queries");
const pool = require("../utils/db_conn");

const getCurrency = async (id) => {
  let client, result;
  try {
    client = await pool.connect();
    let data = await client.query(currencyQueries.getCurrencyByUser, [id]);
    result = data.rows[0];
  } catch (error) {
    result = error;
  } finally {
    client.release();
  }
  return result;
};

const addCurrency = async (obj) => {
  let { amount, user_id } = obj;
  let client, result;
  try {
    client = await pool.connect();
    let data = await client.query(currencyQueries.addCurrencyToUser, [
      amount,
      user_id,
    ]);
    result = data.rows[0];
  } catch (error) {
    result = error;
  } finally {
    client.release();
  }
  return result;
};

const updateCurrency = async (obj) => {
  let { amount, user_id } = obj;
  let client, result;
  try {
    client = await pool.connect();
    let data = await client.query(currencyQueries.addCurrencyToUser, [
      amount,
      user_id,
    ]);
    result = data.rows[0];
  } catch (error) {
    result = error;
  } finally {
    client.release();
  }
  return result;
};
module.exports = { getCurrency, addCurrency, updateCurrency };
