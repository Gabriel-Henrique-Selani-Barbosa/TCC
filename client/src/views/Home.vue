<template>
		<Sidebar />
    <Clientes />
		<router-view />
</template>

<script>
import Sidebar from '@/components/Menu/Sidebar.vue'
import Clientes from '@/components/Clientes/Clientes'

export default {
  name: 'Home',
  components: {
   Sidebar,
   Clientes
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