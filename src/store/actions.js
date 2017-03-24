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
  },
  async saveAddress({
    commit,
    state
  }){
    let address = await getAddressList(state.userInfo.user_id);
    commit(MUTATION.SAVE_ADDRESS,address);
  }
}
