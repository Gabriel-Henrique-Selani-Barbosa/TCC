<template>
    <div class="container">
      <div class="blueBg">
          <div class="box signin">
              <h2>Já tem uma conta ?</h2>
              <button class="signinBtn" @click="goToRegister(false)">Entrar</button>
          </div>
          <div class="box signup">
              <h2>Não possui conta ?</h2>
              <button class="signupBtn" @click="goToRegister(true)">Cadastrar-se</button>
          </div>
      </div>
      <div class="formBx" :class="{active: screen}">
          <div class="form signinForm">
              <form @submit.prevent>
                  <h3>Entrar</h3>
                  <input type="text" placeholder="Sua loja" v-model="storeName">
                  <input type="text" placeholder="Seu nome" v-model="username">
                  <input type="password" placeholder="Sua senha" v-model="password">
                  <input type="submit" value="Login" @click="login()">
                  <a href="#" class="forgot">Esqueci minha senha</a>
              </form>
          </div>
          <div class="form signupForm">
              <form @submit.prevent>
                  <h3>Cadastrar-se</h3>
                  <input type="text" placeholder="Sua loja" v-model="storeName">
                  <input type="text" placeholder="Seu nome" v-model="username">
                  <input type="password" placeholder="Sua senha" v-model="password">
                  <input type="password" placeholder="Confirmar senha">
                  <input type="submit" value="Cadastrar-se" @click="register()">
              </form>
          </div>
      </div>
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
      screen: false,
    };
  },
  methods: { 
    isRememberMe() {
      return this.rememberMe === true;
    },
    goToRegister(bool) {
      this.screen = bool
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
