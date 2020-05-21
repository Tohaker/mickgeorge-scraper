const express = require("express");
const scraper = require("./scraper");

const app = express();
const port = 3001;

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/", (req, res) => {
  scraper.takeScreenshot();
  res.json({ message: "Hello World!" });
});

app.listen(port, () =>
  console.log(`Server listening at http://localhost:${port}`)
);
