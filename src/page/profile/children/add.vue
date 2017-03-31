<template>
  <div class="rating_page">
    <header-top head-title="新增地址" goBack="true"></header-top>
    <section class="adddetail">
      <form action="" @submit.prevent>
        <section class="ui-padding-block">
          <div class="input-new">
            <input type="text" placeholder="请填写你的姓名" :class="{verifies:verify}" v-model="message" @input="inputThing">
            <p v-if="verify">请填写你的姓名</p>
          </div>
          <router-link to='/profile/info/address/add/addDetail' class="add-detail">
            <div class="input-new">
              <input type="text" placeholder="小区/写字楼/学校等" readonly="readonly" v-model="addAddress"/>
            </div>
          </router-link>
          <div class="input-new">
            <input type="text" placeholder="请填写详细送餐地址" :class="{verifies:verifythree}" v-model="mesthree"
                   @input="inputThingthree">
            <p v-if="verifythree">{{sendaddress}}</p>
          </div>
          <div class="input-new">
            <input type="text" placeholder="请填写联系手机" :class="{verifies:verifyfour}" v-model="telenum"
                   @input="inputThingfour">
            <p v-if="verifyfour">{{telephone}}</p>
          </div>
          <div class="input-new">
            <input type="text" placeholder="备用联系电话（选填）" v-model="standbytelenum" @input="inputThingfive"/>
            <p v-if="verifyfive">{{standbytele}}</p>
          </div>
        </section>
        <section class="addbutton">
          <button :class="{butopacity:butpart}" @click.prevent="submitThing">新增地址</button>
        </section>
      </form>
    </section>
    <transition name="router-slid" mode="out-in">
      <router-view></router-view>
    </transition>
    <alert-tip v-show="showAlert" @closeTip=" showAlert = false" :alertText="alertText"></alert-tip>
  </div>
</template>
<script type="es6">
  import headerTop from '@/components/header/header'
  import {getImgPath} from '@/components/common/mixin'
  import alertTip from 'src/components/common/alertTip'
  import {postAddAddress} from '@/service/getData'
  import {mapState, mapMutations} from 'vuex'
  export default{
    data(){
      return {
        verify: false,			//姓名
        verifytwo: false,		//备注
        verifythree: false,		//地址
        verifyfour: false,		//电话
        verifyfive: false,		//备用电话
        butpart: false,			//新增地址按钮的透明度
        sendaddress: '',  //地址
        message: '', //信息
        mesthree: '', //送餐地址
        telenum: '', //手机号
        telephone: '', //手机号提示
        standbytele: '', //备用手机号提示
        standbytelenum: '', //备用手机号
        addSearch: false, //添加搜索地址
        newAddress: {},			//增加数组的元素
        showAlert: false, //弹出框
        alertText: null, //弹出信息
      }
    },
    computed: {
      ...mapState([
        'userInfo', 'addAddress', 'removeAddress', 'newAddress', 'geohash'
      ])
    },
    methods: {
      ...mapMutations([
        'ADD_ADDRESS'
      ]),
      inputThing(){
        (!this.message) ? this.verify = true : this.verify = false;

      },
      inputThingthree(){
        this.verifythree = true;
        if (this.mesthree.length == 0) {
          this.sendaddress = '请详细填写送餐地址';

        } else if (this.mesthree.length > 0 && this.mesthree.length <= 2) {
          this.sendaddress = '送餐地址太短了，不能辨识';
        } else {
          this.sendaddress = '';
          this.verifythree = false;
        }
        this.bindThing()
      },
      inputThingfour(){
        this.verifyfour = true;
        if ((/^[1][358][0-9]{9}$/).test(this.telenum)) {
          this.verifyfour = false;
        } else if (this.telenum == '') {
          this.telephone = "手机号不能为空"
        } else {
          this.telephone = "请输入正确的手机号"
        }
        this.bindThing()
      },
      inputThingfive(){
        this.verifyfive = true;
        if ((/^[1][358][0-9]{9}$/).test(this.standbytelenum) || this.standbytelenum == '') {
          this.verifyfive = false;
        } else {
          this.standbytele = "请输入正确的手机号"
        }
        this.bindThing();
      },
      async submitThing(){
        if (!this.addAddress) {
          this.showAlert = true;
          this.alertText = '请选择地区';
          return;
        }
        let res = await postAddAddress(this.userInfo.user_id, this.mesthree, this.addAddress, this.geohash, this.message, this.telenum, this.standbytelenum, 0, 1, '公司', 4);
        if(this.butpart){
          //保存的地址存入vuex
          this.ADD_ADDRESS({
            name: this.message,
            address: this.mesthree,
            address_detail: this.addAddress,


            geohash: 'wtw37r7cxep4',
            phone: this.telenum,
            phone_bk: this.standbytelenum,
            poi: this.addAddress,
            poi_type: 0,
          });
          this.$router.go(-1);
        }
      },
      bindThing(){
        if (this.message && this.mesthree && !this.verifyfour) {
          this.butpart = true;
        } else {
          this.butpart = false;
        }
      }
    },
    mixins: [getImgPath],
    components: {
      headerTop,
      alertTip
    }
  }
</script>
<style lang="scss" scoped>
  @import "add.scss";
</style>
