<template>
  <div class="rating_page">
    <header-top goBack="true" :head-title="title">
      <span slot="edit" class="edit" @click="editThing">{{editText}}</span>
    </header-top>
    <section class="address">
      <ul class="addresslist">
        <li v-for="(item,index) in removeAddress">
          <div>
            <p>{{item.address}}</p>
            <p><span>{{item.phone}}</span><span v-if="item.phonepk">、{{item.phonepk}}</span></p>
          </div>
          <div class="deletesite" v-if="deletesite">
            <span @click="deleteSite(index, item)">x</span>
          </div>
        </li>
      </ul>
      <router-link to='/profile/info/address/add'>
        <div class="addsite">
          <span>新增地址</span>
          <span class="addsvg">
							<svg fill="#d8d8d8">
							    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
							</svg>
						</span>
        </div>
      </router-link>
    </section>
    <transition name="router-slid" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>
<script type="es6">
  import headerTop from '@/components/header/header'
  import {getImgPath} from '@/components/common/mixin'
  import {mapState, mapActions} from 'vuex'
  import {getAddressList, deleteAddress} from '@/service/getData'

  export default{
    data(){
      return {
        title: '编辑地址',
        editText: '编辑',
        deletesite: false,//编辑状态
        addressList: []
      }
    },
    components: {
      headerTop
    },
    mixins: [getImgPath],
    computed: {
      ...mapState([
        'userInfo', 'removeAddress'
      ]),

    },
    methods: {
      ...mapActions([
        'saveAddress'
      ]),
      editThing(){
        if (this.editText == '编辑') {
          this.editText = '完成';
          this.deletesite = true;
        } else {
          this.editText = '编辑';
          this.deletesite = false;
        }
      },
      async initData(){
        await this.saveAddress();
      },
      async deleteSite(index, item){
          if(this.userInfo && this.userInfo.user_id){
              let res  = await deleteAddress(this.userInfo.user_id, item.id);
              this.removeAddress.splice(index,1);
          }
      }
    },

    watch: {
      userInfo: function (value) {
        if (value && value.user_id) {
          this.initData();
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import "address.scss";
</style>
