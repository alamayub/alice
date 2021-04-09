import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import store from './store'
import router from './router'
import vuetify from './plugins/vuetify';

import VueFirestore from 'vue-firestore'
import { fb } from '@/firebase';

require('firebase/firestore')
Vue.use(VueFirestore);

import Vuelidate from 'vuelidate'
Vue.use(Vuelidate)

import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  fb.auth().onAuthStateChanged( user => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
      if (!user) {
        next({ name: 'Login' })
      } else {
        next()
      }
    } else if (to.matched.some(record => record.meta.requiresVisitor)) {
      if (user) {
        next({ name: 'Home' })
      } else {
        next()
      }
    } else {
      next()
    }
  })
})

let app = '';

fb.auth().onAuthStateChanged(() => {
  if (!app) {
     app = new Vue({
      router,
      store,
      vuetify,
      render: h => h(App)
    }).$mount('#app')
  }
});

