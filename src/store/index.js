import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';

const initialStoreState = () => ({
  isLoading: true,
  authChallenge: '',
  authToken: '',
  appRedirectPath: '',
});

export const mutations = {
  RESET_STORE: 'RESET_STORE',
  SET_IS_LOADING: 'SET_IS_LOADING',
  SET_AUTH_CHALLENGE: 'SET_AUTH_CHALLENGE',
  SET_AUTH_TOKEN: 'SET_AUTH_TOKEN',
  SET_APP_REDIRECT_PATH: 'SET_APP_REDIRECT_PATH',
};

export const store = createStore({
  strict: true,
  state: initialStoreState(),
  mutations: {
    [mutations.RESET_STORE]: (state) => {
      Object.entries(initialStoreState()).forEach(([key, value]) => {
        state[key] = value;
      });
    },
    [mutations.SET_IS_LOADING]: (state, payload) => {
      state.isLoading = payload;
    },
    [mutations.SET_AUTH_CHALLENGE]: (state, payload) => {
      state.authChallenge = payload;
    },
    [mutations.SET_AUTH_TOKEN]: (state, payload) => {
      state.authToken = payload;
    },
    [mutations.SET_APP_REDIRECT_PATH]: (state, payload) => {
      state.appRedirectPath = payload;
    },
  },
  actions: {
    signOut({ commit }) {
      commit(mutations.RESET_STORE);
    }
  },
  plugins: [
    createPersistedState({
      key: 'spotify',
      paths: ['authChallenge', 'authToken', 'appRedirectPath'],
    }),
  ],
});
