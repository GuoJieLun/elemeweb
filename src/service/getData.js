import * as home from './tempdata/home'
import * as city from './tempdata/city'
import * as msite from './tempdata/msite'
import * as search from './tempdata/search'
import * as food from './tempdata/food'
import * as shop from './tempdata/shop'
import * as login from './tempdata/login'
import * as confirm from './tempdata/confirm'
import * as order from './tempdata/order'
import * as service from './tempdata/service'
import * as addDetail from './tempdata/addDetail'
import * as addresspart from './tempdata/address'
import * as vip from './tempdata/vip'
import * as hongbao from './tempdata/hongbao'

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
  //获取food页面的 category 种类列表
  var foodCategory = (latitude, longitude) => setpromise(food.category);
  //获取food页面的配送方式
  var foodDelivery = (latitude, longitude) => setpromise(food.delivery);
  //获取food页面的商家属性活动列表
  var foodActivity = (latitude, longitude) => setpromise(food.activity);
  //获取search页面搜索结果
  var searchRestaurant = (geohash, keyword) => setpromise(search.searchData);
  //验证码
  var mobileCode = phone => setpromise(login.validate_token);
  //登录
  var accountLogin = (username, password, captcha_code) => setpromise(login.userInfo);
  //检测帐号是否存在
  var checkExsis = (checkNumber, type) => setpromise(login.checkExsis);
  //发送账号
  var sendMobile = (sendData, captcha_code, type, password) => setpromise(login.send);
  var getcaptchas = () => setpromise(login.cpatchs);

  //获取地址
  var getAddressList = (user_id) => setpromise(addresspart.address);
  //搜索地址
  var getSearchAddress=(keyword) => setpromise(addDetail.addData);
  //删除地址
  var deleteAddress=(userid, addressid) =>  setpromise(vip.vipcart);
  //保存地址
  var postAddAddress = (userId, address, address_detail, geohash, name, phone, phone_bk, poi_type, sex, tag, tag_type) => setpromise(confirm.addAddress);


}
var sendLogin = (code, mobile, validate_token) => setpromise(login.userInfo);

export {
  sendLogin,
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
  foodActivity,
  searchRestaurant,
  mobileCode,
  accountLogin,
  checkExsis,
  sendMobile,
  getcaptchas,
  getAddressList,
  getSearchAddress,
  deleteAddress,
  postAddAddress
}
