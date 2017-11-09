<template>
  <div class="modal" v-bind:class="{ 'is-active': showNewBookModal }">
    <div class="modal-background"></div>
    <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">{{ collectionName }}</p>
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
  name: 'newBookModal',
  props: [ 'collectionName', 'showNewBookModal' ],
  methods: {
    onDismissModal () {
      this.$emit('dismissNewBookModal', false)
    }
  }

}
</script>

<style>

</style>
