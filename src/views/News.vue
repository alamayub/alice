<template>
  <v-container>
    <v-row>
      <v-col class="pb-0 pb-sm-2" cols="12" sm="6" md="4" lg="3" v-for="(article, i) in articles" :key="i">
        <v-card class="card--style">
          <v-img :height="`${height}vh`" :lazy-src="article.urlToImage" :src="article.urlToImage" />
          <v-card-text class="pa-3">
            <div class="display-1 n__title word-ellipsis primary--text">{{ article.title }} </div>
            <div class="caption word-ellipsis">{{ article.description }}</div>
          </v-card-text>
          <v-card-actions class="pa-3 pt-0">
            <div class="caption">{{ article.publishedAt.slice(0, 10) }}</div>
            <v-spacer></v-spacer>
            <v-btn text small color="blue">more</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  created() {
    this.$store.dispatch('getNews')
  },
  computed: {
    height () {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs': return 22
        case 'sm': return 25
        case 'md': return 28
        default: return 28
      }
    },
    articles() {
      return this.$store.state.news
    }
  },
}
</script>

<style scoped>
.n__title {
  font-size: 20px !important; 
  line-height: 1.2;
  -webkit-line-clamp: 2;
  margin-bottom: 5px;
}
.caption { -webkit-line-clamp: 3; }
.word-ellipsis {
  word-break: break-word;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
}
.card--style {
  overflow: hidden; 
  border-radius: 10px;
  box-shadow: 0 2px 40px rgba(14, 30, 37, .16) !important;
}
</style>