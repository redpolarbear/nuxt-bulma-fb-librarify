<template>
  <div class="modal" v-bind:class="{ 'is-active': showSignup }">
    <div class="modal-background"></div>
    <div class="modal-card" style="width: 548px;">
      <header class="modal-card-head">
        <p class="modal-card-title">Sign Up</p>
        <button class="delete" aria-label="close" @click="onCancel"></button>
      </header>
      <section class="modal-card-body">
        <div class="field is-horizontal">
          <div class="field-label is-normal">
            <label class="label">Name</label>
          </div>
          <div class="field-body">
            <div class="field">
              <p class="control is-expanded has-icons-left has-icons-right">
                <input 
                  class="input"
                  v-bind:class="[
                    { 'is-danger': $v.form.name.$error },
                    { 'is-success': !$v.form.name.$error && !$v.form.name.$invalid }
                  ]"
                  type="text" 
                  placeholder="Name"
                  v-model="form.name"
                  @input="$v.form.name.$touch()"
                  @blur="$v.form.name.$touch()">
                <span class="icon is-small is-left">
                  <i class="fa fa-user"></i>
                </span>
                <span class="icon is-small is-right" v-if="!$v.form.name.$error && !$v.form.name.$invalid">
                  <i class="fa fa-check"></i>
                </span>
                <span class="icon is-small is-right" v-else-if="$v.form.name.$error">
                  <i class="fa fa-times"></i>
                </span>                
              </p>
              <p class="help is-danger" v-if="$v.form.name.$error">
                {{ nameErrors[0] }}
              </p>              
            </div>
          </div>
        </div>
        <div class="field is-horizontal">
          <div class="field-label is-normal">
            <label class="label">Email</label>
          </div>
          <div class="field-body">
            <div class="field">
              <p class="control is-expanded has-icons-left has-icons-right">
                <input 
                  class="input"
                  v-bind:class="[
                    { 'is-danger': $v.form.email.$error },
                    { 'is-success': !$v.form.email.$error && !$v.form.email.$invalid }
                  ]"
                  type="email" 
                  placeholder="Email"
                  v-model="form.email"
                  @input="$v.form.email.$touch()"
                  @blur="$v.form.email.$touch()">
                <span class="icon is-small is-left">
                  <i class="fa fa-envelope"></i>
                </span>
                <span class="icon is-small is-right" v-if="!$v.form.email.$error && !$v.form.email.$invalid">
                  <i class="fa fa-check"></i>
                </span>
                <span class="icon is-small is-right" v-else-if="$v.form.email.$error">
                  <i class="fa fa-times"></i>
                </span>
              </p>
              <p class="help is-danger" v-if="$v.form.email.$error">
                {{ emailErrors[0] }}
              </p>              
            </div>
          </div>
        </div>
        <div class="field is-horizontal">
          <div class="field-label is-normal">
            <label class="label">Password</label>
          </div>
          <div class="field-body">
            <div class="field">
              <p class="control is-expanded has-icons-left has-icons-right">
                <input 
                  class="input"
                  v-bind:class="[
                    { 'is-danger': $v.form.password.$error },
                    { 'is-success': !$v.form.password.$error && !$v.form.password.$invalid}
                  ]"
                  type="password" 
                  placeholder="Password" 
                  v-model="form.password"
                  @input="$v.form.password.$touch()"
                  @blur="$v.form.password.$touch()">
                <span class="icon is-small is-left">
                  <i class="fa fa-lock"></i>
                </span>
                <span class="icon is-small is-right" v-if="!$v.form.password.$error && !$v.form.password.$invalid">
                  <i class="fa fa-check"></i>
                </span>
                <span class="icon is-small is-right" v-else-if="$v.form.password.$error">
                  <i class="fa fa-times"></i>
                </span>
              </p>
              <p class="help is-danger" v-if="$v.form.password.$error">
                {{ passwordErrors[0] }}
              </p>
            </div>
          </div>
        </div>
        <div class="field is-horizontal">
          <div class="field-label is-normal">
            <label class="label">Confirm Password</label>
          </div>
          <div class="field-body">
            <div class="field">
              <p class="control is-expanded has-icons-left has-icons-right">
                <input 
                  class="input"
                  v-bind:class="[
                    { 'is-danger': $v.form.confirmPassword.$error },
                    { 'is-success': !$v.form.confirmPassword.$error && !$v.form.confirmPassword.$invalid}
                  ]"
                  type="password" 
                  placeholder="Confirm Password" 
                  v-model="form.confirmPassword"
                  @input="$v.form.confirmPassword.$touch()"
                  @blur="$v.form.confirmPassword.$touch()">
                <span class="icon is-small is-left">
                  <i class="fa fa-lock"></i>
                </span>
                <span class="icon is-small is-right" v-if="!$v.form.confirmPassword.$error && !$v.form.confirmPassword.$invalid">
                  <i class="fa fa-check"></i>
                </span>
                <span class="icon is-small is-right" v-else-if="$v.form.confirmPassword.$error">
                  <i class="fa fa-times"></i>
                </span>
              </p>
              <p class="help is-danger" v-if="$v.form.confirmPassword.$error">
                {{ confirmPasswordErrors[0] }}
              </p>
            </div>
          </div>
        </div>
      </section>
      <footer class="modal-card-foot is-inline-block has-text-right">
        <button class="button is-success" v-bind:class="{ 'is-loading': getLoading }" v-bind:disabled="$v.form.$invalid" @click="onSignup">Sign Up</button>
        <button class="button is-right" @click="onCancel">Cancel</button>
      </footer>
    </div>
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, email, minLength, maxLength, sameAs } from 'vuelidate/lib/validators'
import { mapGetters } from 'vuex'
import md5 from 'md5'
import shortid from 'shortid'

