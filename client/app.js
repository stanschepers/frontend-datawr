import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import NProgress from 'vue-nprogress'
import { sync } from 'vuex-router-sync'
import App from './App.vue'
import router from './router'
import store from './store'
import * as filters from './filters'
import { TOGGLE_SIDEBAR } from 'vuex-store/mutation-types'

router.beforeEach((to, from, next) => {
  if(!!!localStorage.getItem('token') && to.name !== 'Login'  && to.name !== 'Home'){
    next('/login')
  } else {
    next()
  }
})

Vue.router = router
Vue.use(VueAxios, axios)
Vue.axios.defaults.baseURL = 'http://0.0.0.0:8000/';
Vue.axios.defaults.headers.authorization = 'Token ' + localStorage.token
// Vue.use(VueAuth, {
//   auth: {
//     request: function (req, token) {
//       this.options.http._setHeaders.call(this, req, {Authorization: 'Token ' + token})
//     },
//     response: function (res) {
//       // Get Token from response body
//       return res.data
//     }
//   },
//   http: require('@websanova/vue-auth/drivers/http/axios.1.x.js'),
//   router: require('@websanova/vue-auth/drivers/router/vue-router.2.x.js'),
//   loginData: { url: 'http://0.0.0.0:8000/auth/obtain_token/', fetchUser: false, redirect: {name: 'Home'}},
//   refreshData: { enabled: false }
// })


Vue.use(NProgress)

// Enable devtools
Vue.config.devtools = true

sync(store, router)

const nprogress = new NProgress({ parent: '.nprogress-container' })

const { state } = store

// router.beforeEach((route, redirect, next) => {
//       if (!loggedIn) {
//           next({ path: '/login', query: { redirect: to.fullPath }});
//       } else {
//           next();
//       }
// })

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

const app = new Vue({
  router,
  store,
  nprogress,
  ...App
})

export { app, router, store }
