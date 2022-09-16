<template>
  <header class="globalHeader pos--rel z--max">
    <div class="globalHeader__container container">
      <NuxtLink to="/" class="globalHeader__logo">Logo</NuxtLink>
      <ul>
        <li>
          <NuxtLink to="/">Home Page</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/second">Second Page</NuxtLink>
        </li>
      </ul>
    </div>
  </header>
</template>

<script>
export default {
  name: 'GlobalHeader'
}
</script>

<style lang="scss">
.globalHeader {
  padding: 20px 0;
  margin: 0 0 40px;
  background: var(--white);
}
</style>
