// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************
import { rm } from 'fs/promises'

const pluginConfig: Cypress.PluginConfig = (on) => {
  // eslint-disable-next-line consistent-return
  on('after:spec', (_, results) => {
    // テストが成功した場合、レポートから動画を削除してデータ容量を削減する
    if (results && results.stats.failures === 0 && results.video) {
      return rm(`${results.video}`, { force: true })
    }
  })
}
export default pluginConfig
