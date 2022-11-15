<script lang="ts">
import LoginContainer from "../components/LoginContainer.vue";
import { RouterLink } from "vue-router";

export default {
  name: "Login",
  components: {
    LoginContainer,
  },
};
</script>

<template>
  <div>
    <h1 class="view-headers">Login</h1>
    <LoginContainer />
    <RouterLink to="/register" class="register-ref"
      >Not registered yet? Register here</RouterLink
    >
  </div>
</template>

<style scoped>
.register-ref {
  max-width: 300px;
  display: grid;
  grid-template-columns: auto;
  margin: 1rem auto 0 auto;
  text-align: center;
}
</style>
