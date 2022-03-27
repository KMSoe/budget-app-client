import axiosObj from '../../axios-config'
import store from '../store'

const state = {
    incomeCategories: [],
    expenseCategories: [],
}

const mutations = {
    'SET_INCOME_CATEGORIES'(state, data) {
        state.incomeCategories = data;
    },
    'SET_EXPENSE_CATEGORIES'(state, data) {
        state.expenseCategories = data;
    },
}

const actions = {
    fetchCategories({ commit }, type) {
        return new Promise((resolve, reject) => {
            axiosObj.get('/categories', {
                headers: {
                    Authorization: `Bearer ${store.getters.token}`
                },
                params: {
                    type: type.toLowerCase()
                }
            })
                .then(res => {
                    if (res.data.type == 'Income') {
                        commit('SET_INCOME_CATEGORIES', res.data.data.categories);
                    } else {
                        commit('SET_EXPENSE_CATEGORIES', res.data.data.categories);
                    }
                    resolve(res.data.data.categories);
                })
                .catch(err => {
                    if (err.response) {
                        reject(err);
                    }
                })
        })

    },
    storeCategory({ commit }, { icon_id, type, name }) {
        return new Promise((resolve, reject) => {
            axiosObj.post('/categories', { icon_id, type, name }, {
                headers: {
                    Authorization: `Bearer ${store.getters.token}`
                }
            })
                .then(res => {
                    if (res.data.type == 'Income') {

                    } else {

                    }
                    resolve(res.data);
                })
                .catch(err => {
                    if (err.response) {
                        reject(err);
                    }
                })
        })

    },
}

const getters = {
    incomeCategories(state) {
        return state.incomeCategories;
    },
    expenseCategories(state) {
        return state.expenseCategories;
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}