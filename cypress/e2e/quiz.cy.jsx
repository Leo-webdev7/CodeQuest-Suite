/// <reference types="cypress" />

describe('Tech Quiz E2E Test', () => {
  beforeEach(() => {
    // Load the quiz page
    cy.visit('/quiz');
  });

  it('displays the first question and its answers', () => {
    cy.fixture('questions.json').then((questions) => {
      const firstQuestion = questions[0];

      // Check that the first question is displayed
      cy.contains(firstQuestion.question).should('be.visible');

      // Verify all answer options are displayed
      firstQuestion.answers.forEach((answer) => {
        cy.contains(answer.text).should('be.visible');
      });
    });
  });

  it('allows selecting an answer and proceeds to the next question', () => {
    cy.fixture('questions.json').then((questions) => {
      // Loop through all questions to simulate answering
      questions.forEach((question, index) => {
        // Verify question text
        cy.contains(question.question).should('be.visible');

        // Select the first answer (or any answer)
        cy.contains(question.answers[0].text).click();

        if (index < questions.length - 1) {
          // Click the Next button to proceed to the next question
          cy.contains('Next').click();
        } else {
          // Verify the quiz completion message on the last question
          cy.contains('Quiz Completed').should('be.visible');
        }
      });
    });
  });

  it('validates the correct answer for each question', () => {
    cy.fixture('questions.json').then((questions) => {
      questions.forEach((question, index) => {
        // Verify question text
        cy.contains(question.question).should('be.visible');

        // Select the correct answer
        const correctAnswer = question.answers.find((ans) => ans.isCorrect);
        cy.contains(correctAnswer.text).click();

        if (index < questions.length - 1) {
          // Click the Next button to proceed to the next question
          cy.contains('Next').click();
        } else {
          // Verify the quiz completion message
          cy.contains('Quiz Completed').should('be.visible');
        }
      });
    });
  });
});
