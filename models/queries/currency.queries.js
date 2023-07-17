const db_sql_currency = {
  getCurrencyByUser: `
    SELECT c.user_currency, u.name
    FROM currency c
    JOIN users u ON u.user_id = c.user_id
    WHERE c.user_id = $1
    `,
  addCurrencyToUser: `
    UPDATE currency 
      SET user_currency = $1
      WHERE user_id = $2
    RETURNING user_currency
    `,
  updateCurrency: `
    UPDATE currency
      SET user_currency = $1
      WHERE user_id = $2
      RETURNING user_currency
  `,
};

module.exports = db_sql_currency;
