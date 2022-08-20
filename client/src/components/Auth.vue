<template>
    <div class="auth-wrapper">
        <div class="auth-wrapper__left">
            <img height="100" src="@/assets/img/freepik-free-logo.jpg">
        </div>
        <form class="auth-wrapper__right" @submit.prevent>
            <h2 v-if="screen == 'login'" class="h2">Login</h2>
            <h2 v-if="screen == 'register'" class="h2">Cadastre-se</h2>
            <div class="form-group">
                <input type="text" id="storeName" placeholder="Nome da Loja" v-model="storeName">
                <label for="storeName">Nome da Loja</label>    
            </div>
            <div class="form-group">
                <input type="text" id="username" placeholder="Usuario" v-model="username">
                <label for="username">Usuario</label>    
            </div>
            <div class="form-group">
                <input type="password" id="Password" placeholder="Senha" v-model="password">
                <label for="Password">Senha</label>    
            </div>
            <div  v-if="screen == 'login'" class="checkbox-container">
                <input type="checkbox" v-model="rememberMe">
                <span  class="text-checkbox">Lembra usuario?</span>
            </div> 
            <div class="button-area">
                <button v-if="screen == 'login'" class="btn btn-primary pull-right" @click="login()" >Login</button>
                <button v-if="screen == 'register'" class="btn btn-primary pull-right" @click="register()" >Cadastrar</button>
                <a v-if="screen == 'register'" @click="screen = 'login'">Ja possui conta?</a>
                <a v-if="screen == 'login'" @click="screen = 'register'">Ainda nao possui conta?</a>
            </div>
        </form>
    </div>
</template>

<script>
import axios from "axios";
export default {
  name: "auth",
  data() {
    return {
      rememberMe: false,
      username: "",
      password: "",
      storeName: "",
      screen: "login"
    };
  },
  beforeMount() {
    let init = 1000;
    setTimeout(function() {
      document.querySelector(".login-wrapper").classList.toggle("open");
      init = 300;
    }, init);
  },
  methods: { 
    isRememberMe() {
      return this.rememberMe === true;
    },
    login() {
      axios
        .post("http://localhost:3001/login/", {
            storeName: this.storeName,
            username: this.username,
            password: this.password
        })
        .then(res => {
            this.$router.push({name:'home', params: {store: this.storeName, user: this.username}})
        })
        .catch(err => {
          alert(err);
        });
    },
    register() {
       axios
        .post("http://localhost:3001/register/", {
            storeName: this.storeName,
            username: this.username,
            password: this.password
        })
        .then(res => {
            if (res.data == "Usuario cadastrado com sucesso") {
                alert('go porra')
            }
        })
        .catch(err => {
          alert(err);
        });
    }
  }
};
</script>
