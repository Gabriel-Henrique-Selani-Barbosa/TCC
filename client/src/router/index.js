import { createRouter, createWebHistory } from "vue-router";
import Auth from "@/views/Auth.vue";
import Dashboard from "@/views/Dashboard.vue";
import Providers from "@/views/Providers.vue";
import Clients from "@/views/Clients.vue";
import Requests from "@/views/Orders.vue";
import Materials from "@/views/Materials.vue";
import Equipments from "@/views/Equipments.vue";
import SignIn from "@/views/SignIn.vue";
import SignUp from "@/views/SignUp.vue";

const routes = [
  {
    path: "/",
    name: "/",
    component: Auth,
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
  },
  {
    path: "/clientes",
    name: "Clientes",
    component: Clients,
  },
  {
    path: "/equipamentos",
    name: "Equipamentos",
    component: Equipments,
  },
  {
    path: "/fornecedores",
    name: "Fornecedores",
    component: Providers,
  },
  {
    path: "/materiais",
    name: "Materiais",
    component: Materials,
  },
  {
    path: "/pedidos",
    name: "Pedidos",
    component: Requests,
  },
  {
    path: "/sign-in",
    name: "Sign In",
    component: SignIn,
  },
  {
    path: "/sign-up",
    name: "Sign Up",
    component: SignUp,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: "active",
});

export default router;
