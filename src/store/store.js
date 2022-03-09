import { createStore } from 'vuex'
import auth from './modules/auth'
import profile from './modules/profile'
import budgets from './modules/budgets'

const store = createStore({
   modules: [auth, budgets, profile]
});

export default store;