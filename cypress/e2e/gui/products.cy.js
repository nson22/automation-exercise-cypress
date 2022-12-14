/// <reference types="Cypress"/>

describe('Products', function () {

  context('Select availability', () => {
    beforeEach(function () {
      cy.intercept(
        `GET`,
        `**/products`,

      ).as("getProductsPage")

      cy.intercept(
        `GET`,
        `**/product_details/*`,

      ).as("getProductsDetailsPage")

      cy.visit('/')
    });

    it('should be possible to list all products and get product detail for the first product', () => {
      cy.openHeaderLink('Products')

      cy.wait('@getProductsPage')

      cy.url().should('contain', '/products')

      cy.get('[class="product-image-wrapper"]').then(function ($items) {
        cy.wrap($items)
          .get('[class="productinfo text-center"]')
          .first()
          .find('h2')
          .invoke('text')
          .as('price')

        cy.wrap($items)
          .get('[class="productinfo text-center"]')
          .first()
          .find('p')
          .invoke('text')
          .as('brand')

        cy.wrap($items)
          .get('[href="/product_details/1"]')
          .first()
          .click()

        cy.wait('@getProductsDetailsPage')

        cy.get('[class="product-information"]').then(function ($detail) {
          expect($detail).to.contain.text(this.brand)
          expect($detail).to.contain.text("Category: Women")
          expect($detail).to.contain.text(this.price)
          expect($detail).to.contain.text("Availability: In Stock")
          expect($detail).to.contain.text("Condition: New")
          expect($detail).to.contain.text("Brand: Polo")
        })
      })

    });

    it.only('should be able to search a product', () => {
      cy.url().should('contain', '/')
      cy.title().should('be.equal', 'Automation Exercise')

      cy.openHeaderLink('Products')

      cy.url().should('contain', '/products')
      cy.title().should('be.equal', 'Automation Exercise - All Products')

      cy.APIAllProducts().then(response => {
        const { responseCode, products } = JSON.parse(response.body)

        // products.forEach(product => {
        // let searchWordForProduct = product.name.split(" ", 1)
        let searchWordForProduct = "Top"

        cy.get('[id="search_product"]')
          .should('be.visible')
          .clear()
          .type(`${searchWordForProduct}`)

        cy.get('[id="submit_search"]')
          .should('be.visible')
          .click()

        cy.get('h2:contains("Searched Products")')
          .should('be.visible')

        cy.get('[class="product-image-wrapper"]').then($items => {
          expect($items.length).to.be.greaterThan(0)
        })
        // })
      })
    });
  });
});