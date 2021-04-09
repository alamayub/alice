<template>
  <v-app>
    <v-overlay :value="overlay" v-if="overlay">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
    <Navbar v-show="token" />
    <v-main>
      <router-view :key="$route.path" />
    </v-main>
  </v-app>
</template>

<script>
import Navbar from './components/Navbar'
export default {
  name: 'App',
  components: {
    Navbar
  },
  computed: {
    overlay() {
      return this.$store.state.isLoading
    }
  },
  created() {
    this.token = localStorage.getItem('username')
    console.log(localStorage.getItem('username'))
  }
};
</script>

<style>
::-webkit-scrollbar {
  display: none;
}
::-webkit-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>