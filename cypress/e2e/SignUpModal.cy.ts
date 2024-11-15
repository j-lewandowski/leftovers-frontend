import { faker } from '@faker-js/faker';

describe('Sign up', () => {
  it('Should not allow user to sign up with invalid email', () => {
    cy.visit('/?signup=true');

    cy.get('[data-cy="email-input"]').type('testemail.com');
    cy.get('[data-cy="password-input"]').type('password');
    cy.get('[data-cy="checkbox"]').click();
    cy.get('[data-cy="create-account-button"]').should('be.disabled');
  });

  it('Should not allow user to sign up if the password is to short', () => {
    cy.visit('/?signup=true');

    cy.get('[data-cy="email-input"]').type(faker.internet.email());
    cy.get('[data-cy="password-input"]').type('pwd');
    cy.get('[data-cy="checkbox"]').click();
    cy.get('[data-cy="create-account-button"]').should('be.disabled');
  });

  it('Should sign up user', () => {
    cy.intercept('POST', '/auth/register').as('signupRequest');
    cy.visit('/?signup=true');

    cy.get(`[data-cy="email-input"]`).type(faker.internet.email());
    cy.get('[data-cy="password-input"]').type('password');
    cy.get('[data-cy="checkbox"]').click();
    cy.get('[data-cy="create-account-button"]').click();
    cy.wait('@signupRequest').its('response.statusCode').should('eq', 201);
  });
});
