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
//我的余额
const balance = r => require.ensure([], () => r(require('../page/balance/balance')), 'balance');
const detail = r => require.ensure([], () => r(require('../page/balance/detail')), 'detail');
//我的优惠
const benefit = r => require.ensure([], () => r(require('../page/benefit/benefit')), 'benefit');
const hbDescription = r => require.ensure([], () => r(require('../page/benefit/children/hbDescription')), 'hbDescription');
const hbHistory = r => require.ensure([], () => r(require('../page/benefit/children/hbHistory')), 'hbHistory');
const coupon = r => require.ensure([], () => r(require('../page/benefit/children/coupon')), 'coupon');
const exchange = r => require.ensure([], () => r(require('../page/benefit/children/exchange')), 'exchange');
const commend = r => require.ensure([], () => r(require('../page/benefit/children/commend')), 'commend');
const download = r => require.ensure([], () => r(require('../page/download/download')), 'download');

//我的积分
const points = r => require.ensure([], () => r(require('../page/points/points')), 'points');
const pointsDetail = r => require.ensure([], () => r(require('../page/points/children/detail')), 'pointsDetail');

//我的订单
const order = r => require.ensure([], () => r(require('../page/order/order')), 'order');

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
                  children: [
                    {
                      path: 'add',
                      component: add,
                      children: [
                        {
                          path: 'addDetail',
                          component: addDetail
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
        //我的余额
        {
          path: 'balance',
          component: balance,
          children: [
            {
              path: 'detail',
              component: detail
            }
          ]
        },
        //我的优惠
        {
          path: 'benefit',
          component: benefit,
          children: [
            {
              path: 'hbDescription',
              component: hbDescription
            },
            {
              path: 'hbHistory',
              component: hbHistory
            },
            {
              path: 'coupon',
              component: coupon
            },
            {
              path: 'exchange',
              component: exchange
            },
            {
              path: 'commend',
              component: commend
            }
          ]
        },
        //我的积分
        {
          path: 'points',
          component:points,
          children:[
            {
              path:'detail',
              component:pointsDetail
            }
          ]
        },
        {
          path: '/forget',
          component: forget
        },
        {
          path: '/download',
          component: download
        },
        //我的订单
        {
          path:'order',
          component:order
        }
      ]
    }
  ]
})


