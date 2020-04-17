module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    '@vue/standard',
    // "plugin:json/recommended"
  ],
  parserOptions: {
    parser: require.resolve('babel-eslint'),
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  rules: {    
    'no-tabs':[0],
    'prefer-const':[0],
    quotes: [0, 'single']
  }   
}
