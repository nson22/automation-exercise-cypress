/// <reference types="Cypress"/>

describe(`User`, () => {
  context('Register user', () => {
    const MSG_ENTER_ACCOUNT_INFO = "Enter Account Information"
    const MSG_NEW_USER_SIGNUP = "New User Signup!"
    const MSG_ACCOUNT_CREATED = "Account Created!"
    const MSG_ACCOUNT_DELETED = "Account Deleted!"

    const USER = {
      FIRST_NAME: 'Object',
      LAST_NAME: 'Edge',
      EMAIL: `object.edge@mail.com`,
      PASSWORD: 'password',
      BIRTHDAY: {
        DAY: '22',
        MONTH: '8',
        YEAR: '1983'
      },
      COMPANY: 'Object Edge',
      ADDRESS: 'Rua Niger, n13, QD 124',
      COUNTRY: 'United States',
      STATE: 'California',
      CITY: 'Open Creak',
      ZIPCODE: 'US-99-00',
      MOBILE_NUMBER: '555-555-555'
    }

    beforeEach(() => {
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

    });

    it(`should be able to register user`, () => {

      cy.wait('@getHomePage')
      cy.url().should('include', '/')

      cy.get(`a:contains("Login")`).click()
      cy.url().should('include', '/login')

      cy.get(`h2:contains(${MSG_NEW_USER_SIGNUP})`)
        .should('be.visible')

      cy.wait('@getLoginPage')

      cy.get(`[data-qa="signup-name"]`)
        .should(`be.visible`)
        .and(`be.empty`)
        .type(USER.FIRST_NAME)

      cy.get(`[data-qa="signup-email"]`)
        .should(`be.visible`)
        .and(`be.empty`)
        .type(USER.EMAIL)

      cy.get(`[data-qa="signup-button"]`)
        .should(`be.visible`)
        .click()

      cy.get(`b:contains(${MSG_ENTER_ACCOUNT_INFO})`)
        .should('be.visible')

      cy.fillUpRegisterUserForm(USER)

      cy.get(`b:contains(${MSG_ACCOUNT_CREATED})`)
        .should('be.visible')

      cy.get('[data-qa="continue-button"]')
        .click()

      cy.get('a:contains("Logged in as")')
        .children(`b:contains("${USER.FIRST_NAME}")`)
        .should('be.visible')

      cy.get('a:contains("Delete Account")')
        .click()

      cy.get(`h2:contains(${MSG_ACCOUNT_DELETED})`)
        .should('be.visible')

      cy.get('[data-qa="continue-button"]')
        .click()

    });

  })
})