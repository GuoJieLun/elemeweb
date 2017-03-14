import * as MUTATION from './mutation-types.js'
import {
  getUser,
  getAddressList
} from '../service/getData'
export default {
  async getUserInfo({
    commit
  }){
    let res = await getUser();
    commit(MUTATION.GET_USERINFO,res);
  }
}
