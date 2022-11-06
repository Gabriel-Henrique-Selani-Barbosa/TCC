<template>
  <div class="d-flex justify-content-between align-items-center mb-3">
    <button
    class="addItem"
    @click="showAddProvider()"
  >Adicionar Fornecedor
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
            <tr v-for="fornecedor in filteredProviders" :key="fornecedor.id_fornecedor">
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
  <div v-if="addProviderScreen" class="modal-overlay"></div>
  <div class="addUser modal"
    v-if="addProviderScreen"
  >
  <div class="close" @click="addProviderScreen = false"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABmJLR0QA/wD/AP+gvaeTAAABzUlEQVRYhe3Wy27TYBAF4A+2ZAkRECpuFeVdemFL6RMAZYHaF2FHEQ9QhRYJBDwILCo2sKDsoV2FEMzin8iRaxzbKeqiPZKl5J8zM8dje2Y4w2nHuYb8OdzDIm7Ef/iGr3iPN9g/LoFj9LCFIbIp1wh9XD+u5Cs4iOADbOM+FnAhrgWshm0Q3AMsz5r8iXRHmXRXN2v43MKOvBrrbZOvRIDfeNrCfyN8R1pUoicve5vkkyIy/MSVJo4v5WWfFbsRa6uuw5xUuoHyZ/4Q3ZLzbtiKuB2xhlJlp2JdUrxdYnsUtk8FEd04y4JTRL/CdgQfgrxaYptMNBZRdlbEWtjf1RHwOch3/mEvJpyWnNQnMuzVEXAY5E4F5xI+yrvfHi5X8DvBOywazpeQszoqS1A1V8Z5/tQJdOKP4MRfwsf+32dY1ieO4JrUNAbSYCmiaSOa17ARwQtJ8U5dhwq8jljPmzhdlQ+jjRmSb0aMH6o/01Isy8dxGxGb8nG82MIfaS6MF5JdabBMw7y87CPppZ4JS9I8H69kfTzAXanDdeL3Gl7hl7zsre+8iIt4pt5SOpRmf60FpOla3pNWtSVpV5hcy79Ia/lbfG8Y9wynGH8BHnKpr/YwVJ8AAAAASUVORK5CYII="></div>
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
    <input type="file" id="mass" @change="onFileChange" style="display: none"/>
    <label for="mass">Adicionar em massa</label>
    <button class="addItem" @click="addProvider()">Adicionar</button>
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
      categoryNameSearchString: '',
      current: 1,
      pageSize: 5,
    };
  },
  computed: {
    filteredProviders() {
        var filtered = this.fornecedores
        var categoryNameSearchString = this.categoryNameSearchString.toLowerCase()
        if (categoryNameSearchString) {
          filtered = filtered.filter(function(item){
              if(item.produto.toLowerCase().indexOf(categoryNameSearchString) !== -1 || item.nome.toLowerCase().indexOf(categoryNameSearchString) !== -1 || item.cpf_cnpj.indexOf(categoryNameSearchString) !== -1) {
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
      return Math.ceil(this.fornecedores.length / this.pageSize)
    }
  },
  mounted: function () {
    this.getTableList();
  },
  methods: {
    prev() {
      if (this.current > 1) {
        this.current--;
      }
    },
    next() {
      if (this.current < Math.ceil(this.fornecedores.length / this.pageSize)){
        this.current++;
      }
    },
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
    onFileChange(event) {
      let xlsxfile = event.target.files ? event.target.files[0] : null;
      readXlsxFile(xlsxfile).then((rows) => {
        axios
          .post("http://localhost:3001/register-mass-fornecedores", {
            storeName: this.storeName,
            providers: rows,
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
            this.addProviderScreen = false
          })
          .catch((error) => {
            console.log(error);
          });
      })
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
