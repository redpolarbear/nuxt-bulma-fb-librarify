<template>
  <div class="modal" v-bind:class="{ 'is-active': showNewCollectionModal }">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title"></p>
        <button class="delete" aria-label="close" @click="onDismissModal"></button>
      </header>
      <section class="modal-card-body">
      <!-- Content ... -->
      </section>
      <footer class="modal-card-foot is-inline-block has-text-right">
        <button class="button" @click="onDismissModal">Cancel</button>
        <button class="button is-success">Save</button>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  name: 'newCollectionModal',
  props: [ 'showNewCollectionModal' ],
  methods: {
    onDismissModal () {
      this.$emit('dismissNewCollectionModal', false)
    }
  }

}
</script>

<style>

</style>
