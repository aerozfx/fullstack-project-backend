const puppeteer = require("puppeteer");
const Player = require("../models/players-mongo");
const players_list = require("../models/players_list");
const { formatName, capitalizeName } = require("./formatName");
require("dotenv").config();
const URL = "https://worldpadeltour.com/jugadores";

const scraper = async () => {
  //   const browser = await puppeteer.launch({
  //     args: [
  //       "--disable-setuid-sandbox",
  //       "--no-sandbox",
  //       "--single-process",
  //       "--no-zygote",
  //     ],
  //     executablePath: process.env.PUPPETEER_EXECUTABLE_PATH,
  //   });
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  page.setDefaultTimeout(300000);
  await page.goto(URL);
  await page.evaluate(() => {
    window.scrollTo(0, 500);
  });
  let links = await page.$$eval(`.b-player-top a[href]`, (ele) =>
    ele.map((item) => item.href)
  );
  let players = [];
  for (let i = 0; i < links.length; i++) {
    await page.goto(links[i]);
    let name = await page.$eval(".b-title .title", (ele) => {
      let [firstName, surname] = ele.innerText.split("\n");
      return { firstName, surname };
    });
    let image = await page.$eval(".b-info img", (ele) => ele.src);
    let data = await page.$$eval(`.title + div p`, (ele) =>
      ele.map((item) =>
        item.innerText.replace(/ /g, "-").toLowerCase().split("\n")
      )
    );
    let personalData = await page.$$eval(".b-personal-info p", (item) =>
      item.map((ele) =>
        ele.innerText.replace(/ de /gi, "-").toLowerCase().split("\n")
      )
    );
    let link = formatName(name).toLowerCase().replace(/ /g, "-");
    const { firstName, surname } = capitalizeName(name);
    players.push({
      firstName,
      surname,
      image,
      link,
      ...Object.fromEntries(data),
      "datos-personales": {
        ...Object.fromEntries(personalData),
      },
    });
  }
  await browser.close();
  await Player.insertMany(players);
  let puntos = await Player.find({}, "puntos -_id")
    .sort({ puntos: -1 })
    .limit(1);
  let maxPuntos = puntos[0].puntos;

  for (let i = 0; i < players.length; i++) {
    let { link: player_link, puntos } = players[i];
    let player_price =
      maxPuntos === puntos ? 30 : Math.ceil((puntos * 30) / maxPuntos);
    await Player.findOneAndUpdate(
      { link: player_link },
      { price: player_price }
    );
  }
};

module.exports = scraper;
