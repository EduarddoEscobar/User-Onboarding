describe('Form Tests', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/');
    })

    const nameInput = () => cy.get('input[name=name]');
    const emailInput = () => cy.get('input[name=email]');
    const passwordInput = () => cy.get('input[name=password]');
    const tosBox = () => cy.get('input[name=tos]');
    const submitBtn = () => cy.get('button[id="submitBtn"]');

    it('Checks if the name inputted is the name provided', () => {
        nameInput().type('firstName lastName');
        nameInput().should('have.value', 'firstName lastName');
    })

    it('Checks if user can click the Terms of Service box', () => {
        tosBox().click();
        tosBox().should('be.checked');
    })

    it('Checks if the user can submit data', () => {
        nameInput().type('Casey Harding');
        emailInput().type('defnotcasey@gmail.com');
        passwordInput().type('betterteacherthangabe123');
        tosBox().click();
        submitBtn().click();
        cy.contains('Casey Harding').should('exist');
        cy.contains('defnotcasey@gmail.com').should('exist');
        cy.contains('betterteacherthangabe123').should('exist');
    })

    it('Checks for the form validation errors', () => {
        nameInput().type('a{backspace}');
        emailInput().type('m{backspace}');
        passwordInput().type('m{backspace}');
        tosBox().click().click();
        cy.contains('You forgot to put in your name!').should('exist');
        cy.contains('Enter the email now you chump.').should('exist');
        cy.contains('You forgot to enter a password!').should('exist');
        cy.contains('You have no choice. Accept our Terms of Service!').should('exist');
    })
})