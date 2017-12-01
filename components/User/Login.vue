<template>
  <div class="modal" v-bind:class="{ 'is-active': showLogin }">
    <div class="modal-background"></div>
    <div class="modal-card" style="width: 427px;">
      <header class="modal-card-head">
        <p class="modal-card-title">Welcome to Librarify!</p>
        <button class="delete" aria-label="close" @click="onCancel"></button>
      </header>
      <section class="modal-card-body">
        <div class="field is-horizontal">
          <div class="field-body">
            <div class="field">
              <p class="control is-expanded has-icons-right">
                <input 
                  class="input"
                  v-bind:class="[
                    { 'is-danger': $v.form.email.$error },
                    { 'is-success': !$v.form.email.$error && !$v.form.email.$invalid }
                  ]"
                  type="email" 
                  placeholder="Your Email"
                  v-model.trim="form.email"
                  @input="$v.form.email.$touch()"
                  @blur="$v.form.email.$touch()">
                <span class="icon is-small is-right" v-if="!$v.form.email.$error && !$v.form.email.$invalid">
                  <i class="fa fa-check"></i>
                </span>
                <span class="icon is-small is-right" v-if="$v.form.email.$error">
                  <i class="fa fa-warning"></i>
                </span>
              </p>
              <p class="help is-danger" v-if="$v.form.email.$error">
                {{ emailErrors[0] }}
              </p>              
            </div>
          </div>
        </div>
        <div class="field is-horizontal">
          <div class="field-body">
            <div class="field">
              <p class="control is-expanded has-icons-right">
                  <!-- v-bind:class="[
                    { 'is-danger': $v.form.password.$error },
                    { 'is-success': !$v.form.password.$error && !$v.form.password.$invalid}
                  ]" -->
                <input 
                  class="input"
                  type="password" 
                  placeholder="Your Password" 
                  v-model="form.password"
                  @input="$v.form.password.$touch()"
                  @blur="$v.form.password.$touch()">
                <!-- <span class="icon is-small is-right" v-if="!$v.form.password.$error && !$v.form.password.$invalid">
                  <i class="fa fa-check"></i>
                </span>
                <span class="icon is-small is-right" v-if="$v.form.password.$error">
                  <i class="fa fa-warning"></i>
                </span> -->
              </p>
              <p class="help is-danger" v-if="$v.form.password.$error">
                {{ passwordErrors[0] }}
              </p>
            </div>
          </div>
        </div>
      </section>
      <footer class="modal-card-foot is-inline-block has-text-right">
        <button class="button" @click="onCancel">Cancel</button>
        <button class="button is-success" v-bind:class="{ 'is-loading': getLoading }" v-bind:disabled="$v.form.$invalid" @click="onLogin" >Login</button>
      </footer>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { validationMixin } from 'vuelidate'
import { required, email } from 'vuelidate/lib/validators'
import * as types from '@/types'

export default {
  name: 'login',
  mixins: [ validationMixin ],
  props: [ 'showLogin' ],
  data () {
    return {
      form: {
        email: '',
        password: ''
      }
    }
  },
  validations: {
    form: {
      email: {
        required,
        email
      },
      password: {
        required
      }
    }
  },
  computed: {
    ...mapGetters({
      // getUser: types.USER,
      getLoading: types.LOADING,
      getError: types.ERROR
    }),
    emailErrors () {
      const errors = []
      if (!this.$v.form.email.$dirty) return errors
      !this.$v.form.email.email && errors.push('Must be valid e-mail.')
      !this.$v.form.email.required && errors.push('E-mail is required')
      return errors
    },
    passwordErrors () {
      const errors = []
      if (!this.$v.form.password.$dirty) return errors
      !this.$v.form.password.required && errors.push('Password is required.')
      return errors
    }
  },
  methods: {
    async onLogin () {
      await this.$store.dispatch(types.ACTION_USER_LOGIN_ASYNC, {email: this.form.email, password: this.form.password})
      this.resetLoginForm()
    },
    onCancel () {
      this.resetLoginForm()
      this.$store.commit(types.TOGGLE_LOGIN_MODAL, false)
    },
    onDismissed () {
      this.$store.dispatch(types.CLEAR_ERROR)
    },
    resetLoginForm () {
      this.form = {
        email: '',
        password: ''
      }
      this.$v.$reset()
    }
  }
}
</script>

<style>

</style>
