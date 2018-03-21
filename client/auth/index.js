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


export let login = function (data) {
    localStorage.setItem('token', data)
    state.token = data
}

export let logout = function () {
    localStorage.removeItem('token')
    state.user = null
}

export default {
    getters,
    state,
    login,
    logout
}