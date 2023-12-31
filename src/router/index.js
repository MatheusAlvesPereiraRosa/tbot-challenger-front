import { createRouter, createWebHistory } from 'vue-router'

import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Recover from '../views/Recover.vue'

import AuthLayout from '../layout/AuthLayout.vue'
import DefaultLayout from '../layout/DefaultLayout.vue'

import { checkAuthentication } from '../router/guard'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/auth',
      name: 'auth',
      component: AuthLayout,
      children: [
        {
          path: 'login',
          name: 'login',
          component: Login,
        },
        {
          path: 'register',
          name: 'register',
          component: Register,
        },
        {
          path: 'recover',
          name: 'recover',
          component: Recover,
        },
      ],
    },
    {
      path: '/',
      redirect: '/auth/login',
    },
    {
      path: '/home',
      component: DefaultLayout,
      beforeEnter: (to, from, next) => {
        // Checando se o usuário está autenticado
        if (checkAuthentication()) {
          next()
        } else {
          next('/auth/login')
        }
      },
      children: [
        {
          path: '',
          name: 'home',
          component: Home,
        },
      ],
    },
  ],
})

export default router
