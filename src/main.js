import Vue from 'vue'
import App from './App.vue'
import router from './routers'
import store from './stores'
import axios from 'axios'
import { request } from './network/request'
import Scroller from 'components/Scroller'
import Loading from 'components/Loading'
import '../node_modules/swiper/css/swiper.min.css';

import { Uploader, Image, Panel, Pagination, Tab, Tabs, ActionSheet, Field, Cell, CellGroup, Button, Icon, Sidebar, SidebarItem, NavBar, Toast, AddressList } from 'vant';
Vue.use(Uploader)
  .use(Image)
  .use(Panel)
  .use(Tab)
  .use(Tabs)
  .use(ActionSheet)
  .use(Cell)
  .use(CellGroup)
  .use(Field)
  .use(Button)
  .use(Icon)
  .use(Sidebar)
  .use(SidebarItem)
  .use(NavBar)
  .use(Toast)
  .use(AddressList)
  .use(Pagination);
Toast.setDefaultOptions({
  duration: 2000
})
Vue.prototype.$toast = Toast;
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
// Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
