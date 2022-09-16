<template>
  <div :class="'globalAlert--' + type" class="globalAlert pos--fix z--max">
    <div class="globalAlert__content flex alignI--center">
      <p class="globalAlert__msg">{{ text }}</p>
    </div>
    <button class="globalAlert__close flex alignI--center justifyC--center pos--abs buttonReset" @click="close">
      <IconCross class="globalAlert__closeIcon fill--white" />
    </button>
  </div>
</template>

<script>
import IconCross from '~/assets/svgs/interface/cross.svg?inline'

export default {
  name: 'GlobalAlert',
  components: {
    IconCross
  },
  props: {
    type: {
      type: String,
      default: 'error',
      validator(value) {
        return ['error', 'warning', 'success'].includes(value) // The value must match one of these strings
      }
    },
    text: {
      type: String,
      default: '',
      required: true
    }
  },
  methods: {
    close() {
      const data = { type: null, message: null }
      this.$store.dispatch('global/updateAlert', data)
    }
  }
}
</script>

<style lang="scss">
@keyframes revealGlobalAlert {
  from {
    transform: translateX(150%);
  }
  to {
    transform: translateX(0%);
  }
}

.globalAlert {
  bottom: 40px;
  right: 40px;
  background: var(--white);
  padding: 16px 24px;
  transform: translateX(150%);
  animation: revealGlobalAlert 0.5s ease forwards;

  &__close {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    top: -4px;
    right: -4px;
  }

  //
  &--error {
    border: 1px solid $error;

    .globalAlert__close {
      background: $error;
    }
  }

  &--warning {
    border: 1px solid $warning;

    .globalAlert__close {
      background: $warning;
    }
  }

  &--success {
    border: 1px solid $success;

    .globalAlert__close {
      background: $success;
    }
  }
}
</style>
