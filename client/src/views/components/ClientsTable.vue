<template>
  <div class="d-flex justify-content-between align-items-center mb-3">
  <button class="addItem"
    @click="showAddClient()"
  >Adicionar cliente
  </button>
    <div class="input-group live-search">
      <span class="input-group-text text-body"
        ><i class="fas fa-search" aria-hidden="true"></i
      ></span>
      <input
        type="text"
        class="form-control"
        v-model="categoryNameSearchString"
        :placeholder="
          'Pesquisar...'
        "
      />
    </div>
  </div>
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
            <tr v-for="cliente in filteredClients" :key="cliente.client_id">
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
                <a style="margin-left: 15px"
                  href="javascript:;"
                  @click="handleDeleteUser(cliente.client_id)"
                >
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                  width="25" height="25"
                  viewBox="0,0,256,256"
                  style="fill:#ff0000;">
                  <g fill="#ff0000" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><g transform="scale(8.53333,8.53333)"><path d="M13,3c-0.26757,-0.00363 -0.52543,0.10012 -0.71593,0.28805c-0.1905,0.18793 -0.29774,0.44436 -0.29774,0.71195h-5.98633c-0.36064,-0.0051 -0.69608,0.18438 -0.87789,0.49587c-0.18181,0.3115 -0.18181,0.69676 0,1.00825c0.18181,0.3115 0.51725,0.50097 0.87789,0.49587h18c0.36064,0.0051 0.69608,-0.18438 0.87789,-0.49587c0.18181,-0.3115 0.18181,-0.69676 0,-1.00825c-0.18181,-0.3115 -0.51725,-0.50097 -0.87789,-0.49587h-5.98633c0,-0.26759 -0.10724,-0.52403 -0.29774,-0.71195c-0.1905,-0.18793 -0.44836,-0.29168 -0.71593,-0.28805zM6,8v16c0,1.105 0.895,2 2,2h14c1.105,0 2,-0.895 2,-2v-16z"></path></g></g>
                </svg>
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
  <div v-if="addClientScreen" class="modal-overlay"></div>
 
  <div class="addUser modal"
    v-if="addClientScreen"
  >
  <div class="close" @click="addClientScreen = false"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABmJLR0QA/wD/AP+gvaeTAAABzUlEQVRYhe3Wy27TYBAF4A+2ZAkRECpuFeVdemFL6RMAZYHaF2FHEQ9QhRYJBDwILCo2sKDsoV2FEMzin8iRaxzbKeqiPZKl5J8zM8dje2Y4w2nHuYb8OdzDIm7Ef/iGr3iPN9g/LoFj9LCFIbIp1wh9XD+u5Cs4iOADbOM+FnAhrgWshm0Q3AMsz5r8iXRHmXRXN2v43MKOvBrrbZOvRIDfeNrCfyN8R1pUoicve5vkkyIy/MSVJo4v5WWfFbsRa6uuw5xUuoHyZ/4Q3ZLzbtiKuB2xhlJlp2JdUrxdYnsUtk8FEd04y4JTRL/CdgQfgrxaYptMNBZRdlbEWtjf1RHwOch3/mEvJpyWnNQnMuzVEXAY5E4F5xI+yrvfHi5X8DvBOywazpeQszoqS1A1V8Z5/tQJdOKP4MRfwsf+32dY1ieO4JrUNAbSYCmiaSOa17ARwQtJ8U5dhwq8jljPmzhdlQ+jjRmSb0aMH6o/01Isy8dxGxGb8nG82MIfaS6MF5JdabBMw7y87CPppZ4JS9I8H69kfTzAXanDdeL3Gl7hl7zsre+8iIt4pt5SOpRmf60FpOla3pNWtSVpV5hcy79Ia/lbfG8Y9wynGH8BHnKpr/YwVJ8AAAAASUVORK5CYII="></div>
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
    <input type="file" id="mass" @change="onFileChange" style="display: none"/>
    <label for="mass">Adicionar em massa</label>
    <button class="addItem" @click="addClient()">Adicionar</button>
  </div>
  <nav
        class="pagination"
        role="navigation"
        aria-label="pagination"
      >
        <ul class="pagination-list">
          <li>
            <a @click="prev">&laquo;</a>
          </li>
          <li  v-for="element in arrayLength"
              :key="element">
            <span
              class="pagination-link go-to has-text-orange"
              :class="{active: current == element}"
              aria-label="Goto page 1"
              @click="current = element"
              >{{ element }}</span
            >
          </li>
          <li>
            <a @click="next()">&raquo;</a>
          </li>
        </ul>
      </nav>
</template>

<script>
import axios from "axios";
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';
import readXlsxFile from 'read-excel-file';
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
      categoryNameSearchString: '',
      massClients: [],
      current: 1,
      pageSize: 5,
    };
  },
  mounted: function () {
    this.getTableList();
  },
  computed: {
    filteredClients() {
        var filtered = this.clientes
        var categoryNameSearchString = this.categoryNameSearchString.toLowerCase()
        if (categoryNameSearchString) {
          filtered = filtered.filter(function(item){
              if(item.nome.toLowerCase().indexOf(categoryNameSearchString) !== -1 || item.estado.toLowerCase().indexOf(categoryNameSearchString) !== -1 || item.cpf_cnpj.toLowerCase().indexOf(categoryNameSearchString) !== -1 || item.endereco.toLowerCase().indexOf(categoryNameSearchString) !== -1 || item.cidade.indexOf(categoryNameSearchString) !== -1) {
                  return item
              }
          })
          return filtered.slice(this.indexStart, this.indexEnd);
        }else {
          return filtered.slice(this.indexStart, this.indexEnd);
        }
    },
    indexStart() {
      return (this.current - 1) * this.pageSize;
    },
    indexEnd() {
      return this.indexStart + this.pageSize;
    },
    arrayLength() {
      return Math.ceil(this.clientes.length / this.pageSize)
    }
  },
  methods: {
    prev() {
      if (this.current > 1) {
        this.current--;
      }
    },
    next() {
      if (this.current < Math.ceil(this.clientes.length / this.pageSize)){
        this.current++;
      }
    },
    getTableList: function () {
      axios
        .get("http://localhost:3001/get-clientes", {
            params: {
                storeName: this.storeName
            }
        })
        .then((res) => {
            this.clientes = res.data.rows;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    onFileChange(event) {
      let xlsxfile = event.target.files ? event.target.files[0] : null;
      readXlsxFile(xlsxfile).then((rows) => {
        axios
          .post("http://localhost:3001/register-mass-clientes", {
            storeName: this.storeName,
            clientes: rows,
          })
          .then(() => {
            this.getTableList();
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Registro em massa feito com sucesso',
              showConfirmButton: false,
              timer: 1500
            })
            this.addClientScreen = false
          })
          .catch((error) => {
            console.log(error);
          });
      })
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
    handleDeleteUser(providerid) {
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
      })

      swalWithBootstrapButtons.fire({
        title: 'Tem certeza que deseja deletar esse cliente?',
        text: "Essa ação não poderá ser revertida",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Excluir',
        cancelButtonText: 'Cancelar',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          axios
            .post("http://localhost:3001/delete-clientes", {
                storeName: this.storeName,
                client_id: providerid,
            })
            .then(() => {
              Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Cliente deletado com sucesso',
                showConfirmButton: false,
                timer: 1500
              })
              this.getTableList();
            })
            .catch(() => {
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Um erro aconteceu, tente novamente mais tarde',
              })
            });
        } else if (
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            'Cancelado',
          )
        }
      })
    },
  }
};
</script>
