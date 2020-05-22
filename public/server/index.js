const express = require("express");
const scraper = require("./scraper");

const app = express();
const port = 3001;

scraper.startBrowser();

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/reset", async (req, res) => {
  await scraper.resetBrowser();
  res.status(204);
});

app.get("/login", async (req, res) => {
  const username = req.query.username;
  const domain = req.query.domain;
  const password = req.query.password;

  await scraper.loginToPortal(username, domain, password);
  const companies = await scraper.listAllCompanies();
  res.json(companies);
});

app.listen(port, () =>
  console.log(`Server listening at http://localhost:${port}`)
);
