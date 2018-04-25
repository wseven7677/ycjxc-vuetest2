import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        user: null,
        group: '0'
    },
    getters: {},
    mutations: {
        logIn (state,payload) {
          state.user = payload.loginRightUser;
          state.group = payload.loginRightGroup;
          sessionStorage.setItem('logedIn',JSON.stringify(payload));
        },
        logOut (state) {
          state.user = null;
          state.group = '0';
          sessionStorage.setItem('logedIn','null');
        }
    },
    actions: {
        // logIn () {},
        // logOut () {}
    }
});

export default store;
