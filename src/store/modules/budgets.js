import axiosObj from '../../axios-config'
import store from '../store'

const state = {
    monthlyBrief: {},
    dailyCards: [],
}

const mutations = {
    'SET_MONTHLY_BRIEF'(state, data) {
        state.monthlyBrief = data;
    },
    'SET_DAILY_CARDS'(state, data) {
        state.dailyCards = data;
    }
}

const actions = {
    featchMonthlyBudgets({commit, dispatch}, {month, year}){
        dispatch('fetchMonthlyBrief', {month, year});
        dispatch('fetchDailyBudgetCards', {month, year});
    },
    fetchMonthlyBrief({ commit }, { month, year }) {
        axiosObj.get('/budgets/brief', {
            headers: {
                Authorization: `Bearer ${store.getters.token}`
            },
            params: {
                month,
                year
            }
        })
            .then(res => {
                commit('SET_MONTHLY_BRIEF', res.data.data);
            })
            .catch(err => {
                if (err.response) {
                    console.log('err')
                }
            })
    },
    fetchDailyBudgetCards({ commit }, { month, year }) {
        axiosObj.get('/budgets', {
            headers: {
                Authorization: `Bearer ${store.getters.token}`
            },
            params: {
                month,
                year
            }
        })
            .then(res => {
                commit('SET_DAILY_CARDS', res.data.data.daily_cards);
            })
            .catch(err => {
                if (err.response) {
                    console.log('err')
                }
            })
    },
}

const getters = {
    monthlyBrief(state) {
        return state.monthlyBrief;
    },
    isPlus(state) {
        return store.getters.authenticated ? state.monthlyBrief.net_budget > 0 : true;
    },
    dailyCards(state) {
        return state.dailyCards;
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}