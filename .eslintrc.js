/*
 * @Author: zemin zheng
 * @Date: 2021-11-06 17:08:35
 * @LastEditTime: 2022-12-18 15:45:12
 * @LastEditors: zemin zheng
 * @Description: 头部注释
 * @FilePath: \vueAndTsAndKoa2\.eslintrc.js
 */
module.exports = {
  root: true,
  env: {
    node: true,
  },
  'extends': [
    'plugin:vue/recommended',
    '@vue/standard',
    '@vue/typescript/recommended',
    'eslint:recommended'  // 也是新加的
  ],
  parserOptions: {
    ecmaVersion: 2020
  },
  rules: {
    '@typescript-eslint/no-var-requires': 0,
    '@typescript-eslint/interface-name-prefix': ['error', { "prefixWithI": "always" }],
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/member-delimiter-style': ['error',
      {
        'multiline': {
          'delimiter': 'none'
        },
        'singleline': {
          'delimiter': 'comma'
        }
      }],
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'space-before-function-paren': ["error", {
      "anonymous": "never",
      "named": "never",     // 函数后面不加空格
      "asyncArrow": "always"  // 是用于异步箭头函数表达式（例如async () => {}）  前后加空格
    }],
    'vue/array-bracket-spacing': 'error',
    'vue/arrow-spacing': 'error',
    'vue/block-spacing': 'error',
    'vue/brace-style': 'error',
    'vue/camelcase': 'error',
    'vue/comma-dangle': 'error',
    'vue/component-name-in-template-casing': 'error',
    'vue/eqeqeq': 'error',
    'vue/key-spacing': 'error',
    'vue/match-component-file-name': 'error',
    'vue/object-curly-spacing': 'error',
    'semi': ["error", "always"],
    'quotes': [1, "double"],
    'linebreak-style': [0, 'error', 'windows'],
    "indent": ["off", 4],  // 空格4位
    "camelcase": [1, {"properties": "never"}]  // 使用驼峰命名法
  },
  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)'
      ],
      env: {
        jest: true
      }
    }
  ],
  // 在vue.config.js中定义了全局变量、插件，需要在这写入
  globals:{
    urls: true
  }
}
