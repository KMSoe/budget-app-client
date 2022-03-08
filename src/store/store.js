import { createStore } from 'vuex'
import auth from './modules/auth'
import profile from './modules/profile'

const store = createStore({
   modules: [auth, profile]
});

export default store;