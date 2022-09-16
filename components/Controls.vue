<template>
  <div class="controls pos--abs">
    <button @click="$emit('onStop')">stop</button>
    <button @click="$emit('onPlay')">play</button>
  </div>
</template>

<script>
export default {
  name: 'Controls'
}
</script>

<style lang="scss">
.controls {
  top: 0;
  left: 0;
}
</style>