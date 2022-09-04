<template>
    <div class="addUser">
        <div>
            <label>Servico:</label>
            <input v-model="servico">
        </div>
        <div>
            <label>Valor:</label>
            <input v-model="valor">
        </div>
        <div>
            <label>Data do Pedido:</label>
            <input v-model="datapedido">
        </div>
        <div>
            <label>Observacao:</label>
            <input v-model="observacao">
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
        servico: "",
        valor: "",
        datapedido: "",
        observacao: "",
        storeName: localStorage.getItem('store')
    };
  },
  methods: {
    adicionar() {
        axios
            .post('http://localhost:3001/registrar-pedidos', {
                storeName: this.storeName,
                servico: this.servico,
                valor: this.valor,
                datapedido: this.datapedido,
                observacao: this.observacao,
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