module.exports = {
  extends: ['react-app', 'react-app/jest', 'plugin:sonarjs/recommended'],
  rules: {
    'sonarjs/prefer-immediate-return': 0,
  },
  overrides: [
    {
      files: ['**/*.ts?(x)'],
    },
  ],
};
