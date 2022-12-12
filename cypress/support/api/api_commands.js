Cypress.Commands.add('APIDeleteUserAccount', (email, password) => {
  cy.request({
    method: 'DELETE',
    url: '/api/deleteAccount',
    form: true,
    body: {
      email,
      password
    }
  })
})

Cypress.Commands.add('APICreateUserAccount', (user) => {
  cy.request({
    method: 'POST',
    url: '/api/createAccount',
    form: true,
    body: user
  })
})
