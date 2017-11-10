<template>
  <div class="modal" v-bind:class="{ 'is-active': showNewBookModal }">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">{{ collectionName }}</p>
        <button class="delete" aria-label="close" @click="onDismissModal"></button>
      </header>
      <section class="modal-card-body">
        <div class="field has-addons has-addons-centered">
          <p class="control"><a class="button is-static is-large"><span class="icon is-medium"><i class="fa fa-barcode fa-lg"></i></span></a></p>
          <p class="control">
            <input class="input is-large" type="text" placeholder="ISBN10 or ISBN13">
          </p>
          <p class="control">
            <button class="button is-large">
              <span class="icon is-medium">
                <i class="fa fa-camera fa-lg"></i>
              </span>
            </button>
          </p>
        </div>
        <p class="has-text-centered">
          <a class="button is-info is-medium">
            <span>Search</span>
          </a>
        </p>
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
