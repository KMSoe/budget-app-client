import axiosObj from '../../axios-config'
import router from '../../router/index'

const state = {
    token: null,
    userId: null,
    user: null,
    authenticated: false,
    authErrors: null,
}

const mutations = {
    'AUTH_USER'(state, { id, token }) {
        state.userId = id;
        state.token = token;
    },
    'SET_AUTH'(state, value) {
        state.authenticated = value;
    },
    'SET_USER'(state, user) {
        state.user = user;
    },
    'CLEAR_AUTH'(state) {
        state.token = null;
        state.userId = null;
        state.user = null;
        state.authenticated = false;
        router.replace({ name: 'signin' });
    },
    'SET_ERROR'(state, errors) {
        state.authErrors = errors;
    }
}

const actions = {
    setLogoutTimer({ commit }, tokenLife) {
        setTimeout(() => {
            commit('CLEAR_AUTH');
        }, tokenLife);
    },
    signup({ commit, dispatch }, authData) {
        axiosObj.post('/register', {
            name: authData.name,
            email: authData.email,
            password: authData.password,
            gender: authData.gender,
        })
            .then(res => {
                if (res.status === 201) {
                    const tokenLife = res.data.data.life ? res.data.data.life : 1000 * 60 * 60 * 24 * 15;
                    const expirationDate = new Date(new Date().getTime() + tokenLife);
                    localStorage.setItem('token', res.data.data.token);
                    localStorage.setItem('userId', res.data.data.id);
                    localStorage.setItem('expirationDate', expirationDate);
                    commit('AUTH_USER', { id: res.data.data.id, token: res.data.data.token });
                    commit('SET_AUTH', true);
                    router.push({ name: 'home' });

                    dispatch('setLogoutTimer', tokenLife);
                }
            })
            .catch(err => {
                if(err.response.status === 400){
                    commit('SET_ERROR', err.response.data.errors);
                }
            })
    },
    signin({ commit, dispatch }, authData) {
        axiosObj.post('/login', {
            email: authData.email,
            password: authData.password,
        })
            .then(res => {
                if (res.status === 200) {
                    const tokenLife = res.data.data.life ? res.data.data.life : 1000 * 60 * 60 * 24 * 15;
                    const expirationDate = new Date(new Date().getTime() + tokenLife);
                    localStorage.setItem('token', res.data.data.token);
                    localStorage.setItem('userId', res.data.data.id);
                    localStorage.setItem('expirationDate', expirationDate);
                    commit('AUTH_USER', { id: res.data.data.id, token: res.data.data.token });
                    commit('SET_AUTH', true);
                    router.push({ name: 'home' });

                    dispatch('setLogoutTimer', tokenLife);
                }
            })
            .catch(err => {

            })
    },
    tryAutoLogin({ commit }) {
        const token = localStorage.getItem('token')
        if (!token) {
            return
        }
        const expirationDate = localStorage.getItem('expirationDate')
        const now = new Date()
        if (now >= expirationDate) {
            return
        }
        const userId = localStorage.getItem('userId')
        commit('authUser', {
            token: token,
            userId: userId
        })
    },
    logout({ commit }) {
        commit('clearAuthData')
        localStorage.removeItem('expirationDate')
        localStorage.removeItem('token')
        localStorage.removeItem('userId')
        router.replace('/signin')
    },
    storeUser({ commit, state }, userData) {

    },
    fetchUser({ commit, state }) {

    }
}

const getters = {
    user(state) {
        return state.user;
    },
    authenticated(state) {
        return state.authenticated;
    },
    token(state) {
        return state.token;
    },
    errors(state) {
        return state.authErrors;
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}