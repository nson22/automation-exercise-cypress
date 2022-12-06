// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

Cypress.Commands.add('deleteAccount', () => {
  cy.get(`a:contains("Delete Account")`)
    .click()

  cy.get(`[data-qa="account-deleted"]`)
    .children(`b`)
    .should(`be.visible`)
    .and(`have.text`, `Account Deleted!`)

  cy.get(`[data-qa="continue-button"]`)
    .click()
})

Cypress.Commands.add('fillUpRegisterUserForm', (USER) => {
  cy.get(`[id="id_gender${2}"]`)
    .check()

  cy.get(`[data-qa="name"]`)
    .should(`be.visible`)
    .and(`have.value`, USER.FIRST_NAME)

  cy.get(`[data-qa="email"]`)
    .should(`be.visible`)
    .and('not.be.enabled')
    .and(`have.value`, USER.EMAIL)

  cy.get(`[data-qa="password"]`)
    .should(`be.visible`)
    .type(USER.PASSWORD, { log: false })

  cy.get(`[data-qa="days"]`)
    .should(`be.visible`)
    .select(USER.BIRTHDAY.DAY)

  cy.get(`[data-qa="months"]`)
    .should(`be.visible`)
    .select(USER.BIRTHDAY.MONTH)

  cy.get(`[data-qa="years"]`)
    .should(`be.visible`)
    .select(USER.BIRTHDAY.YEAR)

  cy.get(`[id="newsletter"]`)
    .check()

  cy.get(`[id="optin"]`)
    .check()

  cy.get(`[data-qa="first_name"]`)
    .should(`be.visible`)
    .type(USER.FIRST_NAME)

  cy.get(`[data-qa="last_name"]`)
    .should(`be.visible`)
    .type(USER.LAST_NAME)

  cy.get(`[data-qa="company"]`)
    .should(`be.visible`)
    .type(USER.COMPANY)

  cy.get(`[data-qa="address"]`)
    .should(`be.visible`)
    .type(USER.ADDRESS)

  cy.get(`[data-qa="country"]`)
    .should(`be.visible`)
    .select(USER.COUNTRY)

  cy.get(`[data-qa="state"]`)
    .should(`be.visible`)
    .type(USER.STATE)

  cy.get(`[data-qa="city"]`)
    .should(`be.visible`)
    .type(USER.CITY)

  cy.get(`[data-qa="zipcode"]`)
    .should(`be.visible`)
    .type(USER.ZIPCODE)

  cy.get(`[data-qa="mobile_number"]`)
    .should(`be.visible`)
    .type(USER.MOBILE_NUMBER)

  cy.get('[data-qa="create-account"]')
    .click()
})
