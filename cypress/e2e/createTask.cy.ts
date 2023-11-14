describe('create task', () => {
    context("user journey", () => {
        beforeEach(() => {
          cy.visit('http://localhost:5173/login')
          cy.getByData('username-input').type("spiderBob")
          cy.getByData('password-input').type("password123")
          cy.getByData('login-submit-button').click()
          cy.visit('http://localhost:5173/tasks/create')
        })
        //happy
        it('creates a task which appears on the main task list', () => {
            cy.visit('http://localhost:5173/login')
        })
    
        //unhappy
        
      })
})