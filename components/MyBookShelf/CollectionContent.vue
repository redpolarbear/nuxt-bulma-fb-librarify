<template>
  <div>
    <div class="box">
      <nav class="level">
        <!-- Left side -->
        <div class="level-left">
          <div class="level-item">
            <div class="field has-addons">
              <p class="control">
                <input class="input" type="text" placeholder="Find a collection">
              </p>
              <p class="control">
                <button class="button">
                  Search
                </button>
              </p>
            </div>
          </div>
        </div>
        <!-- Right side -->
        <div class="level-right">
          <p class="level-item"><a class="button is-success">New</a></p>
        </div>
      </nav>
    </div>
    this is from component {{ $route.params.collectionName }}
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import * as types from '@/types'

export default {
  name: 'collectionContent',
  computed: {
    ...mapGetters({
      getCollections: types.COLLECTIONS
    })
  }
}
</script>

<style>

</style>
