<template>
  <v-app>
    <v-overlay :value="overlay" v-if="overlay">
      <v-progress-circular indeterminate size="64" />
    </v-overlay>
    <Navbar />
    <v-main>
      <router-view :key="$route.path" />
    </v-main>
    <Footer />
  </v-app>
</template>

<script>
import Navbar from './components/Navbar'
import Footer from './components/Footer'
export default {
  name: 'App',
  components: {
    Navbar, Footer
  },
  computed: {
    overlay() {
      return this.$store.state.isLoading
    }
  },
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