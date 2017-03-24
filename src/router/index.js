import Vue from 'vue'
import Router from 'vue-router'
import App from '../App'

const home = r => require.ensure([], () => r(require('../page/home/home')), 'home');

const city = r => require.ensure([], () => r(require('../page/city/city')), 'city');

const msite = r => require.ensure([], () => r(require('../page/msite/msite')), 'msite');

const food = r => require.ensure([], () => r(require('../page/food/food')), 'food');

const search = r => require.ensure([], () => r(require('../page/search/search')), 'search');

const login = r => require.ensure([], () => r(require('../page/login/login')), 'login');
//我的
const profile = r => require.ensure([], () => r(require('../page/profile/profile')), 'profile');
const info = r => require.ensure([], () => r(require('../page/profile/children/info')), 'info');
const address = r => require.ensure([], () => r(require('../page/profile/children/address')), 'address');
const add = r => require.ensure([], () => r(require('../page/profile/children/add')), 'add');
const addDetail = r => require.ensure([], () => r(require('../page/profile/children/addDetail')), 'addDetail');

const forget = r => require.ensure([], () => r(require('../page/forget/forget')), 'forget');
const setusername = r => require.ensure([], () => r(require('../page/profile/children/setusername')), 'setusername');

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: App,
      mode: 'hash',
      children: [
        {
          path: '',
          redirect: '/home'
        },
        //首页城市列表页
        {
          path: '/home',
          component: home
        },
        //当前选择城市页
        {
          path: '/city/:cityid',
          component: city
        },
        //商铺列表页
        {
          path: '/msite',
          component: msite
        },
        //分类商铺列表页
        {
          path: '/food',
          component: food
        },
        //搜索页
        {
          path: '/search/:geohash',
          component: search
        },
        {
          path: '/login',
          component: login
        },
        //个人信息页
        {
          path: '/profile',
          component: profile,
          children: [
            {
              path: 'info',
              component: info,
              children: [
                {
                  path: 'address',
                  component: address,
                  children:[
                    {
                      path:'add',
                      component:add,
                      children:[
                        {
                          path:'addDetail',
                          component:addDetail
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            {
              path: 'setusername',
              component: setusername
            }
          ]
        },
        {
          path: '/forget',
          component: forget
        }
      ]
    }
  ]
})


