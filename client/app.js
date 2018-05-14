import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import NProgress from 'vue-nprogress'
import {sync} from 'vuex-router-sync'
import App from './App.vue'
import router from './router'
import store from './store'
import * as types from './store/mutation-types'
import * as filters from './filters'
import Message from 'vue-bulma-message'


Vue.router = router
Vue.use(VueAxios, axios);
Vue.axios.defaults.baseURL = localStorage.getItem('apiURL') || 'https://api.datawr.ml'
Vue.axios.defaults.headers.authorization = 'Token ' + localStorage.getItem('token')


// request to check cred. (only if there is a token)
console.log('token', !!localStorage.getItem('token'));
if (!!localStorage.getItem('token')) {
    Vue.axios.get('/core/profile/').then(
        (res) => {
            console.log('first', res);
            store.commit(types.LOGIN, {user: res.data})
            // store.commit(types.WAIT, false);

        }
    ).catch(
        (err) => {
            console.log('first err', err)
            // store.commit(types.WAIT, false);
            next({name: 'Login'})
        }
    )
} else {
    // store.commit(types.WAIT, false);
}

// before every route change check if is logged in otherwise go to login
router.beforeEach((to, from, next) => {
    console.log('state', store.state.auth.loggedIn);
    // while (store.state.wait) {
    //     setTimeout(() => {console.log('waiting...')}, 10)
    // }
    // console.log('stop wait');
    if (!store.state.auth.loggedIn && to.name !== 'Login') {
        if (to.name !== 'Home') {
            next({name: 'Login'})
        } else {
            next()
        }
    } else {
        next()
    }
});


Vue.use(NProgress);


export const MessageComponent = Vue.extend(Message);


// Enable devtools
Vue.config.devtools = true

sync(store, router)

const nprogress = new NProgress({parent: '.nprogress-container'})

const {state} = store


Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
})

const app = new Vue({
    router,
    store,
    nprogress,
    ...App
})

export {app, router, store}
