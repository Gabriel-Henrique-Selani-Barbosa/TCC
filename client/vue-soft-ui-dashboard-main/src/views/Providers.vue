<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-12">
        <providers-Table />
      </div>
    </div>
  </div>
</template>

<script>
import ProvidersTable from "./components/ProvidersTable";

export default {
  name: "tables",
  components: {
    ProvidersTable,
  },
};
</script>
