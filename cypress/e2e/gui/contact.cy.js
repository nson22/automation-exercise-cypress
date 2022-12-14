/// <reference types="Cypress"/>

import user from '../../fixtures/user.json'

describe('User', () => {

  context('Contact Us', () => {
    beforeEach(() => {

      cy.visit('/')

    });

    it.skip('should be possible to access contact us', () => {
      cy.openHeaderLink("Contact Us")

      cy.url().should('contain', '/contact_us')

      // cy.wait('@getContactUsPage')

      cy.get('a:contains("Contact us")')
        .should('be.visible')
        .click()

      cy.get('h2:contains("Get in Touch")')
        .should('be.visible')

      cy.get('[data-qa="name"]')
        .should('be.be.visible')
        .type(user.name)

      cy.get('[data-qa="email"]')
        .should('be.be.visible')
        .type(user.email)

      cy.get('[data-qa="subject"]')
        .should('be.be.visible')
        .type('Contact us feedback message')

      cy.get('[data-qa="message"]')
        .should('be.be.visible')
        .type('Contact us feedback message')

      cy.get('[type=file]')
        .selectFile('fixture/user.json')
    });

    it('should be able to subscription email in Home page', () => {
      cy.scrollTo('bottom')

      cy.get('[class="single-widget"]')
        .contains('h2', 'Subscription')
        .should('be.visible')

      cy.get('[id="susbscribe_email"]')
        .should('be.visible')
        .type(user.email)

      cy.get('[id="subscribe"]')
        .click()

      cy.get('[class="alert-success alert"]')
        .should('be.visible')
        .and('have.text', 'You have been successfully subscribed!')

    });

    it('should be able to subscription email in Cart page', () => {
      cy.openHeaderLink('Cart')

      cy.scrollTo('bottom')

      cy.get('[class="single-widget"]')
        .contains('h2', 'Subscription')
        .should('be.visible')

      cy.get('[id="susbscribe_email"]')
        .should('be.visible')
        .type(user.email)

      cy.get('[id="subscribe"]')
        .click()

      cy.get('[class="alert-success alert"]')
        .should('be.visible')
        .and('have.text', 'You have been successfully subscribed!')

    });
  });
});