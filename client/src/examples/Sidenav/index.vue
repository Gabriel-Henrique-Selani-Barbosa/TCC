<template>
  <aside
    class="my-3 overflow-auto border-0 sidenav navbar navbar-vertical navbar-expand-xs border-radius-xl"
    :class="isRTL ? 'me-3 rotate-caret' : 'ms-3'"
    id="sidenav-main"
  >
    <div class="sidenav-header">
      <i
        class="top-0 p-3 cursor-pointer fas fa-times text-secondary opacity-5 position-absolute end-0 d-none d-xl-none"
        aria-hidden="true"
        id="iconSidenav"
      ></i>
      <a class="m-0 navbar-brand" href="/dashboard" style="display: flex; justify-content: center; flex-direction: column;">
        <img :src="logo" class="navbar-brand-img h-100" alt="main_logo" />
      </a>
    </div>
    <hr class="mt-0 horizontal dark" />
    <sidenav-list :cardBg="customClass" />
    <span style="position: absolute; bottom: 0;">Bem vindo {{ user }}, <b style="cursor: pointer" @click="logout()">sair ?</b></span>
  </aside>
</template>
<script>
import SidenavList from "./SidenavList.vue";
import logo from "@/assets/img/unip-logo.png";
import { mapState } from "vuex";

export default {
  name: "index",
  components: {
    SidenavList,
  },
  data() {
    return {
      logo,
      user: '',
    };
  },
  created() {
    if (localStorage.getItem("user")) {
      this.user = localStorage.getItem("user")
    }
  },
  props: {
    customClass: {
      type: String,
      default: "",
    },
  },
  computed: {
    ...mapState(["isRTL"]),
  },
  methods: {
    logout() {
      localStorage.clear();
      this.$router.push({name:'/'})
    }
  }
};
</script>
