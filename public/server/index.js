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

app.get("/login", async (req, res) => {
  const username = req.query.username;
  const domain = req.query.domain;
  const password = req.query.password;

  await scraper.loginToPortal(username, domain, password);
  const companies = await scraper.listAllCompanies();
  res.json(companies);
});

app.get("/company", async (req, res) => {
  const url = req.query.url;

  const details = await scraper.getCompanyDetails(url);
  res.json(details);
});

app.get("/employee", async (req, res) => {
  const url = req.query.url;

  const details = await scraper.getEmployeeDetails(url);
  res.json(details);
});

app.listen(port, () =>
  console.log(`Server listening at http://localhost:${port}`)
);
