<template>
    <div class="addUser">
        <div>
            <label>Categoria:</label>
            <input v-model="categoria">
        </div>
        <div>
            <label>Marca:</label>
            <input v-model="marca">
        </div>
        <div>
            <label>Modelo:</label>
            <input v-model="modelo">
        </div>
        <div>
            <label>Preco:</label>
            <input v-model="preco">
        </div>
        <button @click="adicionar()">Adicionar</button>
    </div>
</template>
<script>
import axios from "axios";
export default {
  name: "addUser",  
    data() {
    return {
        categoria: "",
        marca: "",
        modelo: "",
        preco: "",
        storeName: localStorage.getItem('store')
    };
  },
  methods: {
    adicionar() {
        axios
            .post('http://localhost:3001/registrar-equipamentos', {
                storeName: this.storeName,
                categoria: this.categoria,
                marca: this.marca,
                modelo: this.modelo,
                preco: this.preco,
            })
            .then((res) => {
                alert(res)
            })
            .catch((err) => {
                console.log(err)
            })
    }
  }
}
</script>
<style>
    .addUser {
        position: fixed;
        width: 90%;
        max-width: 450px;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
    }
</style>