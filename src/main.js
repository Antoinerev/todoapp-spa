import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import Todolists from './Todolists.vue';
import TodolistDetails from './TodolistDetails.vue';

Vue.use(VueRouter);

const routes = [
  {path: '/', redirect: '/todolists'},
  {path: '/todolists', component: Todolists},
  {path: '/todolists/:id', component: TodolistDetails, props: true}
];

const router = new VueRouter({
  // routes: routes
  routes
});

new Vue({
  el: '#app',
  router,
  render: h => h(App)
});
