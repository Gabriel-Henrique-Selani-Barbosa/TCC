import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import "./assets/css/nucleo-icons.css";
import "./assets/css/nucleo-svg.css";
import SoftUIDashboard from "./soft-ui-dashboard";
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueSweetalert2 from 'vue-sweetalert2';
import vSelect from "vue-select";
import 'sweetalert2/dist/sweetalert2.min.css';
import "vue-select/dist/vue-select.css";

const appInstance = createApp(App);
appInstance.component("v-select", vSelect);
appInstance.use(VueAxios, axios)
appInstance.use(store);
appInstance.use(router);
appInstance.use(VueSweetalert2);
appInstance.use(SoftUIDashboard);
appInstance.mount("#app");
