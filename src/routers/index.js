import Vue from 'vue'
import Router from 'vue-router'
import movieRouter from './movie'
import cinemaRouter from './cinema'
import profileRouter from './profile'
Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: movieRouter
    },
    movieRouter,
    cinemaRouter,
    profileRouter
  ]
})
