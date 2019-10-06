import Vue from 'vue'
import App from './App.vue'
import router from './routers'
import store from './stores'
import axios from 'axios'
import { request } from './network/request'

Vue.prototype.request = request;
Vue.prototype.axios = axios;
Vue.filter('setWH', (url, arg) => {
  return url.replace(/w\.h/, arg);
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
