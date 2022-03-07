import { createRouter, createWebHistory } from 'vue-router'
import Home from '../components/Home.vue'
import Profile from '../components/Profile.vue'
import store from '../store/store'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { name: 'home', path: '/', component: Home, meta: { requiredAuth: true } },
    { name: 'profile', path: '/profile', component: Profile, meta: { requiredAuth: true } },
    { name: 'register', path: '/register', component: Profile, },
    { name: 'signin', path: '/signin', component: Profile, },
  ]
})

export default router;