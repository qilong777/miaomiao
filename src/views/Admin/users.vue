<template>
  <div class="users">
    <van-tabs v-model="active">
      <van-tab title="正常用户">
        <van-address-list
          v-if="!isLoading"
          :switchable="false"
          :list="list"
          add-button-text="添加用户"
          @add="handleToAdd"
          @edit="handleToEdit"
        />
        <Loading v-else />
        <van-pagination
          v-model="currentPage1"
          :items-per-page="pageSize"
          :page-count="pageCount1"
          :show-page-size="3"
          force-ellipses
          @change="handleToChange(currentPage1,false)"
        />
      </van-tab>
      <van-tab title="冻结用户">
        <van-address-list
          v-if="!isLoading"
          :switchable="false"
          :list="freezeList"
          add-button-text="添加用户"
          @add="handleToAdd"
          @edit="handleToEdit2"
        />
        <Loading v-else />
        <van-pagination
          v-model="currentPage2"
          :items-per-page="pageSize"
          :page-count="pageCount2"
          :show-page-size="3"
          force-ellipses
          @change="handleToChange(currentPage2,true)"
        />
      </van-tab>
    </van-tabs>
    <van-action-sheet
      v-model="show"
      :actions="actions"
      cancel-text="取消"
      @select="onSelect"
      @cancel="onCancel"
    />
  </div>
</template>

<script>
export default {
  name: "users",
  data() {
    return {
      pageSize: 5,
      isLoading: false,
      pageCount1: 0,
      pageCount2: 0,
      currentPage1: 1,
      currentPage2: 1,
      active: "正常用户",
      show: false,
      actions: [{ name: "冻结" }, { name: "删除" }],
      list: [],
      freezeList: [],
      nowItem: null
    };
  },
  methods: {
    handleToChange(pageIndex, isFreeze) {
      this.getUsersList(pageIndex, isFreeze);
    },
    onCancel() {
      this.show = false;
    },
    onSelect(item, index) {
      var url, optStr, data;
      if (index == 0) {
        optStr = this.actions[0].name;
        url = "/api2/admin/updateFreeze";
        data = {
          email: this.nowItem.tel,
          isFreeze: !this.nowItem.isFreeze
        };
      } else {
        optStr = "删除";
        url = "/api2/admin/deleteUser";
        data = {
          email: this.nowItem.tel
        };
      }
      this.request({
        method: "post",
        url,
        data
      }).then(res => {
        if (res.status === 1) {
          this.$toast({
            type: "success",
            message: optStr + "成功"
          });
          this.getUsersList(this.currentPage1, false);
          this.getUsersList(this.currentPage2, true);
          this.getPageCount(true);
          this.getPageCount(false);
        } else {
          this.$toast({
            type: "fail",
            message: optStr + "失败"
          });
        }
      });

      this.show = false;
    },
    handleToAdd() {
      this.$toast({
        type: "fail",
        message: "暂未有此功能"
      });
    },
    handleToEdit(item, index) {
      this.actions[0].name = "冻结";
      this.nowItem = item;
      this.show = true;
    },
    handleToEdit2(item, index) {
      this.actions[0].name = "解冻";
      this.nowItem = item;
      this.show = true;
    },
    getUsersList(pageIndex, isFreeze) {
      this.isLoading = true;
      this.request({
        method: "post",
        url: "/api2/admin/getUsersList",
        data: {
          pageIndex,
          isFreeze
        }
      }).then(res => {
        if (res.status === 1) {
          const tmpArr = [];
          res.data.usersList.forEach(ele => {
            let data = {
              name: ele.username,
              tel: ele.email,
              address: "创建日期 : " + new Date(ele.date).toLocaleDateString(),
              isFreeze: ele.isFreeze
            };
            tmpArr.push(data);
          });
          if (isFreeze) {
            this.freezeList = tmpArr;
          } else {
            this.list = tmpArr;
          }
        } else {
          this.$toast({
            type: "fail",
            message: res.data.msg
          });
        }
        this.isLoading = false;
      });
    },
    getPageCount(isFreeze) {
      this.request({
        method: "post",
        url: "/api2/admin/getPageCount",
        data: {
          isFreeze
        }
      }).then(res => {
        if (res.status === 1) {
          if (isFreeze) {
            this.pageCount2 = res.data.pageCount;
          } else {
            this.pageCount1 = res.data.pageCount;
          }
        }
      });
    }
  },
  created() {
    this.getUsersList(1, false);
    this.getUsersList(1, true);
    this.getPageCount(true);
    this.getPageCount(false);
  }
};
</script>

<style lang="scss" scoped>
.users {
  flex-grow: 1;
  .van-tabs {
    display: flex;
    flex-direction: column;
    .loader {
      position: relative;
      height: 400px;
    }
    .van-tabs__content {
      flex-grow: 1;
      overflow: auto;
      .van-address-list {
        height: 400px;
        padding-bottom: 0;
      }
    }
  }
}
</style>