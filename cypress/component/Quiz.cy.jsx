import Quiz from '../../client/src/components/Quiz';

describe('Quiz.cy.jsx', () => {
  beforeEach(() => {
    // Intercept the API call for quiz questions
    cy.intercept('GET', '/api/questions/random', { fixture: 'questions.json' }).as('quizQuestions');
  });

  it('renders the Start Quiz button', () => {
    // Mount the Quiz component
    cy.mount(<Quiz />);

    // Verify that the Start Quiz button exists and has the correct text
    cy.get('button')
      .should('exist')
      .and('have.text', 'Start Quiz');
  });

  it('renders the Start Quiz button, fetches questions, and displays the first question', () => {
    cy.mount(<Quiz />);

    // Click the Start Quiz button and wait for the question API response
    cy.get('button')
      .should('exist')
      .and('have.text', 'Start Quiz')
      .click();
    cy.wait('@quizQuestions');

    // Verify the question card is displayed
    cy.get('.card.p-4')
      .should('exist')
      .within(() => {
        // Ensure the question is present
        cy.get('h2')
          .should('exist')
          .and('include.text', '?');

        // Ensure the answer options are rendered
        cy.get('.mt-3')
          .should('exist')
          .find('.d-flex.align-items-center.mb-2')
          .should('have.length', 4)
          .within(() => {
            // Check that each answer has text
            cy.get('.alert.alert-secondary.mb-0.ms-2.flex-grow-1')
              .should('exist')
              .each((answer) => {
                expect(answer.textContent).to.not.be.empty;
              });
          });
      });
  });

  it('selects an answer and proceeds to the next question', () => {
    cy.mount(<Quiz />);

    // Start the quiz and wait for questions
    cy.get('button')
      .should('exist')
      .and('have.text', 'Start Quiz')
      .click();
    cy.wait('@quizQuestions');

    // Select the first answer
    cy.get('.card.p-4')
      .should('exist')
      .find('.d-flex.align-items-center.mb-2')
      .first()
      .find('.alert.alert-secondary.mb-0.ms-2.flex-grow-1')
      .click();

    // Verify that clicking triggers the next question or feedback
    cy.get('.card.p-4 h2')
      .should('exist')
      .and('include.text', '?'); // Adjust based on application behavior
  });

  it('displays an error message if the API call fails', () => {
    // Simulate a network failure for the quiz API
    cy.intercept('GET', '/api/questions/random', { statusCode: 500 }).as('quizQuestionsError');
    cy.mount(<Quiz />);

    // Click the Start Quiz button and wait for the error response
    cy.get('button')
      .should('exist')
      .and('have.text', 'Start Quiz')
      .click();
    cy.wait('@quizQuestionsError');

    // Verify that an error message is displayed
    cy.get('.alert.alert-danger')
      .should('exist')
      .and('contain.text', 'Error loading questions'); // Adjust the message based on actual implementation
  });
});
