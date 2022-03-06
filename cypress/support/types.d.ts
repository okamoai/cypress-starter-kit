declare namespace Cypress {
  interface Chainable {
    // commands/utils
    dataCy(value: string): Chainable<JQuery<HTMLElement>>

    // commands/actions
    search(input: string): void

    // commands/assertions
    includedInTitle(text: string): void
  }
}
