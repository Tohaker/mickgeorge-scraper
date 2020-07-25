const Application = require("spectron").Application;
const assert = require("assert");
const electronPath = require("electron"); // Require Electron from the binaries included in node_modules.
const path = require("path");

describe("Login Page", function () {
  this.timeout(10000);
  let app;

  beforeEach(() => {
    app = new Application({
      // Your electron path can be any binary
      // i.e for OSX an example path could be '/Applications/MyApp.app/Contents/MacOS/MyApp'
      // But for the sake of the example we fetch it from our node_modules.
      path: electronPath,

      // The following line tells spectron to look and use the main.js file
      // and the package.json located 1 level above.
      args: [path.join(__dirname, "..")],
    });
    return app.start();
  });

  afterEach(() => {
    if (app && app.isRunning()) {
      return app.stop();
    }
  });

  it("should open the application", () => {
    return app.client
      .getWindowCount()
      .then((count) => assert.strictEqual(count, 1));
  });

  it("should have the correct title", () => {
    return app.client
      .getTitle()
      .then((title) => assert.strictEqual(title, "Portal Scraper"));
  });

  it("should display the correct headings", () => {
    const expectedHeadings = ["Portal URL", "Username", "Domain", "Password"];

    return app.client
      .waitUntilWindowLoaded()
      .then(() => app.client.$$("label"))
      .then((elements) =>
        elements.forEach((elem) => {
          elem
            .getText()
            .then((text) => assert(expectedHeadings.includes(text)));
        })
      )
      .catch((error) => {
        assert.fail(error);
      });
  });
});
