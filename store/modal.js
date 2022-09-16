export const state = () => ({
  type: null,
  data: null
})

export const mutations = {
  UPDATE_MODAL(state, modal) {
    state.type = modal.type
    state.data = modal.data
  }
}

export const actions = {
  updateModal({ commit }, modal) {
    commit('UPDATE_MODAL', modal)
  }
}
