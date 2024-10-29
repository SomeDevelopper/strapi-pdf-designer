describe('Testing Strapi plugin', () => {
  beforeEach(() => {
    const host = Cypress.env('host')
    const email = Cypress.env('email')
    const password = Cypress.env('password')

    cy.visit(`${host}/admin`)

     // Attendre que la page soit chargée
     cy.contains('Welcome to Strapi!', { timeout: 10000 }).should('be.visible')

     // Remplissage du formulaire de connexion
     cy.get('input[name="email"]').should('be.visible').type(email)
     cy.get('input[name="password"]').should('be.visible').type(password)
     cy.get('button[type="submit"]').click()
 
     // Vérification que la connexion est réussie
     cy.contains('Content Manager', { timeout: 10000 }).should('be.visible')
   })


  it('Navigate through PDF Designer plugin', () => {
    cy.contains('PDF designer', { timeout: 10000 }).should('be.visible').click()
    
    // Vérification de l'URL
    cy.url().should('include', '/plugins/pdf-designer-5')
    
    // Test de création d'un nouveau template
    cy.contains('New template').should('be.visible').click()
    cy.url().should('include', { timeout: 50000 }, '/plugins/pdf-designer-5/design/new')
    
    // Test du retour en arrière
    cy.contains('Go back', { timeout: 10000 }).should('be.visible').click()
    
    // Test de l'édition
    cy.contains('Edit').should('be.visible').click()
    cy.url().should('include', '/plugins/pdf-designer-5/design/')
  })
})