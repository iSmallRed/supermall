import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store/store'
import permission from './directive/permission'

import FastClick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'

import ViewUI from 'view-design'
import 'view-design/dist/styles/iview.css'

import toast from 'components/common/toast'

Vue.config.productionTip = false

Vue.prototype.$bus = new Vue()

permission.install(Vue)

Vue.use(ViewUI)

Vue.use(toast)

//解决移动端300ms的问题
FastClick.attach(document.body)

// 使用懒加载插件
Vue.use(VueLazyLoad, {
  loading: require('./assets/img/common/placeholder.png')
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
