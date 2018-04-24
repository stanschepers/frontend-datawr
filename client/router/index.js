/* eslint-disable indent */
import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/index'
import {getters} from '../auth/index'

Vue.use(Router)

export default new Router({
    linkActiveClass: 'is-active',
    scrollBehavior: () => ({y: 0}),
    routes: [
        {
            name: 'Home',
            path: '/',
            component: require('../views/Home')
        },
        {
            name: 'Login',
            path: '/login',
            component: require('../views/auth/Login')
        },
        {
            name: 'Logout',
            path: '/logout',
            beforeEnter (from, to, next) {
                localStorage.removeItem('token')
                next({name: 'Login'})
            }
        },
        {
            name: 'Profile',
            path: '/profile',
            component: require('../views/user/Profile')
        },
        {
            name: 'Datasets',
            path: '/data/all',
            component: require('../views/datasets/index')
        },
        {
            name: 'Create Dataset',
            path: '/data/create',
            component: require('../views/datasets/CreateDataset')

        },
        {
            name: 'Dataset',
            path: '/data/:id',
            component: require('../views/datasets/Dataset')

        },
        {
            name: 'Transformations',
            path: '/transformations',
            component: require('../views/tables/ColumnTransformations')

        },
        {
            path: '*',
            redirect: '/'
        }
    ]
    // beforeEach: (to, from, next) => {
    //     if (true) {
    //         console.log("jij")
    //         next("/login")
    //     } else {
    //         next("/profile")
    //     }
    // }
})
