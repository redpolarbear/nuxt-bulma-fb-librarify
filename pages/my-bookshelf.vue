<template>
  <section class="section">
    <div class="container">
      <div class="columns">
        <!-- START: aside menu column -->
        <div class="column is-3">
          <aside class="menu">
            <p class="menu-label">
              I'M HAVING...
            </p>
            <ul class="menu-list">
              <li>
                <a class="is-active">My Collections</a>
                <ul>
                  <li>
                    <nuxt-link to="/my-bookshelf/my-reading-collection">My Reading Collection</nuxt-link>
                  </li>
                  <li><a href="">My Have Read Collection</a></li>
                  <li><a href="">My 80's Reads</a></li>
                </ul>
              </li>
            </ul>
            <p class="menu-label">
              I'M BORROWING...
            </p>
            <p class="menu-label">
              I'M LOOKING FOR...
            </p>
          </aside>
        </div>
        <!-- END: aside menu column -->
        <div class="column is-9">
          <div class="box">
            <nav class="level">
              <!-- Left side -->
              <div class="level-left">
                <div class="level-item">
                  <p class="subtitle is-5">
                    <strong>123</strong> collections
                  </p>
                </div>
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
                <p class="level-item"><strong>All</strong></p>
                <p class="level-item"><a>Published</a></p>
                <p class="level-item"><a>Drafts</a></p>
                <p class="level-item"><a>Deleted</a></p>
                <p class="level-item"><a class="button is-success">New</a></p>
              </div>
            </nav>
          </div>
          <nuxt-child/>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {

}
</script>

<style>

</style>
