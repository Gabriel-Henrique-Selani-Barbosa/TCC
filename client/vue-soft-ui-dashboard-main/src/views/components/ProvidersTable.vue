<template>
  <button
    @click="showAddProvider()"
  >Adicionar Fornecedor
  </button>
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
                <input
                  v-if="editFornecedor === fornecedor.id_fornecedor"
                  type="text"
                  v-model="fornecedorNome"
                  :placeholder="fornecedor.nome"
                />
                <p v-else class="text-xs font-weight-bold mb-0">{{ fornecedor.nome }}</p>
              </td>
              <td class="align-middle text-center text-sm">
                <input
                  v-if="editFornecedor === fornecedor.id_fornecedor"
                  type="text"
                  v-model="fornecedorCpfCnpj"
                  :placeholder="fornecedor.cpf_cnpj"
                />
                <p v-else class="text-xs font-weight-bold mb-0">{{ fornecedor.cpf_cnpj }}</p>
              </td>
              <td class="align-middle text-center">
                <input
                  v-if="editFornecedor === fornecedor.id_fornecedor"
                  type="text"
                  v-model="fornecedorProduto"
                  :placeholder="fornecedor.produto"
                />
                <span v-else class="text-secondary text-xs font-weight-bold"
                  >{{ fornecedor.produto }}</span
                >
              </td>
              <td class="align-middle">
                <a
                  v-if="editFornecedor === fornecedor.id_fornecedor"
                  href="javascript:;"
                  class="text-secondary font-weight-bold text-xs"
                  data-toggle="tooltip"
                  data-original-title="Save user"
                  @click="handleSaveFornecedor(fornecedor.id_fornecedor)"
                  >Salvar</a>
                <a
                  v-else
                  href="javascript:;"
                  class="text-secondary font-weight-bold text-xs"
                  data-toggle="tooltip"
                  data-original-title="Edit user"
                  @click="handleEditFornecedor(fornecedor.id_fornecedor)"
                  >Edit</a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
  <div class="addUser"
    v-if="addProviderScreen"
  >
    <div>
        <label>Nome:</label>
        <input v-model="providerName">
    </div>
    <div>
        <label>Cnpj/Cpf:</label>
        <input v-model="providercnpjcpf">
    </div>
    <div>
        <label>Produto:</label>
        <input v-model="providerproduto">
    </div>
    <button @click="addProvider()">Adicionar</button>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "authors-table",
  data() {
    return {
      fornecedores: [],
      storeName: localStorage.getItem('store'),
      providerName: '',
      providercnpjcpf: '',
      providerproduto: '',
      addProviderScreen: false,
      editFornecedor: '',
      fornecedorProduto: '',
      fornecedorNome: '',
      fornecedorCpfCnpj: '',
    };
  },
  mounted: function () {
    this.getTableList();
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
            this.fornecedores = res.data.rows;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    showAddProvider() {
      this.addProviderScreen = true
    },
    addProvider() {
      axios
        .post('http://localhost:3001/registrar-fornecedores', {
            storeName: this.storeName,
            nome: this.providerName,
            cnpjcpf: this.providercnpjcpf,
            produto: this.providerproduto,
        })
        .then(() => {
            this.providerName = '';
            this.providercnpjcpf = '';
            this.providerproduto = '';
            this.addProviderScreen = false;
            this.getTableList();
        })
        .catch((err) => {
            console.log(err)
        })
    },
    handleEditFornecedor(id) {
      this.editFornecedor = id
    },
    handleSaveFornecedor(providerid) {
      axios
        .post("http://localhost:3001/update-fornecedores", {
          storeName: this.storeName,
          id: providerid,
          cnpjcpf: this.fornecedorCpfCnpj,
          nome: this.fornecedorNome,
          produto: this.fornecedorProduto,
        })
        .then(() => {
          this.fornecedorProduto = '';
          this.fornecedorCpfCnpj = '';
          this.fornecedorNome = '';
          this.editFornecedor = '';
          this.getTableList();
        })
        .catch((error) => {
          console.log(error)
        })
    },
  }
};
</script>
