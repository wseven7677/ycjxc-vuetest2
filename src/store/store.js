import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        // user: null
        user: null
    },
    getters: {},
    mutations: {
        logIn (state,payload) {
          state.user = payload.loginRightUser;
          sessionStorage.setItem('logedIn',payload.loginRightUser);
        },
        logOut (state) {
          state.user = null;
          sessionStorage.setItem('logedIn',null);
        }
    },
    actions: {
        logIn () {},
        logOut () {}
    }
});

export default store;
