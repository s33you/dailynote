import Vue from 'vue'
import { Card } from 'element-ui'
import 'element-ui/lib/theme-chalk/base.css'
import 'element-ui/lib/theme-chalk/index.css'
import ZoomInCenter from 'element-ui/lib/transitions/collapse-transition'
var requireComponent = require.context(".", true, /(app-[a-z]\w+|base-[a-z]\w+)\.(vue|js)$/)
requireComponent.keys().forEach(function (fileName) {
  var baseComponentConfig = requireComponent(fileName)
  baseComponentConfig = baseComponentConfig.default || baseComponentConfig
  var baseComponentName = baseComponentConfig.name || (
    fileName
      .replace(/^.+\//, '')
      .replace(/\.\w+$/, '')
  )
  console.log(baseComponentName)
  Vue.component(baseComponentName, baseComponentConfig)
})
Vue.use(Card)
Vue.component(ZoomInCenter.name, ZoomInCenter)
