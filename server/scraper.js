const puppeteer = require("puppeteer");

async function takeScreenshot() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("https://hosted.mickgeorge.co.uk/businessportal/login.jsp");

  await page.screenshot({ path: "image.png" });
  await browser.close();
}

module.exports = {
  takeScreenshot,
};
