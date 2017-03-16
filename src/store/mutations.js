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
      //state.userInfo = {...info};
      let validity = 30;
      let now = new Date();
      now.setTime(now.getTime() + validity * 24 * 60 * 60 * 1000);
      document.cookie = "USERID=" + info.user_id + ";expires=" + now.toGMTString();
      document.cookie = "SID=huRyTRd9QLij7NkbpHJoj3PQrx1eRiO6bAiw" + ";expires=" + now.toGMTString();
    } else {
      state.userInfo = null;
    }
  }
}
