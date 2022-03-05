import { createRouter, createWebHistory } from 'vue-router'
import WelcomePage from '../components/welcome/welcome.vue'
import DashboardPage from '../components/dashboard/dashboard.vue'
import SignupPage from '../components/auth/signup.vue'
import SigninPage from '../components/auth/signin.vue'
import store from '../store/store'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { name: 'home', path: '/', component: WelcomePage },
    { name: 'signup', path: '/signup', component: SignupPage },
    { name: 'signin', path: '/signin', component: SigninPage },
    {
      name: 'dashboard',
      path: '/dashboard',
      component: DashboardPage,
      beforeEnter(to, from, next) {
        if (store.getters.authenticated) {
          next();
        } else {
          next({ name: 'signin' });
        }
      }
    },
  ]
})

export default router;
