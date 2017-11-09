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
          <template v-for="(item, index) in myBookshelf.collections">
            <li :key="index">
              <nuxt-link :to="`/my-bookshelf/${item.slug}`" active-class="is-active">{{ item.name }}</nuxt-link>
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
        <nuxt-link :to="`/my-bookshelf/${myBookshelf.wishlist.slug}`" active-class="is-active">
          <span class="icon has-text-primary">
            <i class="fa fa-podcast"></i>
          </span>
          {{ myBookshelf.wishlist.name }}
        </nuxt-link>
      </li>
    </ul>
  </aside>
</template>

<script>
export default {
  name: 'myBookshelfMenu',
  props: [ 'myBookshelf' ],
  created () {
    console.log(this.myBookshelf)
  }
}
</script>

<style>

</style>
