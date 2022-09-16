<template>
  <section class="globalFooter">
    <div class="globalFooter__container container">
      <NuxtLink to="/" class="theFooter__logo">Logo</NuxtLink>
      <p>All Rights Reserved © PLEASE CHANGE ME {{ new Date().getFullYear() }}</p>
    </div>
  </section>
</template>

<script>
export default {
  name: 'GlobalFooter'
}
</script>

<style lang="scss">
.globalFooter {
  padding: 20px 0;
  margin: 40px 0 0;
  background: var(--white);
}
</style>
