<template>
    <div>
      <Sidebar />
      <div class="Sidebar">
        testando
      </div>
    </div>
</template>

<script>
import Sidebar from '@/components/Menu/Sidebar.vue'

export default {
  name: 'Home',
  props: {
    store: String,
    user: String
  },  
  components: {
   Sidebar,
  },
  created() {
    localStorage.setItem('store', this.store)
    localStorage.setItem('user', this.user)
  },
}
</script>

<style>
body,
html {
  padding: 0;
  margin: 0;
  height: 100%;
}
</style>