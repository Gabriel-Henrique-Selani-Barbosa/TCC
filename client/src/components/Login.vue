<template>
    <div class="login-wrapper">
        <div class="login-wrapper__left">
            <img height="100" src="@/assets/freepik-free-logo.jpg">
        </div>
        <form class="login-wrapper__right" @submit.prevent>
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
  name: "login",
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

<style lang="scss">

.login-wrapper {
    width: 800px;
    height: 440px;
    background-color: #fff;
    box-shadow: 0px 2px 50px rgb(0 0 0 / 20%);
    border-radius: 4px;
    overflow: hidden;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    &__left {
        width: 50%;
        height: 100%;
        overflow: hidden;
        img {
            width: auto;
            height: 100%;
        }
    }
    &__right {
        width: 50%;
        height: 100%;
        padding: 40px;
        h2 {
            color: #000;
            font-size: 20px;
            letter-spacing: -0.00933333em;
            font-weight: 600;
            padding-bottom: 15px;
        }
        .form-group {
            position: relative;
            padding-top: 15px;
            margin-top: 10px;
            input {
                font-family: inherit;
                -webkit-appearance: none;
                -moz-appearance: none;
                border: 0;
                font-size: 16px;
                color: #000;
                border-radius: 0;
                &[type="text"], &[type="password"] {
                    width: 100%;
                    height: 40px;
                    border-bottom: 1px solid #aaaaaa;
                }
                &+label {
                    position: absolute;
                    top: 0;
                    opacity: 1;
                    transform: translateY(5px);
                    color: #aaa;
                    font-weight: 300;
                    font-size: 13px;
                    letter-spacing: -0.00933333em;
                    transition: all 0.2s ease-out
                }
                &:placeholder-shown + label {
                    opacity: 0;
                    transform: translateY(15px);
                }
            }
        }
        .checkbox-container {
            display: flex;
            margin-top: 35px;
        }
        .button-area {
            display: flex;
            justify-content: space-between;
            margin-top: 30px;
        }
    }
}
</style>
