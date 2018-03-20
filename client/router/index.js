/* eslint-disable indent */
import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/index'
import * as types from '../store/mutation-types'

Vue.use(Router)

export default new Router({
    mode: 'history', // Demo is living in GitHub.io, so required!
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
                store.commit(types.LOGOUT)
                next('Login')
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
            name: 'Dataset',
            path: '/data/:id',
            component: require('../views/datasets/Dataset')

        },
        {
            name: 'Create Dataset',
            path: '/createdataset',
            component: require('../views/datasets/CreateDataset')

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
})



