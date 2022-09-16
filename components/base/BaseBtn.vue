<template>
  <div v-if="parentLink" :class="'baseBtn--' + type" class="baseBtn pos--rel ta--center buttonReset">
    <p v-if="!loading" class="baseBtn__label"><slot /></p>
    <div v-else class="baseLoader baseLoader--small" />
  </div>

  <NuxtLink
    v-else-if="link && !external"
    :to="link"
    :class="'baseBtn--' + type"
    class="baseBtn pos--rel ta--center buttonReset">
    <p v-if="!loading" class="baseBtn__label"><slot /></p>
    <div v-else class="baseLoader baseLoader--small" />
  </NuxtLink>

  <a
    v-else-if="link && external"
    :href="link"
    :class="'baseBtn--' + type"
    class="baseBtn pos--rel ta--center buttonReset"
    target="_blank">
    <p v-if="!loading" class="baseBtn__label"><slot /></p>
    <div v-else class="baseLoader baseLoader--small" />
  </a>

  <button v-else :class="'baseBtn--' + type" class="baseBtn pos--rel ta--center buttonReset">
    <p v-if="!loading" class="baseBtn__label"><slot /></p>
    <div v-else class="baseLoader baseLoader--small" />
  </button>
</template>

<script>
export default {
  name: 'BaseBtn',
  props: {
    type: {
      type: String,
      default: 'btn',
      validator(value) {
        return ['btn', 'link'].includes(value) // The value must match one of these strings
      }
    },
    link: {
      type: String,
      default: ''
    },
    external: {
      type: Boolean,
      default: false
    },
    parentLink: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss">
.baseBtn {
  // button styles
  &--btn {
    border: 1px solid rgba(var(--rgb-black), 0.5);
    padding: 12px 20px;
  }

  &--btn:hover,
  &__parentLink:hover .baseBtn--btn {
    border: 1px solid rgba(var(--rgb-black), 1);
  }

  // link styles
  &--link {
    padding-bottom: 2px;
    border-bottom: 1px solid rgba(var(--rgb-black), 0.5);
  }

  //
  &--link:hover,
  &__parentLink:hover .baseBtn--link {
    border-bottom: 1px solid rgba(var(--rgb-black), 1);
  }
}
</style>
