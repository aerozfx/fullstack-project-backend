const queries_users = {
  createUser: `
    INSERT INTO users (nickname, name, surname, email, password)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING user_id;
    `,
  getUserById: `
    SELECT *
    FROM users
    WHERE user_id = $1
  `,
  getUserByEmail: `
    SELECT *
    FROM users
    WHERE email = $1
  `,
  getAllNicknames: `
    SELECT nickname
    FROM users;
  `,
  getAllUsers: `
    SELECT *
    FROM users
  `,
  updateUserByEmail: `
    UPDATE users
      SET nickname = $1, name = $2, surname = $3, email = $4, password = $5
      WHERE user_id = $6
    RETURNING *
  `,
  deleteUser: `
    DELETE
      FROM users
      WHERE user_id = $1
    RETURNING user_id
  `,
};

module.exports = queries_users;
