<template>
  <div>
    <headerMiddle title="我的跟帖"></headerMiddle>
    <div :key="index" class="item" v-for="(item,index) of commentsList">
      <div class="date">{{item.created}}</div>
      <div class="parent" v-if="item.parent">
        <div class="name">回复:{{item.parent.user.nickname}}</div>
        <div class="parentContent">{{item.parent.content}}</div>
      </div>
      <div class="mainContent">{{item.content}}</div>
      <div class="postOrigin">原文:{{item.post.title}}</div>
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
      commentsList: []
    }
  },
  methods: {
    getData() {
      this.$axios({
        url: '/user_comments',
        method: 'GET'
      }).then(res => {
        this.commentsList = res.data
        console.log(this.commentsList)
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
  flex-direction: column;
  padding: 16/@vv;
  border-bottom: 1px solid #eee;
}
.date {
  color: #888;
  padding: 8/@vv 0;
}
.parent {
  padding: 8/@vv;
  background-color: #eee;
  .name {
    padding-bottom: 8/@vv;
  }
  .parentContent {
  }
}
.mainContent {
  padding: 8/@vv 0;
}
</style>
