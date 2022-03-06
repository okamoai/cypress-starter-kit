/**
 * @type {import('@typescript-eslint/utils/dist/ts-eslint').CLIEngine.Options}
 */
module.exports = {
  env: {
    'cypress/globals': true,
    node: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2021,
  },
  plugins: ['cypress', '@typescript-eslint'],
  extends: ['airbnb-base', 'plugin:@typescript-eslint/recommended', 'plugin:cypress/recommended', 'prettier'],
  settings: {
    'import/extensions': ['.js', '.ts'],
    'import/resolver': {
      node: {
        extensions: ['.js', '.ts'],
      },
    },
  },
  rules: {
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        ts: 'never',
      },
    ],
  },
}
