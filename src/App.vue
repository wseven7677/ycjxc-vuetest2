<template>
  <div id="app">
    <el-container>
      <el-header>
        <img class="imgLogo" src="./assets/logo.png">
        <el-menu
          :default-active="activeIndex2"
          class="el-menu-demo"
          mode="horizontal"
          :router="true"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b">
          <el-menu-item index="/">首页</el-menu-item>
          <el-menu-item index="/history">迎机史志</el-menu-item>
          <el-menu-item index="/picture">迎机图片</el-menu-item>
          <el-menu-item index="/member">迎机人物</el-menu-item>
          <el-menu-item index="/contact">联系站长</el-menu-item>
        </el-menu>

        <div v-if="!logState" class="partLogin">
          <router-link to="/login">登录</router-link>&nbsp;|
          <router-link to="/login">注册</router-link>
        </div>
        <div v-else class="partLogin">
          {{logState}}，您好&nbsp;|
          <span class="partLogOut" @click="handleLogOut()">登出</span>
        </div>
      </el-header>
      <div class="sm-header">
        <ul>
          <li><router-link to="/">首页</router-link></li>
          <li><router-link to="/history">迎机史志</router-link></li>
          <li><router-link to="/picture">迎机图片</router-link></li>
          <li><router-link to="/member">迎机人物</router-link></li>
          <li><router-link to="/contact">联系站长</router-link></li>
        </ul>
      </div>
      <el-main>
        <router-view/>
      </el-main>
      <el-footer>
        2018&nbsp;
        <a target="_blank" href="https://github.com/wseven7677/ycjxc-vuetest2/blob/master/README.md">
          更新日志
        </a>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
import store from './store/store'
import Base64 from './utils/base64'

export default {
  name: 'App',
  data() {
    // 验证用户是否在线：
    let base = new Base64();
    if (localStorage.getItem('ycjxc_USER_STATE')) {
      var storageItem = 'null';
      storageItem = localStorage.getItem('ycjxc_USER_STATE');
      if (storageItem !== 'null') {
        store.commit('logIn', JSON.parse(base.decode(storageItem)));
      }
    }

    return {
      activeIndex2: this.$route.path
    };
  },
  methods: {
    handleLogOut() {
      store.commit('logOut');
    }
  },
  computed: {
    logState: function() {
      return store.state.user;
    }
  }
}
</script>

<style lang="less">
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}
* {
    margin: 0;
    padding: 0;
}
.el-footer,
.el-header {
    background-color: #545c64;
    color: #333;
    text-align: center;
    line-height: 60px;
}

.el-header {
    text-align: left;
    .imgLogo {
        width: 40px;
        margin: 10px 0;
    }
    .el-menu {
        display: inline-block;
        margin-left: 30px;
    }

    .partLogin {
        float: right;
        color: #ddd;
        font-size: 14px;

        a {
            color: #ddd;
        }

        .partLogOut {
            cursor: pointer;
            text-decoration: underline;
        }
    }
}

.el-footer {
    a {
        color: #222;
        text-decoration: none;

        &:hover {
            color: #ffd04b;
        }
    }
}

.el-main {
    padding: 0;
}

.pageContentWrap {
    margin: 20px auto;
    width: 90%;

    text-align: left;
    h4 {
        margin: 20px 0;
        padding-bottom: 10px;
        border-bottom: 1px solid #bbb;
    }
}

.sm-header {
    display: none;
}
@media only screen and (max-width: 650px) {
    .el-header {
        display: none;
    }
    .sm-header {
        display: block;

        li {
            background-color: #545c64;
            line-height: 40px;
            a {
                color: #eee;
                text-decoration: none;
            }
        }
    }
}
</style>
