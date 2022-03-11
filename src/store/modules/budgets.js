import axiosObj from '../../axios-config'
import store from '../store'
import router from '../../router/index'

const state = {
    monthlyBrief: {},
    dailyCards: [],
    budgets: null,
    monthlyIncomeDetails: [],
    monthlyExpenseDetails: [],
    monthlyGraphData: {},
}

const mutations = {
    'SET_MONTHLY_BRIEF'(state, data) {
        state.monthlyBrief = data;
    },
    'SET_DAILY_CARDS'(state, data) {
        state.dailyCards = data;
    },
    'SET_BUDGET'(state, data) {
        state.budgets = data;
    },
    'SET_MONTHLY_INCOME_DETAIL'(state, data) {
        state.monthlyIncomeDetails = data;
    },
    'SET_MONTHLY_EXPENSE_DETAIL'(state, data) {
        state.monthlyExpenseDetails = data;
    },
}

const actions = {
    featchMonthlyBudgets({ commit, dispatch }, { month, year }) {
        dispatch('fetchMonthlyBrief', { month, year });
        dispatch('fetchDailyBudgetCards', { month, year });
        dispatch('featchMonthlyBudgetsDetail', { type: "income", month, year })
        dispatch('featchMonthlyBudgetsDetail', { type: "expense", month, year })
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
    featchMonthlyBudgetsDetail({ commit }, { type, month, year }) {
        axiosObj.get('/budgets/detail', {
            headers: {
                Authorization: `Bearer ${store.getters.token}`
            },
            params: {
                type,
                month,
                year
            }
        })
            .then(res => {
                if (res.status === 200) {
                    if (type == 'income') {
                        commit('SET_MONTHLY_INCOME_DETAIL', res.data.data.details);
                    } else if(type == 'expense') {
                        commit('SET_MONTHLY_EXPENSE_DETAIL', res.data.data.details);
                    }
                }
            })
            .catch(err => {
                if (err.response) {
                    console.log('err')
                }
            })
    },
    storeBudget({ commit }, data) {
        axiosObj.post('/budgets', {

            date: data.date,
            type: data.type,
            category_id: data.category_id,
            remark: data.remark,
            amount: data.amount,
        }, {
            headers: {
                Authorization: `Bearer ${store.getters.token}`
            },
        })
            .then(res => {
                if (res.status === 201) {
                    router.push({ name: 'home' });
                }
            })
            .catch(err => {
                if (err.response) {
                    console.log('err')
                }
            })
    }
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
    },
    monthlyIncomeDetail(state) {
        return state.monthlyIncomeDetails;
    },
    monthlyExpenseDetail(state) {
        return state.monthlyExpenseDetails;
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}