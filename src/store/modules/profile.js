import axiosObj from '../../axios-config'
import store from '../store'

const state = {
    profileBudgetData: [],
}

const mutations = {
    'LOAD_PROFILE_BUDGET_DATA'(state, data) {
        state.profileBudgetData = data;
    }
}

const actions = {
    loadProfile({ commit }) {
        axiosObj.get('/profile', {
            headers: {
                Authorization: `Bearer ${store.getters.token}`
            }
        })
            .then(res => {
                commit('LOAD_PROFILE_BUDGET_DATA', res.data.data.results);
            })
            .catch(err => {
                if (err.response) {
                    console.log('err')
                }
            })
    }
}

const getters = {
    profileResults(state) {
        return state.profileBudgetData;
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}