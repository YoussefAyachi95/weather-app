describe('Weather App', () => {
  it('loads weather data on page load', () => {
    cy.visit('http://localhost:3000') 
    cy.wait(5000);
    cy.get('h2').contains('Weather App');
    cy.get('.weather-data').should('be.visible')
  })
})