<template>
  <div class="admin">
    <van-nav-bar title="管理界面" left-text="退出" left-arrow cross @click-left="onClickLeft" />
    <div class="wrapper">
      <van-sidebar v-model="activeKey">
        <van-sidebar-item to="/admin/users" title="用户管理" />
        <van-sidebar-item to="/admin/movie" title="电影管理" />
        <van-sidebar-item to="/admin/cinema" title="影院管理" />
      </van-sidebar>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";
import { request } from "@/network/request";
export default {
  name: "Admin",
  data() {
    return {
      activeKey: 0
    };
  },
  methods: {
    onClickLeft() {
      this.$router.replace("/profile/center");
    }
  },
  beforeRouteEnter(to, from, next) {
    //判断是否是登陆状态
    request({
      method: "get",
      url: "/api2/admin"
    }).then(res => {
      const status = res.status;
      if (status === 1) {
        document.title = "用户管理";
        next();
      } else {
        Toast({
          type: "fail",
          message: "您没有管理权限"
        });
        next("/profile/center");
      }
    });
  },
  beforeRouteLeave(to, from, next) {
    this.activeKey = 0;
    next();
  }
};
</script>
<style lang="scss" scoped>
.admin {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  background-color: #eee;
  overflow: hidden;
  .van-nav-bar {
    flex-shrink: 0;
  }
  .wrapper {
    display: flex;
    flex-grow: 1;
    overflow: hidden;
    margin-bottom: 50px;
    .van-sidebar {
      background-color: #fafafa;
      flex-shrink: 0;
    }
  }
}
</style>