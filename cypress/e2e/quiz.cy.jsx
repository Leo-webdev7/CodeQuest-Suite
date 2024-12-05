
    describe('E2E Quiz Test', () => {
  // Helper function to answer a question
  const answerQuestion = (answerIndex) => {
    cy.get('.mt-3 .btn.btn-primary')
      .eq(answerIndex)
      .click();
  };

  it('user can access the Start Quiz page', () => {
    cy.visit('http://localhost:3001/');
    cy.get('button')
      .should('exist')
      .and('have.text', 'Start Quiz');
  });

  it('user can complete the quiz and see the final score', () => {
    cy.intercept('GET', '/api/questions/random', { fixture: 'questions.json' }).as('quizQuestions');
    cy.visit('http://localhost:3001/');
    
    // Start the quiz
    cy.get('button')
      .should('exist')
      .and('have.text', 'Start Quiz')
      .click();
    cy.wait('@quizQuestions');

    // Load questions from the fixture
    cy.fixture('questions.json').then((questions) => {
      questions.forEach((_, index) => {
        // Answer the question (selecting the first answer for demonstration)
        answerQuestion(0);

        if (index < questions.length - 1) {
          // Ensure the next question appears
          cy.get('.card.p-4')
            .find('h2')
            .should('exist')
            .and('include.text', '?');
        }
      });

      // Verify the quiz completion screen
      cy.get('.card.p-4.text-center').should('exist').within(() => {
        cy.get('h2')
          .should('exist')
          .and('include.text', 'Quiz Completed');
        cy.get('.alert.alert-success')
          .should('exist')
          .and('include.text', 'Your score:');
        cy.get('button')
          .should('exist')
          .and('have.text', 'Take New Quiz')
          .click();
      });

      // Ensure quiz resets to the first question
      cy.get('.card.p-4')
        .find('h2')
        .should('exist')
        .and('include.text', '?');
      cy.get('.d-flex.align-items-center.mb-2')
        .should('exist')
        .and('have.length', 4);
    });
  });
});
