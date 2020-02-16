<template>
  <div>
    <headerMiddle title="更多跟帖" />
    <comment :commentItem="item" :key="index" @reply="reply" v-for="(item,index) in comments" />
    <postDetailFooter
      :commentId="commentId"
      :isAcitve="replyActive"
      :post="post"
      @newComment="getComments"
    />
  </div>
</template>

<script>
import headerMiddle from '@/components/HeaderMiddle'
import postDetailFooter from '@/components/postDetailFooter'
import comment from '@/components/comment'

export default {
  components: {
    headerMiddle,
    postDetailFooter,
    comment
  },
  data() {
    return {
      postId: this.$route.params.id,
      post: {},
      comments: [],
      replyActive: 0,
      commentId: {}
    }
  },
  methods: {
    reply(commentId) {
      // 这是点击回复的id
      this.commentId = commentId
      this.replyActive += 1
    },
    getComments() {
      this.$axios({
        url: '/post_comment/' + this.postId,
        method: 'get'
      }).then(res => {
        // const { data } = res.data
        console.log(res.data)
        this.comments = res.data
        this.post.comment_length = this.comments.length
      })
    }
  },
  mounted() {
    this.$axios({
      url: '/post/' + this.postId,
      method: 'get'
    }).then(res => {
      // const { data } = res.data
      this.post = res.data
    }),
      this.getComments()
  }
}
</script>

<style>
</style>
