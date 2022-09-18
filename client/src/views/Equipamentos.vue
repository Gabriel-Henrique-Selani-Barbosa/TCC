<template>
		<Sidebar />
		<router-view />
    <div class="content">
        <Equipamentos />
    </div>
</template>

<script>
import Sidebar from '@/components/Menu/Sidebar.vue'
import Equipamentos from '@/components/Equipamento/Equipamentos.vue';

export default {
  name: 'ClientesList',
  components: {
    Sidebar,
    Equipamentos
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