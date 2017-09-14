

<template>
  <li>
    <h2 v-on:click="activateTodolist">{{todoTitleUpCased}} </h2>
    <todo-items v-bind:todolist="todolist"></todo-items>
  </li>
</template>

<script>
  import TodoItems from './TodoItems.vue';

  export default {
    name: 'todolist',
    props: ['todolist'],
    components: {
      todo-items: 'TodoItems'
    },
    computed: {
      todoTitleUpCased: function() {
        return this.todolist.title.toUpperCase();
      }
    },
    methods: {
      activateTodolist: function() {
        var todolist = this.todolist;
        todolist.isActive = !todolist.isActive;
        var index = vm.todos.indexOf(todolist);
        vm.todos.splice(index, 1);
        vm.todos.map(function(todolist){todolist.isActive = false});
        vm.todos.splice(index, 0, todolist);

        if(todolist.isActive) {vm.activeTodo = todolist.id};
      }
    }
  }
</script>

<style></style>
