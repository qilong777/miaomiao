<template>
  <div class="messageBox">
    <h2>{{title}}</h2>
    <p>{{content}}</p>
    <div>
      <div v-if="cancel" @touchstart="handleCancel()">{{cancel}}</div>
      <div v-if="ok" @touchstart="handleOk()">{{ok}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MessageBox"
};
</script>

<style lang="scss" scoped>
.messageBox {
  position: absolute;
  left: 50%;
  top: 50%;
  margin-top: -60px;
  margin-left: -100px;
  width: 200px;
  height: 120px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background: #fff;
  box-shadow: 3px 3px 3px 3px #ccc;
  h2 {
    text-align: center;
    line-height: 40px;
    font-size: 18px;
  }
  p {
    text-align: center;
    line-height: 40px;
  }
  > div {
    position: absolute;
    display: flex;
    bottom: 0;
    width: 100%;
    border-top: 1px solid #ccc;
    div {
      flex: 1;
      text-align: center;
      line-height: 30px;
      border-right: 1px solid #ccc;
      &:last-child {
        border: none;
      }
    }
  }
}
</style>