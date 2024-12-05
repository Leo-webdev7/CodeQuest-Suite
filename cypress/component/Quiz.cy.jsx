/* import Quiz from '../../client/src/components/Quiz';

describe('Quiz.cy.tsx', () => {
  const startButtonSelector = 'button';
  const questionCardSelector = '.card.p-4';
  const questionTextSelector = `${questionCardSelector} h2`;
  const answersContainerSelector = `${questionCardSelector} .mt-3`;
  const answerOptionSelector = '.d-flex.align-items-center.mb-2 .alert.alert-secondary';

  it('renders the Start Quiz button', () => {
    cy.mount(<Quiz />);
    cy.get(startButtonSelector)
      .should('exist')
      .and('have.text', 'Start Quiz');
  });

  it('displays a question after clicking the Start Quiz button', () => {
    // Mock API call with fixture
    cy.intercept('GET', '/api/questions/random', { fixture: 'questions.json' }).as('getQuizQuestions');

    cy.mount(<Quiz />);

    // Start the quiz
    cy.get(startButtonSelector)
      .should('exist')
      .and('have.text', 'Start Quiz')
      .click();

    // Wait for the questions API to respond
    cy.wait('@getQuizQuestions');

    // Validate that the question card is displayed
    cy.get(questionCardSelector)
      .should('exist')
      .within(() => {
        // Check the question text
        cy.get('h2').should('exist').and('include.text', '?');

        // Check the answers section
        cy.get(answersContainerSelector)
          .should('exist')
          .find(answerOptionSelector)
          .should('have.length', 4)
          .and('not.be.empty');
      });
  });
});
 */

import Quiz from '../../client/src/components/Quiz';

describe('Quiz.cy.jsx', () => {
  it('renders the Start Quiz button', () => {
    cy.mount(<Quiz />);
    cy.get('button').should('exist').and('have.text', 'Start Quiz');
  });

  it('displays a question after clicking the Start Quiz button', () => {
    cy.intercept('GET', '/api/questions/random', { fixture: 'questions.json' }).as('quizQuestions');
    cy.mount(<Quiz />);
    cy.get('button').click();
    cy.wait('@quizQuestions');
    cy.get('.card.p-4 h2').should('contain.text', '?');
  });
});