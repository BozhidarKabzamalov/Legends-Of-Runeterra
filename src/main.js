import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

import VueLazyload from 'vue-lazyload'

Vue.use(VueLazyload)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
