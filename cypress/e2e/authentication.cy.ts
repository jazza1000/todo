describe('authentication', () => {
  context("user journey", () => {
    beforeEach(() => {
      cy.visit('http://localhost:5173/login')
    })
    //happy
    it('lets user log in with correct username and password and log out again', () => {
      cy.getByData('logged-in-user').should("not.exist")
      cy.getByData('username-input').type("spiderBob")
      cy.getByData('password-input').type("password123")
      cy.getByData('login-submit-button').click()
      cy.location('pathname').should("equal", "/")
      cy.getByData('logged-in-user').contains("Hello, spiderBob!")
      cy.getByData('logout-button').click()
      cy.location('pathname').should("equal", "/login")
      cy.getByData('logged-in-user').should("not.exist")
    })

    //unhappy
    it('displays an error message when username blank', () => {
      cy.getByData('password-input').type("password123")
      cy.getByData('login-submit-button').click()
      cy.getByData('login-error').contains("Please enter a username")
    })
    it('displays an error message when password blank', () => {
      cy.getByData('username-input').type("spiderBob")
      cy.getByData('login-submit-button').click()
      cy.getByData('login-error').contains("Please enter a password")
    })
    it('displays an error message when username/password combo not recognised', () => {
      cy.getByData('username-input').type("not in db")
      cy.getByData('password-input').type("wrong password")
      cy.getByData('login-submit-button').click()
      cy.getByData('login-error').contains("Username or password is incorrect")
    })
  })

  context("navigation guards", () => {
    it('allow the user to visit the login page when not logged in', () => {
      cy.visit('http://localhost:5173/login')
      cy.location('pathname').should("equal", "/login")
    })
    it('prevent the user from visiting the home page when not logged in', () => {
      cy.visit('http://localhost:5173/')
      cy.location('pathname').should("equal", "/login")
    })
  })

})