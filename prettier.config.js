/** @type {import("prettier").Config & import("@trivago/prettier-plugin-sort-imports").PluginConfig} */
module.exports = {
  singleQuote: true,
  trailingComma: 'es5',
  requirePragma: false,
  arrowParens: 'always',
  plugins: [
    '@trivago/prettier-plugin-sort-imports',
    'prettier-plugin-tailwindcss',
  ],
  // @trivago/prettier-plugin-sort-importsの設定
  importOrder: ['<THIRD_PARTY_MODULES>', '^~', '^[./]'],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
};
