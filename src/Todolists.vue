<template>
  <ul v-on:activateTodolist="activationOfTodolist"> <!-- list of todos -->
    <div v-for="todolist in todos" >
      <todolist v-bind:todolist="todolist" :isActive="todolist.isActive" v-bind:class="{active: todolist.isActive}" class="todolist-box"></todolist>

    </div>
  </ul>
</template>

<script>
  import Todolist from './Todolist.vue';

  export default {
    name: 'todolists',
    props: ['todos'],
    components: {
      'todolist': Todolist
    },
    methods: {
      activationOfTodolist () {
        console.log('activation');
      }
    }
  }
</script>

<style>
  .todolist-box {
    border: 2px solid grey;
    border-radius: 4px;
    margin: 4px;
    padding: 4px;
  }
</style>
