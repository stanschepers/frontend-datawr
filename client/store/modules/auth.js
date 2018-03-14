import * as types from '../mutation-types'

const state = {
    user: null,
    token: ''
}

const getters = {
    getLoggedIn() {
        return !!(localStorage.getItem('token'))
    },
    getToken() {
        return localStorage.getItem('token')
    },
    getUser() {
        return state.user
    }
}

const mutations = {
    [types.LOGIN](state, data) {
        // localStorage.setItem('token', data)
        state.token = data
    },
    [types.LOGOUT](state) {
        localStorage.removeItem('token')
        state.user = null
    },
}

export default {
    getters,
    state,
    mutations
}
