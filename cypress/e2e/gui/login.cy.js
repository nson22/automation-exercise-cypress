///<reference types="Cypress"/>

import user from '../../fixtures/user.json'

describe('User', () => {

  context('Login', () => {
    beforeEach(() => {
      cy.APIDeleteUserAccount(user.email, user.password)
      cy.APICreateUserAccount(user)

      cy.intercept(
        'GET',
        '**/'
      ).as("getHomePage")

      cy.intercept(
        'GET',
        '**/login'
      ).as('getLoginPage')

      cy.visit('/login')
    });

    it('should be possible to login with correct email and password', () => {

      cy.wait('@getLoginPage')

      cy.url()
        .should('contain', '/login')

      cy.get('h2:contains("Login to your account")')
        .should('be.visible')

      cy.get('[data-qa="login-email"]')
        .should('be.visible')
        .type(user.email)

      cy.get('[data-qa="login-password"]')
        .should('be.visible')
        .type(user.password, { log: false })

      cy.get('[data-qa="login-button"]')
        .should('be.visible')
        .click()

      cy.get('a:contains("Logged in as")')
        .children(`b:contains("${user.firstname}")`)
        .should('be.visible')

      cy.get('a:contains("Delete Account")')
        .should('be.visible')
        .click()

      cy.get('h2:contains("Account Deleted!")')
        .should('be.visible')

      cy.get('[data-qa="continue-button"]')
        .should('be.visible')
        .click()

      cy.wait('@getHomePage')

      cy.url()
        .should('contain', '/')

    });

    it('should not be possible to login with an incorrect email and password', () => {
      cy.wait('@getLoginPage')

      cy.url()
        .should('contain', '/login')

      cy.get('h2:contains("Login to your account")')
        .should('be.visible')

      cy.get('[data-qa="login-email"]')
        .should('be.visible')
        .type('incorrect.user.email@mail.com')

      cy.get('[data-qa="login-password"]')
        .should('be.visible')
        .type('incorrect.user.password', { log: false })

      cy.get('[data-qa="login-button"]')
        .should('be.visible')
        .click()

      cy.get('p:contains("Your email or password is incorrect!")')
        .should('be.visible')
        .and('have.text', 'Your email or password is incorrect!')
    });

    it('should be possible to logout', () => {

      cy.wait('@getLoginPage')

      cy.url()
        .should('contain', '/login')

      cy.get('h2:contains("Login to your account")')
        .should('be.visible')

      cy.get('[data-qa="login-email"]')
        .should('be.visible')
        .type(user.email)

      cy.get('[data-qa="login-password"]')
        .should('be.visible')
        .type(user.password, { log: false })

      cy.get('[data-qa="login-button"]')
        .should('be.visible')
        .click()

      cy.get('a:contains("Logout")')
        .click()

      cy.url()
        .should('contain', '/login')
    });
  });
});