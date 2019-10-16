<template>
  <div class="center">
    <van-panel title="个人中心" :status="'当前身份:'+identity"></van-panel>
    <div class="img-box">
      <van-uploader :before-read="beforeRead" :after-read="afterRead">
        <van-image
          width="100px"
          height="100px"
          round
          fit="cover"
          :src="$store.state.user.userHead"
        />
        <p class="tip">点击图片修改头像</p>
      </van-uploader>
    </div>
    <van-panel icon="friends" title="用户名" :desc="$store.state.user.name" status="状态"></van-panel>
    <van-nav-bar
      title="选择操作"
      left-text="退出"
      :right-text="rightText"
      left-arrow
      @click-left="handleToLogout"
      @click-right="handleToAdmin"
    />
  </div>
</template>

<script>
import { request } from "@/network/request";
export default {
  name: "center",
  methods: {
    beforeRead(file) {
      console.log(file);

      if (file.type !== "image/jpeg") {
        this.$toast({
          type: "error",
          message: "请上传 jpg 格式图片"
        });
        return false;
      } else if (file.size > 1024 * 1024) {
        this.$toast({
          type: "error",
          message: "图片大小不能超过1MB"
        });
        return false;
      }
      return true;
    },
    afterRead(file) {
      var param = new FormData();
      param.append("file", file.file, file.name);
      this.request({
        method: "post",
        url: "/api2/users/uploadUserHead",
        data: param,
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }).then(res => {
        if (res.status === 1) {
          this.$toast({
            type: "success",
            message: res.msg
          });
          this.$store.commit("user/USER_NAME", {
            name: this.$store.state.user.name,
            isAdmin: this.$store.state.user.isAdmin,
            userHead: res.data.userHead + "?" + Date.now()
          });
        } else {
          this.$toast({
            type: "error",
            message: res.msg
          });
        }
      });
    },
    handleToLogout() {
      this.request({
        method: "get",
        url: "/api2/users/logout"
      }).then(res => {
        const status = res.status;
        if (status === 1) {
          this.$store.commit("user/USER_NAME", {
            name: "",
            isAdmin: false,
            userHead: ""
          });
          this.$router.push("/profile/login");
          this.$toast({
            type: "success",
            message: "退出成功"
          });
        }
      });
    },
    handleToAdmin() {
      this.$router.push("/admin");
    }
  },
  computed: {
    identity() {
      return this.$store.state.user.isAdmin ? "管理员" : "普通用户";
    },
    rightText() {
      return this.$store.state.user.isAdmin ? "进入管理界面" : "";
    }
  },
  beforeRouteEnter(to, from, next) {
    //判断是否是登陆状态
    request({
      method: "get",
      url: "/api2/users/getUser"
    }).then(res => {
      const status = res.status;
      if (status === 0) {
        next("/profile/login");
      } else {
        document.title = "个人中心";
        next(vm => {
          vm.$store.commit("user/USER_NAME", {
            name: res.data.username,
            isAdmin: res.data.isAdmin,
            userHead: res.data.userHead
          });
        });
      }
    });
  }
};
</script>

<style lang="scss" scoped>
.center {
  .img-box {
    text-align: center;
    padding: 10px 0;
    .tip {
      color: #ccc;
      font-size: 14px;
      margin-top: 5px;
    }
  }
  .van-cell__label {
    font-size: 20px;
  }
}
</style>