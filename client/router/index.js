/* eslint-disable indent */
import Vue from 'vue'
import Router from 'vue-router'
import menuModule from 'vuex-store/modules/menu'

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
            name: 'Profile',
            path: '/profile',
            component: require('../views/user/Profile')
        },
        {
            name: 'Dataset',
            path: '/data',
            component: require('../views/datasets/index')
        },
        // {
        //     name: 'Datasets',
        //     path: '/data/:id',
        //     component: require('../views/datasets/Dataset')
        // },
        // ...generateRoutesFromMenu(menuModule.state.items),
        // {
        //     name: 'Other Profile',
        //     path: '/profile/:id',
        //     component: require('../views/user/OtherProfile')
        // },
        {
            path: '*',
            redirect: '/'
        }
    ]
})

// Menu should have 2 levels.
function generateRoutesFromMenu (menu = [], routes = []) {
    for (let i = 0, l = menu.length; i < l; i++) {
        let item = menu[i]
        if (item.path) {
            routes.push(item)
        }
        if (!item.component) {
            generateRoutesFromMenu(item.children, routes)
        }
    }
    return routes
}
