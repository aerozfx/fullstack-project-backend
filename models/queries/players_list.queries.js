const db_players_list = {
  getPlayers: `
        SELECT *
        FROM players_list
    `,
  getPrice: `
        SELECT player_price
        FROM players_list
        WHERE player_link = $1
    `,
  addPlayerToList: `
    INSERT into players_list (player_price, player_link)
    VALUES ($1, $2)
  `,
};

module.exports = db_players_list;
