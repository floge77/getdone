<script lang="ts">
import TodoList from "../components/TodoList.vue"

export default {
  name: "Todo",
  components: {
    TodoList
  },
}

</script>

<template>
  <div>
    <h1 class="view-headers">Your Todos</h1>
    <TodoList/>
  </div>
</template>
