const { defineConfig } = require("cypress");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const preprocessor = require("@badeball/cypress-cucumber-preprocessor");
const createEsbuildPlugin = require("@badeball/cypress-cucumber-preprocessor/esbuild");
const allureWriter = require("@shelex/cypress-allure-plugin/writer");
const _ = require("lodash");

module.exports = defineConfig({
  e2e: {
    specPattern: "**/**/*.feature",
    chromeWebSecurity: true,
    video: true,
    videoCompression: 15,
    videosFolder:"cypress/videos",
    screenshotsFolder: "cypress/screenshots",
    viewportHeight: 900,
    viewportWidth: 1440,
    retries: {
      runMode: 2,
      openMode: 1
    },
    defaultCommandTimeout: 12000,
    setupNodeEvents(on, config) {
      preprocessor.addCucumberPreprocessorPlugin(on, config);

      on(
        "file:preprocessor",
        createBundler({
          plugins: [createEsbuildPlugin.default(config)],
        })


      );
      allureWriter(on, config);
      on('after:spec', (spec, results) => {
        if (results && results.video) {
          // Do we have failures for any retry attempts?
          const failures = _.some(results.tests, (test) => {
            return _.some(test.attempts, { state: 'failed' })
          })
        }
      });
      return config;
    },
    env: {
      allureReuseAfterSpec: true,
      allure: true
    }
  }
});