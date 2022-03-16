import axiosObj from '../../axios-config'
import store from '../store'
import router from '../../router/index'

const state = {
    monthlyBrief: {},
    dailyCards: [],
    budgets: null,
    monthlyIncomeDetails: [],
    monthlyExpenseDetails: [],
    monthlyIncomeGraphData: {},
    monthlyExpenseGraphData: {},
    selectedTime: new Date(),
}

const mutations = {
    'SET_TIME'(state, data) {
        state.selectedTime = data;
    },
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
    'SET_MONTHLY_INCOME_GRAPH'(state, data) {
        state.monthlyIncomeGraphData = data;
    },
    'SET_MONTHLY_EXPENSE_GRAPH'(state, data) {
        state.monthlyExpenseGraphData = data;
    },
}

const actions = {
    featchMonthlyBudgets({ commit, dispatch }) {
        const date = state.selectedTime;
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
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
                        commit('SET_MONTHLY_INCOME_GRAPH', res.data.data.graph_data);
                    } else if (type == 'expense') {
                        commit('SET_MONTHLY_EXPENSE_DETAIL', res.data.data.details);
                        commit('SET_MONTHLY_EXPENSE_GRAPH', res.data.data.graph_data);
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
    },
    deleteBudget({ commit, dispatch }, id) {
        axiosObj.delete(`/budgets/${id}`, {
            headers: {
                Authorization: `Bearer ${store.getters.token}`
            },
        })
            .then(res => {
                if (res.status === 204) {
                    const d = state.selectedTime;
                    const month = d.getMonth() + 1;
                    const year = d.getFullYear();
                    dispatch('featchMonthlyBudgets', { month, year });
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
    },
    monthlyIncomeGraph(state) {
        return state.monthlyIncomeGraphData;
    },
    monthlyExpenseGraph(state) {
        return state.monthlyExpenseGraphData;
    },
    selectedTime(state) {
        return state.selectedTime;
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}