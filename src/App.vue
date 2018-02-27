<template>
  <div id="app">
    <el-container>
      <el-header>
        <img class="imgLogo" src="./assets/logo.png">
        <el-menu
          :default-active="activeIndex2"
          class="el-menu-demo"
          mode="horizontal"
          @select="handleSelect"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b">
          <el-menu-item index="1"><router-link to="/">首页</router-link></el-menu-item>
          <el-menu-item index="2"><router-link to="/history">迎机史志</router-link></el-menu-item>
          <el-menu-item index="3"><router-link to="/picture">迎机图片</router-link></el-menu-item>
          <el-menu-item index="4"><router-link to="/member">迎机人物</router-link></el-menu-item>
          <el-menu-item index="5"><router-link to="/contact">联系站长</router-link></el-menu-item>
        </el-menu>

        <div class="partLogin">
          <router-link to="/login">登录</router-link>&nbsp;|
          <router-link to="/login">注册</router-link>
        </div>
      </el-header>
      <el-main>
        <router-view/>
      </el-main>
      <el-footer>
        2018 网站说明
      </el-footer>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      activeIndex2: '1'
    }
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
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
.el-header, .el-footer {
  background-color: #545c64;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-header {
  text-align: left;
  .imgLogo{
    width: 40px;
    margin: 10px 0;
  }
  .el-menu{
    display: inline-block;
    margin-left: 30px;
  }

  .partLogin {
    float: right;
    color: #ddd;

    a {
      color: #ddd;
      font-size: 14px;
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

</style>
