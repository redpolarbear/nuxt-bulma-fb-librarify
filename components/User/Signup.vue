<template>
  <div class="modal" v-bind:class="{ 'is-active': showSignup }">
    <div class="modal-background"></div>
    <div class="modal-card" style="width: 427px;">
      <header class="modal-card-head">
        <p class="modal-card-title">Sign Up</p>
        <button class="delete" aria-label="close" @click="onCancel"></button>
      </header>
      <section class="modal-card-body">
        <!-- START: first name and last name inputs -->
        <div class="field is-horizontal">
          <div class="field-body">
            <div class="field">
              <p class="control is-expanded has-icons-right">
                <input 
                  class="input"
                  v-bind:class="[
                    { 'is-danger': $v.form.firstName.$error },
                    { 'is-success': !$v.form.firstName.$error && !$v.form.firstName.$invalid }
                  ]"
                  type="text" 
                  placeholder="First Name"
                  v-model.trim="form.firstName"
                  @input="$v.form.firstName.$touch()"
                  @blur="$v.form.firstName.$touch()">
                <span class="icon is-small is-right" v-if="!$v.form.firstName.$error && !$v.form.firstName.$invalid">
                  <i class="fa fa-check"></i>
                </span>
                <span class="icon is-small is-right" v-else-if="$v.form.firstName.$error">
                  <i class="fa fa-warning"></i>
                </span>                
              </p>
              <p class="help is-danger" v-if="$v.form.firstName.$error">
                {{ firstNameErrors[0] }}
              </p>              
            </div>
            <div class="field">
              <p class="control is-expanded has-icons-right">
                <input 
                  class="input"
                  v-bind:class="[
                    { 'is-danger': $v.form.lastName.$error },
                    { 'is-success': !$v.form.lastName.$error && !$v.form.lastName.$invalid }
                  ]"
                  type="text" 
                  placeholder="Last Name"
                  v-model.trim="form.lastName"
                  @input="$v.form.lastName.$touch()"
                  @blur="$v.form.lastName.$touch()">
                <span class="icon is-small is-right" v-if="!$v.form.lastName.$error && !$v.form.lastName.$invalid">
                  <i class="fa fa-check"></i>
                </span>
                <span class="icon is-small is-right" v-else-if="$v.form.lastName.$error">
                  <i class="fa fa-warning"></i>
                </span>                
              </p>
              <p class="help is-danger" v-if="$v.form.lastName.$error">
                {{ lastNameErrors[0] }}
              </p>              
            </div>
          </div>
        </div>
        <!-- END: first name and last name inputs -->
        <!-- START: email inputs -->
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
                  placeholder="Email"
                  v-model.trim="form.email"
                  @input="$v.form.email.$touch()"
                  @blur="$v.form.email.$touch()">
                <span class="icon is-small is-right" v-if="!$v.form.email.$error && !$v.form.email.$invalid">
                  <i class="fa fa-check"></i>
                </span>
                <span class="icon is-small is-right" v-else-if="$v.form.email.$error">
                  <i class="fa fa-warning"></i>
                </span>
              </p>
              <p class="help is-danger" v-if="$v.form.email.$error">
                {{ emailErrors[0] }}
              </p>              
            </div>
          </div>
        </div>
        <!-- END: email inputs -->
        <!-- START: password inputs -->
        <div class="field is-horizontal">
          <div class="field-body">
            <div class="field">
              <p class="control is-expanded has-icons-right">
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
                <span class="icon is-small is-right" v-if="!$v.form.password.$error && !$v.form.password.$invalid">
                  <i class="fa fa-check"></i>
                </span>
                <span class="icon is-small is-right" v-else-if="$v.form.password.$error">
                  <i class="fa fa-warning"></i>
                </span>
              </p>
              <p class="help is-danger" v-if="$v.form.password.$error">
                {{ passwordErrors[0] }}
              </p>
            </div>
          </div>
        </div>
        <!-- END: password inputs -->
        <!-- START: confirm password inputs -->
        <div class="field is-horizontal">
          <div class="field-body">
            <div class="field">
              <p class="control is-expanded has-icons-right">
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
                <span class="icon is-small is-right" v-if="!$v.form.confirmPassword.$error && !$v.form.confirmPassword.$invalid">
                  <i class="fa fa-check"></i>
                </span>
                <span class="icon is-small is-right" v-else-if="$v.form.confirmPassword.$error">
                  <i class="fa fa-warning"></i>
                </span>
              </p>
              <p class="help is-danger" v-if="$v.form.confirmPassword.$error">
                {{ confirmPasswordErrors[0] }}
              </p>
            </div>
          </div>
        </div>
        <!-- END: confirm password inputs -->
      </section>
      <footer class="modal-card-foot is-inline-block has-text-right">
        <button class="button is-right" @click="onCancel">Cancel</button>
        <button class="button is-success" v-bind:class="{ 'is-loading': getLoading }" v-bind:disabled="$v.form.$invalid" @click="onSignup">Sign Up</button>
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
      firstName: {
        required,
        minLength: minLength(2),
        maxLength: maxLength(15)
      },
      lastName: {
        required,
        minLength: minLength(2),
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
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
      }
    }
  },
  computed: {
    ...mapGetters({
      // getUser: types.USER,
      getLoading: types.LOADING
    }),
    firstNameErrors () {
      const errors = []
      if (!this.$v.form.firstName.$dirty) return errors
      !this.$v.form.firstName.maxLength && errors.push(`First Name must be at most ${this.$v.form.firstName.$params.maxLength.max} characters long.`)
      !this.$v.form.firstName.minLength && errors.push(`First Name must be at least ${this.$v.form.firstName.$params.minLength.min} characters long.`)
      !this.$v.form.firstName.required && errors.push('First Name is required.')
      return errors
    },
    lastNameErrors () {
      const errors = []
      if (!this.$v.form.lastName.$dirty) return errors
      !this.$v.form.lastName.maxLength && errors.push(`Last Name must be at most ${this.$v.form.lastName.$params.maxLength.max} characters long.`)
      !this.$v.form.lastName.minLength && errors.push(`Last Name must be at least ${this.$v.form.lastName.$params.minLength.min} characters long.`)
      !this.$v.form.lastName.required && errors.push('Last Name is required.')
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
        firstName: this.form.firstName,
        lastName: this.form.lastName,
        displayName: this.form.firstName + ' ' + this.form.lastName,
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
