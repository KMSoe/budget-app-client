import axiosObj from '../../axios-config'
import router from '../../router/index'

const state = {
    token: null,
    userId: null,
    user: {},
    authenticated: false,
    authErrors: {
        signin: [],
        signup: [],
    },
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
    'SET_ERROR'(state, { target, errors }) {
        state.authErrors[target] = [];

        for (const key in errors) {
            state.authErrors[target].push(errors[key][0]);
        }
    }
}

const actions = {
    setLogoutTimer({ commit }, tokenLife) {
        setTimeout(() => {
            commit('CLEAR_AUTH');
        }, tokenLife);
    },
    signup({ commit, dispatch }, authData) {
        return new Promise((resolve, reject) => {
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
                        localStorage.setItem('userId', res.data.id);
                        localStorage.setItem('expirationDate', expirationDate);
                        commit('AUTH_USER', { id: res.data.id, token: res.data.data.token });
                        commit('SET_USER', res.data.data.user);
                        commit('SET_AUTH', true);
                        dispatch('setLogoutTimer', tokenLife);
                        resolve(res.data);
                    }
                })
                .catch(err => {
                    if (err.response) {
                        commit('SET_ERROR', { target: 'signup', errors: err.response.data.errors });
                        reject(err.response.data.errors);
                    }
                })
        });
    },
    signin({ commit, dispatch }, authData) {
        return new Promise((resolve, reject) => {
            axiosObj.post('/login', {
                email: authData.email,
                password: authData.password,
            })
                .then(res => {
                    if (res.status === 200) {
                        const tokenLife = res.data.data.life ? res.data.data.life : 1000 * 60 * 60 * 24 * 15;
                        const expirationDate = new Date(new Date().getTime() + tokenLife);
                        localStorage.setItem('token', res.data.data.token);
                        localStorage.setItem('userId', res.data.id);
                        localStorage.setItem('expirationDate', expirationDate);
                        commit('AUTH_USER', { id: res.data.id, token: res.data.data.token });
                        commit('SET_USER', res.data.data.user);
                        commit('SET_AUTH', true);

                        dispatch('setLogoutTimer', tokenLife);
                        resolve(res.data);
                    }
                })
                .catch(err => {
                    if (err.response) {
                        commit('SET_ERROR', { target: 'signin', errors: err.response.data.errors });
                        reject(err.response.data.errors);
                    }
                })
        });

    },
    tryAutoLogin({ commit, dispatch }) {
        const token = localStorage.getItem('token');
        if (!token) {
            return
        }
        axiosObj.get('/user', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(res => {
                if (res.status === 200) {
                    const user = res.data.data.user;

                    const expirationDate = localStorage.getItem('expirationDate');
                    const now = new Date();

                    if (now >= expirationDate) {
                        return
                    }

                    localStorage.setItem('token', token);
                    localStorage.setItem('userId', user.id);
                    commit('AUTH_USER', { id: user.id, token });
                    commit('SET_USER', user);
                    commit('SET_AUTH', true);
                }
            })
            .catch(err => {
                if (err.response.status === 401) {
                    commit('CLEAR_AUTH');
                    localStorage.removeItem('expirationDate');
                    localStorage.removeItem('token');
                    localStorage.removeItem('userId');
                    router.push({ name: 'signin' });
                }
            })

    },
    logout({ commit }) {
        axiosObj.post('/logout', {
            headers: {
                Authorization: `Bearer ${state.token}`
            }
        })
            .then(res => {
                if (res.status === 204) {
                    commit('CLEAR_AUTH');
                    localStorage.removeItem('expirationDate');
                    localStorage.removeItem('token');
                    localStorage.removeItem('userId');
                    router.push({ name: 'signin' });
                }
            })
            .catch(err => {
                if (err.response.status === 401) {
                    commit('SET_ERROR', err.response.data.errors);
                }
            })

    },
}

const getters = {
    user(state) {
        return state.user;
    },
    isAdmin(state) {
        return state.user.userRole == 'admin';
    },
    authenticated(state) {
        return state.authenticated;
    },
    token(state) {
        return state.token;
    },
    signinErrors(state) {
        return state.authErrors.signin;
    },
    signupErrors(state) {
        return state.authErrors.signup;
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}