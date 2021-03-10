<template>
  <v-container>
    <v-row>
      <v-col class="pb-0 pb-sm-2" cols="12" sm="6" md="4" lg="3" v-for="(article, i) in articles" :key="i">
        <v-card class="card--style">
          <v-img :height="`${height}vh`" :lazy-src="article.urlToImage" :src="article.urlToImage"></v-img>
  
          <v-card-title>{{ article.title }} </v-card-title>
          <v-card-text>{{ article.description }}</v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { fb } from '../firebase'
import axios from 'axios'
  export default {
    data: () => ({
      username: null,
      articles: []
    }),
    created() {
      axios.get('http://newsapi.org/v2/everything?q=apple&from=2021-03-09&to=2021-03-09&sortBy=popularity&apiKey=b306ea01774245768bd631e39743ecea')
      .then( res => {
        this.articles = res.data.articles
        console.log(res.data.articles)
      }).catch( e => console.error(e))
    },
    methods: {
      async logout() {
        this.overlay = true
        await fb.auth().signOut().then( () => {
          localStorage.removeItem('username')
          localStorage.removeItem('email')
        }).catch( e => console.log(e))
        this.overlay = false
      }
    },
    computed: {
      name: () => {
        return localStorage.getItem('username')
      },
      height () {
        switch (this.$vuetify.breakpoint.name) {
          case 'xs': return 22
          case 'sm': return 25
          case 'md': return 28
          default: return 28
        }
      },
    },
  }
</script>

<style scoped>
.card--style {
  overflow: hidden; 
  border-radius: 10px;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, .4) !important;
}
</style>