// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from "axios";
import Vant from 'vant';
import 'vant/lib/index.css';
import {
  Toast
} from 'vant';
import {
  Lazyload
} from 'vant';
import {
  Loading
} from 'vant';
import {
  Notify
} from 'vant';

axios.defaults.baseURL = "http://127.0.0.1:5000/api";

// 添加请求拦截器
axios.interceptors.request.use((config) => {
  if (!config.headers.Authorization && localStorage.getItem('token')) {
    config.headers.Authorization = 'Bearer ' + localStorage.getItem('token')
  }
  // 有拦截就要有返回
  return config;
})

// 添加响应拦截器
axios.interceptors.response.use((res) => {
  console.log('res:', res);

  const {
    statusCode,
    message
  } = res.data;
  if (message && statusCode == 401) {
    Toast.fail(message)
  }
  // token过期后/错误 接口会返回用户信息验证失败
  if (message == '用户信息验证失败') {
    router.push('/login')
  }
  return res;
});
// 绑定到原型
Vue.prototype.$axios = axios;

// 封装函数处理图片路径
Vue.prototype.$fixImgUrl = function (url) {
  if (url.indexOf("http") < 0) {
    return axios.defaults.baseURL + url
  } else {
    return url
  }
}


//全局路由守卫
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');
  if (to.path == '/profile' || to.path == '/editProfile'|| to.path.indexOf('/postDetail')>=0) {
    if (token) {
      return next()
    } else {
      return next('/login')
    }
  }
  next()
})

Vue.use(Vant);
// 注册时设置`lazyComponent`选项
Vue.use(Lazyload, {
  lazyComponent: true,
  loading: '/static/imgs/01.jpg'
});
Vue.use(Loading);
//Notify 消息提示
Vue.use(Notify);

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>',
  directives: {
    focus: {
      inserted(element) {
        element.focus()
      }
    }
  }
})
