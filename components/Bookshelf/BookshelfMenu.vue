<template>
  <aside class="menu">
    <p class="menu-label">
      I'M HAVING...
    </p>
    <ul class="menu-list">
      <li>
        <nuxt-link :to="`/my-bookshelf/${myBookshelf.favorite.slug}`" active-class="is-active">
          <span class="icon has-text-danger">
            <i class="fa fa-heart"></i>
          </span>
          {{ myBookshelf.favorite.name }}
        </nuxt-link>
      </li>
      <li>
        <nuxt-link to="/my-bookshelf/my-collections" active-class="is-active">My Collections</nuxt-link>
        <ul>
          <li v-for="(item, index) in myBookshelf.collections" :key="index">
            <nuxt-link :to="`/my-bookshelf/${item.slug}`" active-class="is-active">{{ item.name }}</nuxt-link>
          </li>
        </ul>
      </li>
    </ul>
    <p class="menu-label">
      I'M LOOKING FOR...
    </p>
    <ul class="menu-list">
      <li>
        <nuxt-link :to="`/my-bookshelf/${myBookshelf.wishlist.slug}`" active-class="is-active">
          <span class="icon has-text-primary">
            <i class="fa fa-podcast"></i>
          </span>
          {{ myBookshelf.wishlist.name }}
        </nuxt-link>
      </li>
    </ul>
    <p class="menu-label">
      I'M OFFERING...
    </p>
  </aside>
</template>

<script>
export default {
  name: 'myBookshelfMenu',
  props: [ 'myBookshelf' ]
}
</script>

<style>

</style>
