/// <reference types="Cypress"/>

import user from '../../fixtures/user.json'

describe('API Register', () => {
  context('User', () => {
    it('should be able to register user through API', () => {

      cy.log('>>>>> Preconditions')
      cy.APIDeleteUserAccount("object.edge@mail.com", "password")

      cy.log('>>>>> Test Steps')
      cy.APICreateUserAccount(user)
        .then(response => {
          const { status, statusText } = response

          cy.log('>>>>> Expected result')
          expect(status).to.be.equal(200)
          expect(statusText).to.be.equal('OK')
        })
    });
  });
});