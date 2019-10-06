<template>
  <div class="cinema_body">
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
</template>

<script>
// allowRefund:1
// buyout:0
// cityCardTag:0
// deal:0
// endorse:1
// hallTypeVOList:Array[0]
// sell:1
// snack:1
// vipTag:"折扣卡"
export default {
  name: "CinemaList",
  data() {
    return {
      cinemaList: []
    };
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
  created() {
    this.request({
      url: "/api/cinemaList",
      params: {
        cityId: 10
      }
    }).then(res => {
      if (res.msg === "ok") {
        this.cinemaList = res.data.cinemas;
      }
    });
  }
};
</script>

<style lang="scss" scoped>
.cinema_body {
  flex: 1;
  overflow: auto;
  ul {
    padding: 20px;
    li {
      border-bottom: 1px solid #e6e6e6;
      margin-bottom: 20px;
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