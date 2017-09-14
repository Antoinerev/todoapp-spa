<template>
  <div class="todolists">
    <ul class="small-box">
      <li v-for="todoItem in todolist.all_items"
        v-bind:class="{active: todoItem.isActive}">
        <item v-bind:todo-item="todoItem" v-on:activateItem="activateItemInTodo(todoItem)" v-on:deleteItem="deleteItemInTodo(todoItem)"></item>
        <item-form v-if="todoItem.isActive" v-bind:todo-item="todoItem" v-on:saveItem="editItemInTodo(todoItem)"></item-form>
      </li>
    </ul>
  </div>
</template>

<script>
  import Item from './Item.vue';
  import ItemForm from './ItemForm.vue';

  export default {
    name: 'todo-items',
    props: ['todolist'],
    components: {
      item: 'Item',
      item-form: 'ItemForm'
    },
    methods: {
      activateItemInTodo: function(todoItem) {
        todoItem.isActive = !todoItem.isActive;
        var index = this.todolist.all_items.indexOf(todoItem);
        this.todolist.all_items.splice(index, 1);
        this.todolist.all_items.map(function(item) {item.isActive = false});
        this.todolist.all_items.splice(index, 0, todoItem);
        // this.this.todolist.all_items.push(todoItem).sort();
      },
      editItemInTodo: function(todoItem) {
        var todoId = this.todolist.id;
        let ajaxEditUrl = 'http://localhost:3000/api/todos/todos/'+ todoId +'/items/' + todoItem.id
        $.ajax({
          type: "PATCH",
          url: ajaxEditUrl,
          data: todoItem,
          success: function(data) {
          }
        });
      },
      deleteItemInTodo: function(todoItem) {
        var todoId = this.todolist.id;
        let ajaxDeleteUrl = 'http://localhost:3000/api/todos/todos/'+ todoId +'/items/' + todoItem.id
        this.todolist.all_items = this.todolist.all_items.filter(function(item) { return item.id !== todoItem.id});
        $.ajax({
          type: "DELETE",
          url: ajaxDeleteUrl,
          // data: todoItem,
          success: function(data) {
          }
        });
      }
    }
  }
</script>
