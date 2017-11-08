<template>
  <aside class="menu">
    <p class="menu-label">
      I'M HAVING...
    </p>
    <ul class="menu-list">
      <li>
        <nuxt-link :to="`/my-bookshelf/${myFavorite.slug}`" active-class="is-active">
          <span class="icon has-text-danger">
            <i class="fa fa-heart"></i>
          </span>
          {{ myFavorite.name }}
        </nuxt-link>
      </li>
      <li>
        <nuxt-link to="/my-bookshelf/my-collections" active-class="is-active">My Collections</nuxt-link>
        <ul>
          <template v-for="(item, index) in myCollections">
            <li :key="index">
              <nuxt-link :to="`/my-bookshelf/${item.collection.slug}`" active-class="is-active">{{ item.collection.name }}</nuxt-link>
            </li>
          </template>
        </ul>
      </li>
    </ul>
    <p class="menu-label">
      I'M BORROWING...
    </p>
    <p class="menu-label">
      I'M LOOKING FOR...
    </p>
    <ul class="menu-list">
      <li>
        <nuxt-link :to="`/my-bookshelf/${myWishlist.slug}`" active-class="is-active">
          <span class="icon has-text-primary">
            <i class="fa fa-podcast"></i>
          </span>
          {{ myWishlist.name }}
        </nuxt-link>
      </li>
    </ul>
  </aside>
</template>

<script>
export default {
  name: 'mybookshelfmenu',
  props: [
    'myCollections',
    'myFavorite',
    'myWishlist'
  ]
}
</script>

<style>

</style>
