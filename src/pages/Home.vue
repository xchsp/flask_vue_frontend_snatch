<template>
  <div>
    <homeHeader />
    <van-tabs sticky swipeable v-model="activeTab">
      <van-list
        :finished="finished"
        :immediate-check="false"
        @load="loadMorePost"
        finished-text="没有更多了"
        v-model="loading"
      >
        <van-tab :key="index" :title="tabItem.name" v-for="(tabItem,index) in tabList">
          <post :key="index" :post="post" v-for="(post,index) in tabItem.posts"></post>
        </van-tab>
      </van-list>
    </van-tabs>
  </div>
</template>

<script>
import homeHeader from '@/components/homeHeader'
import post from '@/components/post'

export default {
  name: 'homePage',
  components: {
    homeHeader,
    post
  },
  data() {
    return {
      activeTab: localStorage.getItem('token') ? 1 : 0,
      tabList: [],
      loading: false,
      finished: false,
      pageIndex: 1,
      pageSize: 8
    }
  },
  mounted() {
    this.initTabList()
  },
  watch: {
    activeTab(newActiveTab) {
      if (this.tabList[newActiveTab].posts.length == 0) {
        this.getTabPosts(newActiveTab)
      }
    }
  },
  methods: {
    initTabList() {
      if (localStorage.getItem('tabActive')) {
        this.tabList = JSON.parse(localStorage.getItem('tabActive'))
        this.getTabPosts(this.activeTab)
        return
      }
      // this.tabList = [{'name':'java','posts':[]},{'name':'python','posts':[]},
      //   {'name':'sql','posts':[]},{'name':'css','posts':[]},{'name':'c++','posts':[]},{'name':'体育','posts':[]}]
      this.$axios({
        url: '/category',
        method: 'GET'
      }).then(res => {
        // const { data } = res.data
        res.data.forEach(element => {
          // 遍历data添加一个posts空数组用于存放数据
          element.posts = []
          // 存储分页状态
          element.currentPage = 1
        })
        this.tabList = res.data
        // this.tabList = [{'name':java,'posts':[]},{'name':python,'posts':[]},{'name':sql,'posts':[]}]
        this.getTabPosts(this.activeTab)
        console.log(this.tabList)
      })
    },
    getTabPosts(tabIndex) {
    //   this.pageSize -= 1
    //   if(this.pageSize < 2)
    //     this.finished = true
    //   this.tabList[tabIndex].posts = [
    //     {
    //       'type':2,
    //       'title':'而停止关注这个用户，而停止关注这个用户，而停止关注这个用户，而停止关注这个用户，可以这样做',
    //       'comment_length':2,
    //       'user':{
    //         'nickname':'zhangsan'
    //       },
    //       'cover':[{'url':'https://images.cnblogs.com/cnblogs_com/chaogex/1270365/o_%E6%9D%A8%E5%85%83%E8%B6%8505.jpg'}
    //       ,{'url':'https://images.cnblogs.com/cnblogs_com/chaogex/1270365/o_%E6%9D%A8%E5%85%83%E8%B6%8505.jpg'}
    //       ,{'url':'https://images.cnblogs.com/cnblogs_com/chaogex/1270365/o_%E6%9D%A8%E5%85%83%E8%B6%8505.jpg'}]
    //     },
    //     {
    //       'type':1,
    //       'title':'而停止关注这个用户，而停止关注这个用户，而停止关注这个用户，而停止关注这个用户，可以这样做',
    //       'comment_length':2,
    //       'user':{
    //         'nickname':'zhangsan'
    //       },
    //       'cover':[{'url':'https://images.cnblogs.com/cnblogs_com/chaogex/1270365/o_%E6%9D%A8%E5%85%83%E8%B6%8505.jpg'}
    //         ,{'url':'https://images.cnblogs.com/cnblogs_com/chaogex/1270365/o_%E6%9D%A8%E5%85%83%E8%B6%8505.jpg'}]
    //     },
    //     {
    //       'type':1,
    //       'title':'而停止关注这个用户，而停止关注这个用户，而停止关注这个用户，而停止关注这个用户，可以这样做',
    //       'comment_length':2,
    //       'user':{
    //         'nickname':'zhangsan'
    //       },
    //       'cover':[{'url':'https://images.cnblogs.com/cnblogs_com/chaogex/1270365/o_%E6%9D%A8%E5%85%83%E8%B6%8505.jpg'}]
    //     },
    //     {
    //       'type':1,
    //       'title':'而停止关注这个用户，而停止关注这个用户，而停止关注这个用户，而停止关注这个用户，可以这样做',
    //       'comment_length':2,
    //       'user':{
    //         'nickname':'zhangsan'
    //       },
    //       'cover':[{'url':'https://images.cnblogs.com/cnblogs_com/chaogex/1270365/o_%E6%9D%A8%E5%85%83%E8%B6%8505.jpg'}]
    //     },
    //     {
    //       'type':1,
    //       'title':'而停止关注这个用户，而停止关注这个用户，而停止关注这个用户，而停止关注这个用户，可以这样做',
    //       'comment_length':2,
    //       'user':{
    //         'nickname':'zhangsan'
    //       },
    //       'cover':[{'url':'https://images.cnblogs.com/cnblogs_com/chaogex/1270365/o_%E6%9D%A8%E5%85%83%E8%B6%8505.jpg'}]
    //     }
    //     ,
    //     {
    //       'type':1,
    //       'title':'而停止关注这个用户，而停止关注这个用户，而停止关注这个用户，而停止关注这个用户，可以这样做',
    //       'comment_length':2,
    //       'user':{
    //         'nickname':'zhangsan'
    //       },
    //       'cover':[{'url':'https://images.cnblogs.com/cnblogs_com/chaogex/1270365/o_%E6%9D%A8%E5%85%83%E8%B6%8505.jpg'}]
    //     }
    //     ,
    //     {
    //       'type':1,
    //       'title':'而停止关注这个用户，而停止关注这个用户，而停止关注这个用户，而停止关注这个用户，可以这样做',
    //       'comment_length':2,
    //       'user':{
    //         'nickname':'zhangsan'
    //       },
    //       'cover':[{'url':'https://images.cnblogs.com/cnblogs_com/chaogex/1270365/o_%E6%9D%A8%E5%85%83%E8%B6%8505.jpg'}]
    //     }
    // ]
    //   根据选中标签栏id获取数据
      const category_id = this.tabList[tabIndex].id
      this.$axios({
        url: '/posts',
        method: 'GET',
        params: {
          category: category_id,
          pageIndex: this.tabList[tabIndex].currentPage,
          pageSize: this.pageSize
        }
      }).then(res => {
        // const { data } = res.data
        console.log(res.data)

        // 新获取的数据, 不应该替换旧数据,而应该接在旧数据后面
        const newData = [...this.tabList[tabIndex].posts, ...res.data]
        this.tabList[tabIndex].posts = newData
        if (res.data.length < this.pageSize) this.finished = true
      })
    },
    loadMorePost() {
      // 异步更新数据
      // 加载状态结束
      // 每当拉到底部当前 tab 的 页码 +1 发送请求获取数据
      console.log('loadMorePost')
      console.log(this.tabList[this.activeTab].currentPage)
      setTimeout(() => {
        this.tabList[this.activeTab].currentPage += 1
        this.loading = false
        this.getTabPosts(this.activeTab)
      }, 500)
    }
  }
}
</script>

<style lang="less" scoped>
</style>
