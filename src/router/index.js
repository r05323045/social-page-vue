import Vue from 'vue'
import Router from 'vue-router'
import Axios from 'Axios'

import Home from '../components/home/home'
import Favorites from '../components/favorites/favorites'

Vue.use(Router)
Vue.prototype.$axios = Axios
export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home',
      props: true,
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      props: true,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/favorites',
      name: 'Favorites',
      component: Favorites,
      props: true,
      meta: {
        keepAlive: true
      }
    },
  ],
  //after clicking
  linkActiveClass: 'active'
})
