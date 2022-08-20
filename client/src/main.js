import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import axios from 'axios'
import VueAxios from 'vue-axios'

import '@/assets/sass/main.scss'

export const eventBus = createApp(App)

createApp(App).use(router, axios, VueAxios).mount('#app')