<template>
  <div class="rating_page">
    <header-top head-title="新增地址" goBack="true"></header-top>
    <section>
      <div class="add-detail">
        <input type="text" placeholder="请输入小区/写字楼/学校等" v-model="inputAdress" @input="inputThing">
        <button @click="inputThing">确认</button>
      </div>
      <div class="warnpart">为了满足商家的送餐要求，建议您从列表中选择地址</div>
      <div class="point" v-show="warning">
        <p>找不到地址？</p>
        <p>请尝试输入小区、写字楼或学校名</p>
        <p>详细地址（如门牌号）可稍后输入哦。</p>
      </div>
    </section>
    <section class="poisearch-container" v-show="adressList">
      <ul>
        <li v-for="(item,index) in adressList" @click="listClick(index)">
          <p>{{item.name}}</p>
          <p>{{item.address}}</p>
        </li>
      </ul>
    </section>
  </div>
</template>
<script type="es6">
  import headerTop from 'src/components/header/header'
  import {getImgPath} from 'src/components/common/mixin'
  import {getSearchAddress} from 'src/service/getData'
  import {mapMutations, mapState} from 'vuex'
  export default{
    data(){
      return {
        warning: true,
        inputAdress: '',
        adressList: [],			//地址列表
      }
    },
    mixins: [getImgPath],
    components: {
      headerTop
    },
    created(){
      this.inputAdress = this.addAddress ? this.addAddress : this.inputAdress;
    },
    mounted(){
        this.getList();
    },
    methods: {
      getList(){
        getSearchAddress(this.inputAdress)
          .then(res => {
            if (res && res.length > 0) {
              this.warning = false;
              this.adressList = res;
            } else {
              this.warning = true;
            }
          });
      },
      inputThing(){
        if(this.inputAdress == '9527'){
          this.warning = true;
          this.adressList = [];
        }else{
            this.getList();
        }
      },
      listClick(index){
        let address = this.adressList[index];
        this.$store.commit('SAVE_ADDDETAIL',address.name);
        this.$router.go(-1);
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import "addDetail.scss";
</style>
