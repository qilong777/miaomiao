<template>
  <footer>
    <ul>
      <router-link tag="li" to="/movie" active-class="active">
        <i class="iconfont icon-dianying"></i>
        <span>电影</span>
      </router-link>
      <router-link tag="li" to="/cinema" active-class="active">
        <i class="iconfont icon-yingyuan"></i>
        <span>影院</span>
      </router-link>
      <router-link tag="li" to="/profile" active-class="active">
        <i class="iconfont icon-wode"></i>
        <span>我的</span>
      </router-link>
    </ul>
  </footer>
</template>

<script>
export default {
  name: "TabBar"
};
</script>

<style lang="scss" scoped>
footer {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 50px;
  background: #fff;
  box-shadow: 0px -1px 8px rgba(100, 100, 100, 0.1);
  ul {
    display: flex;
    height: 100%;
    align-items: center;
    li {
      display: flex;
      flex-direction: column;
      align-items: center;
      height: 40px;
      flex-grow: 1;
      &.active {
        color: #f03d37;
      }
      i {
        font-size: 20px;
      }
      span {
        font-size: 12px;
        line-height: 18px;
      }
    }
  }
}
</style>