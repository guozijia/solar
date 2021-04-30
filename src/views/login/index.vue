<template>
  <div class="login-container">
    <div class="header" />

    <div class="container">

      <el-carousel height="350px" :interval="10000" class="container-image">
        <el-carousel-item v-for="item in 4" :key="item">
          <el-image :src="src" />
        </el-carousel-item>
      </el-carousel>

      <div class="longin-title">
        <h1>KSOLAR-光伏监控2.0</h1>
        <div class="longin-title-inner"><svg-icon style="font-size:30px;margin-top: 12px;" icon-class="test2" /><p>有效提高电站部署，低成本，高效率</p></div>
        <div class="longin-title-inner"><svg-icon style="font-size:30px;margin-top: 12px;" icon-class="test3" /><p>更迅速的告警监控，实时性，可靠性</p></div>
        <div class="longin-title-inner"><svg-icon style="font-size:30px;margin-top: 12px;" icon-class="test1" /><p>超精准的数据分析，可视化，云计算</p></div>
      </div>

      <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" autocomplete="on" label-position="left">

        <div class="title-container">
          <h3 class="title">登录你的账号</h3>
        </div>

        <el-form-item prop="username">
          <span class="svg-container">
            <svg-icon icon-class="user" />
          </span>
          <el-input
            ref="username"
            v-model="loginForm.username"
            placeholder="Username"
            name="username"
            type="text"
            tabindex="1"
            autocomplete="on"
          />
        </el-form-item>

        <el-tooltip v-model="capsTooltip" content="Caps lock is On" placement="right" manual>
          <el-form-item prop="password">
            <span class="svg-container">
              <svg-icon icon-class="password" />
            </span>
            <el-input
              :key="passwordType"
              ref="password"
              v-model="loginForm.password"
              :type="passwordType"
              placeholder="Password"
              name="password"
              tabindex="2"
              autocomplete="on"
              @keyup.native="checkCapslock"
              @blur="capsTooltip = false"
              @keyup.enter.native="handleLogin"
            />
            <span class="show-pwd" @click="showPwd">
              <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
            </span>
          </el-form-item>
        </el-tooltip>

        <el-button :loading="loading" class="loginbutton" @click.native.prevent="handleLogin">登录</el-button>
        <el-divider content-position="left" />
        <div style="position:relative">
          <div class="tips">
            <span>企业账号注册</span>
            <span>终端用户注册</span>
          </div>
        </div>
      </el-form>
    </div>
    <div class="footview">Copyright 2016-2020© 深圳科士达科技股份有限公司 版权所有 粤ICP备11083643号</div>
  </div>
</template>

<script>
import { validUsername } from '@/utils/validate'
// import SocialSign from './components/SocialSignin'

export default {
  name: 'Login',
  // components: { SocialSign },
  data() {
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('密码必须大于6个字符'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: 'admin',
        password: '111111'
      },
      loginRules: {
        username: [
          { required: true, message: '请输入 用户名', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
        ],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      passwordType: 'password',
      capsTooltip: false,
      loading: false,
      redirect: undefined,
      otherQuery: {},
      src: require('../../assets/images/login1.png')
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        const query = route.query
        if (query) {
          this.redirect = query.redirect
          this.otherQuery = this.getOtherQuery(query)
        }
      },
      immediate: true
    }
  },
  created() {
    // window.addEventListener('storage', this.afterQRScan)
  },
  mounted() {
    if (this.loginForm.username === '') {
      this.$refs.username.focus()
    } else if (this.loginForm.password === '') {
      this.$refs.password.focus()
    }
  },
  destroyed() {
    // window.removeEventListener('storage', this.afterQRScan)
  },
  methods: {
    checkCapslock(e) {
      const { key } = e
      this.capsTooltip = key && key.length === 1 && (key >= 'A' && key <= 'Z')
    },
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('user/login', this.loginForm)
            .then(() => {
              this.$router.push({ path: this.redirect || '/', query: this.otherQuery })
              this.loading = false
            })
            .catch(() => {
              this.loading = false
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur]
        }
        return acc
      }, {})
    }

  }
}
</script>

<style lang="scss">

$bg:#fff;
$light_gray:#666;
$cursor: #666;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }
  .loginbutton{
    width:100%;
    margin-bottom:10px;
    background-color: #1692FB;
    color: #fff;
    border-radius: 2px;
    height:45px;
    border: none;
  }
  .el-divider--horizontal{
     margin: 8px 0;
     background: 0 0;
     border-top: 1px dashed #e8eaec;
 }
  .el-form-item {
    border-radius: 1px;
    color: #454545;
    border: 1px solid #e2e2e2;

    &:hover{
    border-color: #00a4ff;
    outline: 0;
    }
    &:focus{
    border-color: #00a4ff;
    outline: 0;
    }

  }

}
</style>

<style lang="scss" scoped>
$bg:#fff;
$dark_gray:#889aa4;
$light_gray:#eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;
  display: flex;
  align-items:flex-start;
  flex-flow: row wrap;
  align-content: space-between;
  background-image: url('../../assets/images/loginbj.jpg');

  .container{
    display: flex;
    justify-content: flex-end;
    width: 100%;
    .container-image{
      width:350px;
      margin-left: 100px;
    }
    .longin-title{
      margin-top: 48px;
      h1{
        color: #1692FB;
        font-weight: 400;
      }
      .longin-title-inner{
        display: flex;
        p{
          font-size: 13px;
          line-height: 30px;
          color:#666;
          margin-left: 12px;
        }
      }
    }
    .login-form {
      position: relative;
      width: 520px;
      max-width: 100%;

      margin: 0 auto;
      overflow: hidden;
    }
  }
    .header{
      height: 60px;
      background-color: #2B303B;
      width: 100%;
    }
    .footview{
      height: 60px;
      background-color: #F5F7FA;
      width:100%;
      font-size: 12px;
      color: #666;
      text-align: center;
      line-height: 60px;
    }
  .tips {
    font-size: 14px;
    color: #000;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: #333;
      margin: 0px auto 40px auto;
      text-align: left;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }

  .thirdparty-button {
    position: absolute;
    right: 0;
    bottom: 6px;
  }

  @media only screen and (max-width: 470px) {
    .thirdparty-button {
      display: none;
    }
  }
}
</style>
