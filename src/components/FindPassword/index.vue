<template>
  <div class="find-password">
    <van-cell-group>
      <van-field
        left-icon="lock"
        v-model="password"
        clearable
        type="password"
        label="新密码"
        placeholder="请输入新密码"
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
        <van-button slot="button" size="small" type="primary" @click="handleToVerify">发送验证码</van-button>
      </van-field>
    </van-cell-group>
    <van-button type="primary" size="large" color="#e54847" @click="handleToUpdatePassword">修改密码</van-button>
    <div class="login_link">
      <router-link to="/profile/login">立即登录</router-link>
      <router-link to="/profile/register">立即注册</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "FindPassword",
  data() {
    return {
      password: "",
      cpassword: "",
      email: "",
      verify: ""
    };
  },
  methods: {
    handleToVerify() {
      this.request({
        method: "get",
        url: "/api2/users/verify?email=" + this.email
      }).then(res => {
        const status = res.status;
        console.log(status);

        if (status === 1) {
          this.$toast({
            type: "success",
            message: "验证码发送成功"
          });
        } else {
          this.$toast({
            type: "fail",
            message: "验证码发送失败"
          });
        }
      });
    },
    handleToUpdatePassword() {
      if (!(this.password.trim() && this.email.trim() && this.verify.trim())) {
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
        url: "/api2/users/findPassword",
        data: {
          password: this.password,
          email: this.email,
          verify: this.verify
        }
      }).then(res => {
        const status = res.status;
        if (status === 1) {
          this.$toast({
            type: "success",
            message: "密码修改成功"
          });
          this.$router.push("/profile/login");
        } else {
          this.$toast({
            type: "fail",
            message: res.msg + ",请检查"
          });
        }
      });
    }
  },
  beforeRouteEnter(to, from, next) {
    document.title = "修改密码";
    next();
  }
};
</script>

<style lang="scss" scoped>
.find-password {
  padding: 20px 10px 0;
  .van-cell-group {
    margin-bottom: 20px;
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