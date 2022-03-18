import axiosObj from '../../axios-config'
import store from '../store'
import router from '../../router/index'

const state = {
    yearlyBrief: {},
    yearlyLineGraphData: {},
    yearlyTable: [],
    yearlyIncomeDetails: [],
    yearlyExpenseDetails: [],
    yearlyIncomeGraphData: {},
    yearlyExpenseGraphData: {},
    selectedYear: new Date(),
}

const mutations = {
    'SET_YEAR'(state, data) {
        state.selectedYear = data;
    },
    'SET_LINE_GRAPH_DATA'(state, data) {
        state.yearlyLineGraphData = data;
    },
    'SET_YEARLY_BRIEF'(state, data) {
        state.yearlyBrief = data;
    },
    'SET_YEARLY_TABLE'(state, data) {
        state.yearlyTable = data;
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
    fetchStatisticsData({ commit }) {
        axiosObj.get('/statistics', {
            headers: {
                Authorization: `Bearer ${store.getters.token}`
            },
            params: {
                year: state.selectedYear.getFullYear()
            }
        })
            .then(res => {
                if (res.status === 200) {
                    const data = res.data;
                    commit('SET_YEARLY_BRIEF', data.yearly_result_table.brief);
                    commit('SET_YEARLY_TABLE', data.yearly_result_table.monthlyResults);
                    commit('SET_YEARLY_INCOME_DETAIL', data.income_details);
                    commit('SET_YEARLY_EXPENSE_DETAIL', data.expense_details);
                    commit('SET_YEARLY_INCOME_GRAPH', data.income_graph_data);
                    commit('SET_YEARLY_EXPENSE_GRAPH', data.expense_graph_data);
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
    yearlyBrief(state) {
        return state.yearlyBrief;
    },
    yearlyTable(state) {
        return state.yearlyTable;
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
    },
    yearlyLineGraphData(state) {
        let months = [];
        let incomes = [];
        let expenses = [];

        if(state.yearlyTable.length) {
            state.yearlyTable.forEach(e => {
                months.push(e.month);
                incomes.push(e.income);
                expenses.push(Math.abs(e.expense));
            });
        }

        return {
            months,
            incomes,
            expenses
        }
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}