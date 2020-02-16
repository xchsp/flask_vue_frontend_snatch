import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/pages/Home';
import Login from '@/pages/auth/Login';
const Register = () => import('@/pages/auth/Register');
const Profile = () => import('@/pages/Profile');
const EditProfile = () => import('@/pages/EditProfile');
const MyFllow = () => import('@/pages/MyFllow');
const MyComments = () => import('@/pages/MyComments');
const MyCollections = () => import('@/pages/MyCollections');
const PostDetail = () => import('@/pages/PostDetail');
const Search = () => import('@/pages/Search');
const MoreComments = () => import('@/pages/MoreComments');
const tabManager = () => import('@/pages/tabManager');


Vue.use(Router);


export default new Router({
  routes: [{
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
      path: '/profile',
      name: 'profilePage',
      component: Profile,
    },
    {
      path: '/home',
      name: 'homePage',
      component: Home,
    }, {
      path: '/editProfile',
      name: 'editProfile',
      component: EditProfile
    }, {
      path: '/myFllow',
      name: 'myFllowPage',
      component: MyFllow
    }, {
      path: '/myComments',
      name: 'myCommentsPage',
      component: MyComments
    }, {
      path: '/myCollections',
      name: 'myCollections',
      component: MyCollections
    }, {
      path: '/postDetail/:id',
      name: 'postDetailPage',
      component: PostDetail
    }, {
      path: '/search',
      name: 'SearchPage',
      component: Search
    }, {
      path: '/moreComments/:id',
      name: 'moreCommentsPage',
      component: MoreComments
    }, {
      path: '/tabManager',
      name: 'tabManagerPage',
      component: tabManager
    }
  ]
})
