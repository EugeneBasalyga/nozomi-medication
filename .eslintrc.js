module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb',
    'airbnb/hooks',
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react', 'react-hooks'],
  rules: {
    'react/function-component-definition': [
      'error',
      {
        namedComponents: 'arrow-function',
      },
    ],
    'react/jsx-no-useless-fragment': 'off',
    'no-restricted-exports': ['off', { restrictedNamedExports: ['default'] }],
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'no-shadow': 'off',
    'no-use-before-define': 'off',
    'arrow-body-style': 'off',
    'prefer-arrow-callback': 'off',
    'import/prefer-default-export': 'off',
    'no-console': 'off',
    'no-empty-function': 'off',
    'react/jsx-props-no-spreading': ['off'],
    'jsx-a11y/no-static-element-interactions': 'off',
    'react/react-in-jsx-scope': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'import/no-extraneous-dependencies': [
      'warn',
      {
        devDependencies: true,
        optionalDependencies: true,
        peerDependencies: true,
      },
    ],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
      },
    ],
  },
};
