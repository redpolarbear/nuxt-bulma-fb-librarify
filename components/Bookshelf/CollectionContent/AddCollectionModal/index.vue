<template>
  <div class="modal" v-bind:class="{ 'is-active': showAddCollectionModal }">
    <div class="modal-background"></div>
    <div class="modal-card">
      <!-- <header class="modal-card-head">
        <p class="modal-card-title has-text-justified is-inline-flex">
          <span class="icon is-medium"><i class="fa fa-edit fa-lg" aria-hidden="true"></i></span>
          &nbsp;Edit
        </p>
        <button class="delete" aria-label="close" @click="onDismissModal"></button>
      </header> -->
      <section class="modal-card-body">
        <div class="field">
          <label class="label">Collection Name</label>
          <div class="control">
            <input class="input" 
              type="text" 
              v-model.trim="collection.name" 
              v-bind:class="[
                { 'is-danger': $v.collection.name.$error }
              ]"
              @input="delayedTouch($v.collection.name)"
              @blur="$v.collection.name.$touch()">
          </div>
          <p class="help is-danger" v-if="$v.collection.name.$error">
            {{ nameError[0] }}
          </p>
        </div>
        <div class="field">
          <label class="label">Description</label>
          <div class="control">
            <textarea class="textarea" v-model="collection.desc" @input="$v.collection.desc.$touch()"
              @blur="$v.collection.desc.$touch()"></textarea>
          </div>
        </div>
      </section>
      <footer class="modal-card-foot is-inline-block has-text-right">
        <!-- <button class="button" @click="onDismissModal">Cancel</button> -->
        <button class="button" @click="onDismissModal">Cancel</button>
        <button class="button is-success" @click="onSave">Save</button>
      </footer>
    </div>
    <button class="modal-close is-large" aria-label="close" @click="onDismissModal"></button>
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, minLength, maxLength } from 'vuelidate/lib/validators'
import * as types from '@/types'

const touchMap = new WeakMap()

export default {
  name: 'addCollectionModal',
  props: [ 'showAddCollectionModal', 'collection' ],
  mixins: [ validationMixin ],
  validations: {
    collection: {
      name: {
        required,
        minLength: minLength(4),
        maxLength: maxLength(22),
        async isUnique (value) {
          if (value === '') return true
          const result = await this.$store.dispatch(types.ACTION_IS_COLLECTION_NAME_UNIQUE, { name: value, uid: this.collection.uid || null })
          console.log(result)
          return Boolean(result)
        }
      },
      desc: {
        maxLength: maxLength(120)
      }
    }
  },
  computed: {
    nameError () {
      const errors = []
      if (!this.$v.collection.name.$dirty) return errors
      !this.$v.collection.name.required && errors.push('Collection Name is required.')
      !this.$v.collection.name.isUnique && errors.push('Collection Name is existed.')
      !this.$v.collection.name.maxLength && errors.push(`Collection Name must be at most ${this.$v.collection.name.$params.maxLength.max} characters long.`)
      !this.$v.collection.name.minLength && errors.push(`Collection Name must be at least ${this.$v.collection.name.$params.minLength.min} characters long.`)
      return errors
    }
  },
  methods: {
    delayedTouch ($v) {
      $v.$reset()
      if (touchMap.has($v)) {
        clearTimeout(touchMap.get($v))
      }
      touchMap.set($v, setTimeout($v.$touch, 1000))
    },
    onDismissModal () {
      this.$emit('dismissAddCollectionModal', false)
    },
    async onSave () { // TODO: check if the name.trim() is existed
      if (!this.$v.collection.$error && !this.$v.collection.$invalid) {
        await this.$store.dispatch(types.ACTION_SAVE_ONE_COLLECTION_INTO_FB, this.collection)
        this.onDismissModal()
      }
    },
    async isNameUnique () {
      await this.$store.dispatch(types.ACTION_IS_COLLECTION_NAME_UNIQUE)
    }
  }
}
</script>

<style scoped>
section.modal-card-body {
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
}
</style>