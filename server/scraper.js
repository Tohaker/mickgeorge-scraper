const puppeteer = require("puppeteer");

let chromePath = `C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe`;
let browser;
let page;

async function startBrowser() {
  browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: true,
  });
  page = await browser.newPage();
}

async function closeBrowser() {
  await browser.close();
}

async function resetBrowser() {
  await closeBrowser();
  await startBrowser();
}

async function takeScreenshot() {
  await page.screenshot({ path: "image.png" });
}

async function loginToPortal(username, domain, password) {
  await page.goto("https://hosted.mickgeorge.co.uk/businessportal/login.jsp", {
    waitUntil: "networkidle2",
  });

  const usernameInput = (await page.$x('//*[@id="username"]'))[0];
  const domainInput = (await page.$x('//*[@id="domain"]'))[0];
  const passwordInput = (await page.$x('//*[@id="password"]'))[0];
  const loginButton = (await page.$x('//*[@type="submit"]'))[0];

  await usernameInput.type(username);
  await domainInput.type(domain);
  await passwordInput.type(password);
  await loginButton.click();

  await page.waitForNavigation({ waitUntil: "networkidle2" }); // Wait for the login to complete
}

async function listAllCompanies() {
  await page.goto(
    "https://hosted.mickgeorge.co.uk/businessportal/searchorganizations.do?rootSearchKey=&sortSearchResults=true&name=",
    {
      waitUntil: "networkidle2",
    }
  );

  const tableData = await page.evaluate(() => {
    const links = Array.from(document.querySelectorAll("table tbody tr td a"));
    return links
      .map((a) => ({
        name: a.innerHTML,
        link: a.getAttribute("href"),
      }))
      .filter((link) => !link.name.includes("icon-screenshot"));
  });

  return tableData;
}

module.exports = {
  startBrowser,
  closeBrowser,
  resetBrowser,
  takeScreenshot,
  loginToPortal,
  listAllCompanies,
};
