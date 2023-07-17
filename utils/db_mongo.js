const mongoose = require("mongoose");
require("dotenv").config();
mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGO_URI, {
  // Opciones de la conexión
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", (error) => console.log(error));
db.once("open", () => console.log("Mongo enchuclado"));

module.exports = mongoose;
