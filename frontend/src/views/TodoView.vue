<script lang="ts">
import TodoList from "../components/TodoList.vue";

export default {
  name: "Todo",
  components: {
    TodoList,
  },
  computed: {
    username() {
      let token = localStorage.getItem("user");
      if (!token) {
        return "";
      }
      let decodedToken = JSON.parse(atob(token.split(".")[1]));
      return decodedToken.name;
    },
  },
};
</script>

<template>
  <div>
    <h1 class="view-headers" v-if="!username">Your Todos</h1>
    <h1 class="view-headers" v-else>{{ username }}'s Todos</h1>
    <TodoList v-if="username" />
  </div>
</template>
