exports.mochaHooks = {
  async beforeAll() {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const testConfig = require('../config/config.ts').testConfig;
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    this.browser = await require('playwright').chromium.launch({
      slowMo: testConfig.slowMo,
      headless: testConfig.headless,
      chromiumSandbox: false,
      args: [
        '--disable-gpu',
        '--disable-logging',
        '--disable-dev-shm-usage',
        '--no-sandbox',
      ]
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
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const addContext = require('mochawesome/addContext');
      const title = this.currentTest.title.replace(/\s/g, '-');
      const screenshotFileName = `${title}_failed.png`;
      await this.page.screenshot({
        path: `artifacts/gui/mochawesome/assets/${screenshotFileName}`,
        fullPage: true
      });
      addContext(this, `assets/${screenshotFileName}`);
    }
  }
};
