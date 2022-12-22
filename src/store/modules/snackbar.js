/**
 * States for snackbar
 */
import { CLOSE_SNACKBAR, OPEN_SNACKBAR } from '@/store/actions/snackbar'

const state = {
  snackbar: {
    visible: false,
    text: null,
    icon: '',
    timeout: 4000,
    color: '',
    x: 'right',
    y: 'top'
  }
}

const mutations = {
  /**
   * Opens a new snackbar
   * @param state the current state
   * @param config the custom config of the snackbar to be opened
   */
  [OPEN_SNACKBAR] (state, config) {
    // set text and multiline based on text length
    state.snackbar.text = config.text

    // timeout
    if (config.timeout >= 0) state.snackbar.timeout = config.timeout

    // color
    if (config.color) state.snackbar.color = config.color

    // icon
    if (config.icon) state.snackbar.icon = config.icon

    // position
    if (config.x) state.snackbar.x = config.x
    if (config.y) state.snackbar.y = config.y

    // make visible
    state.snackbar.visible = true
  },
  /**
   * Closes the snackbar and reset to its default config
   * @param state the current state
   */
  [CLOSE_SNACKBAR] (state) {
    state.snackbar.visible = false
    state.snackbar.timeout = 4000
    state.snackbar.text = null
    state.snackbar.icon = ''
    state.snackbar.color = ''
    state.snackbar.x = 'right'
    state.snackbar.y = 'top'
  }
}

const actions = {
  /**
   * Opens a new snackbar
   * @param commit the commit action
   * @param config the custom config of the snackbar to be opened
   */
  [OPEN_SNACKBAR] ({ commit }, config) {
    commit(OPEN_SNACKBAR, config)
  },
  /**
   * Closes the snackbar and reset to its default config
   * @param commit the commit action
   */
  [CLOSE_SNACKBAR] ({ commit }) {
    commit(CLOSE_SNACKBAR)
  }
}

export default {
  state,
  actions,
  mutations
}
