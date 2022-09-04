<template>
		<Sidebar />
		<router-view />
        <Fornecedores />
</template>

<script>
import Sidebar from '@/components/Menu/Sidebar.vue'
import Fornecedores from '@/components/Fornecedor/Fornecedores.vue';

export default {
  name: 'ClientesList',
  components: {
    Sidebar,
    Fornecedores
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