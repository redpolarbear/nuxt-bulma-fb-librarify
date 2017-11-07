<template>
  <div>
    <nav class="navbar has-shadow is-transparent" role="navigation">
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
            <nuxt-link
              tag="a" 
              class="navbar-item is-tab" 
              v-for="item in menuItems" 
              :key="item.title" 
              :to="item.link" 
              active-class='is-active' 
              exact> 
                <i class="fa" v-bind:class="item.icon"></i>&nbsp; {{ item.title }}
            </nuxt-link> <!-- default menu items -->
            
            <div class="navbar-item has-dropdown is-hoverable" v-if="userIsAuthenticated">
                <a class="navbar-link">
                  <img :src="getUser.photoURL"> <!-- width: 28px; height: 28px; --> 
                </a>
                <div class="navbar-dropdown is-boxed">
                  <a class="navbar-item">
                    <span class="icon">
                      <i class="fa fa-user"></i>
                    </span>
                    <span>My Profile</span>
                  </a>
                  <a class="navbar-item">
                    <span class="icon">
                      <i class="fa fa-envelope"></i>
                    </span>
                    <span>My Messages</span>
                  </a>
                  <hr class="navbar-divider">
                  <a class="navbar-item" @click="onLogout">
                    <span class="icon">
                      <i class="fa fa-sign-out"></i>
                    </span>
                    <span>Log Out</span>
                  </a>
              </div>             
            </div>
            <div class="navbar-item" v-else>
              <div class="field is-grouped">
                <p class="control">
                  <a class="button is-small" @click="toggleLogin">
                    Log in
                  </a>
                </p>
                <p class="control">
                  <a class="button is-info is-small" @click="toggleSignup">
                    Sign Up
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
    userIsAuthenticated () {
      return this.getUser !== null && this.getUser !== undefined
    },
    menuItems () {
      let menuItems = []
      if (this.userIsAuthenticated) {
        menuItems = [
          { icon: 'fa-book', title: 'Library', link: '/library' },
          { icon: 'fa-bell-o', title: 'Moments', link: '/moments' }
          // { icon: 'fa-envelope', title: 'Messages', link: '/messages' }
        ]
      }
      return menuItems
    }
  },
  methods: {
    toggleLogin: function () {
      this.$store.commit(types.TOGGLE_LOGIN_MODAL, true)
    },
    toggleSignup: function () {
      this.$store.commit(types.TOGGLE_SIGNUP_MODAL, true)
    },
    onLogout () {
      this.$store.dispatch(types.ACTION_USER_LOGOUT)
    }
  }
}
</script>

<style>

</style>
