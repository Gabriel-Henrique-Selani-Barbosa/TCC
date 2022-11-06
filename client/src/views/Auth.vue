<template>
  <div style="display: flex; width: 100%; height: 100vh; justify-content: center; align-items: center;">
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
            </form>
        </div>
        <div class="form signupForm">
            <form @submit.prevent>
                <h3>Cadastrar-se</h3>
                <input type="text" placeholder="Sua loja" v-model="storeName">
                <input type="text" placeholder="Seu nome" v-model="username">
                <input type="password" placeholder="Sua senha" v-model="password">
                <input type="password" placeholder="Confirmar senha" v-model="confirmPassword">
                <input type="submit" value="Cadastrar-se" @click="register()">
            </form>
        </div>
    </div>
</div>
</div>
</template>

<script>
import axios from "axios";
import { mapMutations } from "vuex";
export default {
name: "auth",
data() {
  return {
    rememberMe: false,
    username: "",
    password: "",
    confirmPassword: "",
    storeName: "",
    screen: false,
  };
},
created() {
    this.toggleEveryDisplay();
    this.toggleHideConfig();
  },
  beforeUnmount() {
    this.toggleEveryDisplay();
    this.toggleHideConfig();
  },
methods: {
  ...mapMutations(["toggleEveryDisplay", "toggleHideConfig"]),
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
      .then(() => {
        localStorage.setItem('store', this.storeName)
        localStorage.setItem('user', this.username)
        this.$router.push({name:'Dashboard'})
      })
      .catch((err) => {
        alert(err);
      });
  },
  register() {
    if (this.password == this.confirmPassword) {
      axios
      .post("http://localhost:3001/register/", {
          storeName: this.storeName,
          username: this.username,
          password: this.password
      })
      .then((res) => {
          if (res.data == "Usuario cadastrado com sucesso") {
            localStorage.setItem('store', this.storeName)
            localStorage.setItem('user', this.username)
            this.$router.push({name:'Dashboard'})
          }
      })
      .catch((err) => {
        alert(err);
      });
    }else {
      alert('As senhas nao correspondem')
    }

  }
}
};
</script>
