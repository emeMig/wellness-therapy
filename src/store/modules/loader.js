import * as mutationTypes from "../mutation-types";

export const state = {
    loaderDialog: false
}

export const mutations = {
    [mutationTypes.SET_LOADER]: (state, payload) => {
        state.loaderDialog = payload
    },
}

export const actions = {
    setLoader({commit}, payload) {
        commit(mutationTypes.SET_LOADER, payload)
    },
}

export const getters = {
    getLoader: state => state.loaderDialog
}

export default {
    state,
    getters,
    mutations,
    actions,
}