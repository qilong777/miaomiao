<template>
  <div class="movie-body">
    <Loading v-if="isLoading" />
    <Scroller v-else :handleToScroll="handleToScroll" :handleToTouchEnd="handleToTouchEnd">
      <div>
        <div class="pull-down" v-if="pullDownMessage!=''">
          <Loading />
          {{this.pullDownMessage}}
        </div>
        <ul>
          <li v-for="item in movieList" :key="item.id" @tap="handleToDetail(item.id)">
            <div class="pic-show">
              <img :src="item.img | setWH('128.180')" />
            </div>
            <div class="info-list">
              <h2>
                {{item.nm}}
                <img v-if="item.version" src="@/assets/images/maxs.png" />
              </h2>
              <p>
                观众评
                <span class="grade">{{item.sc}}</span>
              </p>
              <p>主演:{{item.star}}</p>
              <p>{{item.showInfo}}</p>
            </div>
            <div class="btn-mall" @tap.stop>购票</div>
          </li>
        </ul>
      </div>
    </Scroller>
  </div>
</template>

<script>
export default {
  name: "NowPlaying",
  data() {
    return {
      movieList: [],
      pullDownMessage: "",
      isLoading: true,
      prevCityId: -1
    };
  },
  methods: {
    //进入详情页
    handleToDetail(id) {
      this.$router.push("nowDetail/" + id);
    },
    handleToScroll(pos) {
      if (pos.y > 30) {
        this.pullDownMessage = "放开刷新";
      } else {
        this.pullDownMessage = "";
      }
    },
    handleToTouchEnd(pos) {
      if (pos.y > 30) {
        this.pullDownMessage = "数据更新中...";
        this.request({
          url: "/api/movieOnInfoList",
          params: {
            cityId: this.$store.state.city.id
          }
        })
          .then(res => {
            if (res.msg === "ok") {
              this.pullDownMessage = "更新成功";
              setTimeout(() => {
                this.movieList = res.data.movieList;
                this.pullDownMessage = "";
              }, 500);
            }
          })
          .catch(err => {
            this.pullDownMessage = "更新失败";
            setTimeout(() => {
              this.pullDownMessage = "";
            }, 1000);
          });
      }
    }
  },
  activated() {
    let cityId = this.$store.state.city.id;
    if (this.prevCityId == cityId) {
      return;
    }
    this.isLoading = true;
    this.request({
      url: "/api/movieOnInfoList",
      params: {
        cityId
      }
    })
      .then(res => {
        if (res.msg === "ok") {
          this.movieList = res.data.movieList;
          this.isLoading = false;
          this.prevCityId = cityId;
        }
      })
      .catch(err => {
        this.isLoading = false;
      });
  }
};
</script>

<style lang="scss" scoped>
.movie-body {
  position: relative;
  flex: 1;
  overflow: auto;
  .pull-down {
    position: relative;
    height: 70px;
    width: 100%;
    text-align: center;
    font-size: 14px;
  }
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