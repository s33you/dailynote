import { baseURL } from './.env-default.js'
import axios from 'axios'
import router from '@/router/index.js'
import { Message } from 'element-ui'
const tip = msg => {
  Message.error(msg)
}
const toLogin = () => {
  router.replace({
    path: '/login',
    query: {
      redirect: router.currentRoute.fullPath
    }
  })
}
const errorHandle = (status, other) => {
  // 状态码判断
  switch (status) {
    // 401: 未登录状态，跳转登录页
    case 401:
      toLogin()
      break
      // 403 token过期
      // 清除token并跳转登录页
    case 403:
      tip('登录过期，请重新登录')
      localStorage.removeItem('token')
      // store.commit('loginSuccess', null)
      setTimeout(() => {
        toLogin()
      }, 1000)
      break
      // 404请求不存在
    case 404:
      tip('请求的资源不存在')
      break
    case !window.navigator.onLine:
      tip('网络好像出了点问题')
      break
    default:
      console.log(other)
  }
}

var instance = axios.create({ timeout: 1000 * 12 })
instance.defaults.baseURL = baseURL
instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
instance.interceptors.request.use(
  config => {
    // // 每次发送请求之前判断vuex中是否存在token
    // // 如果存在，则统一在http请求的header都加上token，这样后台根据token判断你的登录情况
    // // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断
    // const token = store.state.token
    // token && (config.headers.Authorization = token)
    // return config
    return config
  },
  error => {
    return Promise.error(error)
  })
instance.interceptors.response.use(res => {
  return res.status === 200 ? Promise.resolve(res) : Promise.reject(res)
},
err => {
  const { response } = err
  if (response) {
    errorHandle(response.status, response.datamessage)
    return Promise.reject(response)
  } else {
    if (!window.navigator.onLine) {
      // store.commit('changeNetwork', false)
      errorHandle(!window.navigator.onLine)
    } else {
      return Promise.reject(err)
    }
  }
})
export default instance
