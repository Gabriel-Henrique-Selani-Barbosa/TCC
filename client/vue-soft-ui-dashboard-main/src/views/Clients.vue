<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-12">
        <clients-Table />
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <projects-table />
      </div>
    </div>
  </div>
</template>

<script>
import ClientsTable from "./components/ClientsTable";
import ProjectsTable from "./components/ProjectsTable";

export default {
  name: "Clientes",
  components: {
    ClientsTable,
    ProjectsTable,
  },
};
</script>
