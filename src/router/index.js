import { createRouter, createWebHistory } from 'vue-router'
import Home from '../components/Home.vue'
import Profile from '../components/Profile.vue'
import Register from '../components/auth/Register.vue'
import Signin from '../components/auth/Signin.vue'
import store from '../store/store'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { name: 'home', path: '/', component: Home, meta: { requiredAuth: true } },
    { name: 'profile', path: '/profile', component: Profile, meta: { requiredAuth: true } },
    { name: 'register', path: '/register', component: Register, meta: { requiredAuth: false } },
    { name: 'signin', path: '/signin', component: Signin, meta: { requiredAuth: false } },
  ]
})

router.beforeEach((to, from, next) => {
  if (to.name !== 'signin' && to.name !== 'register' && !store.getters.authenticated && to.meta.requiredAuth === true) {
    next({ name: 'signin' });
  } else {
    next();
  }
})
export default router;