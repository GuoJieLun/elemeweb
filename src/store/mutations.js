import  * as MUTATION from './mutation-types'

export default {
  //记录当前经纬度
  [MUTATION.RECORD_ADDRESS](state,{
    latitude,
    longitude
  }){
    state.latitude = latitude;
    state.longitude = longitude;
  },
  //保存用户信息
  [MUTATION.RECORD_USERINFO](state,info){
    state.userInfo = info;
    state.login = true;
    let validity = 30;
    let now = new Date();
    now.setTime(now.getTime() + validity * 24 * 60 * 60 * 1000);
    document.cookie = "USERID=" + info.user_id + ";expires=" + now.toGMTString();
    document.cookie = "SID=huRyTRd9QLij7NkbpHJoj3PQrx1eRiO6bAiw" + ";expires=" + now.toGMTString();
  },
  //保存geohash
  [MUTATION.SAVE_GEOHASH](state, geohash) {
    state.geohash = geohash;
  },
  //获取用户信息存入vuex
  [MUTATION.GET_USERINFO](state,info){
    if (state.userInfo && (state.userInfo.username !== info.username)) {
      return;
    }
    if (!state.login) {
      return
    }
    if (!info.message) {
      state.userInfo = {...info};
      let validity = 30;
      let now = new Date();
      now.setTime(now.getTime() + validity * 24 * 60 * 60 * 1000);
      document.cookie = "USERID=" + info.user_id + ";expires=" + now.toGMTString();
      document.cookie = "SID=huRyTRd9QLij7NkbpHJoj3PQrx1eRiO6bAiw" + ";expires=" + now.toGMTString();
    } else {
      state.userInfo = null;
    }
  },
  //保存图片
  [MUTATION.SAVE_AVANDER](state, imgPath) {
    state.imgPath = imgPath;
  },
  [MUTATION.OUT_LOGIN](state){
    state.userInfo = null;
    state.login = false;
  },
  //保存用户名
  [MUTATION.RETSET_NAME](state,username){
    state.userInfo = Object.assign({}, state.userInfo,{username});
    console.log(    state.userInfo);
  },
  //保存地址
  [MUTATION.SAVE_ADDRESS](state,newAddress){
     state.removeAddress = newAddress;

  },
  //新增地址
  [MUTATION.ADD_ADDRESS](state,newAddress){
    state.removeAddress = [newAddress, ...state.removeAddress];
  },
  //搜索保存地址
  [MUTATION.SAVE_ADDDETAIL](state, addAddress){
    state.addAddress=addAddress;
  },
  //清空当前商品的购物车信息
  [MUTATION.CLEAR_CART](state,shopid){
    console.log('我进来了');
  },
  //进入订单详情页前保存该订单信息
  [MUTATION.SAVE_ORDER](state, orderDetail) {
    state.orderDetail = orderDetail;
  },
}
