import Quiz from '../../client/src/components/Quiz'

describe('Quiz.cy.tsx', () => {
  it('should render the Start Quiz Button', () => {
    cy.mount(<Quiz />)
    
    // Check that the start quiz button exists and has correct text
    cy.get('button')
      .should('exist')
      .and('have.text', 'Start Quiz')
  })

  it('should render the Start Quiz Button and then render the sample question', () => {
    cy.intercept('GET', '/api/questions/random', { fixture: 'questions.json' }).as('quizQuestions')
    cy.mount(<Quiz />)

    // Start the quiz by clicking the button
    cy.get('button')
      .should('exist')
      .and('have.text', 'Start Quiz')
      .click()

    // Wait for the question to be loaded after the button click
    cy.wait('@quizQuestions')

    // Check if the quiz card is present
    cy.get('.card.p-4')
      .should('exist')
      .and('be.visible')
      
    // Check if the question is rendered correctly
    cy.get('.card.p-4')
      .find('h2')
      .should('exist')
      .and('include.text', '?') // Ensure the question mark appears (or a sample question text)

    // Check if the answer options exist and are rendered correctly
    cy.get('.card.p-4')
      .find('.mt-3')
      .should('exist')
      .and('be.visible')
      .within(() => {
        cy.get('.d-flex.align-items-center.mb-2')
          .should('have.length', 4)
          .and('not.be.empty')
          
        cy.get('.alert.alert-secondary.mb-0.ms-2.flex-grow-1')
          .should('have.length', 4)
          .and('not.be.empty')
      })
  })
})
