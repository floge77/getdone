<script lang="ts">
import { backendURL } from "../main"
import { JwtResponse, LoginModel } from '../models/UserModels'

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
        let user: LoginModel = new LoginModel(
          this.username,
          this.password
        )
        const response = await fetch(`${backendURL}/auth/login`, {
          method: "POST",
          body: JSON.stringify(user),
          headers: { "Content-Type": "application/json; charset=UTF-8" },
        })

        if(!response.ok) {
          throw new Error(`Error! status: ${response.status}`)
        }

        const result = (await response.json() as JwtResponse)
        console.log(`successfully logged in. JWT: ${result.token}`)
      } catch (e) {
        console.log(`failed login for user: ${this.username}: ${e}`);
      }
    },
  },
};
</script>

<template>
  <div class="register-parent">
    <form @submit.prevent="login" class="register-child">
      <input type="username" placeholder="Username..." v-model="username" />
      <input type="password" placeholder="password..." v-model="password" />
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<style scoped>
.register-parent {
  max-width: 100%;
  margin-top: 1rem;
}
.register-child {
  max-width: 300px;
  display: grid;
  grid-template-columns: auto;
  margin: 0 auto 0 auto;
}
input {
  width: auto;
  height: auto;
  margin-bottom: 10px;
  align-self: center;
}
input:focus {
  outline: none !important;
  border: 2px solid #f8874f;
}
button {
  margin-top: 10px;

  cursor: pointer;
}
</style>
