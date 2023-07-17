const express = require("express");
require("./utils/db_mongo.js"); // Conexión a BBDD MongoDB
const helmet = require("helmet");
const cors = require("cors");
const cookie = require("cookie-parser");
const scraper = require("./utils/webScraper");
const { getDocumentsAmount } = require("./utils/script.js");
const apiRouter = require("./router/apiRouter.js");
const app = express();
const port = 3000;

app.use(express.json());
app.use(cookie());
app.use(helmet());
getDocumentsAmount().then((data) => {
  if (data < 40) {
    scraper();
  }
});
app.get("/", (req, res) => {
  res.send("Hola desde el server");
});
app.use("/api", apiRouter);

app.listen(port, () => {
  console.log(`SERVIDOR ESCUCHANDO EN http://localhost:${port}`);
});
