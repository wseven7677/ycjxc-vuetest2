<template>
	<div class="pageLogin">
		<div v-if="!logState" class="partLogingin">
      <el-form
  			label-width="80px"
  			:model="formLogin"
  			status-icon
  			:rules="ruleLogin"
  			ref="formLogin"
  			class="formLog" >
  		  <el-form-item label="帐号" prop="logusr">
  		    <el-input v-model="formLogin.logusr" auto-complete="off"></el-input>
  		  </el-form-item>
  		  <el-form-item label="密码" prop="logpw">
  		    <el-input v-model="formLogin.logpw" auto-complete="off" type="password"></el-input>
  		  </el-form-item>

  		  <el-form-item>
  		    <el-button type="primary" @click="submitForm('formLogin')">登录</el-button>
  		    <el-button @click="resetForm('formLogin')">重置</el-button>
  		  </el-form-item>
  		</el-form>

  		用户注册暂不开放。敬请期待。
    </div>
    <div v-else class="partLogedin">
      您已登录，{{logState}}。
    </div>
    <div class="part-mobile-show">
      小屏移动端暂不支持登录哟。
    </div>
	</div>
</template>

<script>
import store from '../store/store'
import utils from '../utils/index'

export default {
  name: 'LoginCom',
  data() {
    return {
      formLogin: {
        logusr: '',
        logpw: ''
      },
      ruleLogin: {
        logusr: [{
          required: true,
          message: '请输入您的帐号',
          trigger: 'blur'
        }],
        logpw: [{
          required: true,
          message: '请输入密码',
          trigger: 'blur'
        }]
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.validateLogIn();
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    validateLogIn() {
      utils.ajax('/api/users', resd => {
        // 查询数据库中的用户数据：
        if(resd) {
            // 查询成功登录并跳转：
            store.commit('logIn', {
              loginRightUser: resd.username,
              loginRightGroup: resd.group
            });
            // 跳转 返回首页
            this.$router.push('/');
        }else{
            alert('用户名或密码错误。');
        }
    },'post',this.formLogin);
    }
  },
  computed: {
    logState: function() {
      return store.state.user;
    }
  }
}
</script>

<style scoped lang="less">
.pageLogin {
    .formLog {
        width: 500px;
        margin: 60px auto;
    }

    .partLogedin {
        margin: 60px 0;
    }

    .part-mobile-show {
        display: none;
    }

    @media only screen and (max-width: 650px) {
        .partLogedin,
        .partLogingin {
            display: none;
        }
        .part-mobile-show {
            display: block;
            margin: 60px 0;
        }
    }
}
</style>
