<script lang="ts">
import { backendURL } from "../main";
import { JwtResponse, LoginModel } from "../models/UserModels";

export default {
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    async login() {
      if (!(this.username && this.password)) {
        return;
      }

      try {
        let user: LoginModel = new LoginModel(this.username, this.password);
        const response = await fetch(`${backendURL}/auth/login`, {
          method: "POST",
          body: JSON.stringify(user),
          headers: { "Content-Type": "application/json; charset=UTF-8" },
        });

        if (!response.ok) {
          throw new Error(`Error! status: ${response.status}`);
        }

        const result = (await response.json()) as JwtResponse;
        console.log(`successfully logged in. JWT: ${result.token}`);
        localStorage.setItem('user', result.token)
      } catch (e) {
        console.log(`failed login for user: ${this.username}: ${e}`);
      }
    },
  },
};
</script>

<template>
  <div >
    <form @submit.prevent="login" class="register-login-child">
      <input type="username" placeholder="Username..." v-model="username" />
      <input type="password" placeholder="password..." v-model="password" />
      <button type="submit">Login</button>
    </form>
  </div>
</template>
