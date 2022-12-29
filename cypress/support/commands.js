// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })


Cypress.Commands.add('Input',(locator,dataType)=>{
    cy.get(locator).should('have.length', 1).clear().type(dataType,{ force: true });
})

Cypress.Commands.add('Button',(locator)=>{
    cy.get(locator).should('have.length', 1).click({ force: true });
})

Cypress.Commands.add('TextValidation',(locator,message)=>{
    cy.get(locator, { timeout: 10000 }).should('have.length', 1).should('have.text', message)
})

Cypress.Commands.add('forceClick', {prevSubject: 'element'}, (subject, options) => {
    cy.wrap(subject).click({force: true})
  });