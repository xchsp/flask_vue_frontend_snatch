import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/pages/auth/Login';
const Register = () => import('@/pages/auth/Register');
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
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
    }
  ]
})
