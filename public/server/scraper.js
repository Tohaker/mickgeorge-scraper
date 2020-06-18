const puppeteer = require("puppeteer-core");
const log = require("electron-log");
const promiseRetry = require("promise-retry");
const {
  nextPage,
  clickSearchButton,
  getApplicationUsername,
  getServiceSettings,
} = require("./helpers");

log.transports.file.level = "info";

let chromePath =
  "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe";
let baseUrl = "https://portal.hv-select.com/businessportal/";
let browser;
let page;

async function setBaseUrl(url) {
  baseUrl = url;
}

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

async function takeScreenshot(imageName) {
  await page.screenshot({ path: imageName });
}

async function loginToPortal(username, domain, password) {
  await page.goto(`${baseUrl}login.jsp`, {
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
    `${baseUrl}searchorganizations.do?rootSearchKey=&sortSearchResults=true&name=`,
    {
      waitUntil: "networkidle2",
    }
  );

  let tableData = [];

  do {
    try {
      tableData = tableData.concat(
        await page.evaluate(() => {
          const links = Array.from(
            document.querySelectorAll("table tbody tr td a")
          );
          return links
            .map((a) => ({
              name: a.innerHTML,
              url: a.getAttribute("href"),
            }))
            .filter((link) => !link.name.includes("icon-screenshot"));
        })
      );
    } catch (err) {
      log.warn(
        "Couldn't find the table data. Perhaps the login was incorrect?",
        err
      );
    }
  } while (await nextPage(page));

  return tableData;
}

async function parseEmployeeTable() {
  await page.waitForNavigation({ waitUntil: "networkidle0" });
  await page.waitForXPath("//td[@class='selectColumn']");

  let tableData = [];

  do {
    try {
      tableData = tableData.concat(
        await page.evaluate(() => {
          const rows = Array.from(document.querySelectorAll("table tbody tr"));
          return rows
            .map((row) => {
              const data = row.children;
              const username = data[1].innerText;
              const status = data[2].innerText;
              const firstName = data[3].innerText;
              const surname = data[4].innerText;
              const extension = data[6].innerText;
              const siteName = data[7].innerText;
              const link =
                (data[8].querySelector("a") &&
                  data[8].querySelector("a").href) ||
                "";

              return {
                username,
                status,
                firstName,
                surname,
                extension,
                siteName,
                link,
              };
            })
            .filter((row) => !row.username.includes("Admin"));
        })
      );
    } catch (err) {
      log.warn("Couldn't find table data for this company", err);
    }
  } while (await nextPage(page));

  return tableData;
}

async function getCompanyDetails(url) {
  await page.goto(`${baseUrl}${url}`, { waitUntil: "networkidle0" });
  const employeesBtn = (
    await page.$x('//a[text()[contains(.,"Employees")]]')
  )[0];

  await employeesBtn.click();
  await clickSearchButton(page);
  return await parseEmployeeTable();
}

async function getEmployeeDetails(url) {
  await promiseRetry(
    (retry, attempt) => {
      page.goto(url, { waitUntil: "networkidle0" }).catch((err) => {
        retry(err);
        log.info(`Made ${attempt} attempts to get Employee details at ${url}`);
      });
    },
    { minTimeout: 500, retries: 5 }
  );

  const appSelector = '//a/span[text()[contains(., "Applications")]]';
  const serviceSelector = '//a/span[text()[contains(., "Service Settings")]]';

  await page.waitForXPath(appSelector);
  const applicationsBtn = (await page.$x(appSelector))[0];

  await applicationsBtn.click();
  await page.waitForNavigation({ waitUntil: "domcontentloaded" });
  const appUserName = await getApplicationUsername(page);

  await page.waitForXPath(serviceSelector);
  const serviceSettingsBtn = (await page.$x(serviceSelector))[0];

  await serviceSettingsBtn.click();
  await page.waitForNavigation({ waitUntil: "domcontentloaded" });
  const serviceSettings = await getServiceSettings(page);

  return { appUserName, ...serviceSettings };
}

module.exports = {
  setBaseUrl,
  startBrowser,
  closeBrowser,
  takeScreenshot,
  loginToPortal,
  listAllCompanies,
  getCompanyDetails,
  getEmployeeDetails,
};
