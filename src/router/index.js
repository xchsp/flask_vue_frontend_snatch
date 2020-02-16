import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/pages/auth/Login';
import Home from '@/pages/Home';
const Register = () => import('@/pages/auth/Register');
const PostDetail = () => import('@/pages/PostDetail');
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/login',
      name: 'loginPage',
      component: Login,
    },
    {
      path: '/register',
      name: 'registerPage',
      component: Register,
    },
    {
      path: '/home',
      name: 'homePage',
      component: Home,
    },
    {
      path: '/postDetail/:id',
      name: 'postDetailPage',
      component: PostDetail
    }
  ]
})
