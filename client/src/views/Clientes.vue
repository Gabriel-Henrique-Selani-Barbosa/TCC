<template>
		<Sidebar />
		<router-view />
        <Clientes />
</template>

<script>
import Sidebar from '@/components/Menu/Sidebar.vue'
import Clientes from '@/components/Clientes/Clientes.vue'

export default {
  name: 'ClientesList',
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