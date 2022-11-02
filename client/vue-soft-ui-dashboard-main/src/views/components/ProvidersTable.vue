<template>
  <div class="card mb-4">
    <div class="card-header pb-0">
      <h6>Fornecedores</h6>
    </div>
    <div class="card-body px-0 pt-0 pb-2">
      <div class="table-responsive p-0">
        <table class="table align-items-center mb-0">
          <thead>
            <tr>
              <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
              >
                Id
              </th>
              <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
              >
                Nome
              </th>
              <th
                class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
              >
                CPF/CNPJ
              </th>
              <th
                class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
              >
                PRODUTO
              </th>
              <th class="text-secondary opacity-7"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="fornecedor in fornecedores" :key="fornecedor.id_fornecedor">
              <td>
                <div class="d-flex px-2 py-1">
                  <div class="d-flex flex-column justify-content-center">
                    <h6 class="mb-0 text-sm">{{ fornecedor.id_fornecedor }}</h6>
                  </div>
                </div>
              </td>
              <td>
                <p class="text-xs font-weight-bold mb-0">{{ fornecedor.nomne }}</p>
              </td>
              <td class="align-middle text-center text-sm">
                {{ fornecedor.cpf_cnpj }}
              </td>
              <td class="align-middle text-center">
                <span class="text-secondary text-xs font-weight-bold"
                  >{{ fornecedor.produto }}</span
                >
              </td>
              <td class="align-middle">
                <a
                  href="javascript:;"
                  class="text-secondary font-weight-bold text-xs"
                  data-toggle="tooltip"
                  data-original-title="Edit user"
                  >Edit</a
                >
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "authors-table",
  data() {
    return {
      providers: [],
      storeName: localStorage.getItem('store'),
    };
  },
  methods: {
    getTableList: function () {
      axios
        .get("http://localhost:3001/get-fornecedores/", {
            params: {
                storeName: this.storeName
            }
        })
        .then((res) => {
            this.providers = res.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  }
};
</script>
