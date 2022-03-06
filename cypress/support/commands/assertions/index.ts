// title に指定の文字が含まれているか
const includedInTitle: typeof cy.includedInTitle = (text: string) => {
  cy.title().should('have.string', text)
}
Cypress.Commands.add('includedInTitle', includedInTitle)
