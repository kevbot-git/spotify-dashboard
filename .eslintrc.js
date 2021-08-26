module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:vue/vue3-recommended',
    'plugin:vuejs-accessibility/recommended',
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'vue',
    'vuejs-accessibility',
    'import',
  ],
  rules: {
    'no-param-reassign': 'off',
  },
  overrides: [
    {
      files: ['./vite.config.js'],
      rules: {
        'import/no-extraneous-dependencies': 'off',
      },
    },
    {
      files: ['**/*.html'],
      rules: {
        'vue/comment-directive': 'off',
      },
    },
  ],
};
