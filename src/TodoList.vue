<template>
  <li>
    <h2 v-on:click.prevent="activateTodolist">{{todoTitleUpCased}} - {{this.todolist.isActive}} </h2>
    <todo-items v-bind:todolist="todolist"></todo-items>
    <form v-if="isActive" v-on:submit.prevent="addItem(todolist)" >
      <label>
        Add New Item:
      </label>
        <input type="text" title="itemName" placeholder="item name" v-model="newTodoItem.name">
      <button type="submit" v-bind:disabled="fieldEmpty">Ajouter</button>
    </form>
  </li>
</template>

<script>
  import TodoItems from './TodoItems.vue';

  export default {
    name: 'todolist',
    props: ['todolist', 'isActive'],
    data () {
      return {
        newTodoItem: {name: ""}
      }
    },
    components: {
      'todo-items': TodoItems
    },
    computed: {
      todoTitleUpCased: function() {
        return this.todolist.title.toUpperCase();
      },
      fieldEmpty: function() {
        if(this.newTodoItem.name == "") {
          return true;
        };
        return false;
      }
    },
    methods: {
      activateThisTodolist() {
        this.todolist.isActive = true;
        this.$emit('activateTodolist');
      },
      activateTodolist: function() {
        var todolist = this.todolist;
        todolist.isActive = !todolist.isActive;
        var index = this.$parent.todos.indexOf(todolist);
        this.$parent.todos.splice(index, 1);
        this.$parent.todos.map(function(todolist){todolist.isActive = false});
        this.$parent.todos.splice(index, 0, todolist);

        if(todolist.isActive) {this.$parent.activeTodo = todolist.id};
      },
      addItem: function(todolist) {
        let ajaxNewUrl = "http://localhost:3000/api/todos/todos/"+todolist.id+"/items/";
        // let _this = this;
        let ajaxNewTodoItem = this.newTodoItem;
        console.log('this: '+this.newTodoItem);
        $.ajax({
          type: "POST",
          url: ajaxNewUrl,
          data: ajaxNewTodoItem,
          success: function(data){
            // console.log(data.length);
          },
          error: function(jqXHR){
            console.log("error");
          }
        })
        .then(function(response) {
          // var lastIndex = response.all_items.length -1;
          // var newItem = response.all_items[lastIndex];
          todolist.all_items = response.all_items;
        });
        this.newTodoItem.name = "";
      }
    }
  }
</script>

<style></style>
