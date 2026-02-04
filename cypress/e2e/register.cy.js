/**
 * Register Page E2E Test
 *
 * Scenarios:
 * - should display register page correctly
 * - should show alert when name is empty
 * - should show alert when email is empty
 * - should show alert when password is empty
 * - should redirect to login page when register is successful
 */

describe('Register Page', () => {
  beforeEach(() => {
    cy.visit('/register');
  });

  it('should display register page correctly', () => {
    cy.contains('Register').should('be.visible');

    cy.get('input[placeholder="Name"]').should('be.visible');
    cy.get('input[placeholder="Email"]').should('be.visible');
    cy.get('input[placeholder="Password"]').should('be.visible');

    cy.get('button')
      .contains(/^Register$/)
      .should('be.visible');

    cy.contains('Login di sini')
      .should('have.attr', 'href')
      .and('include', '/login');
  });

  it('should show alert when name is empty', () => {
    cy.get('button')
      .contains(/^Register$/)
      .click();

    cy.on('window:alert', (text) => {
      expect(text).to.contain('"name" is not allowed to be empty');
    });
  });

  it('should show alert when email is empty', () => {
    cy.get('input[placeholder="Name"]').type('Test User');

    cy.get('button')
      .contains(/^Register$/)
      .click();

    cy.on('window:alert', (text) => {
      expect(text).to.contain('"email" is not allowed to be empty');
    });
  });

  it('should show alert when password is empty', () => {
    cy.get('input[placeholder="Name"]').type('Test User');
    cy.get('input[placeholder="Email"]').type('testuser@example.com');

    cy.get('button')
      .contains(/^Register$/)
      .click();

    cy.on('window:alert', (text) => {
      expect(text).to.contain('"password" is not allowed to be empty');
    });
  });

  it('should redirect to login page when register is successful', () => {
    const uniqueEmail = `user_${Date.now()}${Math.random()}@example.com`;

    cy.intercept('POST', '**/register').as('register');

    cy.get('input[placeholder="Name"]').type('Test User');
    cy.get('input[placeholder="Email"]').type(uniqueEmail);
    cy.get('input[placeholder="Password"]').type('password123');

    cy.get('button')
      .contains(/^Register$/)
      .click();

    // Better waiting approach
    cy.wait('@register', { timeout: 10000 })
      .its('response.statusCode')
      .should('eq', 201);

    // Wait for navigation explicitly
    cy.url({ timeout: 10000 }).should('include', '/login');

    // Alternative: Check for login page content
    cy.contains('Login', { timeout: 10000 }).should('be.visible');
  });
});
