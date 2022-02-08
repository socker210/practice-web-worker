module.exports = {
  env: {
    node: true,
    browser: true,
  },
  extends: ['eslint:recommended', 'plugin:prettier/recommended'],
  overrides: [
    {
      files: ['*{.ts,.tsx}'],
      extends: ['plugin:@typescript-eslint/recommended'],
    },
    {
      files: ['*.tsx'],
      extends: ['plugin:react/recommended', 'plugin:react/jsx-runtime'],
    },
  ],
}
