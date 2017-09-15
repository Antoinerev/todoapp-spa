<template>
  <div id="app">
    <div class="app-content">
      <div class="todobox">
        <!-- <todolists v-bind:todos='todos'></todolists> -->
        <router-view v-bind:todos='todos'></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import Todolists from './Todolists.vue';

export default {
  name: 'app',
  components: {
    'todolists': Todolists
  },
  data: function() {
    return {
      todoTitle: "Here are your lists",
      // item: {title},
      todoName: "",
      todos: [],
      // todolist: null,
      // todoListId: 0,
      // todoItem: {name:"", },
      // todoItems: [],
      // activeTodo: 0
    }
  },
  created: function() {
    // let ajaxUrlLocal = 'http://localhost:3000/api/todos/todos/1/items';
    let ajaxUrlLocal = 'http://localhost:3000/api/todos/todos/';
    // var _this = this;
    $.get(ajaxUrlLocal)
    .then((data) => {
      if(data.length) {
        this.todos = data;
      } else {
        this.todos = [data];
      }
      // console.log('in created: '+_this.todos);
      this.todos.map(function(todolist) {
        todolist.isActive = false;
        todolist.all_items.map(function(item) {
          item.isActive = false;
        });
      });
    });
    // $.ajax({
    //   type: "GET",
    //   url: ajaxUrlLocal,
    //   success: function(data){
    //   },
    //   error: function(jqXHR){
    //     console.log("error");
    //   }
    // })
    // .then(function(data) {
    //   if(data.length) {
    //     _this.todos = data;
    //   } else {
    //     _this.todos = [data];
    //   }
    //   // console.log('in created: '+_this.todos);
    //   _this.todos.map(function(todolist) {
    //     todolist.isActive = false;
    //     todolist.all_items.map(function(item) {
    //       item.isActive = false;
    //     });
    //   });
    // });
  },
  methods: {
    addTodo: function() {
      this.todos.push({id: Date.now(), name: this.todoName});
      this.todoName = null;
    }
  }
}
</script>

<style>
body {
  margin: 0;
  padding: 0;
  font-family: sans-serif;
}
li {
  cursor: pointer;
  list-style: none;
}
.App {
  text-align: center;
}

.App-logo {
  animation: App-logo-spin infinite 20s linear;
  height: 80px;
}

.App-header {
  background-color: #222;
  height: 150px;
  padding: 20px;
  color: white;
}

.App-intro {
  font-size: large;
}

@keyframes App-logo-spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
.small-box {
  width: 400px;
  /*border-style: solid;*/
}
.App-content {
 /* border-color: red;
  border-radius: 4px;
  border-style: solid;
  border-width: 2px;
  height: 600px;*/
}
.todobox {
  /*border-color: black;
  border-radius: 4px;
  border-style: solid;
  border-width: 2px;*/
  display: flex;
  flex-direction: column;
  align-items: center;
}
.TodoTitle {
  /*text-decoration: bold;*/
}
.todolists {
  text-align: left;
}
.active {
  background-color: rgba(0,255,0,0.2);
}
.itemBox {
  width: 300px;
  /*border-bottom: solid;
  border-width: 1px;
  border-color: grey;*/
  display: flex;
  direction: row;
  justify-content: space-between;
}
/************************************************************/
/*MODAL*/

.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 300px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

</style>
