import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "@/views/Dashboard.vue";
import Providers from "@/views/Tables.vue";
import Clients from "@/views/Billing.vue";
import Requests from "@/views/Profile.vue";
import Equipments from "@/views/Rtl.vue";
import SignIn from "@/views/SignIn.vue";
import SignUp from "@/views/SignUp.vue";

const routes = [
  {
    path: "/",
    name: "/",
    redirect: "/dashboard",
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
  },
  {
    path: "/clientes",
    name: "Clients",
    component: Clients,
  },
  {
    path: "/clientes",
    name: "Clients",
    component: Clients,
  },
  {
    path: "/equipamentos",
    name: "Equipments",
    component: Equipments,
  },
  {
    path: "/fornecedores",
    name: "Providers",
    component: Providers,
  },
  {
    path: "/pedidos",
    name: "Requests",
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
