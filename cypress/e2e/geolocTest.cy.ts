describe('Weather App', () => {
    it('Checks for user geolocation', () => {
        cy.visit('http://localhost:3000') 
        cy.window().then((win) => {
            cy.stub(win.navigator.geolocation, 'getCurrentPosition').callsFake((callback) => {
              return callback({
                coords: {
                  latitude: 40.7128,
                  longitude: -74.0060, 
                },
              });
            });
        });
        cy.get('#geolocationButton').click();
      });
 })