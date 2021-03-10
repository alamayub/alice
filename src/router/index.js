import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/login', name: 'Login', component: Login, meta: { requiresVisitor: true } },
  { path: '/register', name: 'Register', component: Register, meta: { requiresVisitor: true } },
  { path: '/', name: 'Home', component: Home, meta: { requiresAuth: true } },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
