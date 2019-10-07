import Vue from 'vue'
import Vuex from 'vuex'
import city from './city'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // title: "喵喵电影"
  },
  mutations: {
    // changeTitle(state, title) {
    //   state.title = title;
    // }
  },
  actions: {},
  getters: {},
  modules: {
    city
  }
})
