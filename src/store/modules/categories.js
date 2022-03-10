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
            })
            .catch(err => {
                if (err.response) {
                    console.log('err')
                }
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