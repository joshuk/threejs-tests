<template>
  <button
    :class="{ 'mobileBtn--open': global.menuOpen }"
    class="mobileBtn justifyC--center alignI--center pos--fix z--max buttonReset"
    @click="toggleMenu">
    <div class="mobileBtn__hamburger pos--rel" />
  </button>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'MobileBtn',
  computed: {
    ...mapState(['global'])
  },
  methods: {
    toggleMenu() {
      if (this.global.menuOpen) this.$store.dispatch('global/updateMenuOpen', false)
      else this.$store.dispatch('global/updateMenuOpen', true)
    }
  }
}
</script>

<style lang="scss">
.mobileBtn {
  display: none;
}
//----------------------------------------//

// 960
@include breakpoint(l) {
  .mobileBtn {
    display: flex;
    bottom: 40px;
    right: 40px;
    width: 72px;
    height: 72px;
    display: flex;
    background: var(--white);
    box-shadow: 0 5px 30px rgba(0, 0, 0, 0.3);
    transition: top 0.2s ease;

    &__hamburger {
      width: 32px;
      height: 2px;
      display: block;
      background: var(--black);
      transition: height 0.1s 0.3s ease, width 0.2s 0.1s ease, background 0.2s ease;

      &::before,
      &::after {
        content: '';
        width: 32px;
        height: 2px;
        background: var(--black);
        display: block;
        position: relative;
        top: -8px;
        transition: top 0.3s 0.3s ease, transform 0.3s ease, width 0.2s ease, background 0.2s ease;
      }

      &::after {
        top: 6px;
      }
    }

    //
    &--open {
      .mobileBtn__hamburger {
        height: 0;
      }

      .mobileBtn__hamburger::before,
      .mobileBtn__hamburger::after {
        transition: top 0.3s ease, transform 0.3s 0.3s ease, background 0.2s ease;
      }

      .mobileBtn__hamburger::before {
        top: 0;
        transform: rotate(-45deg);
      }

      .mobileBtn__hamburger::after {
        top: -2px;
        transform: rotate(45deg);
      }
    }
  }
}
</style>
