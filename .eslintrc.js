module.exports = {
  parserOptions: {
    parser: require.resolve('@typescript-eslint/parser'),
  },

  extends: [
    // https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb-base/rules
    'airbnb-base',

    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/src/configs/recommended.json
    'plugin:@typescript-eslint/recommended',

    'prettier',
    'prettier/@typescript-eslint',
  ],

  plugins: ['@typescript-eslint', 'import', 'prettier'],

  rules: {
    'prettier/prettier': ['error', { singleQuote: true, trailingComma: 'all' }],

    // Recommend not to leave any console.log in your code
    // Use console.error, console.warn and console.info instead
    'no-console': [
      'error',
      {
        allow: ['warn', 'error', 'info'],
      },
    ],

    // ts でうまく動作しないので off にする
    // https://qiita.com/euxn23/items/e2b9226ab1e02a9b1f20
    'import/no-unresolved': 'off',

    // export するものが 1 つの場合の default export を必須にしない
    'import/prefer-default-export': 'off',

    // 返り値の型を必須にしない
    '@typescript-eslint/explicit-function-return-type': 'off',
  },
};
