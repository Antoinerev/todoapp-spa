<template>
  <span>
    <h3>
      <i class="fa fa-pencil-square-o" aria-hidden="true" v-on:click="activateTodoItem()"> -
        <span>{{todoItem.id}} - {{todoItem.name}}</span>
      </i>
       - <i class="fa fa-trash-o" aria-hidden="true" id="show-modal" @click="showModal = true"></i>
      <modal v-if="showModal" @close="showModal = false">
        <h3 slot="header">Confirmer la suppression ?</h3>
        <div slot="body">La tache "{{todoItem.name | shorten}}" va être definitivement supprimée</div>
        <p slot="footer">
          <button class="modal-default-button" @click="showModal = false">
            Annuler
          </button>
          <button class="modal-default-button" @click="deleteItem">
            OK
          </button>
        </p>
      </modal>

    </h3>
  </span>
</template>

<script>
  import Modal from './Modal.vue';

  export default {
    name: 'item',
    data: function() {
      return {showModal: false}
    },
    props: ['todoItem'],
    components: {
      'modal': Modal
    },
    methods: {
      activateTodoItem: function() {
        this.$emit('activateItem');
      },
      deleteItem: function() {
        this.showModal = false;
        this.$emit('deleteItem');
      }
    },
    filters: {
      shorten: function(value) {
        if(value.length > 10) {
          return value.slice(0, 7) + '...'
        }
        return value
      }
    }
  }
</script>


