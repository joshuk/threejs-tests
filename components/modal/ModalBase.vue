<template>
  <section class="modalBase pos--fix z--max inset">
    <!-- use modal.type to display different components inside modalBase -->

    <ModalBaseVideo v-if="modal.type === 'video'" :video="modal.data.video" />

    <!--  -->
    <button class="modalBase__close grid placeI--center pos--fix z--3 buttonReset" @click="close">
      <span class="modalBase__closeIcon pos--rel" />
    </button>
    <div class="modalBase__overlay pos--fix z--1 o--8 inset" @click="close" />
  </section>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'ModalBase',
  computed: {
    ...mapState(['modal'])
  },
  methods: {
    close() {
      const data = { type: null, data: null }
      this.$store.dispatch('modal/updateModal', data)
    }
  }
}
</script>

<style lang="scss">
.modalBase {
  overflow: auto;

  &__close {
    width: 64px;
    height: 64px;
    top: 0;
    right: 0;
    background: rgba(#fff, 0.2);
    transition: background 0.2s ease;

    &:hover {
      background: rgba(#fff, 0.3);
    }
  }

  &__closeIcon {
    height: 2px;
    width: 20px;
    background: #fff;
    display: block;
    transform: rotate(45deg);

    &::before {
      content: '';
      width: 2px;
      height: 20px;
      background: #fff;
      display: block;
      position: absolute;
      top: -9px;
      left: 9px;
    }
  }

  //
  &__overlay {
    background: #000;
  }
}
</style>
