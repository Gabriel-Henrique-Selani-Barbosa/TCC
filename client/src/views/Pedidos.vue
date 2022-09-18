<template>
		<Sidebar />
		<router-view />
    <div class="content">
        <Pedidos />
    </div>
</template>

<script>
import Sidebar from '@/components/Menu/Sidebar.vue'
import Pedidos from '@/components/Pedido/Pedidos.vue';

export default {
  name: 'ClientesList',
  components: {
    Sidebar,
    Pedidos
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