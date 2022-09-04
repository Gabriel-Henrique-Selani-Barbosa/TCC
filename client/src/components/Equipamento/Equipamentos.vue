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
        <h3>Lista de Equipamentos</h3>
        <button @click="newuser = true">Adicionar Equipamentos</button>
    </header>
    <table v-if="equipamentos.length !== 0" class="table">
      <thead>
        <tr>
          <th>Id</th>
          <th>Categoria</th>
          <th>Marca</th>
          <th>Modelo</th>
          <th>Preco</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="equipamento in equipamentos" :key="equipamento.equip_id">
          <td v-if="updateId === equipamento.equip_id">
            <input
              type="text"
              v-model="equipamento.equip_id"
              class="form-control"
              id="id"
            />
          </td>
          <td v-else>{{ equipamento.equip_id }}</td>

          <td v-if="updateId === equipamento.equip_id">
            <input
              type="text"
              v-model="equipamento.categoria"
              class="form-control"
              id="categoria"
            />
          </td>
          <td v-else>{{ equipamento.categoria }}</td>

          <td v-if="updateId === equipamento.equip_id">
            <input
              type="text"
              v-model="equipamento.marca"
              class="form-control"
              id="marca"
            />
          </td>
          <td v-else>{{ equipamento.marca }}</td>

          <td v-if="updateId === equipamento.equip_id">
            <input
              type="text"
              v-model="equipamento.modelo"
              class="form-control"
              id="modelo"
            />
          </td>
          <td v-else>{{ equipamento.modelo }}</td>

        <td v-if="updateId === equipamento.equip_id">
            <input
              type="text"
              v-model="equipamento.preco"
              class="form-control"
              id="preco"
            />
          </td>
          <td v-else>{{ equipamento.preco }}</td>

          <td v-if="updateId !== equipamento.equip_id">
            <button
              class="btn btn-sm btn-primary"
              @click="handleUpdate(equipamento)"
            >
              Update
            </button>
            &nbsp;
            <button
              class="btn btn-sm btn-danger"
              @click="handleDelete(equipamento.equip_id)"
            >
              Delete
            </button>
          </td>

          <td v-else>
            <button class="btn btn-sm btn-primary" @click="handleSave(cliente.equip_id)">
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
import AddUser from "./Addequipamentos";
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
        equipamentos: [],
        storeName: localStorage.getItem('store'),
        newuser: false,
    };
  },
  methods: {
    getTableList: function () {
      axios
        .get("http://localhost:3001/get-equipamentos/", {
            params: {
                storeName: this.storeName
            }
        })
        .then((res) => {
            this.equipamentos = res.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    handleDelete(equip_id) {
      axios
        .post("http://localhost:3001/delete-equipamentos", {
            storeName: this.storeName,
            equip_id: equip_id
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