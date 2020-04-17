import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@assets/styles/index.scss'
import '@assets/fonts/index.scss'
import '@assets/icons'
import api from '@/api'
import '@components/index.js'
// import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
// Vue.use(ElementUI)
Vue.config.productionTip = false
Vue.prototype.$api = api
function resetRem () {
  document.documentElement.style.fontSize =
      document.documentElement.clientWidth / 20 + "px"
}
window.onload = function () {
  resetRem()
  window.onresize = resetRem
  document.onresize = resetRem()
}
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
