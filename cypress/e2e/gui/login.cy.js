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

      cy.visit('/')
    });

    it.only('should be possible to login with correct email and password', () => {
      cy.openHeaderLink('Login')

      cy.wait('@getLoginPage')

      cy.url()
        .should('contain', '/login')

      cy.get('h2:contains("Login to your account")')
        .should('be.visible')

      cy.fillUpUserEmailAndPassword(user.email, user.password)

      cy.get('a:contains("Logged in as")')
        .children(`b:contains("${user.firstname}")`)
        .should('be.visible')

      cy.openHeaderLink('Delete Account')

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
      cy.openHeaderLink('Login')

      cy.wait('@getLoginPage')

      cy.url()
        .should('contain', '/login')

      cy.get('h2:contains("Login to your account")')
        .should('be.visible')

      cy.fillUpUserEmailAndPassword(user.email, 'user.password')

      cy.get('p:contains("Your email or password is incorrect!")')
        .should('be.visible')
        .and('have.text', 'Your email or password is incorrect!')
    });

    it('should be possible to logout', () => {
      cy.openHeaderLink('Login')

      cy.wait('@getLoginPage')

      cy.url()
        .should('contain', '/login')

      cy.get('h2:contains("Login to your account")')
        .should('be.visible')

      cy.fillUpUserEmailAndPassword(user.email, user.password)

      cy.openHeaderLink('Logout')

      cy.url()
        .should('contain', '/login')
    });
  });
});