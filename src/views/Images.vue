<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <div class="gallery">
          <div class="img-class" v-for="(img, i) in images" :key="i">
            <v-img class="img" :src="img.urls.small" :lazy-src="img.urls.small">
              <div class="text">
                <div class="text-capitalize head">{{ img.alt_description }}</div>
              </div>
            </v-img>
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>  
</template>

<script>
import axios from 'axios'
export default {
  data: () => ({
    images: [],
    page: 1
  }),
  created() {
    this.getImages()
  },
  methods: {
    async getImages() {
      this.$store.commit('SET_IS_LOADING', true)
      await axios.get('https://api.unsplash.com/photos?per_page=50&client_id=gK52De2Tm_dL5o1IXKa9FROBAJ-LIYqR41xBdlg3X2k')
      .then( res => {
        console.log(res.data)
        this.images = res.data
      }).catch( e => console.log(e))
      this.$store.commit('SET_IS_LOADING', false)
    },
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
  },
}
</script>

<style scoped>
.gallery {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 10px;
  grid-auto-flow: dense;
}
.img-class {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  cursor: pointer;
}
.text {
  display: none;
  padding: 10px;
  background-color: rgba(0, 0, 0, .25);
  height: 100%;
  width: 100%;
  color: white;
  font-size: 20px;
  align-items: flex-end;
}
.head { line-height: 1.2; }
.img-class:hover .img .text {
  display: flex;
}
@media (max-width: 960px) {
  .gallery { grid-template-columns: repeat(5, 1fr); }
}
@media (max-width: 800px) {
  .gallery { grid-template-columns: repeat(4, 1fr); }
}
@media (max-width: 650px) {
  .gallery { grid-template-columns: repeat(3, 1fr); }
}
@media (max-width: 500px) {
  .gallery { grid-template-columns: repeat(2, 1fr); }
}
</style>