/// <reference types="Cypress"/>

import user from '../../fixtures/user.json'

describe('API Register', () => {
  context('User', () => {
    it('should be able to register user through API', () => {
      cy.APIDeleteUserAccount("object.edge@mail.com", "password")

      cy.APICreateUserAccount(user)
        .then(response => {
          const { status, statusText } = response
          expect(status).to.be.equal(200)
          expect(statusText).to.be.equal('OK')
        })
    });
  });
});