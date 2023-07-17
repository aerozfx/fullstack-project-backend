CREATE TABLE users 
(
    user_id serial NOT NULL PRIMARY KEY,
    nickname VARCHAR(50) NOT NULL UNIQUE,
    name VARCHAR(50) NOT NULL,
    surname VARCHAR(50) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password VARCHAR(30) NOT NULL,
    role VARCHAR(5) CHECK ( role IN ('admin', 'user'))
);

INSERT INTO users (nickname, name, surname, email, password)
    VALUES (
        nickname = $1,
        name = $2,
        surname = $3,
        email = $4,
        password = $5
    )
RETURNING user_id;

UPDATE users
    SET nickname = $1, name = $2, surname = $3, email = $4, password = $5
    WHERE email = $6

DELETE FROM users
WHERE email = $1

SELECT u.user_id, c.user_currency
FROM users u
JOIN currency c ON u.user_id = c.user_id
WHERE email = $1

CREATE TABLE user_players 
(
    player_link VARCHAR(100) NOT NULL,
    user_id int NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
    ON DELETE CASCADE
)

INSERT INTO user_players (player_link, user_id)
    VALUES ($1, $2)


DELETE FROM user_players
    WHERE player_link = $1 AND user_id = $2


CREATE TABLE currency
(   
    user_currency int NOT NULL,
    user_id int NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
    ON DELETE CASCADE
)

CREATE TABLE players_list
(
    player_link VARCHAR(100) NOT NULL PRIMARY KEY,
    price int(2) NOT NULL
)