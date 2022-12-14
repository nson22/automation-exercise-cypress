/// <reference types="Cypress"/>

import user from '../../fixtures/user.json'

describe(`User`, () => {

  context('Register', () => {
    beforeEach(() => {
      cy.APIDeleteUserAccount(user.email, user.password)

      cy.intercept(
        `GET`,
        `**/`
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
    });

    it(`should be able to register user`, () => {
      cy.wait('@getHomePage')

      cy.url().should('include', '/')

      cy.openHeaderLink('Login')

      cy.url().should('include', '/login')

      cy.get(`h2:contains("New User Signup!")`)
        .should('be.visible')

      cy.wait('@getLoginPage')

      cy.get(`[data-qa="signup-name"]`)
        .should(`be.visible`)
        .and(`be.empty`)
        .type(user.firstname)

      cy.get(`[data-qa="signup-email"]`)
        .should(`be.visible`)
        .and(`be.empty`)
        .type(user.email)

      cy.get(`[data-qa="signup-button"]`)
        .should(`be.visible`)
        .click()

      cy.get(`b:contains("Enter Account Information")`)
        .should('be.visible')

      cy.fillUpRegisterUserForm(user)

      cy.get(`b:contains("Account Created!")`)
        .should('be.visible')

      cy.get('[data-qa="continue-button"]')
        .click()

      cy.get('a:contains("Logged in as")')
        .children(`b:contains("${user.firstname}")`)
        .should('be.visible')

      cy.get('a:contains("Delete Account")')
        .click()

      cy.get(`h2:contains("Account Deleted!")`)
        .should('be.visible')

      cy.get('[data-qa="continue-button"]')
        .click()

    });

    it('should not be able to register an existing user', () => {
      cy.APICreateUserAccount(user)

      cy.openHeaderLink('Login')

      cy.wait('@getLoginPage')

      cy.url().should('include', '/login')

      cy.get(`h2:contains("New User Signup!")`)
        .should('be.visible')

      cy.get(`[data-qa="signup-name"]`)
        .should(`be.visible`)
        .and(`be.empty`)
        .type(user.firstname)

      cy.get(`[data-qa="signup-email"]`)
        .should(`be.visible`)
        .and(`be.empty`)
        .type(user.email)

      cy.get(`[data-qa="signup-button"]`)
        .should(`be.visible`)
        .click()

      cy.get('p:contains("Email Address already exist!")')
        .should('be.visible')
    });
  });
})