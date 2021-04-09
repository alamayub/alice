import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoading: false,
  },
  mutations: {
    SET_IS_LOADING (state, payload) {
      state.isLoading = payload
    },
  },
  actions: {

  },
})
