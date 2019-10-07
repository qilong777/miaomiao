import Vue from 'vue'
import App from './App.vue'
import router from './routers'
import store from './stores'
import axios from 'axios'
import { request } from './network/request'
import Scroller from 'components/Scroller'
import Loading from 'components/Loading'
import '../node_modules/swiper/css/swiper.min.css';
Vue.prototype.request = request;
Vue.prototype.axios = axios;
//全局过滤器，修改src路径
Vue.filter('setWH', (url, arg) => {
  if (url) {
    return url.replace(/w\.h/, arg);
  }
})
Vue.component('Scroller', Scroller);
Vue.component('Loading', Loading);
Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
