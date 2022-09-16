export const state = () => ({
  currentPage: '/',
  transition: 'default',
  firstLoad: true,
  menuOpen: false,
  alert: {
    type: null,
    message: null
  }
})

export const mutations = {
  UPDATE_CURRENT_PAGE(state, currentPage) {
    state.currentPage = currentPage
  },
  UPDATE_TRANSITION(state, transition) {
    state.transition = transition
  },
  UPDATE_FIRST_LOAD(state, firstLoad) {
    state.firstLoad = firstLoad
  },
  UPDATE_MENU_OPEN(state, menuOpen) {
    state.menuOpen = menuOpen
  },
  UPDATE_ALERT(state, alert) {
    state.alert = alert
  }
}

export const actions = {
  updateCurrentPage({ commit }, currentPage) {
    commit('UPDATE_CURRENT_PAGE', currentPage)
  },
  updateTransition({ commit }, transition) {
    commit('UPDATE_TRANSITION', transition)
  },
  updateFirstLoad({ commit }, firstLoad) {
    commit('UPDATE_FIRST_LOAD', firstLoad)
  },
  updateMenuOpen({ commit }, menuOpen) {
    commit('UPDATE_MENU_OPEN', menuOpen)
  },
  updateAlert({ commit }, alert) {
    commit('UPDATE_ALERT', alert)
  }
}
