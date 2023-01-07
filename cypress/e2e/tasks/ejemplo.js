import '../../support/commands'



export class Ejemplo {

    navegateToSite(url) {
        cy.visit(url, { timeout: 30000 })
    }

    setInputSearch(word) {
        cy.Input('[name="q"]',word)
    }

    clickButtonSearch(){
        cy.Button('[name="btnK"]')
    }





}