
<template>
  <div>
    <postDetailHead :post="post" />
    <div class="mainContent">
      <div class="title">{{post.title}}</div>
      <video
        :poster="post.cover[0].url"
        class="video"
        controls="controls"
        src="https://video.pearvideo.com/mp4/adshort/20191031/cont-1618052-14544566_adpkg-ad_sd.mp4"
        v-if="post.type==2"
      ></video>
      <div class="info" v-if="post.user">{{post.user.nickname}} 2019-10-31</div>
      <div class="content" v-html="post.content" v-if="post.type!=2"></div>
      <div class="actionBtn">
        <div class="like">
          <span :class="{red: post.has_like}" @click="like" class="iconfont icondianzan"></span>
          {{post.like_length}}
        </div>
        <div class="webchat">
          <span class="iconfont iconweixin"></span>
          <a
            href="https://developers.weixin.qq.com/doc/offiaccount/Getting_Started/Explanation_of_interface_privileges.html"
          >微信</a>
        </div>
      </div>
      <div class="commentList">
        <h2 class="title">精彩跟帖</h2>
        <div v-if="post.comment_length==0">
          <div>暂无跟帖,抢占沙发</div>
        </div>
        <comment
          :commentItem="item"
          :key="index"
          @reply="reply"
          v-else
          v-for="(item,index) in comments"
        />
        <div class="more">
          <div @click="toMoreComments" class="moreComment">更多跟帖</div>
        </div>
      </div>
    </div>
    <postDetailFooter
      :commentId="commentId"
      :isAcitve="replyActive"
      :post="post"
      @newComment="getCommentsEx"
      @starChanged="starChanged"
    />
  </div>
</template>

<script>
import postDetailHead from '@/components/postDetailHead'
import postDetailFooter from '@/components/postDetailFooter'
import comment from '@/components/comment'

