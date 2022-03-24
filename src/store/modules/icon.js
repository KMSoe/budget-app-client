import axiosObj from '../../axios-config'
import store from '../store'

const state = {
    icons: [],
    uncategorizedIcons: [],
}

const mutations = {
    'SET_ICONS'(state, data) {
        state.icons = data;
    },
    'SET_UNCAT_ICONS'(state, data) {
        state.uncategorizedIcons = data;
    },
    'ADD_ICON'(state, data) {
        state.icons.push(data);
    },
    'UPDATE_ICON'(state, data) {
        state.icons = state.icons.map((e) => {
            if (e.id === data.id) {
                e.class = data.class;
                e.color = data.color;
                e.updated_at = data.updated_at;

                return e;
            }
            return e;

        });
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
    fetchUnccategorizedIcons({ commit }) {
        return new Promise((resolve, reject) => {
            axiosObj.get('/categories/add', {
                headers: {
                    Authorization: `Bearer ${store.getters.token}`
                },
            })
                .then(res => {
                    commit('SET_UNCAT_ICONS', res.data.data);
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
    updateIcon({ commit }, { id, iconClass, iconColor }) {
        return new Promise((resolve, reject) => {
            axiosObj.put(`/icons/${id}`, JSON.stringify({
                iconClass,
                iconColor,
            }), {
                headers: {
                    Authorization: `Bearer ${store.getters.token}`,
                    'Content-type': 'Application/json'
                },
            })
                .then(res => {
                    commit('UPDATE_ICON', res.data.data);
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
    },
    uncategorizedIcons(state) {
        return state.uncategorizedIcons;
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}