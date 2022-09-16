export const transitions = {
  transition: {
    name: 'default',
    css: false,
    leave(el, done) {
      // if this is the first transition to a new page, change to false
      if (this.$store.state.global.firstLoad) this.$store.dispatch('global/updateFirstLoad', false)

      // show transition overlay
      document.querySelector('.globalTransition').classList.add('show')

      // delay so we show the transition
      setTimeout(() => {
        done()
      }, 500)
    },
    enter(el, done) {
      // if menu is open, close menu
      if (this.$store.state.global.menuOpen) this.$store.dispatch('global/updateMenuOpen', false)

      // close transition overlay and set to complete
      setTimeout(() => {
        this.$store.dispatch('global/updateCurrentPage', this.$route.path)
        document.querySelector('.globalTransition').classList.remove('show')
        done()
      }, 500)
    }
  }
}
