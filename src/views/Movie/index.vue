<template>
  <main>
    <div class="movie-menu">
      <router-link tag="div" to="/movie/city" class="city-name" active-class="active">
        <span>{{$store.state.city.nm}}</span>
        <i class="iconfont icon-lower-triangle"></i>
      </router-link>
      <div class="hot-switch">
        <router-link tag="div" to="/movie/nowPlaying" class="hot-item" active-class="active">正在热映</router-link>
        <router-link tag="div" to="/movie/comingSoon" class="hot-item" active-class="active">即将上映</router-link>
      </div>
      <router-link tag="div" to="/movie/search" class="search-entry" active-class="active">
        <i class="iconfont icon-sousuo"></i>
      </router-link>
    </div>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </main>
</template>

<script>
import { messageBox } from "components/JS";
export default {
  name: "Movie",
  components: {},
  beforeRouteEnter(to, from, next) {
    document.title = "喵喵电影";
    next(vm => {
      vm.$store.commit("changeTitle", "喵喵电影");
    });
  },
  mounted() {
    setTimeout(() => {
      this.request({
        url: "/api/getLocation"
      }).then(res => {
        if (res.msg === "ok") {
          let nm = res.data.nm;
          let id = res.data.id;
          console.log(id);

          if (id == this.$store.state.city.id) {
            return;
          }
          messageBox({
            title: "定位",
            content: nm,
            cancel: "取消",
            ok: "切换定位",
            handleOk() {
              window.localStorage.setItem("nowNm", nm);
              window.localStorage.setItem("nowId", id);
              window.location.reload();
            }
          });
        }
      });
    }, 3000);
  }
};
</script>

<style lang="scss" scoped>
.movie-menu {
  display: flex;
  width: 100%;
  height: 45px;
  justify-content: space-between;
  align-items: center;
  background: #fff;
  border-bottom: 1px solid #e6e6e6;
  z-index: 10;
  .city-name {
    margin-left: 20px;
    height: 100%;
    line-height: 45px;
    &.active {
      color: #ef4238;
      border-bottom: 2px #ef4238 solid;
    }
  }
  .hot-switch {
    display: flex;
    height: 100%;
    line-height: 45px;
  }
  .hot-item {
    font-size: 15px;
    color: #666;
    width: 80px;
    text-align: center;
    margin: 0 12px;
    font-weight: 700;
    &.active {
      color: #ef4238;
      border-bottom: 2px #ef4238 solid;
    }
  }
  .search-entry {
    margin-right: 20px;
    height: 100%;
    line-height: 45px;
    &.active {
      color: #ef4238;
      border-bottom: 2px #ef4238 solid;
    }
    i {
      font-size: 24px;
      color: red;
    }
  }
}
</style>