/**
 * Login Page - End to End Test
 *
 * Scenarios:
 * - should display login page correctly
 * - should show alert when email is empty
 * - should show alert when password is empty
 * - should show alert when email or password is wrong
 * - should redirect to homepage when login is successful
 */

describe('Login Page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/login');
  });

  it('should display login page correctly', () => {
    cy.contains('h2', 'Login').should('be.visible');

    cy.get('input#email').should('be.visible');
    cy.get('input#password').should('be.visible');

    cy.get('button')
      .contains(/^Login$/)
      .should('be.visible');
  });

  it('should show alert when email is empty', () => {
    cy.get('button')
      .contains(/^Login$/)
      .click();

    cy.on('window:alert', (message) => {
      expect(message).to.exist;
    });
  });

  it('should show alert when password is empty', () => {
    cy.get('input#email').type('test@email.com');

    cy.get('button')
      .contains(/^Login$/)
      .click();

    cy.on('window:alert', (message) => {
      expect(message).to.exist;
    });
  });

  it('should show alert when email or password is wrong', () => {
    cy.get('input#email').type('wrong@email.com');
    cy.get('input#password').type('wrongpassword');

    cy.get('button')
      .contains(/^Login$/)
      .click();

    cy.on('window:alert', (message) => {
      expect(message).to.exist;
    });
  });

  it('should redirect to homepage when login is successful', () => {
    cy.visit('/login');

    cy.get('input[placeholder="Email"]').type('test@example.com');
    cy.get('input[placeholder="Password"]').type('password123');
    cy.get('button').contains('Login').click();

    cy.contains('Random Forum App').should('be.visible');

    cy.url().should('include', '/');
  });
});
