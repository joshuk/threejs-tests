<template>
  <div class="modalBaseVideo grid placeI--center container pos--rel z--2">
    <iframe :src="video" class="modalBaseVideo__iframe pos--rel z--2" />
    <div class="modalBaseVideo__loaderHolder pos--abs center--xy z--1">
      <BaseSpinner class="modalBaseVideo__loader pos--fix z--1" color="white" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'ModalBaseVideo',
  props: {
    video: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss">
.modalBaseVideo {
  min-height: 100vh;
  pointer-events: none;
  padding-top: 80px;
  padding-bottom: 80px;

  &__iframe {
    border: 0;
    outline: 0;
    width: 100%;
    aspect-ratio: 16/9;
    max-width: 1200px;
    pointer-events: auto;
  }
}
/*----------------------------------------*/

// 500
@include breakpoint(xs) {
  .modalBaseVideo {
    padding: 56px 0;
  }
}
</style>
