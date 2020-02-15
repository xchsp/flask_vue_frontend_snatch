<template>
  <div class="container">
    <div class="closeBtn">
      <span class="iconfont iconicon-test"></span>
    </div>
    <div class="logo">
      <span class="iconfont iconnew"></span>
    </div>
    <div class="inputName">
      <authInput
        @input="setUserName"
        err_message="请输入正确的手机号"
        phone="phone"
        placeholder="请输入手机号"
        ref="phone"
        rule="^\d{5,10}$"
      ></authInput>
    </div>
    <div class="inputPwd">
      <authInput
        @input="setPassword"
        @keyup="sendLogin"
        err_message="请输入正确的密码"
        placeholder="请输入密码"
        rule="^\d{3,10}$"
        type="password"
      ></authInput>
    </div>
    <div class="btn">
      <authBtn @click="sendLogin" text="登录" />
      <div class="register">
        还没有账号?
        <router-link to="/register">请注册</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import authInput from '@/pages/auth/components/authInput'
import authBtn from '@/pages/auth/components/authBtn'

export default {
  data() {
    return {
      username: '',
      password: ''
    }
  },
  components: {
    authInput,
    authBtn
  },
  mounted() {
    localStorage.removeItem('token')
  },
  methods: {
    setUserName(name) {
      this.username = name
    },
    setPassword(password) {
      this.password = password
    },
    sendLogin() {
      console.log('username=', this.username, 'password=', this.password)
      this.$axios({
        url: '/login_c',
        method: 'POST',
        data: {
          username: this.username,
          password: this.password
        }
      })
        .then(res => {
          console.log(res)
          if (res.data.statusCode == 200) {

            localStorage.setItem('token', res.data.data.token)
            localStorage.setItem('user_id', res.data.data.user.id)
            this.$toast.success(res.data.message)
            let timer = setTimeout(() => {
              clearTimeout(timer)
              this.$router.push({
                name: 'homePage'
              })
            }, 1000)
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  padding: 20/@vv;
}
.closeBtn {
  .iconfont {
    font-size: 27/@vv;
  }
}
.logo {
  display: flex;
  justify-content: center;
  .iconfont {
    color: #d81e06;
    font-size: 126/@vv;
  }
}
.btn {
  margin: 50px auto 0;
}
.register {
  margin-top: 20/@vv;
  text-align: center;
}
</style>
