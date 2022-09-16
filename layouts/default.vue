<template>
  <div class="theSite">
    <nuxt />
    <MobileMenu />
    <MobileBtn />
    <ModalBase v-if="modal.type" />
    <GlobalAlert v-if="global.alert.type" :type="global.alert.type" :text="global.alert.message" />
    <GlobalTransition />
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'LayoutDefault',
  computed: {
    ...mapState(['global', 'modal'])
  },
  mounted() {
    this.$store.dispatch('global/updateCurrentPage', this.$route.path)
  }
}
</script>

<style lang="scss">
.theContent {
  width: 100%;
  height: 100vh;

  canvas {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
}
</style>