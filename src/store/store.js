import Vue from 'vue'
import Vuex from 'vuex'
import Base64 from '../utils/base64'

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

          let base = new Base64();
          localStorage.setItem('ycjxc_USER_STATE',base.encode(JSON.stringify(payload)));
        },
        logOut (state) {
          state.user = null;
          state.group = '0';
          localStorage.setItem('ycjxc_USER_STATE','null');
        }
    },
    actions: {
        // logIn () {},
        // logOut () {}
    }
});

export default store;
