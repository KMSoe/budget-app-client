import axiosObj from '../../axios-config'
import store from '../store'

const state = {
    icons: [],
}

const mutations = {
    'SET_ICONS'(state, data) {
        state.icons = data;
    },
    'ADD_ICON'(state, data) {
        state.icons.push(data);
    }
}

const actions = {
    fetchIcons({ commit }) {
        return new Promise((resolve, reject) => {
            axiosObj.get('/icons', {
                headers: {
                    Authorization: `Bearer ${store.getters.token}`
                },
            })
                .then(res => {
                    commit('SET_ICONS', res.data.data);
                    resolve(res.data.data);
                })
                .catch(err => {
                    if (err.response) {
                        reject(err);
                    }
                })
        })

    },
    storeIcon({ commit }, { iconClass, iconColor }) {
        return new Promise((resolve, reject) => {
            axiosObj.post('/icons', {
                iconClass,
                iconColor,
            }, {
                headers: {
                    Authorization: `Bearer ${store.getters.token}`
                },
            })
                .then(res => {
                    commit('ADD_ICON', res.data.data);
                    resolve(res.data.data);
                })
                .catch(err => {
                    if (err.response) {
                        reject(err);
                    }
                })
        })
    },
    updateIcon({ commit }, { iconClass, iconColor }) {
        return new Promise((resolve, reject) => {
            axiosObj.post('/icons', {
                iconClass,
                iconColor,
            }, {
                headers: {
                    Authorization: `Bearer ${store.getters.token}`
                },
            })
                .then(res => {
                    commit('ADD_ICON', res.data.data);
                    resolve(res.data.data);
                })
                .catch(err => {
                    if (err.response) {
                        reject(err);
                    }
                })
        })
    }
}

const getters = {
    icons(state) {
        return state.icons;
    },
    iconsCount(state) {
        return state.icons.length;
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}