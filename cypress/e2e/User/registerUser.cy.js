/// <reference types="Cypress"/>

describe(`User`, () => {
  context('Register user', () => {
    const user = {
      firstName: 'Object',
      lastName: 'Edge',
      email: `object.edge@mail.com`,
      password: 'password',
      birthday: {
        day: 22,
        month: 8,
        year: 1983
      },
      company: 'Object Edge',
      address: 'Rua Niger, n13, QD 124',
      country: 'United States',
      state: 'California',
      city: 'Open Creak',
      zipcode: 'US-99-00',
      mobileNumber: '555-555-555'
    }

    beforeEach(() => {
    });

    it(`should be able to register user`, () => {

      cy.register(user)

    });

  })
})