import Vue from 'vue'
import Router from 'vue-router'

import store from './store'

import Home from './views/Home.vue'
import Game from './views/Game.vue'
import Signup from './views/Signup.vue'
import Login from './views/Login.vue'
import UserSettings from './views/UserSettings.vue'
import NotFound from './views/NotFound.vue'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/signup',
      name: 'signup',
      component: Signup,
      beforeEnter: (to, from, next) => {
        if (store.getters.user) {
          router.push('/')
        }
        else {
          next();
        }
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      beforeEnter: (to, from, next) => {
        if (store.getters.user) {
          router.push('/')
        }
        else {
          next();
        }
      }
    },
    {
      path: '/game',
      name: 'game',
      component: Game,
      beforeEnter: (to, from, next) => {
        if (!store.getters.user) {
          router.push('/login')
        }
        else {
          next();
        }
      }
    },
    {
      path: '/usersettings',
      name: 'usersettings',
      component: UserSettings,
      beforeEnter: (to, from, next) => {
        if (!store.getters.user) {
          router.push('/login')
        }
        else {
          next();
        }
      }
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    { 
      path: '*',
      name: '404',
      component: NotFound
    }
  ]
})

export default router;