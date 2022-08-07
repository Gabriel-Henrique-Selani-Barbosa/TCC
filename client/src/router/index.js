import { createRouter, createWebHistory } from 'vue-router'
import LoginForm from '@/views/Login.vue'
import Home from '@/views/Home.vue'
import Clientes from '@/views/Clientes'

const routes = [
  {
    path: '/',
    name: 'LoginForm',
    component: LoginForm
  },
  {
    path: '/home',
    name: 'home',
    component: Home,
    props: true
  },
  {
    path: '/clientes',
    name: 'clientes',
    component: Clientes
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
