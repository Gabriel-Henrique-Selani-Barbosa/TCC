import { createRouter, createWebHistory } from 'vue-router'
import Auth from '@/views/Auth.vue'
import Home from '@/views/Home.vue'
import Clientes from '@/views/Clientes'

const routes = [
  {
    path: '/',
    name: 'Auth',
    component: Auth
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
