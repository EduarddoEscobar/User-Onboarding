describe('Form Tests', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/');
    })

    const nameInput = cy.get('input[name=name]');

    it('Checks if the name inputted is the name provided', () => {
        fnameInput().type('Eduardo');
        lNameInput().type('Escobar');
        cy.contains('Eduardo').should('exist');
    })
})