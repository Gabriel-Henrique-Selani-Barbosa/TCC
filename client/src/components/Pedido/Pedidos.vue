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
        <h3>Lista de Pedidos</h3>
        <button @click="newuser = true">Adicionar Pedidos</button>
    </header>
    <table v-if="pedidos.length !== 0" class="table">
      <thead>
        <tr>
          <th>Id</th>
          <th>Servico</th>
          <th>Valor</th>
          <th>Data do Pedido</th>
          <th>Observacao</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="pedido in pedidos" :key="pedido.pedido_id">
          <td v-if="updateId === pedido.pedido_id">
            <input
              type="text"
              v-model="pedido.pedido_id"
              class="form-control"
              id="id"
            />
          </td>
          <td v-else>{{ pedido.pedido_id }}</td>

          <td v-if="updateId === pedido.pedido_id">
            <input
              type="text"
              v-model="pedido.servico"
              class="form-control"
              id="servico"
            />
          </td>
          <td v-else>{{ pedido.servico }}</td>

          <td v-if="updateId === pedido.pedido_id">
            <input
              type="text"
              v-model="pedido.valor"
              class="form-control"
              id="valor"
            />
          </td>
          <td v-else>{{ pedido.valor }}</td>

          <td v-if="updateId === pedido.pedido_id">
            <input
              type="text"
              v-model="pedido.data_pedido"
              class="form-control"
              id="data_pedido"
            />
          </td>
          <td v-else>{{ pedido.data_pedido }}</td>

            <td v-if="updateId === pedido.pedido_id">
            <input
              type="text"
              v-model="pedido.observação"
              class="form-control"
              id="observação"
            />
          </td>
          <td v-else>{{ pedido.observação }}</td>

          <td v-if="updateId !== pedido.pedido_id">
            <button
              class="btn btn-sm btn-primary"
              @click="handleUpdate(pedido)"
            >
              Update
            </button>
            &nbsp;
            <button
              class="btn btn-sm btn-danger"
              @click="handleDelete(pedido.pedido_id)"
            >
              Delete
            </button>
          </td>

          <td v-else>
            <button class="btn btn-sm btn-primary" @click="handleSave(cliente.pedido_id)">
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
import AddUser from "./Addpedidos";
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
        pedidos: [],
        storeName: localStorage.getItem('store'),
        newuser: false,
    };
  },
  methods: {
    getTableList: function () {
      axios
        .get("http://localhost:3001/get-pedidos/", {
            params: {
                storeName: this.storeName
            }
        })
        .then((res) => {
            this.pedidos = res.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    handleDelete(pedido_id) {
      axios
        .post("http://localhost:3001/delete-pedidos/", {
            storeName: this.storeName,
            pedido_id: pedido_id
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