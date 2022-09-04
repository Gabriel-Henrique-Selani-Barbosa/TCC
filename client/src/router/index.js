import { createRouter, createWebHistory } from 'vue-router'
import Auth from '@/views/Auth.vue'
import Home from '@/views/Home.vue'
import Clientes from '@/views/Clientes'
import Fornecedores from '@/views/Fornecedores'
import Equipamentos from '@/views/Equipamentos'
import Pedidos from '@/views/Pedidos'

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
    component: Clientes,
  },
  {
    path: '/fornecedores',
    name: 'fornecedores',
    component: Fornecedores,
  },
  {
    path: '/equipamentos',
    name: 'equipamentos',
    component: Equipamentos,
  },
  {
    path: '/pedidos',
    name: 'pedidos',
    component: Pedidos,
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
