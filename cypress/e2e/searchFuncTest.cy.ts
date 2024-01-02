describe('Weather App', () => {
    it('Searches for a location', () => {
        cy.visit('http://localhost:3000') 
        cy.get('#searchInput').type('New York').should('have.value', 'New York');
        cy.get('#formSubmit').submit()
        cy.get('.weather-data').should('be.visible');
      });
 })