<template>
    <div class="addUser">
        <div>
            <label>Nome:</label>
            <input v-model="nome">
        </div>
        <div>
            <label>Cnpj/Cpf:</label>
            <input v-model="cnpjcpf">
        </div>
        <div>
            <label>Produto:</label>
            <input v-model="produto">
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
        nome: "",
        cnpjcpf: "",
        produto: "",
        storeName: localStorage.getItem('store')
    };
  },
  methods: {
    adicionar() {
        axios
            .post('http://localhost:3001/registrar-fornecedores', {
                storeName: this.storeName,
                nome: this.nome,
                cnpjcpf: this.cnpjcpf,
                produto: this.produto,
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