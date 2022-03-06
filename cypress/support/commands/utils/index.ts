// カスタムデータ属性の data-cy の要素を取得
const dataCy: typeof cy.dataCy = (name: string) => cy.get(`[data-cy="${name}"]`)
Cypress.Commands.add('dataCy', dataCy)
