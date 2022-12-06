// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

Cypress.Commands.add('register', (user) => {
  cy.intercept(
    `GET`,
    `**/*`
  ).as("getHomePage")

  cy.intercept(
    `GET`,
    `**/login`
  ).as("getLoginPage")

  cy.intercept(
    `POST`,
    `**/signup`
  ).as("getSignUpPage")

  cy.intercept(
    `GET`,
    `**/account_created`
  ).as("getAccountCreatedPage")

  cy.visit(`/`)

  cy.wait(`@getHomePage`)

  cy.url().should(`include`, `/`)

  cy.get(`a:contains("Login")`).click()

  cy.wait(`@getLoginPage`)

  cy.url().should(`include`, `/login`)

  // Input user info in home page
  cy.get(`[data-qa="signup-name"]`)
    .should(`be.visible`)
    .and(`be.empty`)
    .type(user.firstName)

  cy.get(`[data-qa="signup-email"]`)
    .should(`be.visible`)
    .and(`be.empty`)
    .type(user.email)

  cy.get(`[data-qa="signup-button"]`)
    .should(`be.visible`)
    .click()

  // Input 
  cy.wait(`@getSignUpPage`)

  cy.url().should(`include`, `/signup`)

  cy.get(`[id="id_gender1"]`)
    .check()

  cy.get(`[data-qa="name"]`)
    .should(`be.visible`)
    .and(`have.value`, user.firstName)

  cy.get(`[data-qa="email"]`)
    .should(`be.visible`)
    .and(`have.value`, user.email)

  cy.get(`[data-qa="email"]`)
    .should(`be.visible`)
    .and(`have.value`, user.email)

  cy.get(`[data-qa="password"]`)
    .should(`be.visible`)
    .type(user.password, { log: false })

  cy.get(`[data-qa="days"]`)
    .should(`be.visible`)
    .select(user.birthday.day)

  cy.get(`[data-qa="months"]`)
    .should(`be.visible`)
    .select(user.birthday.month)

  cy.get(`[data-qa="years"]`)
    .should(`be.visible`)
    .select(user.birthday.month)

  cy.get(`[id="newsletter"]`)
    .check()

  cy.get(`[id="optin"]`)
    .check()

  cy.get(`[data-qa="first_name"]`)
    .should(`be.visible`)
    .type(user.firstName)

  cy.get(`[data-qa="last_name"]`)
    .should(`be.visible`)
    .type(user.lastName)

  cy.get(`[data-qa="company"]`)
    .should(`be.visible`)
    .type(user.company)

  cy.get(`[data-qa="address"]`)
    .should(`be.visible`)
    .type(user.address)

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
    .type(user.mobileNumber)

  cy.get(`[data-qa="create-account"]`)
    .should(`be.visible`)
    .click()

  cy.wait(`@getAccountCreatedPage`)

  cy.get(`[data-qa="account-created"]`)
    .children(`b`)
    .should(`be.visible`)
    .and(`have.text`, `Account Created!`)

  cy.get(`[data-qa="continue-button"]`)
    .click()

  cy.get(`a:contains("Logged in as")`)
    .children(`b:contains("${user.firstName}")`)
    .should('be.visible')

  cy.get(`a:contains("Delete Account")`)
    .click()

  cy.get(`[data-qa="account-deleted"]`)
    .children(`b`)
    .should(`be.visible`)
    .and(`have.text`, `Account Deleted!`)

  cy.get(`[data-qa="continue-button"]`)
    .click()

  cy.wait(`@getHomePage`)

  cy.url().should(`include`, `/`)

})