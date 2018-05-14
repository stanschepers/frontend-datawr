import Vue from 'vue'
import Vuex from 'vuex'
import pkg from 'package'
import * as actions from './actions'
import * as getters from './getters'

import app from './modules/app'
import auth from "./modules/auth";

Vue.use(Vuex)



const store = new Vuex.Store({
  strict: true,  // process.env.NODE_ENV !== 'production',
  actions,
  getters,
  modules: {
    app,
      auth,
  },
  state: {
    pkg
  },
  mutations: {
  }
});


export default store
