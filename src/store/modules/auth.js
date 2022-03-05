import axiosObj from '../../axios-config';
import router from '../../router';

const state = {
    user: {},
    token: null,
    authenticated: false,
}

const mutations = {
    'AUTH_USER'(state, { user, token }) {
        state.user = user;
        state.token = token;
    },
    'SET_AUTH'(state, value) {
        state.authenticated = value;
    },
    'CLEAR_AUTH'(state) {
        state.token = null;
        state.user = {};
        state.authenticated = false;
        router.replace({ name: 'signin' });
    },
}

const actions = {
    setLogoutTimer({ commit }, tokenLife) {
        setTimeout(() => {
            commit('CLEAR_AUTH');
        }, tokenLife);
    },
    signup({ commit }, authData) {
        axiosObj.post('/register', {
            name: authData.name,
            email: authData.email,
            password: authData.password,
        })
            .then(res => {
                commit('AUTH_USER', { user: res.data.data.user, token: res.data.data.token })
            })
            .catch(err => console.log(err))
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
                    commit('AUTH_USER', { user: res.data.data.user, token: res.data.data.token });
                    commit('SET_AUTH', true);
                    router.push({ name: 'dashboard' });

                    dispatch('setLogoutTimer', tokenLife);
                }
            })
            .catch(err => {

            })
    },
    signout({ commit }) {
        commit('CLEAR_AUTH');
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('expirationDate');
        router.replace({ name: 'signin' });
    },
    tryAutoLogin({ commit }) {
        const token = localStorage.getItem('token');
        if (!token) {
            return
        }
        const expirationDate = localStorage.getItem('expirationDate')
        const now = new Date()
        if (now >= expirationDate) {
            return
        }
        const userId = localStorage.getItem('userId')
        commit('AUTH_USER', {
            user: { name: 'Mg Mg', email: 'kaungmyatsoe.m193@gmail.com' },
            token,
        });
        commit('SET_AUTH', true);
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
    }
}

export default {
    state,
    mutations,
    actions,
    getters,
}