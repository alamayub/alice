import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoading: false,
    news: [],
    images: [],
    current_page: 1,
    total_pages: 0,
    item: {}
  },
  mutations: {
    SET_IS_LOADING: (state, payload) => state.isLoading = payload,
    SET_NEWS: (state, payload) => state.news = payload,
    SET_IMAGES: (state, payload) => state.images = payload,
    SET_CURRENT_PAGE: (state, payload) => state.current_page = payload,
    SET_TOTAL_PAGES: (state, payload) => state.total_pages = payload,
    SET_ITEM: (state, payload) => state.item = payload
  },
  actions: {
    async getNews({ commit }) {
      commit('SET_IS_LOADING', true)
      let date = new Date().toISOString().substr(0, 10)
      await axios.get(`http://newsapi.org/v2/everything?q=apple&from=${date}&to=${date}&sortBy=popularity&apiKey=b306ea01774245768bd631e39743ecea`)
      .then( res => {
        console.log(res)
        commit('SET_NEWS', res.data.articles)
      }).catch( e => console.error(e))
      commit('SET_IS_LOADING', false)
    },
    async getImages({ state, commit }) {
      const per_page = 20
      const client_id = 'gK52De2Tm_dL5o1IXKa9FROBAJ-LIYqR41xBdlg3X2k'
      commit('SET_IS_LOADING', true)
      await axios.get(`https://api.unsplash.com/photos?page=${state.current_page}&per_page=${per_page}&client_id=${client_id}`)
      .then( res => {
        console.log(res)
        let total = parseInt(res.headers['x-total'])
        let tp = total / per_page
        commit('SET_TOTAL_PAGES', parseInt(tp))
        commit('SET_IMAGES', res.data)
      }).catch( e => console.log(e))
      commit('SET_IS_LOADING', false)
    },
    async getImage({ commit }, { id }) {
      commit('SET_IS_LOADING', true)
      const client_id = 'gK52De2Tm_dL5o1IXKa9FROBAJ-LIYqR41xBdlg3X2k'
      await axios.get(`https://api.unsplash.com/photos/${id}?client_id=${client_id}`).then( img => {
        console.log(img.data)
        commit('SET_ITEM', img.data)
      }).catch( e => console.log(e))
      commit('SET_IS_LOADING', false)
    }
  },
})


// await axios.get('http://newsapi.org/v2/everything?q=apple&from=2021-03-09&to=2021-03-09&sortBy=popularity&apiKey=b306ea01774245768bd631e39743ecea')