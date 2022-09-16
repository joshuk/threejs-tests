<template>
  <div class="baseTabs">
    <button
      v-for="(el, i) in items"
      :key="el + i"
      :class="{ active: active === i }"
      class="baseTabs__tab buttonReset"
      @click="$emit('the-val', i)">
      <p class="baseTabs__label">{{ el }}</p>
    </button>
  </div>
</template>

<script>
export default {
  name: 'BaseTabs',
  props: {
    active: {
      type: Number,
      default: null
    },
    items: {
      type: Array,
      default: null
    }
  }
}
</script>

<style lang="scss">
.baseTabs {
  &__tab {
    padding: 12px 24px 12px;
    margin-right: 4px;

    &.active {
      background: var(--white);
      border-bottom: 2px solid var(--black);
      padding-bottom: 10px;
    }
  }
}
</style>
