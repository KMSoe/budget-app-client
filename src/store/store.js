import { createStore } from 'vuex'
import auth from './modules/auth'
import profile from './modules/profile'
import budgets from './modules/budgets'
import categories from './modules/categories'
import statistics from './modules/statistics'

const store = createStore({
   modules: [auth, budgets, profile, categories, statistics]
});

export default store;