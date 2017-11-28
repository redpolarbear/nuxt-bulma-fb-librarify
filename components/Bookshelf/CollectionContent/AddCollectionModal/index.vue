<template>
  <div class="modal" v-bind:class="{ 'is-active': showAddCollectionModal }">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title has-text-justified is-inline-flex">
          <span class="icon is-medium"><i class="fa fa-edit fa-lg" aria-hidden="true"></i></span>
          &nbsp;Edit
        </p>
        <button class="delete" aria-label="close" @click="onDismissModal"></button>
      </header>
      <section class="modal-card-body">
        <div class="field">
          <label class="label">Name</label>
          <div class="control">
            <input class="input" type="text">
          </div>
        </div>
        <div class="field">
          <label class="label">Message</label>
          <div class="control">
            <textarea class="textarea"></textarea>
          </div>
        </div>
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
  name: 'addCollectionModal',
  props: [ 'showAddCollectionModal' ],
  methods: {
    onDismissModal () {
      this.$emit('dismissAddCollectionModal', false)
    }
  }
}
</script>

<style scoped>

</style>