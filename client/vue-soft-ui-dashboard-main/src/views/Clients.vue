<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-12">
        <clients-Table />
      </div>
    </div>
  </div>
</template>

<script>
import ClientsTable from "./components/ClientsTable";

export default {
  name: "Clientes",
  components: {
    ClientsTable,
  },
  created() {
    if (!localStorage.getItem("store")) {
      this.$router.push({name:'/'})
    }
  },
};
</script>
