/** @type {import("prettier").Config & import('@trivago/prettier-plugin-sort-imports').PluginConfig} */
export default {
  trailingComma: 'all',
  tabWidth: 2,
  semi: true,
  singleQuote: true,

  plugins: ['@trivago/prettier-plugin-sort-imports'],

  importOrderParserPlugins: ['decorators-legacy', 'typescript'],
  importOrder: ['^lit', '^@?nanostores', '^@states/', '^@components/', '^[./]'],
  importOrderSeparation: true,
};
