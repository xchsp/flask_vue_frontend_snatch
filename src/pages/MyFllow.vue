<template>
  <div>
    <headerMiddle title="我的关注"></headerMiddle>
    <div :key="index" class="item" v-for="(item,index) of fllowList">
      <img :src="item.head_img" alt class="avatar" />
      <div class="itemMiddle">
        <div class="name">{{item.nickname}}</div>
        <div class="time">{{item.created}}</div>
      </div>
      <div @click="cancelFllow(item.id)" class="btnCancel">取消关注</div>
    </div>
  </div>
</template>

<script>
import headerMiddle from '@/components/HeaderMiddle'
export default {
  components: {
    headerMiddle
  },
  data() {
    return {
      fllowList: {}
    }
  },
  methods: {
    getData() {
      this.$axios({
        url: '/user_follows',
        method: 'GET'
      }).then(res => {
        this.fllowList = res.data.data
        console.log(this.fllowList)
        this.fllowList.forEach(element => {
          if (!element.head_img) {
            element.head_img = '/static/imgs/default.png'
          } else {
            element.head_img = this.$axios.defaults.baseURL + element.head_img
          }
        })
      })
    },
    cancelFllow(id) {
      this.$axios({
        url: '/user_follow/' + id,
        method: 'GET'
      }).then(res => {
        console.log(res)
        this.getData()
      })
    }
  },
  mounted() {
    this.getData()
  }
}
</script>

<style lang="less" scoped>
.item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20/@vv;
  border-bottom: 1px solid #eee;
}
.avatar {
  width: 40/@vv;
  border-radius: 50%;
}
.itemMiddle {
  flex: 1;
  padding-left: 8/@vv;
}
.time {
  color: #888;
  font-size: 14px;
}
.btnCancel {
  height: 30/@vv;
  line-height: 30/@vv;
  padding: 0 8/@vv;
  color: #888;
  font-size: 14px;
  background-color: #eee;
  border-radius: 20/@vv;
}
</style>
