<template>
    <div class="d-flex justify-content-between align-items-center mb-3">
      <button
        class="addItem"
        @click="showAddEquip()"
      >Adicionar Material
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
        <h6>Materiais</h6>
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
                  Fornecedor
                </th>
                <th
                  class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
                >
                  Categoria
                </th>
                <th
                  class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
                >
                  Nome
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
              <tr v-for="equipamento in filteredEquipements" :key="equipamento.material_id">
                <td>
                  <div class="d-flex px-2 py-1">
                    <div class="d-flex flex-column justify-content-center">
                      <h6 class="mb-0 text-sm">{{ equipamento.material_id }}</h6>
                    </div>
                  </div>
                </td>
                <td>
                  <input
                    v-if="editEquipamento === equipamento.material_id"
                    type="text"
                    v-model="equipamentoCategoria"
                    :placeholder="equipamento.fornecedor"
                  />
                  <p v-else class="text-xs font-weight-bold mb-0">{{ equipamento.fornecedor }}</p>
                </td>
                <td class="align-middle text-center text-sm">
                  <input
                    v-if="editEquipamento === equipamento.material_id"
                    type="text"
                    v-model="equipamentoMarca"
                    :placeholder="equipamento.categoria"
                  />
                  <p v-else class="text-xs font-weight-bold mb-0">{{ equipamento.categoria }}</p>
                </td>
                <td class="align-middle text-center">
                  <input
                    v-if="editEquipamento === equipamento.material_id"
                    type="text"
                    v-model="equipamentoModelo"
                    :placeholder="equipamento.nome"
                  />
                  <span v-else class="text-secondary text-xs font-weight-bold"
                    >{{ equipamento.nome }}</span
                  >
                </td>
                <td class="align-middle text-center">
                  <input
                    v-if="editEquipamento === equipamento.material_id"
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
                    v-if="editEquipamento === equipamento.material_id"
                    href="javascript:;"
                    class="text-secondary font-weight-bold text-xs"
                    data-toggle="tooltip"
                    data-original-title="Save user"
                    @click="handleSaveEquipamento(equipamento.material_id)"
                    >Salvar</a>
                  <a
                    v-else
                    href="javascript:;"
                    class="text-secondary font-weight-bold text-xs"
                    data-toggle="tooltip"
                    data-original-title="Edit user"
                    @click="handleeditEquipamento(equipamento.material_id)"
                    >Edit</a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div v-if="addEquipScreen" class="modal-overlay"></div>
    <div class="addUser modal"
      v-if="addEquipScreen"
    >
    <div class="close" @click="addEquipScreen = false"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABmJLR0QA/wD/AP+gvaeTAAABzUlEQVRYhe3Wy27TYBAF4A+2ZAkRECpuFeVdemFL6RMAZYHaF2FHEQ9QhRYJBDwILCo2sKDsoV2FEMzin8iRaxzbKeqiPZKl5J8zM8dje2Y4w2nHuYb8OdzDIm7Ef/iGr3iPN9g/LoFj9LCFIbIp1wh9XD+u5Cs4iOADbOM+FnAhrgWshm0Q3AMsz5r8iXRHmXRXN2v43MKOvBrrbZOvRIDfeNrCfyN8R1pUoicve5vkkyIy/MSVJo4v5WWfFbsRa6uuw5xUuoHyZ/4Q3ZLzbtiKuB2xhlJlp2JdUrxdYnsUtk8FEd04y4JTRL/CdgQfgrxaYptMNBZRdlbEWtjf1RHwOch3/mEvJpyWnNQnMuzVEXAY5E4F5xI+yrvfHi5X8DvBOywazpeQszoqS1A1V8Z5/tQJdOKP4MRfwsf+32dY1ieO4JrUNAbSYCmiaSOa17ARwQtJ8U5dhwq8jljPmzhdlQ+jjRmSb0aMH6o/01Isy8dxGxGb8nG82MIfaS6MF5JdabBMw7y87CPppZ4JS9I8H69kfTzAXanDdeL3Gl7hl7zsre+8iIt4pt5SOpRmf60FpOla3pNWtSVpV5hcy79Ia/lbfG8Y9wynGH8BHnKpr/YwVJ8AAAAASUVORK5CYII="></div>
      <div style="width: 199px">
        <label>Fornecedor:</label>
        <v-select
            :options="fornecedores"
            label="nome"
            v-model="materialProvider"
        ></v-select>
      </div>
      <div>
          <label>Categoria:</label>
          <input v-model="materialMarca">
      </div>
      <div>
          <label>Nome:</label>
          <input v-model="materialNome">
      </div>
      <div>
          <label>Preco:</label>
          <input v-model="materialPreco">
      </div>
      <button class="addItem" @click="addEquip()">Adicionar</button>
  
      <input type="file" id="mass" @change="onFileChange" style="display: none"/>
      <label for="mass">Adicionar em massa</label>
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
        equipamentos: [],
        fornecedores: [],
        storeName: localStorage.getItem('store'),
        materialMarca: '',
        materialNome: '',
        materialPreco: '',
        addEquipScreen: false,
        editEquipamento: '',
        equipamentoModelo: '',
        equipamentoCategoria: '',
        equipamentoMarca: '',
        equipamentoPreco: '',
        categoryNameSearchString: '',
        materialProvider: '',
        current: 1,
        pageSize: 5,
      };
    },
    computed: {
      filteredEquipements() {
          var filtered = this.equipamentos
          var categoryNameSearchString = this.categoryNameSearchString.toLowerCase()
          if(categoryNameSearchString) {
            filtered = filtered.filter(function(item){
              if(item.categoria.toLowerCase().indexOf(categoryNameSearchString) !== -1 || item.fornecedor.toLowerCase().indexOf(categoryNameSearchString) !== -1 || item.nome.toLowerCase().indexOf(categoryNameSearchString) !== -1) {
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
        return Math.ceil(this.equipamentos.length / this.pageSize)
      }
  },
    created() {
      if (!localStorage.getItem("store")) {
        this.$router.push({name:'/'})
      }
    },
    mounted: function () {
      this.getTableList();
      this.getProviders();
    },
    methods: {
      prev() {
        if (this.current > 1) {
          this.current--;
        }
      },
      next() {
        if (this.current < Math.ceil(this.equipamentos.length / this.pageSize)){
          this.current++;
        }
      },
      getProviders: function() {
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
      getTableList: function () {
        axios
          .get("http://localhost:3001/get-materiais/", {
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
      onFileChange(event) {
        let xlsxfile = event.target.files ? event.target.files[0] : null;
        readXlsxFile(xlsxfile).then((rows) => {
          axios
            .post("http://localhost:3001/register-mass-materiais", {
              storeName: this.storeName,
              equipamentos: rows,
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
              this.addEquipScreen = false
            })
            .catch((error) => {
              console.log(error);
            });
        })
      },
      showAddEquip() {
        this.addEquipScreen = true
      },
      addEquip() {
        axios
          .post('http://localhost:3001/registrar-materiais', {
              storeName: this.storeName,
              fornecedor: this.materialProvider.nome,
              categoria: this.materialMarca,
              nome: this.materialNome,
              preco: this.materialPreco,
          })
          .then(() => {
            this.materialProvider = '';
              this.materialMarca = '';
              this.materialNome = '';
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
  