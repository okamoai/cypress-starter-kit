describe('Test2', () => {
  it('Case1', () => {
    cy.visit('/')
    cy.search('Test2 Case1')
    cy.includedInTitle('Test2 Case1')
  })

  it('Case2', () => {
    cy.visit('/')
    cy.includedInTitle('Test2 Case3')
  })
})
