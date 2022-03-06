// 検索を実行
const search: typeof cy.search = (input: string) => {
  cy.findByRole('combobox').type(input).type('{enter}')
}
Cypress.Commands.add('search', search)
