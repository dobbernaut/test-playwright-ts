exports.mochaHooks = {
  async beforeAll() {
    const testConfig = require('../config.ts').testConfig;
    this.browser = await require('playwright').chromium.launch({
      slowMo: testConfig.slowMo,
      headless: testConfig.headless,
      chromiumSandbox: false,
      args: ['--disable-dev-shm-usage']
    });
    this.context = await this.browser.newContext({
      ignoreHTTPSErrors: true,
      viewport: testConfig.viewport,
    });
    this.page = await this.context.newPage();
  },
  async afterAll() {
    await this.browser.close();
  },
  async afterEach() {
    if (this.currentTest.state === 'failed') {
      const addContext = require('mochawesome/addContext');
      const title = this.currentTest.title.replace(/\s/g, '-');
      const screenshotFileName = `${title}_failed.png`;
      await this.page.screenshot({
        path: `artifacts/gui/mochawesome/assets/${screenshotFileName}`,
        fullPage: true
      });
      addContext(this, 'assets/' + screenshotFileName);
    }
  }
};
