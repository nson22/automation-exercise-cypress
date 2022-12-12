// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
Cypress.Commands.add('fillUpRegisterUserForm', (user) => {
  cy.get(`[id="id_gender${2}"]`)
    .check()

  cy.get(`[data-qa="name"]`)
    .should(`be.visible`)
    .and(`have.value`, user.name)

  cy.get(`[data-qa="email"]`)
    .should(`be.visible`)
    .and('not.be.enabled')
    .and(`have.value`, user.email)

  cy.get(`[data-qa="password"]`)
    .should(`be.visible`)
    .type(user.password, { log: false })

  cy.get(`[data-qa="days"]`)
    .should(`be.visible`)
    .select(user.birth_date)

  cy.get(`[data-qa="months"]`)
    .should(`be.visible`)
    .select(user.birth_month)

  cy.get(`[data-qa="years"]`)
    .should(`be.visible`)
    .select(user.birth_year)

  cy.get(`[id="newsletter"]`)
    .check()

  cy.get(`[id="optin"]`)
    .check()

  cy.get(`[data-qa="first_name"]`)
    .should(`be.visible`)
    .type(user.firstname)

  cy.get(`[data-qa="last_name"]`)
    .should(`be.visible`)
    .type(user.lastname)

  cy.get(`[data-qa="company"]`)
    .should(`be.visible`)
    .type(user.company)

  cy.get(`[data-qa="address"]`)
    .should(`be.visible`)
    .type(user.address1)

  cy.get(`[data-qa="country"]`)
    .should(`be.visible`)
    .select(user.country)

  cy.get(`[data-qa="state"]`)
    .should(`be.visible`)
    .type(user.state)

  cy.get(`[data-qa="city"]`)
    .should(`be.visible`)
    .type(user.city)

  cy.get(`[data-qa="zipcode"]`)
    .should(`be.visible`)
    .type(user.zipcode)

  cy.get(`[data-qa="mobile_number"]`)
    .should(`be.visible`)
    .type(user.mobile_number)

  cy.get('[data-qa="create-account"]')
    .click()
})
