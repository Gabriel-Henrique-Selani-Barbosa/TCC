<template>
  <button
    @click="showAddClient()"
  >Adicionar cliente
  </button>
  <div class="card mb-4">
    <div class="card-header pb-0">
      <h6>clientes</h6>
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
                ESTADO
              </th>
              <th
                class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
              >
                CIDADE
              </th>
              <th
                class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
              >
                ENDEREÇO
              </th>
              <th
                class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
              >
                NUMERO
              </th>
              <th class="text-secondary opacity-7"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="cliente in clientes" :key="cliente.client_id">
              <td>
                <div class="d-flex px-2 py-1">
                  <div class="d-flex flex-column justify-content-center">
                    <h6 class="mb-0 text-sm">{{ cliente.client_id }}</h6>
                  </div>
                </div>
              </td>
              <td>
                <input
                  v-if="editcliente === cliente.client_id"
                  type="text"
                  v-model="clienteName"
                  :placeholder="cliente.nome"
                />
                <p v-else class="text-xs font-weight-bold mb-0">{{ cliente.nome }}</p>
              </td>
              <td class="align-middle text-center text-sm">
                <input
                  v-if="editcliente === cliente.client_id"
                  type="text"
                  v-model="clienteCpfCnpj"
                  :placeholder="cliente.cpf_cnpj"
                />
                <p v-else class="text-xs font-weight-bold mb-0">{{ cliente.cpf_cnpj }}</p>
              </td>
              <td class="align-middle text-center">
                <input
                  v-if="editcliente === cliente.client_id"
                  type="text"
                  v-model="clienteEstado"
                  :placeholder="cliente.estado"
                />
                <span v-else class="text-secondary text-xs font-weight-bold"
                  >{{ cliente.estado }}</span
                >
              </td>
              <td class="align-middle text-center">
                <input
                  v-if="editcliente === cliente.client_id"
                  type="text"
                  v-model="clienteCidade"
                  :placeholder="cliente.cidade"
                />
                <span v-else class="text-secondary text-xs font-weight-bold"
                  >{{ cliente.cidade }}</span
                >
              </td>
              <td class="align-middle text-center">
                <input
                  v-if="editcliente === cliente.client_id"
                  type="text"
                  v-model="clienteEndereco"
                  :placeholder="cliente.endereco"
                />
                <span v-else class="text-secondary text-xs font-weight-bold"
                  >{{ cliente.endereco }}</span
                >
              </td>
              <td class="align-middle text-center">
                <input
                  v-if="editcliente === cliente.client_id"
                  type="text"
                  v-model="clienteNumero"
                  :placeholder="cliente.num"
                />
                <span v-else class="text-secondary text-xs font-weight-bold"
                  >{{ cliente.num }}</span
                >
              </td>
              <td class="align-middle">
                <a
                  v-if="editcliente === cliente.client_id"
                  href="javascript:;"
                  class="text-secondary font-weight-bold text-xs"
                  data-toggle="tooltip"
                  data-original-title="Save user"
                  @click="handleSavecliente(cliente.client_id)"
                  >Salvar</a>
                <a
                  v-else
                  href="javascript:;"
                  class="text-secondary font-weight-bold text-xs"
                  data-toggle="tooltip"
                  data-original-title="Edit user"
                  @click="handleEditcliente(cliente.client_id)"
                  >Edit</a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
  <div class="addUser"
    v-if="addClientScreen"
  >
    <div>
        <label>Nome:</label>
        <input v-model="clientName">
    </div>
    <div>
        <label>Cnpj/Cpf:</label>
        <input v-model="clientcnpjcpf">
    </div>
    <div>
        <label>Estado:</label>
        <input v-model="clientEstado">
    </div>
    <div>
        <label>Cidade:</label>
        <input v-model="clientCidade">
    </div>
    <div>
        <label>Endereco:</label>
        <input v-model="clientEndereco">
    </div>
    <div>
        <label>Numero:</label>
        <input v-model="clientNumero">
    </div>
    <button @click="addClient()">Adicionar</button>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "authors-table",
  data() {
    return {
      clientes: [],
      storeName: localStorage.getItem('store'),
      clientName: '',
      clientcnpjcpf: '',
      clientEstado: '',
      clientCidade: '',
      clientEndereco: '',
      clientNumero: '',
      addClientScreen: false,
      editcliente: '',
      clienteNumero: '',
      clienteEndereco: '',
      clienteCidade: '',
      clienteEstado: '',
      clienteName: '',
      clienteCpfCnpj: '',
    };
  },
  mounted: function () {
    this.getTableList();
  },
  methods: {
    getTableList: function () {
      axios
        .get("http://localhost:3001/get-clientes", {
            params: {
                storeName: this.storeName
            }
        })
        .then((res) => {
            this.clientes = res.data.rows;
            console.log(this.clientes)
        })
        .catch((error) => {
          console.log(error);
        });
    },
    showAddClient() {
      this.addClientScreen = true
    },
    addClient() {
      axios
        .post('http://localhost:3001/registrar-cliente', {
            storeName: this.storeName,
            nome: this.clientName,
            cnpjcpf: this.clientcnpjcpf,
            estado: this.clientEstado,
            cidade: this.clientCidade,
            endereco: this.clientEndereco,
            numero: this.clientNumero,
        })
        .then(() => {
          this.clientName = '';
          this.clientcnpjcpf = '';
          this.clientEstado = '';
          this.clientCidade = '';
          this.clientEndereco = '';
          this.clientNumero = '';
          this.addClientScreen = false;
          this.getTableList();
        })
        .catch((err) => {
            console.log(err)
        })
    },
    handleEditcliente(id) {
      this.editcliente = id
    },
    handleSavecliente(providerid) {
      axios
        .post("http://localhost:3001/update-clientes", {
          storeName: this.storeName,
          id: providerid,
          nome: this.clienteName,
          cnpjcpf: this.clienteCpfCnpj,
          estado: this.clienteEstado,
          cidade: this.clienteCidade,
          endereco: this.clienteEndereco,
          numero: this.clienteNumero,
        })
        .then(() => {
          this.clienteName = '';
          this.clienteCpfCnpj = '';
          this.clienteEstado = '';
          this.clienteCidade = '';
          this.clienteEndereco = '';
          this.clienteNumero = '';
          this.editcliente = '';
          this.getTableList();
        })
        .catch((error) => {
          console.log(error)
        })
    },
  }
};
</script>
