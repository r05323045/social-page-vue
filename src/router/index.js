import Vue from 'vue'
import Router from 'vue-router'
import Axios from 'Axios'

import Home from '../components/home/home'
import Favorites from '../components/favorites/favorites'
import Default from '../components/default/default'
import Search from '../components/search/search'

Vue.use(Router)
Vue.prototype.$axios = Axios
export default new Router({
  mode: 'hash',
  routes: [
    {
      path: '/',
      props: true,
      component: Default
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
    {
      path: '/search',
      name: 'Search',
      component: Search,
      props: true,
      meta: {
        keepAlive: true
      }
    },
  ],
  //after clicking
  linkActiveClass: 'active'
})