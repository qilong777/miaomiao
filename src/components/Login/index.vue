<template>
  <div class="login">
    <van-cell-group>
      <van-field
        left-icon="friends"
        v-model="username"
        required
        clearable
        label="用户名"
        placeholder="请输入用户名"
      />
      <van-field
        left-icon="lock"
        v-model="password"
        clearable
        type="password"
        label="密码"
        placeholder="请输入密码"
        required
      />
      <div data-v-e7a41aa8 class="van-cell van-cell--required van-field">
        <div class="van-field__left-icon">
          <i class="van-icon van-icon-checked"></i>
        </div>
        <div class="van-cell__title van-field__label">
          <span>验证码</span>
        </div>
        <div class="van-cell__value">
          <div class="van-field__body">
            <input type="text" placeholder="请输入验证码" class="van-field__control" v-model="verifyImg" />
            <img @click="handleToChange" class="verifyImg" src="/api2/users/getVerifyImg" alt />
          </div>
        </div>
      </div>
    </van-cell-group>
    <van-button type="primary" size="large" color="#e54847" @click="handleToLogin">立即登录</van-button>
    <div class="login_link">
      <router-link to="/profile/register">立即注册</router-link>
      <router-link to="/profile/findPassword">找回密码</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: "",
      verifyImg: ""
    };
  },
  methods: {
    handleToLogin() {
      this.request({
        method: "post",
        url: "/api2/users/login",
        data: {
          username: this.username,
          password: this.password,
          verifyImg: this.verifyImg
        }
      }).then(res => {
        const status = res.status;
        if (status === 1) {
          this.$router.push("/profile/center");
          this.$toast({
            type: "success",
            message: "登录成功"
          });
        } else {
          this.$toast({
            message: res.msg,
            type: "fail"
          });
        }
      });
    },
    handleToChange(e) {
      e = e || window.event;
      const target = e.target || e.srcElement;
      target.src = "/api2/users/getVerifyImg?time=" + Date.now();
    }
  },
  beforeRouteEnter(to, from, next) {
    document.title = "登录界面";
    next();
  }
};
</script>

<style lang="scss" scoped>
.login {
  padding: 20px 10px 0;
  .van-cell-group {
    margin-bottom: 20px;
    .verifyImg {
      width: 100px;
      height: 30px;
    }
  }
  .login_link {
    display: flex;
    justify-content: space-between;
    a {
      text-decoration: none;
      margin: 5px;
      font-size: 14px;
      color: #e54847;
    }
  }
}
</style>