<template>
  <span>
    <form>
      <input type="text" title="itemName" placeholder="item name" v-model="itemName">
      <button v-on:click.prevent="saveEditItem" v-bind:disabled="nameTooShort">Modifier</button>
      {{this.tooShortAlert}}
    </form>
  </span>
</template>

<script>
  export default {
    name: 'item-form',
    props: ['todoItem'],
    data: function() {
      return {tooShortAlert: '', itemName: this.todoItem.name}
    },
    computed: {
      nameTooShort: function() {
        if(this.itemName.length < 3) {
          return true;
        }
        return false;
      }
    },
    methods: {
      saveEditItem: function() {
        this.todoItem.name = this.itemName;
        this.$emit('saveItem');
      }
    },
    watch: {
      itemName: function(value) {
        if(this.itemName.length < 3) {
          this.tooShortAlert = 'too short!';
        } else {
          this.tooShortAlert = '';
        };
      }
    }
  }
</script>
