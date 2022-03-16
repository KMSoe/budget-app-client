import axiosObj from '../../axios-config'
import store from '../store'
import router from '../../router/index'

const state = {
    yearlyBrief: {},
    yearlyIncomeDetails: [],
    yearlyExpenseDetails: [],
    yearlyIncomeGraphData: {},
    yearlyExpenseGraphData: {},
    selectedYear: new Date().getFullYear(),
}

const mutations = {
    'SET_YEAR'(state, data) {
        state.selectedYear = data;
    },
    'SET_YEARLY_BRIEF'(state, data) {
        state.yearlyBrief = data;
    },
    'SET_YEARLY_INCOME_DETAIL'(state, data) {
        state.yearlyIncomeDetails = data;
    },
    'SET_YEARLY_EXPENSE_DETAIL'(state, data) {
        state.yearlyExpenseDetails = data;
    },
    'SET_YEARLY_INCOME_GRAPH'(state, data) {
        state.yearlyIncomeGraphData = data;
    },
    'SET_YEARLY_EXPENSE_GRAPH'(state, data) {
        state.yearlyExpenseGraphData = data;
    },
}

const actions = {
    
}

const getters = {
    yearlyBrief(state) {
        return state.monthlyBrief;
    },
    yearlyIncomeDetail(state) {
        return state.yearlyIncomeDetails;
    },
    yearlyExpenseDetail(state) {
        return state.yearlyExpenseDetails;
    },
    yearlyIncomeGraph(state) {
        return state.yearlyIncomeGraphData;
    },
    yearlyExpenseGraph(state) {
        return state.yearlyExpenseGraphData;
    },
    selectedYear(state) {
        return state.selectedYear;
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}