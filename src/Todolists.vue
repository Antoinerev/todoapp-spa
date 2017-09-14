<template>
  <ul v-on:activateTodolist="activationOfTodolist"> <!-- list of todos -->
    <div v-for="todolist in todos" >
      <todolist v-bind:todolist="todolist" :isActive="todolist.isActive" v-bind:class="{active: todolist.isActive}" ></todolist>

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
