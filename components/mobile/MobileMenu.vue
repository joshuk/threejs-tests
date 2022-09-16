<template>
  <section :class="{ 'mobileMenu--open': global.menuOpen }" class="mobileMenu pos--fix z--max inset o--0">
    <!--  -->

    <nav class="mobileMenu__nav">
      <ul class="mobileMenu__navItems noList noEdgeMargin">
        <li class="mobileMenu__navItem">
          <NuxtLink to="/" class="mobileMenu__navLink">
            <p class="mobileMenu__navLabel">Dashboard</p>
          </NuxtLink>
        </li>
        <li class="mobileMenu__navItem">
          <NuxtLink to="/news/article/article-with-long-slug" class="mobileMenu__navLink">
            <p class="mobileMenu__navLabel">Page 1</p>
          </NuxtLink>
        </li>
        <li class="mobileMenu__navItem">
          <NuxtLink to="/" class="mobileMenu__navLink">
            <p class="mobileMenu__navLabel">Page 2</p>
          </NuxtLink>
        </li>
      </ul>
    </nav>

    <!--  -->
  </section>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'MobileMenu',
  computed: {
    ...mapState(['global'])
  },
  methods: {
    closeMenu() {
      this.$store.dispatch('global/updateMenuOpen', false)
    }
  }
}
</script>

<style lang="scss">
.mobileMenu {
  display: none;
}
//----------------------------------------//

// 960
@include breakpoint(l) {
  .mobileMenu {
    display: block;
    background: var(--black);
    padding: 40px;
    visibility: hidden;
    transition: visibility 0.2s ease, opacity 0.2s ease;

    &__navLabel {
      color: var(--white);
    }

    //
    &--open {
      opacity: 1;
      visibility: visible;
    }
  }
}
</style>
