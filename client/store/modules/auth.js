import * as types from '../mutation-types'

const state = {
    user: null,
    token: '',
    loggedIn: false
}

const getters = {
    getLoggedIn() {
        return state.loggedIn
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
       state.loggedIn = true
        state.user = data.user
        state.token = data.token
    },
    [types.LOGOUT](state) {
        localStorage.removeItem('token')
        state.user = null
        state.loggedIn = false
    },
}

export default {
    getters,
    state,
    mutations
}
