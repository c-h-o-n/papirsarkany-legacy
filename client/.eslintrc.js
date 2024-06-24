module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json',
  },
  plugins: ['react', '@typescript-eslint', 'prettier'],
  extends: [
    'airbnb',
    'airbnb-typescript',
    'airbnb/hooks',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  rules: {
    'no-console': 0,
    'import/prefer-default-export': 0,
    'react/react-in-jsx-scope': 0,
    'react/jsx-curly-brace-presence': 0,
    'react/require-default-props': [
      2,
      {
        functions: 'defaultArguments',
      },
    ],
    'react/jsx-props-no-spreading': 0,
    'react-hooks/exhaustive-deps': 1,
    '@typescript-eslint/no-shadow': 0,
    'prettier/prettier': 1,
  },
};
