<template>
  <div class="wrapper" ref="wrapper">
    <slot></slot>
  </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  name: "Scroller",
  props: {
    handleToScroll: {
      type: Function,
      default: function() {}
    },
    handleToTouchEnd: {
      type: Function,
      default: function() {}
    }
  },
  methods: {
    toScrollTop(y) {
      this.scroll.scrollTo(0, y);
    }
  },
  created() {
    this.$nextTick(() => {
      this.scroll = new BScroll(this.$refs.wrapper, {
        tap: true,
        probeType: 1
      });
      this.scroll.on("scroll", pos => {
        this.handleToScroll(pos);
      });
      this.scroll.on("touchEnd", pos => {
        this.handleToTouchEnd(pos);
      });
    });
  }
};
</script>

<style lang="scss" scoped>
.wrapper {
  position: absolute;
  height: 100%;
  width: 100%;
}
</style>