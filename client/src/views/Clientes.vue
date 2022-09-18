<template>
		<Sidebar />
		<router-view />
    <div class="content">
      <MenuHeader />
        <Clientes />
    </div>
</template>

<script>
import Sidebar from '@/components/Menu/Sidebar.vue'
import Clientes from '@/components/Clientes/Clientes.vue'
import MenuHeader from '@/components/Menu/MenuHeader.vue'

export default {
  name: 'ClientesList',
  components: {
    Sidebar,
    Clientes,
    MenuHeader
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