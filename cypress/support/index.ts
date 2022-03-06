// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

import '@cypress/skip-test/support'
import addContext from 'mochawesome/addContext'
import './commands'

Cypress.on('test:after:run', (test, runnable) => {
  // テストに失敗した場合、レポートにスクリーンショットを添付する
  if (test.state === 'failed' && runnable.parent) {
    addContext(
      { test } as Mocha.Context,
      `./screenshots/${Cypress.spec.name}/${runnable.parent.title} -- ${test.title} (failed).png`,
    )
  }
  // テストに失敗した場合、レポートに動画を添付する
  if (Cypress.config('video') && test.state === 'failed') {
    addContext({ test } as Mocha.Context, `./videos/${Cypress.spec.name}.mp4`)
  }
})
