<template>
  <div class="footer">
    <div class="disable" v-if="!isFocus">
      <input @focus="showArea" placeholder="写跟帖" type="text" />
      <div class="comment">
        <span class="iconfont iconpinglun-"></span>
        <div class="commentNumber">{{post.comment_length}}</div>
      </div>
      <span :class="{red: post.has_star}" @click="star" class="iconfont iconshoucang"></span>
      <a
        href="https://developers.weixin.qq.com/doc/offiaccount/Getting_Started/Explanation_of_interface_privileges.html"
      >
        <span class="iconfont iconfenxiang"></span>
      </a>
    </div>
    <div class="enable" v-if="isFocus">
      <textarea @blur="handleBlur" ref="commentArea" rows="3" v-model="comment"></textarea>
      <span @click="send" class="send">发送</span>
    </div>
  </div>
</template>

<script>
export default {
  props: ['post', 'isAcitve', 'commentId'],
  data() {
    return {
      isFocus: false,
      comment: ''
    }
  },
  watch: {
    isAcitve() {
      // 监听父组件postDetail传过来的变量控制评论区的显示
      this.isFocus = this.isAcitve
      console.log(this.isFocus)
    }
  },
  methods: {
    send() {
      // 发布评论ajax请求需要文章id,评论内容,回复id三个参数
      this.$axios({
        url: '/post_comment/' + this.post.id,
        method: 'POST',
        data: {
          content: this.comment,
          parent_id: this.commentId ? this.commentId.id : null
        }
      }).then(res => {
        console.log(res.data)
        // 发布评论成功应该清空输入框并且缩小输入框
        this.comment = ''
        this.isFocus = false
        // 向父组件触发事件更新页面数据
        this.$emit('newComment')
      })
    },
    showArea() {
      this.isFocus = true
      // vue 是会等你的剩余代码执行完了才更新页面
      // 所以你现在是获取不到这个 被 v-if 抹去的 dom元素 div.enable 的
      // 有一个函数可以设置一个异步回调,告诉 vue 等待我们下一次渲染完毕的时候
      // 再执行回调函数
      this.$nextTick(() => {
        this.$refs.commentArea.focus()
      })
    },
    handleBlur() {
      if (!this.comment) {
        this.isFocus = false
      }
    },
    star() {
      this.$axios({
        url: '/post_star/' + this.post.id,
        method: 'GET'
      }).then(res => {
        console.log(res)
        const { message } = res.data
        if (message == '收藏成功') {
          // this.post.has_star = true
        } else if (message == '取消成功') {
          // this.post.has_star = false
        }
        this.$emit('starChanged')
        console.log(message)
      })
    }
  }
}
</script>
<style lang="less" scoped>
.footer {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  .disable {
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 10/@vv 10/@vv 10/@vv 0;
    .iconfont {
      font-size: 23/@vv;
    }
    input {
      height: 31/@vv;
      line-height: 31/@vv;
      font-size: 14/@vv;
      border: none;
      outline: none;
      border-radius: 16/@vv;
      padding: 0 16/@vv;
      background-color: #d7d7d7;
      color: #848484;
    }
    .comment {
      position: relative;
      .commentNumber {
        position: absolute;
        left: 2/@vv;
        top: -8/@vv;
        height: 16/@vv;
        line-height: 16/@vv;
        box-sizing: border-box;
        font-size: 12/@vv;
        color: #fff;
        background: #f00;
        border-radius: 8/@vv;
        padding: 0 8/@vv;
      }
    }
  }
  .enable {
    display: flex;
    justify-content: space-around;
    align-items: flex-end;
    padding: 10/@vv 10/@vv 10/@vv 0;
    textarea {
      width: 270/@vv;
      padding: 16/@vv 0;
      box-sizing: border-box;
      border: none;
      outline: none;
      border-radius: 8/@vv;
      color: #666;
      background-color: #d7d7d7;
      resize: none;
    }
    .send {
      padding: 0 15/@vv;
      height: 26/@vv;
      line-height: 26/@vv;
      text-align: center;
      background-color: #f00;
      color: #fff;
      border-radius: 16/@vv;
      border: 1px solid #f00;
      font-size: 14px;
    }
  }
  .red {
    color: #f00;
  }
}
</style>
