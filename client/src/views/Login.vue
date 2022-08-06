<template>
  <div class="login">
    <login></login>
  </div>
</template>

<script>
import login from '@/components/Login.vue'
export default {
  name: 'LoginForm',
  components: {
   login,
  },
}
</script>

<style>
body,
html {
  padding: 0;
  margin: 0;
  height: 100%;
}
</style>