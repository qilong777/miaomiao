<template>
  <div class="city_body">
    <div class="city_list">
      <Loading v-if="isLoading" />
      <Scroller v-else ref="cityList">
        <div>
          <div class="city_hot">
            <h2>热门城市</h2>
            <ul class="clearfix" @tap="handleToCity($event)">
              <li v-for="item in hotCityList" :key="item.id" :data-id="item.id">{{item.nm}}</li>
            </ul>
          </div>
          <div class="city_sort" ref="cityGroups">
            <div v-for="item in cityList" :key="item.index">
              <h2>{{item.index}}</h2>
              <ul @tap="handleToCity($event)">
                <li v-for="item in item.list" :key="item.id" :data-id="item.id">{{item.nm}}</li>
              </ul>
            </div>
          </div>
        </div>
      </Scroller>
    </div>

    <div class="city_index">
      <ul>
        <li
          v-for="(item,index) in cityList"
          :key="item.index"
          @click="handleToIndex(index)"
        >{{item.index}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import { log } from "util";
export default {
  name: "City",
  data() {
    return {
      cityList: [],
      hotCityList: [],
      isLoading: true
    };
  },
  methods: {
    formatCityList(cities) {
      var cityList = [];
      let hotCityList = [];
      function isExist(firstLetter) {
        for (let i = 0, len = cityList.length; i < len; i++) {
          // console.log(cityList[i]);
          if (cityList[i]["index"] == firstLetter) {
            return i;
          }
        }
        return -1;
      }

      cities.forEach(ele => {
        let firstLetter = ele.py.substr(0, 1).toUpperCase();
        let index = isExist(firstLetter);
        if (index == -1) {
          cityList.push({
            index: firstLetter,
            list: [{ nm: ele.nm, id: ele.id }]
          });
        } else {
          cityList[index].list.push({ nm: ele.nm, id: ele.id });
        }

        if (ele.isHot === 1) {
          hotCityList.push(ele);
        }
      });
      cityList.sort((a, b) => a.index.charCodeAt() - b.index.charCodeAt());
      return {
        cityList,
        hotCityList
      };
    },
    handleToIndex(index) {
      const h2Top = this.$refs.cityGroups.getElementsByTagName("h2")[index]
        .offsetTop;
      this.$refs.cityList.toScrollTop(-h2Top);
      // const cityGroups = this.$refs.cityGroups;
      // const h2Top = cityGroups.getElementsByTagName("h2")[index].offsetTop;
      // const parent = cityGroups.parentNode;
      // const parentOringinTop = parent.scrollTop;
      // const time = parseInt(20000 / Math.abs(h2Top - parentOringinTop));
      // const isDown = h2Top >= parentOringinTop ? true : false;
      // if (this.timer) {
      //   clearInterval(this.timer);
      //   this.timer = null;
      // }
      // this.timer = setInterval(() => {
      //   if (isDown) {
      //     parent.scrollTop += 250;
      //     if (parent.scrollTop >= h2Top) {
      //       parent.scrollTop = h2Top;
      //       clearInterval(this.timer);
      //       this.timer = null;
      //     }
      //   } else {
      //     parent.scrollTop -= 250;
      //     if (parent.scrollTop <= h2Top) {
      //       parent.scrollTop = h2Top;
      //       clearInterval(this.timer);
      //       this.timer = null;
      //     }
      //   }
      // }, time);
    },
    handleToCity(e) {
      e = e || window.event;
      const target = e.target || e.srcElement;
      if (target.nodeName != "LI") return;
      let nm = target.innerText;
      let id = target.dataset.id;
      window.localStorage.setItem("nowNm", nm);
      window.localStorage.setItem("nowId", id);
      this.$store.commit("city/CITY_INFO", { nm, id });
      this.$router.push("/movie/nowPlaying");
    }
  },
  created() {
    let cityList = window.localStorage.getItem("cityList");
    let hotCityList = window.localStorage.getItem("hotCityList");
    if (cityList && hotCityList) {
      this.cityList = JSON.parse(cityList);
      this.hotCityList = JSON.parse(hotCityList);
      this.isLoading = false;
      return;
    }
    this.request("/api/cityList").then(res => {
      if (res.msg === "ok") {
        const cities = res.data.cities;
        const { cityList, hotCityList } = this.formatCityList(cities);
        this.cityList = cityList;
        this.hotCityList = hotCityList;
        this.isLoading = false;
        window.localStorage.setItem("cityList", JSON.stringify(cityList));
        window.localStorage.setItem("hotCityList", JSON.stringify(hotCityList));
      }
    });
  }
};
</script>

<style lang="scss" scoped>
.city_body {
  margin-top: 51px;
  display: flex;
  width: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
  .city_list {
    flex: 1;
    overflow: auto;
    background: #fff5f0;
    &::-webkit-scrollbar {
      background-color: transparent;
      width: 0;
    }
  }
  .city_hot {
    margin-top: 46px;
    h2 {
      padding-left: 15px;
      line-height: 30px;
      font-size: 14px;
      background: #f0f0f0;
      font-weight: normal;
    }
    ul {
      li {
        float: left;
        background: #fff;
        width: 29%;
        height: 33px;
        margin-top: 15px;
        margin-left: 3%;
        padding: 0 4px;
        border: 1px solid #e6e6e6;
        border-radius: 3px;
        line-height: 33px;
        text-align: center;
        box-sizing: border-box;
      }
    }
  }
  .city_sort {
    div {
      margin-top: 20px;
    }
    h2 {
      padding-left: 15px;
      line-height: 30px;
      font-size: 14px;
      background: #f0f0f0;
      font-weight: normal;
    }
    ul {
      padding-left: 10px;
      margin-top: 10px;
      li {
        line-height: 30px;
        line-height: 30px;
      }
    }
  }
  .city_index {
    width: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    border-left: 1px #e6e6e6 solid;
  }
}
</style>