import { Before, Given, When, Then, Step, After } from "@badeball/cypress-cucumber-preprocessor";
import {  Ejemplo } from "../tasks/ejemplo";


const ejemplo = new Ejemplo()

Cypress.on('uncaught:exception', (err, runnable) => {
  return false
});

Before(() => {
  cy.exec('npm cache clear --force')
}
)

When('I navegate into google', () => {
  ejemplo.navegateToSite("https://www.google.com/")

})

When('I search {string}',(word)=>{
  cy.get('[name="q"]').type(`${word}{enter}`)
})

Then('validate the word {string} appears in the google search',(wordexpected)=>{
  cy.contains(wordexpected)
})

