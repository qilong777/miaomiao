<template>
  <div class="movie-body">
    <ul>
      <li v-for="item in comingList" :key="item.id">
        <div class="pic-show">
          <img :src="item.img | setWH('128.180')" />
        </div>
        <div class="info-list">
          <h2>
            {{item.nm}}
            <img v-if="item.version" src="@/assets/images/maxs.png" />
          </h2>
          <p>
            <span class="person">{{item.wish}}</span>人想看
          </p>
          <p>主演:{{item.star}}</p>
          <p>{{item.rt}}上映</p>
        </div>
        <div class="btn-pre">预售</div>
      </li>
    </ul>
  </div>
</template>

<script>
import { log } from "util";
export default {
  name: "ComingSoon",
  data() {
    return {
      comingList: []
    };
  },
  created() {
    this.request({
      url: "/api/movieComingList",
      params: {
        cityId: 1
      }
    }).then(res => {
      if (res.msg === "ok") {
        this.comingList = res.data.comingList;
      }
    });
  }
};
</script>

<style lang="scss" scoped>
.movie-body {
  flex: 1;
  overflow: auto;
  ul {
    margin: 0 12px;
    overflow: hidden;
    li {
      margin-top: 12px;
      display: flex;
      align-items: center;
      border-bottom: 1px #e6e6e6 solid;
      padding-bottom: 10px;
    }
  }
  .pic-show {
    width: 64px;
    height: 90px;
    img {
      width: 100%;
    }
  }
  .info-list {
    margin-left: 10px;
    flex: 1;
    position: relative;
    h2 {
      font-size: 17px;
      line-height: 24px;
      width: 150px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    p {
      font-size: 13px;
      color: #666;
      line-height: 22px;
      width: 200px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .grade {
      font-weight: 700;
      color: #faaf00;
      font-size: 15px;
    }
    img {
      width: 50px;
      position: absolute;
      right: 10px;
      top: 5px;
    }
  }
  .btn-mall,
  .btn-pre {
    width: 47px;
    height: 27px;
    line-height: 28px;
    text-align: center;
    background-color: #f03d37;
    color: #fff;
    border-radius: 4px;
    font-size: 12px;
    cursor: pointer;
  }
  .btn-pre {
    background-color: #3c9fe6;
  }
}
</style>