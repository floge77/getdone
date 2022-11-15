<script lang="ts">
export default {
  data() {
    return {
      todos: [],
    };
  },
  created() {
    this.getTodos();
  },
  methods: {
    async getTodos() {
      try {
        let token = localStorage.getItem("user");
        if (!token) {
          return [];
        }
        const resp = await fetch("http://localhost:3000/api/todo", {
          method: "GET",
          headers: {
            "Content-Type": "application/json; charset=UTF-8",
            auth: token,
          },
        });
        const responseJson = await resp.json();
        this.todos = responseJson;
      } catch (e) {
        console.log(`could not receive todos: ${e}`);
      }
    },
  },
};
</script>

<template>
  <div class="todolist-container">
    <div class="grid-item todolist-container-header">Todo</div>
    <div class="grid-item todolist-container-header">to be done until</div>
  </div>
  <div class="todolist-container" v-for="todo in todos" :key="todo.id">
    <div :class="{ done: todo.done }" class="grid-item">{{ todo.text }}</div>
    <div :class="{ done: todo.done }" class="grid-item">{{ todo.until }}</div>
  </div>
</template>

<style scoped>
.done {
  text-decoration: line-through;
}

.todolist-container {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  grid-auto-columns: auto;
  grid-auto-flow: column;
}
.grid-item {
  border: 1px solid rgba(0, 0, 0, 0.8);
  padding: 20px;
  font-size: 30px;
  text-align: center;
}
.todolist-container-header {
  font-weight: bold;
}
</style>
