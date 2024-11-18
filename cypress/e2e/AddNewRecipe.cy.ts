describe('Add New Recipe', () => {
  it('should add a new recipe', () => {
    cy.intercept('GET', '/upload-file', {
      body: { fileKey: 'fileKey', uploadUrl: 'uploadUrl' },
      statusCode: 200,
    });
    cy.intercept('PUT', 'uploadUrl', { statusCode: 200 });
    cy.intercept('POST', '/recipes', { statusCode: 201 }).as('createRecipe');

    cy.visit('/new-recipe');
    cy.get('[data-cy=recipe-title]').type('My new recipe');
    cy.get('[data-cy=recipe-description]').type('My new recipe description');

    cy.get('[data-cy=recipe-category]').click();
    cy.get('[data-cy=category-item-0]').click();

    cy.get('[data-cy=recipe-preparation-time]').click();
    cy.get('[data-cy=recipe-preparation-time-item-0]').click();

    cy.fixture('test.png').as('image');
    cy.get('[data-cy=image-upload]').selectFile('@image', {
      action: 'drag-drop',
    });

    cy.get('[data-cy=next-button-1]').click();

    cy.get('[data-cy=ingredient-0]').type('Ingredient 1');
    cy.get('[data-cy=ingredient-1]').type('Ingredient 2');
    cy.get('[data-cy=ingredient-2]').type('Ingredient 3');

    cy.get('[data-cy=add-ingredient-button]').click();
    cy.get('[data-cy=ingredient-3]').type('Ingredient 4');

    cy.get('[data-cy=next-button-2]').click();

    cy.get('[data-cy=step-0]').type('Step 1');
    cy.get('[data-cy=step-1]').type('Step 2');
    cy.get('[data-cy=step-2]').type('Step 3');

    cy.get('[data-cy=add-step-button]').click();
    cy.get('[data-cy=step-3]').type('Step 4');

    cy.get('[data-cy=next-button-3]').click();

    cy.get('[data-cy=add-private-recipe]').click();

    cy.wait('@createRecipe').then((interception) => {
      expect(interception.response.statusCode).to.eq(201);
    });
  });
});