import * as types from '@/types'

export default {
  name: 'signup',
  props: [ 'showSignup' ],
  mixins: [validationMixin],
  validations: {
    form: {
      name: {
        required,
        minLength: minLength(3),
        maxLength: maxLength(15)
      },
      email: {
        required,
        email
      },
      password: {
        minLength: minLength(6),
        required
      },
      confirmPassword: {
        minLength: minLength(6),
        sameAsPassword: sameAs('password'),
        required
      }
    }
  },
  data () {
    return {
      form: {
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
      }
    }
  },
  computed: {
    ...mapGetters({
      getUser: types.USER,
      getLoading: types.LOADING
    }),
    nameErrors () {
      const errors = []
      if (!this.$v.form.name.$dirty) return errors
      !this.$v.form.name.maxLength && errors.push(`Name must be at most ${this.$v.form.name.$params.maxLength.max} characters long.`)
      !this.$v.form.name.minLength && errors.push(`Name must be at least ${this.$v.form.name.$params.minLength.min} characters long.`)
      !this.$v.form.name.required && errors.push('Name is required.')
      return errors
    },
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
      !this.$v.form.password.minLength && errors.push('Password must have at least 6 letters.')
      !this.$v.form.password.required && errors.push('Password is required.')
      return errors
    },
    confirmPasswordErrors () {
      const errors = []
      if (!this.$v.form.confirmPassword.$dirty) return errors
      !this.$v.form.confirmPassword.sameAsPassword && errors.push('Passwords do not match!')
      !this.$v.form.confirmPassword.minLength && errors.push('Password must have at least 6 letters.')
      !this.$v.form.confirmPassword.required && errors.push('Confirm Password is required.')
      return errors
    }
  },
  methods: {
    async onSignup () {
      const defaultUserProfile = {
        id: shortid.generate(),
        displayName: this.form.name,
        email: this.form.email,
        password: this.form.password,
        photoURL: `https://www.gravatar.com/avatar/${md5((this.form.email.trim()).toLowerCase())}?d=mm&s=200`,
        location: null,
        about: null
      }
      await this.$store.dispatch(types.ACTION_USER_SIGNUP_ASYNC, defaultUserProfile)
      this.resetSignupForm()
    },
    onCancel () {
      this.resetSignupForm()
      this.$store.commit(types.TOGGLE_SIGNUP_MODAL, false)
    },
    onDismissed () {
      this.$store.dispatch(types.CLEAR_ERROR)
    },
    resetSignupForm () {
      this.form = {
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
      }
      this.$v.$reset()
    }
  }
}
</script>

<style>

</style>
