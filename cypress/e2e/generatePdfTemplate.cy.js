const { serverUrl, userTest: { email, password } } = Cypress.env()

console.log(serverUrl)

describe('Testing Strapi plugin', () => {
  it('Loggin to Strapi Server and generate PDF', () => {
    cy.visit(serverUrl)
    cy.get('form', {timeout: 10000}).should('be.visible')
    cy.get('input[name="email"]').type(email).should('have.value', email)
    cy.get('input[name="password"]').type(password).should('have.value', password)
    cy.get('button[type="submit"]').click()
    cy.contains('PDF designer', {timeout: 10000}).click()
    cy.url().should('include', '/plugins/pdf-designer')
    cy.contains('New template').click()
    cy.url().should('include', '/plugins/pdf-designer/design/new')
    cy.contains('Go back', {timeout: 10000}).click()
    cy.contains('Edit').click()
    cy.url().should('include', '/plugins/pdf-designer/design/4')
  })
})