import { faker } from '@faker-js/faker';

describe('Sign in', () => {
  it('Should not allow user to sign in with invalid email', () => {
    cy.visit('/?signin=true');

    cy.get('[data-cy="email-input"]').type('testemail.com');
    cy.get('[data-cy="password-input"]').type('password');
    cy.get('[data-cy="signin-button"]').should('be.disabled');
  });

  it('Should not allow user to sign in with invalid password', () => {
    cy.visit('/?signin=true');

    cy.get('[data-cy="email-input"]').type(faker.internet.email());
    cy.get('[data-cy="password-input"]').type('pwd');
    cy.get('[data-cy="signin-button"]').should('be.disabled');
  });

  it('Should sign in user', () => {
    cy.intercept('POST', '/auth/login/').as('signinRequest');
    cy.visit('/?signin=true');

    cy.get('[data-cy="email-input"]').type('jane@email.com');
    cy.get('[data-cy="password-input"]').type('password');
    cy.get('[data-cy="signin-button"]').click();
    cy.wait('@signinRequest').its('response.statusCode').should('eq', 200);
  });
});
