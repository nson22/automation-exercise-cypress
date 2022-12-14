/// <reference types="Cypress"/>

describe('Pages', () => {
  context('Links', () => {
    beforeEach(() => {
      cy.intercept(
        `GET`,
        `**/test_cases`
      ).as("getTestCasesPage")

      cy.visit('/')
    });

    it('should be possible to access Test Case page', () => {
      cy.openHeaderLink('Test Cases')

      cy.wait('@getTestCasesPage')

      cy.url().should('contain', '/test_cases')

      cy.get('h2:contains("Test Cases")')
        .should('be.visible')
    });
  });
});