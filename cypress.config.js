const { defineConfig } = require("cypress");
const database = require('./cypress/utils/database')
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const preprocessor = require("@badeball/cypress-cucumber-preprocessor");
const createEsbuildPlugin = require("@badeball/cypress-cucumber-preprocessor/esbuild");
const allureWriter = require("@shelex/cypress-allure-plugin/writer");

module.exports = defineConfig({
  e2e: {
    specPattern: "**/**/*.feature",
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
      preprocessor.addCucumberPreprocessorPlugin(on, config);

      on("task", {
        queryDb: (query) => database.queryDb(query)
      })
      on("task", {
        queryDbValues: (parameters) => database.queryDbValues(parameters.query, parameters.values)
      })

      on(
        "file:preprocessor",
        createBundler({
          plugins: [createEsbuildPlugin.default(config)],
        })


      );
      allureWriter(on, config);
      return config;
    },
    env: {
      allureReuseAfterSpec: true,
      allure: true
    }
  }
});