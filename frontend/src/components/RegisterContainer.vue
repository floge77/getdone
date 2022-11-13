<script lang="ts">
import { MessageResponse, RegisterModel } from "@/models/UserModels";
import { backendURL } from "../main"

export default {
  data() {
    return {
      username: "",
      email: "",
      password: "",
    };
  },
  methods: {
    async registerUser() {
      console.log(
        `New user will be registered: username: ${this.username}, email: ${this.email}, password: ${this.password}`
      );
      if (!(this.username && this.password && this.email)) {
        return
      }

      try {
        let user: RegisterModel = new RegisterModel(
            this.username,
            this.email,
            this.password
        )
        const response = await fetch(`${backendURL}/auth/register`, {
          method: "POST",
          body: JSON.stringify(user),
          headers: { "Content-Type": "application/json; charset=UTF-8" },
        })
        if(!response.ok) {
          throw new Error(`Error! status: ${response.status}`)
        }
        const result = (await response.json() as MessageResponse)
        console.log(`user created. response: ${result.message}`)
      } catch (e) {
        console.log(`failed registration for user: ${this.username}: ${e}`);
      }
    },
  },
};
</script>

<template>
  <div class="register-parend">
    <form @submit.prevent="registerUser" class="register-child">
      <input type="username" placeholder="Username..." v-model="username" />
      <input type="email" placeholder="Email address..." v-model="email" />
      <input type="password" placeholder="password..." v-model="password" />
      <button type="submit">Register</button>
    </form>
  </div>
</template>

<style scoped>
.register-parent {
  max-width: 100%;
  margin-top: 80px;
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
