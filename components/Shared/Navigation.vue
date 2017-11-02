<template>
  <div>
    <nav class="navbar has-shadow" role="navigation">
      <div class="container">
        <div class="navbar-brand">
          <!-- <a class="navbar-item" href="https://bulma.io">
            <img src="https://bulma.io/images/bulma-logo.png" alt="Bulma: a modern CSS framework based on Flexbox" width="112" height="28">
          </a> -->
          <button class="button navbar-burger">
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
        <div class="navbar-menu" id="navMenu">
          <div class="navbar-start">
            <!-- navbar items on the left -->
          </div>
          <div class="navbar-end">
            <!-- navbar items on the right -->
            <router-link
              tag="a" 
              class="navbar-item is-tab" 
              v-for="item in menuItems" 
              :key="item.title" 
              :to="item.link" 
              active-class='is-active' 
              exact> 
                <i class="fa" v-bind:class="item.icon"></i>&nbsp; {{ item.title }}
            </router-link> <!-- default menu items -->
            <div class="navbar-item">
              <div class="field is-grouped">
                <p class="control">
                  <a class="button is-small" @click="toggleLogin">
                    <span class="icon">
                      <i class="fa fa-sign-in" aria-hidden="true"></i>
                    </span>
                    <span>Log in</span>
                  </a>
                </p>
                <p class="control">
                  <a class="button is-info is-small" @click="toggleSignup">
                    <span class="icon">
                      <i class="fa fa-user-plus" aria-hidden="true"></i>
                    </span>
                    <span>Sign Up</span>
                  </a>
                </p>
              </div>
            </div>          
          </div>
        </div>
      </div>
    </nav>
    <app-login :showLogin="getShowLogin"></app-login>
    <app-signup :showSignup="getShowSignup"></app-signup>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import LoginComponent from '@/components/User/Login'
import SignupComponent from '@/components/User/Signup'
import * as types from '@/types'

export default {
  name: 'navigationBar',
  data () {
    return {
    }
  },
  components: {
    'app-login': LoginComponent,
    'app-signup': SignupComponent
  },
  computed: {
    ...mapGetters({
      getUser: types.USER,
      getShowLogin: types.LOGIN_MODAL,
      getShowSignup: types.SIGNUP_MODAL,
      getError: types.ERROR,
      getSuccess: types.SUCCESS,
      getInfo: types.INFO
    }),
    menuItems () {
      let menuItems = [
        { icon: 'fa-book', title: 'Library', link: '/library' },
        { icon: 'fa-bell-o', title: 'Moments', link: '/moments' },
        { icon: 'fa-envelope', title: 'Messages', link: '/messages' }
      ]
      return menuItems
    }
  },
  methods: {
    toggleLogin: function () {
      this.$store.commit(types.TOGGLE_LOGIN_MODAL, true)
    },
    toggleSignup: function () {
      this.$store.commit(types.TOGGLE_SIGNUP_MODAL, true)
    }
  }
}
</script>

<style>

</style>
