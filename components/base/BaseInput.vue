<template>
  <label class="baseInput">
    <p class="baseInput__label">
      {{ label }}
      <span v-if="subLabel">{{ subLabel }}</span>
    </p>
    <input
      ref="input"
      :type="type"
      :placeholder="placeholder || label"
      :value="value"
      v-bind="$attrs"
      class="baseInput__input"
      @input="$emit('the-val', $event.target.value)" />
    <p v-if="error" class="baseInput__error">{{ error }}</p>
  </label>
</template>

<script>
export default {
  name: 'BaseInput',
  props: {
    label: {
      type: String,
      default: '',
      required: true
    },
    subLabel: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'text',
      validator(value) {
        return ['text', 'email', 'tel', 'password'].includes(value) // The value must match one of these strings
      }
    },
    placeholder: {
      type: String,
      default: ''
    },
    value: {
      type: String,
      default: ''
    },
    error: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss">
.baseInput {
  &__label {
    display: block;
    margin-bottom: 8px;
  }

  &__input {
    background: var(--white);
    border: 1px solid rgba(var(--rgb-black), 0.5);
    height: 48px;
    min-width: 280px;

    &:hover {
      border: 1px solid rgba(var(--rgb-black), 1);
    }
  }
}
</style>
