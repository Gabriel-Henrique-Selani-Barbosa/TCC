<template>
  <div class="auth">
    <auth></auth>
  </div>
</template>

<script>
import auth from '@/components/Auth.vue'
export default {
  name: 'LoginForm',
  components: {
   auth,
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