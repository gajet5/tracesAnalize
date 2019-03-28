module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    "semi": [ 2, "always" ],
    "indent": "off",
    "vue/script-indent": ["error", 2, {
      "baseIndent": 1,
      "switchCase": 1
    }],
    "vue/no-unused-components": 0,
    "space-before-function-paren": ["error", {
      "anonymous": "never",
      "named": "never",
      "asyncArrow": "always"
    }],
    "no-new": 0,
    "no-trailing-spaces": ["error", {
      "skipBlankLines": true
    }]
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
};
