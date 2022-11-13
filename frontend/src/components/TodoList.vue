<script lang="ts">

    export default {
        data() {
            return {
                todos: [],
            }
        },
        created() {
            this.getTodos()
        },
        methods: {
            async getTodos() {
                try {
                    const resp = await fetch("http://localhost:3000/api/todo")
                    const responseJson = await resp.json()
                    console.log(responseJson)
                    this.todos = responseJson
                    console.log(this.todos)
                } catch(e) {
                    console.log(`could not receive todos: ${e}`)
                }
            }
        }
    }
</script>


<template>
    <div class="todolist-container todolist-container-header">
        <div class="grid-item">Todo</div>
        <div class="grid-item"> to be done until</div>
    </div>
    <div class="todolist-container"  v-for="todo in todos" :key="todo.name">
        <div :class="{ done: todo.done }" class="grid-item">{{ todo.name }}</div>
        <div :class="{ done: todo.done }" class="grid-item">{{ todo.until }}</div>
    </div>
</template>

<style scoped>
.done {
  text-decoration: line-through;
}

.todolist-container {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
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
    text-decoration: solid;
}
</style>
