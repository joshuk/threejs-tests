<template>
  <label class="baseSelect">
    <p v-if="label" class="baseSelect__label">{{ label }}</p>
    <select class="baseSelect__select" @change="$emit('the-val', $event.target.value)">
      <option
        v-for="(el, index) in options"
        :key="el + index"
        :value="el.value || el.label.toLowerCase()"
        :selected="el.selected ? true : false">
        {{ el.label }}
      </option>
    </select>
  </label>
</template>

<script>
export default {
  name: 'BaseSelect',
  props: {
    label: {
      type: String,
      default: ''
    },
    options: {
      type: Array,
      default: null
    }
  }
}
</script>

<style lang="scss">
.baseSelect {
  &__label {
    display: block;
    margin-bottom: 8px;
  }

  &__select {
    cursor: pointer;
    background: var(--white);
    color: var(--black);
    border: 1px solid rgba(var(--rgb-black), 0.5);
    height: 48px;
    min-width: 280px;

    &:hover {
      border: 1px solid rgba(var(--rgb-black), 1);
    }
  }
}
</style>
