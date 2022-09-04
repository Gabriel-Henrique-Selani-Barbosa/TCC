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
            <label>Estado:</label>
            <input v-model="estado">
        </div>
        <div>
            <label>Cidade:</label>
            <input v-model="cidade">
        </div>
        <div>
            <label>Endereco:</label>
            <input v-model="endereco">
        </div>
        <div>
            <label>Numero:</label>
            <input v-model="numero">
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
        estado: "",
        cidade: "",
        endereco: "",
        numero: "",
        storeName: localStorage.getItem('store')
    };
  },
  methods: {
    adicionar() {
        axios
            .post('http://localhost:3001/registrar-cliente', {
                storeName: this.storeName,
                nome: this.nome,
                cnpjcpf: this.cnpjcpf,
                estado: this.estado,
                cidade: this.cidade,
                endereco: this.endereco,
                numero: this.numero,
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