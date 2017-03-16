import Vue from 'vue'
import Router from 'vue-router'
import App from '../App'

const home = r => require.ensure([], () => r(require('../page/home/home')), 'home');
const city = r => require.ensure([], () => r(require('../page/city/city')), 'city');
const msite = r => require.ensure([], () => r(require('../page/msite/msite')), 'msite');
const food = r => require.ensure([], () => r(require('../page/food/food')), 'food');
const search = r => require.ensure([], () => r(require('../page/search/search')), 'search');

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: App,
      mode :'hash',
      children:[
        {
          path:'',
          redirect:'/home'
        },
        {
          path:'/home',
          component:home
        },
        {
          path: '/city/:cityid',
          component: city
        },
        {
          path: '/msite',
          component: msite
        },
        {
          path:'/food',
          component:food
        },
        {
          path:'/search/:geohash',
          component:search
        }
      ]
    }
  ]
})


