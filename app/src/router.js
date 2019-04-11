import Vue from 'vue'
import Router from 'vue-router'

import store from './store'

import Home from './views/Home.vue'
import Game from './views/Game.vue'
import Signup from './views/Signup.vue'
import Login from './views/Login.vue'
import UserSettings from './views/UserSettings.vue'
import Username from './views/Username.vue'
import CardSearch from './views/CardSearch.vue'
import NotFound from './views/NotFound.vue'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      beforeEnter: (to, from, next) => {
        const user = JSON.parse(localStorage.getItem('user'));
        console.log('entering', user);
        
        if (store.getters.user) {
          console.log('found the state', store.getters.user);
          
          if (store.getters.user.username) {
            next();
          }
          else {
            router.push('/username')
          }
        }
        if (user) {
          if (user.username) {
            next();
          }
          else {
            router.push('/username')
          }
        }
      }
    },
    {
      path: '/signup',
      name: 'signup',
      component: Signup,
      beforeEnter: (to, from, next) => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (store.getters.user || user) {
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
        const user = JSON.parse(localStorage.getItem('user'));
        console.log(user);
        console.log(store.getters.user);
        
        
        if (store.getters.user || user) {
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
        console.log('before game', store.getters);
        
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
      path: '/username',
      name: 'username',
      component: Username,
      beforeEnter: (to, from, next) => {
        const user = JSON.parse(localStorage.getItem('user'));

        if (!store.getters.user) {
          if (!user) {
            router.push('/login')
          }
          else {
            next();
          }
        }
        else if(store.getters.user.username) {
          router.push('/')
        }
        else {
          next();
        }
      }
    },
    {
      path: '/cardsearch',
      name: 'cardsearch',
      component: CardSearch
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

router.beforeEach((to, from, next) => {
  console.log('before all');
  const user = JSON.parse(localStorage.getItem('user'));
  if (store.getters.user && to.name !== 'username') {
    if (!store.getters.user.username) {
      router.push('/username')
    }
    else {
      next();
    }
  }
  else {
    next();
  }
});

export default router;