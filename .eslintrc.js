module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: ['@nuxtjs', 'plugin:nuxt/recommended', 'prettier'],
  rules: {
    indent: 'off',
    curly: 'off',
    'vue/multiline-html-element-content-newline': 'off',
    'vue/singleline-html-element-content-newline': 'off',
    'vue/html-closing-bracket-newline': 'off',
    'vue/prop-name-casing': 'off',
    'vue/attribute-hyphenation': 'off',
    'vue/require-default-prop': 'error',
    'vue/no-v-html': 'off',
    'space-before-function-paren': 'off',
    'arrow-parens': 'off',
    'no-trailing-spaces': 'off',
    'padded-blocks': 'off',
    'object-curly-spacing': 'off',
    'no-multiple-empty-lines': 'off',
    'eol-last': 'off',
    'no-new': 'off'
  }
}
