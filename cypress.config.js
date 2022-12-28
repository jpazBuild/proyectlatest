const allureWriter = require('@shelex/cypress-allure-plugin/writer');
const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    chromeWebSecurity: true,
    video: true,
    screenshotsFolder: "cypress/screenshots",
    viewportHeight: 900,
    viewportWidth: 1440,
    retries: {
      runMode: 2,
      openMode: 1
    },
    defaultCommandTimeout: 12000,
    setupNodeEvents(on, config) {
      allureWriter(on, config);
      return config;
    },
    env: {
      allureReuseAfterSpec: true,
      allure: true
    }
  }
});