const api = {}

const files = require.context('./methods', true, /\.js$/)
files.keys().forEach(key => {
  api[key.replace(/(\.\/|\.js)/g, '')] = files(key).default
})
export default api
