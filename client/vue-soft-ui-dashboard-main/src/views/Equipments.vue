<template>
  <button
    @click="showAddEquip()"
  >Adicionar Equipamento
  </button>
  <div class="card mb-4">
    <div class="card-header pb-0">
      <h6>Equipamentos</h6>
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
                Categoria
              </th>
              <th
                class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
              >
                Narca
              </th>
              <th
                class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
              >
                Modelo
              </th>
              <th
                class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
              >
                Preço
              </th>
              <th class="text-secondary opacity-7"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="equipamento in equipamentos" :key="equipamento.equip_id">
              <td>
                <div class="d-flex px-2 py-1">
                  <div class="d-flex flex-column justify-content-center">
                    <h6 class="mb-0 text-sm">{{ equipamento.equip_id }}</h6>
                  </div>
                </div>
              </td>
              <td>
                <input
                  v-if="editEquipamento === equipamento.equip_id"
                  type="text"
                  v-model="equipamentoCategoria"
                  :placeholder="equipamento.categoria"
                />
                <p v-else class="text-xs font-weight-bold mb-0">{{ equipamento.categoria }}</p>
              </td>
              <td class="align-middle text-center text-sm">
                <input
                  v-if="editEquipamento === equipamento.equip_id"
                  type="text"
                  v-model="equipamentoMarca"
                  :placeholder="equipamento.marca"
                />
                <p v-else class="text-xs font-weight-bold mb-0">{{ equipamento.marca }}</p>
              </td>
              <td class="align-middle text-center">
                <input
                  v-if="editEquipamento === equipamento.equip_id"
                  type="text"
                  v-model="equipamentoModelo"
                  :placeholder="equipamento.modelo"
                />
                <span v-else class="text-secondary text-xs font-weight-bold"
                  >{{ equipamento.modelo }}</span
                >
              </td>
              <td class="align-middle text-center">
                <input
                  v-if="editEquipamento === equipamento.equip_id"
                  type="text"
                  v-model="equipamentoPreco"
                  :placeholder="equipamento.preco"
                />
                <span v-else class="text-secondary text-xs font-weight-bold"
                  >{{ equipamento.preco }}</span
                >
              </td>
              <td class="align-middle">
                <a
                  v-if="editEquipamento === equipamento.equip_id"
                  href="javascript:;"
                  class="text-secondary font-weight-bold text-xs"
                  data-toggle="tooltip"
                  data-original-title="Save user"
                  @click="handleSaveEquipamento(equipamento.equip_id)"
                  >Salvar</a>
                <a
                  v-else
                  href="javascript:;"
                  class="text-secondary font-weight-bold text-xs"
                  data-toggle="tooltip"
                  data-original-title="Edit user"
                  @click="handleeditEquipamento(equipamento.equip_id)"
                  >Edit</a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
  <div class="addUser"
    v-if="addEquipScreen"
  >
    <div>
        <label>Categoria:</label>
        <input v-model="equipCategoria">
    </div>
    <div>
        <label>Marca:</label>
        <input v-model="equiMarca">
    </div>
    <div>
        <label>Modelo:</label>
        <input v-model="equiModelo">
    </div>
    <div>
        <label>Preco:</label>
        <input v-model="equipPreco">
    </div>
    <button @click="addEquip()">Adicionar</button>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "authors-table",
  data() {
    return {
      equipamentos: [],
      storeName: localStorage.getItem('store'),
      equipCategoria: '',
      equiMarca: '',
      equiModelo: '',
      equipPreco: '',
      addEquipScreen: false,
      editEquipamento: '',
      equipamentoModelo: '',
      equipamentoCategoria: '',
      equipamentoMarca: '',
      equipamentoPreco: '',
    };
  },
  mounted: function () {
    this.getTableList();
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
            this.equipamentos = res.data.rows;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    showAddEquip() {
      this.addEquipScreen = true
    },
    addEquip() {
      axios
        .post('http://localhost:3001/registrar-equipamentos', {
            storeName: this.storeName,
            categoria: this.equipCategoria,
            marca: this.equiMarca,
            modelo: this.equiModelo,
            preco: this.equipPreco,
        })
        .then(() => {
            this.equipCategoria = '';
            this.equiMarca = '';
            this.equiModelo = '';
            this.addEquipScreen = false;
            this.getTableList();
        })
        .catch((err) => {
            console.log(err)
        })
    },
    handleeditEquipamento(id) {
      this.editEquipamento = id
    },
    handleSaveEquipamento(providerid) {
      axios
        .post("http://localhost:3001/update-equipamentos", {
          storeName: this.storeName,
          id: providerid,
          categoria: this.equipamentoCategoria,
          marca: this.equipamentoMarca,
          modelo: this.equipamentoModelo,
          preco: this.equipamentoPreco,
        })
        .then(() => {
          this.equipamentoModelo = '';
          this.equipamentoMarca = '';
          this.equipamentoCategoria = '';
          this.equipamentoPreco = '';
          this.editEquipamento = '';
          this.getTableList();
        })
        .catch((error) => {
          console.log(error)
        })
    },
  }
};
</script>
