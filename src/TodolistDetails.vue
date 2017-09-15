<template>
  <div>
    <h2>{{todolist.id}}/ {{todoTitleUpCased}}</h2>
    <todo-items v-bind:todolist="todolist"></todo-items>
    <form v-on:submit.prevent="addItem(todolist)" >
      <label>
        Add New Item:
      </label>
        <input type="text" title="itemName" placeholder="item name" v-model="newTodoItem.name">
      <button type="submit" v-bind:disabled="fieldEmpty">Ajouter</button>
    </form>
    <hr>
    <router-link to='/'>retour</router-link>
  </div>
</template>

<script>
import TodoItems from './TodoItems.vue';

export default {
  name: 'TodolistDetails',
  components: {'todo-items': TodoItems},
  data () {
    return {
      newTodoItem: {name: ""}
    }
  },
  computed:{
    todolist(){
      let id = this.$route.params.id;
      var result = $.grep(this.$parent.todos, function(todolist) {return todolist.id == id;});
      return result[0];
    },
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
    addItem: function(todolist) {
      let ajaxNewUrl = "http://localhost:3000/api/todos/todos/"+todolist.id+"/items/";

      $.post(ajaxNewUrl, this.newTodoItem)
        .then((response) => {
          todolist.all_items = response.all_items;
        });
      this.newTodoItem.name = "";
    }
  }
}

</script>
