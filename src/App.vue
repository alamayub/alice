<template>
  <v-app>
    <v-overlay :value="overlay" v-if="overlay">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
    <v-main v-else>
      <router-view :key="$route.path" />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data: () => ({
    overlay: false,
    isLoggedIn: false
  }),
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