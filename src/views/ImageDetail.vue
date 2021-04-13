<template>
  <v-container>
    <!-- {{ img }} -->

    <v-row>
      <v-col cols="12" sm="6" md="4" lg="3">
        <div :style="{ backgroundImage: `url(${img.urls.regular})` }" class="img-class" />
      </v-col>
    </v-row>
  </v-container>  
</template>

<script>
export default {
  computed: {
    img() {
      return this.$store.state.item
    }
  },
  created() {
    console.log(this.$route.params.id)
    this.$store.dispatch({
      type: 'getImage',
      id: this.$route.params.id
    })
  }
}
</script>

<style scoped>
.img-class {
  height: 40vh;
  background-position: center center;
  background-size: cover;
}
</style>