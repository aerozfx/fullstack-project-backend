const express = require("express");
const users = require("../controllers/usersController");
const players = require("../controllers/playersController");
const user_players = require("../controllers/user_playersController");
const currency = require("../controllers/currencyController");
const apiRouter = express.Router();

apiRouter.get("/players", players.getPlayers);
apiRouter.post("/buy", user_players.buyPlayer);
apiRouter.get("/buy", user_players.getPlayersBought);

apiRouter.get("/currency", currency.getCurrency);
apiRouter.post("/currency", currency.addCurrency);

// CRUD USUARIOS
apiRouter.get("/users/:id?", users.getUser);
apiRouter.post("/register", users.createUser);
apiRouter.post("/login", users.loginUser);
apiRouter.post("/logout", (req, res) => res.clearCookie("access-token").end());
apiRouter.put("/users", users.updateUser);
apiRouter.delete("/users/:id?", users.deleteUser);

module.exports = apiRouter;