export default {
  components: {
    postDetailHead,
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
    like() {
      this.$axios({
        url: '/post_like/' + this.post.id,
        method: 'get'
      }).then(res => {
        // const { message } = res.data
        if (res.data == '点赞成功') {
          this.post.has_like = true
          this.post.like_length += 1
        } else if (res.data == '取消成功') {
          this.post.has_like = false
          this.post.like_length -= 1
        }
        console.log(res.data)
      })
    },
    toMoreComments() {
      this.$router.push({
        name: 'moreCommentsPage',
        params: {
          id: this.postId
        }
      })
    },
    starChanged()
    {
      this.post.has_star = !this.post.has_star
    },
    getCommentsEx(){
      this.$axios({
        url: '/post_comment/' + this.postId,
        params: {
          pageSize: 3
        },
        method: 'get'
      }).then(res => {
        // const { data } = res.data
        console.log(res.data)
        this.comments = res.data
      })
      this.post.comment_length += 1
    },
    getComments() {
      // this.comments = [
      //   {
      //     'content':'而停止关注这个用户，而停止关注这个用户，而停止关注这个用户，而停止关注这个用户，可以这样做',
      //     'user':{
      //       'nickname':'zhangsan'
      //     },
      //   },
      //   {
      //     'content':'而停止关注这个用户，而停止关注这个用户，而停止关注这个用户，而停止关注这个用户，可以这样做',
      //     'user':{
      //       'nickname':'zhangsan'
      //     },
      //     'parent': {
      //       'content': '8号从苏州动身的时候感觉武汉的肺炎还是没这么严重',
      //       'user': {
      //         'nickname': 'zhangsan'
      //       },
      //       'parent': {
      //         'content': '8号从苏州动身的时候感觉武汉的肺炎还是没这么严重',
      //         'user': {
      //           'nickname': 'zhangsan'
      //         },
      //         'parent': {
      //           'content': '8号从苏州动身的时候感觉武汉的肺炎还是没这么严重',
      //           'user': {
      //             'nickname': 'zhangsan'
      //           }
      //         }
      //       }
      //     }
      //   }
      // ]
      this.$axios({
        url: '/post_comment/' + this.postId,
        params: {
          pageSize: 3
        },
        method: 'get'
      }).then(res => {
        // const { data } = res.data
        console.log(res.data)
        this.comments = res.data
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
    })
//      this.post = {
//        'type':2,
//        'title':'而停止关注这个用户，而停止关注这个用户，而停止关注这个用户，而停止关注这个用户，可以这样做',
//        'comment_length':2,
//        'has_like':true,
//        'like_length':33,
//        'user':{
//          'nickname':'zhangsan'
//        },
//        'cover':[{'url':'https://images.cnblogs.com/cnblogs_com/chaogex/1270365/o_%E6%9D%A8%E5%85%83%E8%B6%8505.jpg'}],
//        'content': `<article class="_2rhmJa"><blockquote>12月6日上午，河南焦作一名正在医院治疗的48岁男子韦某某默默离开了医院，随后消失在监控视频中，并与家人失去联系。据韦某某的家人分析，韦某某离家，或许和不久前被查出患有冠心病，并得知需要10余万的治疗费用有关。记者12月12日上午从韦某某的家人处得知，韦某某已经被找到，但是已经确认离世。</blockquote><p><br></p><div class="image-package">
// <div class="image-container" style="max-width: 553px; max-height: 491px; background-color: transparent;">
// <div class="image-container-fill"</div>
// <div class="image-view" data-width="553" data-height="491"><img data-original-src="//upload-images.jianshu.io/upload_images/20112383-a2e51cce4fe7a540.jpg" data-original-width="553" data-original-height="491" data-original-format="image/jpeg" data-original-filesize="111240" data-image-index="0" style="cursor: zoom-in;" class="" src="https://images.cnblogs.com/cnblogs_com/chaogex/1270365/o_%E6%9D%A8%E5%85%83%E8%B6%8505.jpg"></div>
// </div>
// <div class="image-caption">图片发自简书App</div>
// </div><p>今天无意间翻到这样的新闻，看到结果我并不意外，甚至我觉得他的选择是正确的。</p><p>国家在发展，社会在进步，但医疗政策进步尤其缓慢，每一次重大改革的背后，都有一场血淋淋的悲剧，我们总在欢悦国家综合实力排到第几，军事实力排到第几，媒体却很少报道我们的医疗能排到第几，也许对于韦元元这样的父亲来说，家中并无多少积蓄，也许自己每月省吃俭用才能勉强供家庭，供孩子读书，一旦自己病倒，受累的将是妻子和孩子，而精神压力最大的却是躺在自己病床的自己，作为一家之主，如果不能扛起这个家庭，也一定不能拖累家庭，不然幸幸苦苦努力播种的希望之火会被自己亲手掐灭！这是多么残酷无情，又是多么让人绝望，如果你不能体会到这种心情你就没有资格去指责他。</p><p>可笑的是竟然会有人说他是懦夫，我看到这样的评论气的发抖，站在道德高点去指责别人一定很爽吧，气过之后我选择视而不见，如果我到了韦元元这样的境地我也会做出同样的选择！我的父母也会如此，我只希望他们健康，这种绝境的心态，我知道劝不了，家就是全部的呵护，一旦知道自己无法继续呵护下去也不能去破坏他，作为男人，如果不能给家里带来好的生活，那也不能去拖累家庭！</p><p>这样的情况全国各地都在发生，只是有些报道出来，有些没有报道出来，也许你努力工作生活水平达到小康家庭，可一人生病，全家返贫，这些选择自杀的人都是穷怕了，好不容易生活有些起色，他怎么忍心毁在自己手里！</p><p>媒体报道最多的是祖国的闪光点，可缺点总像昙花一现，出来没多久，就被各种娱乐消息覆盖，我偶尔才上微博，每次看到热搜大都是明星的消息，可能是他们的一句话，可能是他们的一个动作！</p><p>医疗福利的进步真的需要加快了，不说对比西方国家，哪怕是印度，也都实现了公立医院免费医疗，做个冠心病手术只需要花费个挂号费，可我们媒体报道最多的却是人家医疗环境不卫生，床位少等等！还有临进的泰国，也是一样的免费公立医疗，且不说技术多发达，起码做到这一步，公立医疗的资源就能百分百利用！而韦元元仅仅只是因为没钱，那张原本安排他手术的床位，便空置下来由他人顶上。能怪他不是精英赚钱不力么？可要是人人都是精英，势必会产生更优秀的精英，阶层分化依然明显！</p><p>我不是唱衰这个社会，我希望社会继续进步，继续成长，我不过是和韦元元一样挣扎在生活线上发出的一声无声的呐喊，诸君也可以理解为“弱者的呼喊”，疲惫而无力！</p></article>`
//      }
      this.getComments()
  }
}
</script>
<style lang="less" scoped>
.mainContent {
  padding-bottom: 80/@vv;
  padding-left: 10px;
  padding-right: 10px;
  .info {
    margin: 8/@vv 0;
  }
  .content {
    width: 375/@vv;
    /deep/ img {
      width: 100%;
      height: 200/@vv;
      object-fit: cover;
    }
  }
  .video {
    width: 100%;
    margin: 8/@vv 0;
  }
  .actionBtn {
    padding: 30/@vv 0;
    display: flex;
    justify-content: space-around;
    border-bottom: 5/@vv solid #e4e4e4;
    color: #333;
    .like {
      padding: 6/@vv 18/@vv;
      text-align: center;
      background-color: #ddd;
      border-radius: 14/@vv;
      font-size: 14px;
    }
    .webchat {
      padding: 6/@vv 12/@vv;
      text-align: center;
      background-color: #ddd;
      border-radius: 14/@vv;
      font-size: 14px;
      .iconweixin {
        color: #00c800;
      }
    }
  }
  .commentList {
    padding: 20px 0;
    .title {
      text-align: center;
      font-weight: normal;
      color: #666;
      font-size: 20px;
    }
  }
  .more {
    padding-top: 30px;
    text-align: center;
    .moreComment {
      width: 80px;
      padding: 4px 14px;
      margin: 0 auto;
      border-radius: 14px;
      font-size: 14px;
      border: 1px solid #888;
      color: #666;
      background-color: #eee;
    }
  }
}
.red {
  color: #f00;
}
</style>
