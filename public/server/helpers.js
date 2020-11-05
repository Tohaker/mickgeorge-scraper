const log = require("electron-log");

log.transports.file.level = "info";

async function nextPage(page) {
  const selector = '//a[text()="›"]';
  try {
    await page.waitForXPath(selector, { timeout: 1000 });
    const nextBtn = (await page.$x(selector))[0];

    await nextBtn.click();
    await page.waitForNavigation({ waitUntil: "networkidle0" });
    return true;
  } catch (err) {
    log.info("No next button found");
    return false;
  }
}

async function clickSearchButton(page) {
  const selector = '//button[@type="submit" and @name="searchButton"]';
  await page.waitForXPath(selector);
  const searchButton = (await page.$x(selector))[0];
  await searchButton.click();
}

async function getApplicationUsername(page) {
  const selector = '//input[@id="userId"]';
  await page.waitForXPath(selector);
  const applicationUsername = (await page.$x(selector))[0];

  return await page.evaluate((x) => x.value, applicationUsername);
}

async function getServiceSettings(page) {
  const selectorDevice = '//input[@id="deviceType"]';
  const selectorMAC = '//input[@id="macAddress"]';
  const selectorNumber = '//input[@id="currentDirectoryNumberID"]';
  await page.waitForXPath(selectorDevice);

  const deviceType = (await page.$x(selectorDevice))[0];
  const macAddress = (await page.$x(selectorMAC))[0];
  const directoryNumber = (await page.$x(selectorNumber))[0];

  return {
    deviceType: await page.evaluate((x) => x.value, deviceType),
    macAddress: await page.evaluate((x) => x.value, macAddress),
    directoryNumber: await page.evaluate((x) => x.value, directoryNumber),
  };
}

async function getFeatures(page) {
  const voiceRecording = (await page.content()).match("Voice Recording")[0];
  
  return {
    voiceRecording
  }
}

module.exports = {
  nextPage,
  clickSearchButton,
  getApplicationUsername,
  getServiceSettings,
  getFeatures
};
