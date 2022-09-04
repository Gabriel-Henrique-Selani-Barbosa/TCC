<style scoped>
#user-table > table thead > tr > th {
  font-size: 16px;
  color: rgba(0, 0, 0, 0.7);
  text-transform: uppercase;
}
#user-table > table thead > tr > th:hover {
  color: rgba(0, 0, 0, 1) !important;
}

#user-table > table {
    width: 100%;
    height: 100%;
}

#user-table > h3 {
  font-size: 22px;
  font-weight: 800;
}
#user-table table tr th {
  font-size: 14px !important;
}
#user-table {
    width: calc(100% - 200px);
    background: var(--white);
}
</style>

<template>
<AddUser v-if="newuser === true"></AddUser>
  <div id="user-table">
    <header>
        <h3>Lista de Fornecedores</h3>
        <button @click="newuser = true">Adicionar Fornecedor</button>
    </header>
    <table v-if="fornecedores.length !== 0" class="table">
      <thead>
        <tr>
          <th>Id</th>
          <th>Nome</th>
          <th>Cpf/Cnpj</th>
          <th>Produto</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="fornecedor in fornecedores" :key="fornecedor.id_fornecedor">
          <td v-if="updateId === fornecedor.id_fornecedor">
            <input
              type="text"
              v-model="fornecedor.id_fornecedor"
              class="form-control"
              id="id"
            />
          </td>
          <td v-else>{{ fornecedor.id_fornecedor }}</td>

          <td v-if="updateId === fornecedor.id_fornecedor">
            <input
              type="text"
              v-model="fornecedor.nome"
              class="form-control"
              id="nome"
            />
          </td>
          <td v-else>{{ fornecedor.nome }}</td>

          <td v-if="updateId === fornecedor.id_fornecedor">
            <input
              type="text"
              v-model="fornecedor.cpf_cnpj"
              class="form-control"
              id="cpf_cnpj"
            />
          </td>
          <td v-else>{{ fornecedor.cpf_cnpj }}</td>

          <td v-if="updateId === fornecedor.id_fornecedor">
            <input
              type="text"
              v-model="fornecedor.produto"
              class="form-control"
              id="produto"
            />
          </td>
          <td v-else>{{ fornecedor.produto }}</td>

          <td v-if="updateId !== fornecedor.id_fornecedor">
            <button
              class="btn btn-sm btn-primary"
              @click="handleUpdate(fornecedor)"
            >
              Update
            </button>
            &nbsp;
            <button
              class="btn btn-sm btn-danger"
              @click="handleDelete(fornecedor.id_fornecedor)"
            >
              Delete
            </button>
          </td>

          <td v-else>
            <button class="btn btn-sm btn-primary" @click="handleSave(cliente.id_fornecedor)">
              Save
            </button>
            &nbsp;
            <button class="btn btn-sm btn-danger" @click="updateId = null">
              Cancel
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";
import AddUser from "./AddFornecedor";
export default {
  name: "table-list-row",  
  components: {
    AddUser
  },
  mounted: function () {
    this.getTableList();
  },
  data: function () {
    return {
        updateId: null,
        fornecedores: [],
        storeName: localStorage.getItem('store'),
        newuser: false,
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
            this.fornecedores = res.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    handleDelete(id_fornecedor) {
      axios
        .post("http://localhost:3001/delete-fornecedores", {
            storeName: this.storeName,
            id_fornecedor: id_fornecedor
        })
        .then((res) => {
            alert(res)
        })
        .catch((error) => {
          console.log(error);
        });
    },
    handleUpdate(product) {
      this.updateId = product.id;
    },
    handleSave(product) {
      this.$emit("update:product", product);
      this.updateId = null;
    },
  },
};
</script>