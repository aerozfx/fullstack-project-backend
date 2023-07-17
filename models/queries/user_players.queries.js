const db_players_bought = {
  buyPlayer: `
    INSERT INTO user_players (player_link, user_id)
        VALUES ($1, $2)
        RETURNING player_link
    `,
  getPlayers: `
    SELECT * 
    FROM user_players
    `,
  getPlayersByUserId: `
    SELECT player_link
    FROM user_players b
    JOIN users u ON u.user_id = b.user_id
    WHERE u.user_id = $1
  `,
};

module.exports = db_players_bought;
