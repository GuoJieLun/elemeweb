import * as home from './tempdata/home'
import * as login from './tempdata/login'
import * as city from './tempdata/city'
import * as msite from './tempdata/msite'
import * as food from './tempdata/food'

//创造临时数据
const setpromise = data => {
  return new Promise((resolve, reject) => {
    resolve(data)
  })
}


if (process.env.NODE_ENV != 'development') {
  console.log(111);
} else {
  //获取当前城市
  var cityGuess = () => setpromise(home.guesscity);
  //获取热门城市
  var hotcity = () => setpromise(home.hotcity);
  //获取城市列表
  var groupcity = () => setpromise(home.groupcity);
  //获取用户信息
  var getUser = () => setpromise(login.userInfo);
  //当前选中城市
  var currentcity = number => setpromise(city.currentcity);
  //搜索结果
  var searchplace = (cityid, value) => setpromise(city.searchdata);
  //获取页面信息地址
  var msiteAdress = geohash => setpromise(msite.msiteAdress);
  //获取msite食品列表
  var msiteFoodTypes = geohash => setpromise(msite.foodTypes);
  //获取msite商铺列表
  var shopList = (latitude, longitude, offset) => setpromise(msite.shopList);
  var foodCategory = (latitude, longitude) => setpromise(food.category);
  var foodDelivery = (latitude, longitude) => setpromise(food.delivery);
  var foodActivity = (latitude, longitude) => setpromise(food.activity);

}

export {
  cityGuess,
  hotcity,
  groupcity,
  getUser,
  currentcity,
  searchplace,
  msiteAdress,
  msiteFoodTypes,
  shopList,
  foodCategory,
  foodDelivery,
  foodActivity
}
