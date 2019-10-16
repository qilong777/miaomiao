<template>
  <div class="register">
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
      <van-field
        left-icon="lock"
        v-model="cpassword"
        clearable
        type="password"
        label="确认密码"
        placeholder="请再次输入密码"
        required
      />
      <van-field
        left-icon="invition"
        v-model="email"
        required
        clearable
        label="邮箱账号"
        placeholder="请输入邮箱号"
      />

      <van-field
        left-icon="checked"
        v-model="verify"
        required
        clearable
        label="邮箱验证码"
        placeholder="请输入短信验证码"
      >
        <van-button
          :disabled="disabled"
          slot="button"
          size="small"
          type="primary"
          @click="handleToVerify"
        >{{verifyInfo}}</van-button>
      </van-field>
    </van-cell-group>
    <van-button type="primary" size="large" color="#e54847" @click="handleToRegister">立即注册</van-button>
    <div class="login_link">
      <router-link to="/profile/login">立即登录</router-link>
      <router-link to="/profile/findPassword">找回密码</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "Register",
  data() {
    return {
      username: "",
      password: "",
      cpassword: "",
      email: "",
      verify: "",
      verifyInfo: "发送验证码",
      disabled: false
    };
  },
  methods: {
    //发送验证码
    handleToVerify() {
      if (this.disabled) {
        return;
      }
      this.request({
        method: "get",
        url: "/api2/users/verify?email=" + this.email
      }).then(res => {
        const status = res.status;
        if (status === 1) {
          this.$toast({
            type: "success",
            message: "验证码发送成功"
          });
          this.countDown();
        } else {
          this.$toast({
            type: "fail",
            message: res.msg
          });
        }
      });
    },
    handleToRegister() {
      if (
        !(
          this.username.trim() &&
          this.password.trim() &&
          this.email.trim() &&
          this.verify.trim()
        )
      ) {
        this.$toast({
          type: "fail",
          message: "请填写完整信息"
        });
        return;
      }
      if (this.password !== this.cpassword) {
        this.$toast({
          type: "fail",
          message: "两次密码不一致"
        });
        return;
      }
      this.request({
        method: "post",
        url: "/api2/users/register",
        data: {
          username: this.username,
          password: this.password,
          email: this.email,
          verify: this.verify
        }
      }).then(res => {
        const status = res.status;
        if (status === 1) {
          this.$toast({
            type: "success",
            message: "用户注册成功"
          });
          this.$router.push("/profile/login");
        } else {
          this.$toast({
            type: "fail",
            message: res.msg
          });
        }
      });
    },
    countDown() {
      this.disabled = true;
      let count = 60;
      let timer = setInterval(() => {
        count--;
        if (count > 0) {
          this.verifyInfo = "剩余" + count + "秒";
        } else {
          this.verifyInfo = "发送验证码";
          this.disabled = false;
          clearInterval(timer);
          timer = null;
        }
      }, 1000);
    }
  },
  beforeRouteEnter(to, from, next) {
    document.title = "注册界面";
    next();
  }
};
</script>

<style lang="scss" scoped>
.register {
  padding: 20px 10px 0;
  .van-cell-group {
    margin-bottom: 20px;
    .van-button {
      width: 80px;
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