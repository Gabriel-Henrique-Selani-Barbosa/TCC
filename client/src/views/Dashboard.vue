<template>
  <div class="py-4 container-fluid">
      <span style="text-align: center; display: flex;">
        Colaboradores:<br>
          Denis de Sousa Rocha – F0168E0<br>
          Gabriel Henrique Selani Barbosa – N4698B9<br>
          Jeferson Gustavo Figueira – D922FJ0<br>
          Ruan Carlos Rocha Falcão – F097366<br>
          Yago Alan Cordeiro da Silva – F0386D0<br>

          Principal objetivo com o projeto: 
          O principal objetivo é facilitar o trabalho realizado pelo colaborador, afim de simplificar seu dia-a-dia na empresa além de permitir a mesma de ter um controle melhor dos seus dados.</span>
  </div>
</template>
<script>
import US from "../assets/img/icons/flags/US.png";
import DE from "../assets/img/icons/flags/DE.png";
import GB from "../assets/img/icons/flags/GB.png";
import BR from "../assets/img/icons/flags/BR.png";
import {
  faHandPointer,
  faUsers,
  faCreditCard,
  faScrewdriverWrench,
} from "@fortawesome/free-solid-svg-icons";
export default {
  name: "dashboard-default",
  data() {
    return {
      iconBackground: "bg-gradient-success",
      faCreditCard,
      faScrewdriverWrench,
      faUsers,
      faHandPointer,
      sales: {
        us: {
          country: "United States",
          sales: 2500,
          value: "$230,900",
          bounce: "29.9%",
          flag: US,
        },
        germany: {
          country: "Germany",
          sales: "3.900",
          value: "$440,000",
          bounce: "40.22%",
          flag: DE,
        },
        britain: {
          country: "Great Britain",
          sales: "1.400",
          value: "$190,700",
          bounce: "23.44%",
          flag: GB,
        },
        brasil: {
          country: "Brasil",
          sales: "562",
          value: "$143,960",
          bounce: "32.14%",
          flag: BR,
        },
      },
    };
  },
  created() {
    if (!localStorage.getItem("store")) {
      this.$router.push({name:'/'})
    }
  }
}
</script>
