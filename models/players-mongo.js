const mongoose = require("mongoose");

const personalData = {
  altura: {
    type: String,
  },
  "lugar-nacimiento": {
    type: String,
  },
  "fecha-nacimiento": {
    type: String,
  },
  "posición-juego": {
    type: String,
  },
  compañero: {
    type: String,
  },
};

const schema = {
  firstName: {
    type: String,
  },
  surname: {
    type: String,
  },
  image: {
    type: String,
  },
  link: {
    type: String,
    unique: true,
  },
  price: {
    type: Number,
  },
  ranking: {
    type: Number,
  },
  puntos: {
    type: Number,
  },
  efectividad: {
    type: Number,
  },
  "victorias-consecutivas": {
    type: Number,
  },
  ganados: {
    type: Number,
  },
  jugados: {
    type: Number,
  },
  perdidos: {
    type: Number,
  },
  "partidos-jugados": {
    type: Number,
  },
  "partidos-ganados": {
    type: Number,
  },
  "datos-personales": {
    type: personalData,
  },
};

const playerSchema = new mongoose.Schema(schema);

const Player = mongoose.model("player", playerSchema);

module.exports = Player;
