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
        <h3>Lista de Clientes</h3>
        <button @click="newuser = true">Adicionar Cliente</button>
    </header>
    <table v-if="clientes.length !== 0" class="table">
      <thead>
        <tr>
          <th>Id</th>
          <th>Nome</th>
          <th>Cpf/Cnpj</th>
          <th>Estado</th>
          <th>Cidade</th>
          <th>Endereco</th>
          <th>Numero</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="cliente in clientes" :key="cliente.client_id">
          <td v-if="updateId === cliente.client_id">
            <input
              type="text"
              v-model="cliente.client_id"
              class="form-control"
              id="id"
            />
          </td>
          <td v-else>{{ cliente.client_id }}</td>

          <td v-if="updateId === cliente.client_id">
            <input
              type="text"
              v-model="cliente.nome"
              class="form-control"
              id="nome"
            />
          </td>
          <td v-else>{{ cliente.nome }}</td>

          <td v-if="updateId === cliente.client_id">
            <input
              type="text"
              v-model="cliente.cpf_cnpj"
              class="form-control"
              id="cpf_cnpj"
            />
          </td>
          <td v-else>{{ cliente.cpf_cnpj }}</td>

          <td v-if="updateId === cliente.client_id">
            <input
              type="text"
              v-model="cliente.estado"
              class="form-control"
              id="estado"
            />
          </td>
          <td v-else>{{ cliente.estado }}</td>

          <td v-if="updateId === cliente.client_id">
            <input
              type="text"
              v-model="cliente.cidade"
              class="form-control"
              id="cidade"
            />
          </td>
          <td v-else>{{ cliente.cidade }}</td>

        <td v-if="updateId === cliente.client_id">
            <input
              type="text"
              v-model="cliente.endereco"
              class="form-control"
              id="endereco"
            />
          </td>
          <td v-else>{{ cliente.endereco }}</td>

        <td v-if="updateId === cliente.client_id">
            <input
              type="text"
              v-model="cliente.num"
              class="form-control"
              id="numero"
            />
          </td>
          <td v-else>{{ cliente.num }}</td>

          <td v-if="updateId !== cliente.client_id">
            <button
              class="btn btn-sm btn-primary"
              @click="handleUpdate(cliente)"
            >
              Update
            </button>
            &nbsp;
            <button
              class="btn btn-sm btn-danger"
              @click="handleDelete(cliente.client_id)"
            >
              Delete
            </button>
          </td>

          <td v-else>
            <button class="btn btn-sm btn-primary" @click="handleSave(cliente.client_id)">
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
import AddUser from "./AddUser";
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
        clientes: [],
        storeName: localStorage.getItem('store'),
        newuser: false,
    };
  },
  methods: {
    getTableList: function () {
      axios
        .get("http://localhost:3001/get-clientes/", {
            params: {
                storeName: this.storeName
            }
        })
        .then((res) => {
            this.clientes = res.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    handleDelete(cliente_id) {
      axios
        .post("http://localhost:3001/delete-clientes", {
            storeName: this.storeName,
            cliente_id: cliente_id
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