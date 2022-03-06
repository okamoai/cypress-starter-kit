describe('Test3', () => {
  it('Case1', () => {
    cy.visit('/')
    cy.search('Test3 Case1')
    cy.includedInTitle('Test3 Case1')
  })
})
