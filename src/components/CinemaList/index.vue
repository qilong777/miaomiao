<template>
  <div class="cinema_body">
    <Loading v-if="isLoading" />
    <Scroller v-else :handleToScroll="handleToScroll" :handleToTouchEnd="handleToTouchEnd">
      <div>
        <div class="pull-down" v-if="pullDownMessage!=''">
          <Loading />
          {{this.pullDownMessage}}
        </div>
        <ul>
          <li v-for="item in cinemaList" :key="item.id">
            <div>
              <span>{{item.nm}}</span>
              <span class="q">
                <span class="price">{{item.sellPrice}}</span> 元起
              </span>
            </div>
            <div class="address">
              <span>{{item.addr}}</span>
              <span>{{item.distance}}</span>
            </div>
            <div class="card">
              <div
                v-for="(val, key) in tagIsOne(item.tag)"
                :key="key"
                :class="key | formatClass(key)"
              >{{key | formatCard(key)}}</div>
            </div>
          </li>
        </ul>
      </div>
    </Scroller>
  </div>
</template>

<script>
export default {
  name: "CinemaList",
  data() {
    return {
      cinemaList: [],
      pullDownMessage: "",
      isLoading: true,
      prevCityId: -1
    };
  },
  methods: {
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
          url: "/api/cinemaList",
          params: {
            cityId: 10
          }
        })
          .then(res => {
            if (res.msg === "ok") {
              this.pullDownMessage = "更新成功";
              setTimeout(() => {
                this.cinemaList = res.data.cinemas;
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
  computed: {
    tagIsOne() {
      let arr = ["allowRefund", "buyout", "deal", "endorse", "snack", "vipTag"];
      return function(tags) {
        let res = {};
        for (let key in tags) {
          if (tags.hasOwnProperty(key)) {
            if (
              arr.indexOf(key) != -1 &&
              (tags[key] == "1" || tags[key] == "折扣卡")
            ) {
              res[key] = 1;
            }
          }
        }
        return res;
      };
    }
  },
  filters: {
    formatCard(key) {
      const tagObj = {
        allowRefund: "可退",
        buyout: "售空",
        deal: "可购",
        endorse: "热卖",
        snack: "小吃",
        vipTag: "折扣卡"
      };

      return tagObj[key];
    },
    formatClass(key) {
      const tagObj = {
        allowRefund: "bl",
        buyout: "bl",
        deal: "bl",
        endorse: "bl",
        snack: "or",
        vipTag: "or"
      };

      return tagObj[key];
    }
  },
  activated() {
    let cityId = this.$store.state.city.id;
    if (this.prevCityId == cityId) {
      return;
    }
    this.isLoading = true;
    this.request({
      url: "/api/cinemaList",
      params: {
        cityId
      }
    })
      .then(res => {
        if (res.msg === "ok") {
          this.cinemaList = res.data.cinemas;
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
.cinema_body {
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
    li {
      border-bottom: 1px solid #e6e6e6;
      margin-top: 12px;
      &.pull-down {
        padding: 0;
        margin: 0;
        text-align: center;
        width: 100%;
      }
    }
  }
  div {
    margin-bottom: 10px;
  }
  .q {
    font-size: 11px;
    color: #f03d37;
  }
  .price {
    font-size: 18px;
  }
  .address {
    font-size: 13px;
    color: #666;
    span:nth-of-type(2) {
      float: right;
    }
  }
  .card {
    display: flex;
    div {
      padding: 0 3px;
      height: 15px;
      line-height: 15px;
      border-radius: 2px;
      color: #f90;
      border: 1px solid #f90;
      font-size: 13px;
      margin-right: 5px;
      &.or {
        color: #f90;
        border: 1px solid #f90;
      }
      &.bl {
        color: #589daf;
        border: 1px solid #589daf;
      }
    }
  }
}
</style>