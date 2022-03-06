describe('Test1', () => {
  it('Case1', () => {
    cy.visit('/')
    cy.search('Test1 Case1')
    cy.includedInTitle('Test1 Case1')
  })

  it('Case2', () => {
    cy.visit('/')
    cy.search('Test1 Case2')
    cy.includedInTitle('Test1 Case2')
  })
})
