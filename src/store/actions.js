import * as types from './mutation-types.js'
import {
  getUser,
  getAddressList
} from '../service/getData'
export default {
  async getUserInfo({
    commit
  }){
    let res = await getUser();
    commit(types.GET_USERINFO,res);
  }
}
