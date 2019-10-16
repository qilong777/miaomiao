<template>
  <header>
    <van-icon v-if="show" @click="handleToBack()" name="arrow-left" />
    <!-- <slot></slot> -->
    <h1>{{title}}</h1>
  </header>
</template>

<script>
export default {
  name: "Header",
  props: {
    title: {
      type: String,
      default: "喵喵电影"
    }
  },
  methods: {
    handleToBack() {
      this.$router.back();
    }
  },
  computed: {
    show() {
      return window.history.length > 1;
    }
  }
};
</script>

<style lang="scss" scoped>
header {
  position: relative;
  width: 100%;
  height: 50px;
  color: #fff;
  background-color: #e54847;
  border-bottom: 1px solid #e54847;
  h1 {
    font-size: 18px;
    text-align: center;
    line-height: 50px;
  }
  i {
    position: absolute;
    left: 5px;
    top: 50%;
    margin-top: -13px;
    font-size: 26px;
  }
}
</style>