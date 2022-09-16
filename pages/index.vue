<template>
  <main class="theContent mt--80 ta--center">
    <p>hehe</p>
    <p><a href="/one">one</a></p>
    <p><a href="/two">two</a></p>
  </main>
</template>

<script>
import { transitions } from '~/mixins/transitions'

export default {
  name: 'PageHome',
  mixins: [
    transitions,
  ],
  mounted() {

  }
}
</script>

<style lang="scss">
p:not(:last-child) {
  margin-bottom: 12px;
}

a {
  color: $blue;
  text-decoration: underline;

  &:hover {
    text-decoration: none;
  }
}
</style>