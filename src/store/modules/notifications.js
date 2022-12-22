import * as mutationTypes from "@/store/mutation-types";

export const state = {
    snackbar: {
        show: false,
        text: '',
        icon: ''
    }
};

export const getters = {
    showNotification: state => state.show,
    notification: state => state.notification,
    notificationTitle: state => state.notification['title'],
    textNotification: state => state.notification['text'],
    maxWidthNotification: state => state.notification['maxWidth'],
};

export const mutations = {
    [mutationTypes.SET_SHOW_NOTIFICATION]: (state, payload) => {
        state.show = payload ;
    },
    [mutationTypes.SET_NOTIFICATION]: (state, payload) => {
        state.notification = payload ;
    },
    [mutationTypes.SET_TITLE_NOTIFICATION]: (state, payload) => {
        state.notification['title'] = payload ;
    },
    [mutationTypes.SET_TEXT_NOTIFICATION]: (state, payload) => {
        state.notification['text'] = payload ;
    },
    [mutationTypes.SET_MAXWIDTH_NOTIFICATION]: (state, payload) => {
        state.notification['maxWidth'] = payload ;
    },
};

export const actions = {
    setShowNotification: ({ commit }, payload) => {
        commit(mutationTypes.SET_SHOW_NOTIFICATION, payload);
    },
    setNotification: ({ commit }, payload) => {
        commit(mutationTypes.SET_NOTIFICATION, payload);
    },
    setTitleNotification: ({ commit }, payload) => {
        commit(mutationTypes.SET_SHOW_NOTIFICATION, payload);
    },
    setTextNotification: ({ commit }, payload) => {
        commit(mutationTypes.SET_SHOW_NOTIFICATION, payload);
    },
    setMaxwidthNotification: ({ commit }, payload) => {
        commit(mutationTypes.SET_SHOW_NOTIFICATION, payload);
    },
};

export default {
    state,
    getters,
    mutations,
    actions
};
