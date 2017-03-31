<template>
  <div class="rating_page">
    <header-top head-title="历史红包" go-back="true"></header-top>
    <section v-if="!showLoading" id="scroll_section" class="scroll_container">
    </section>
  </div>
</template>
<script type="es6">
  import headerTop from '@/components/header/header'
  import {mapState, mapMutations} from 'vuex'
  import {getExpired} from '@/service/getData'
  import loading from '@/components/common/loading'
  import BScroll from 'better-scroll'
  export default{
    data(){
      return{
        showAlert: false,
        alertText: null,
        showLoading: true,
        expiredList: null, //历史红包列表
      }
    },
    components:{
      headerTop
    },
    methods:{
      ...mapMutations([
        'CLEAR_CART'
      ]),
      async initData(){
        //获取历史红包
        if (this.userInfo) {
          this.expiredList = await getExpired(this.userInfo.user_id);
          this.showLoading = false;
          this.$nextTick(() => {
//            new BScroll('#scroll_section', {
//              deceleration: 0.001,
//              bounce: true,
//              swipeTime: 1800,
//              click: true,
//            });
          })
        }
      }
    },
    computed:{
      ...mapState([
          'userInfo'
      ])
    },
    watch:{
        userInfo:function (value) {
            this.initData();
        }
    }
  }
</script>
<style lang="scss" scoped>
  @import 'src/style/mixin';

  .rating_page{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    padding-top: 1.95rem;
    z-index: 203;
    background-color: #f1f1f1;
  p, span{
    font-family: Helvetica Neue,Tahoma,Arial;
  }
  }
  .scroll_container{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    padding-top: 1.95rem;
  }
  .hongbao_list_ul{
    padding: 1rem .5rem;
  .hongbao_list_li{
    background: #fff url(../../../images/expired.png) repeat-x ;
    background-size: .5rem .2rem;
    margin-bottom: 0.5rem;
    border-radius: 0.25rem;
    position: relative;
  .list_item{
  @include fj;
    padding: 1rem 0.5rem .8rem;
  .list_item_left{
    font-size: 0;
    border-right: 0.025rem dotted #ccc;
    flex: 1;
  span:nth-of-type(1){
  @include sc(.75rem, #ccc);
    font-weight: bold;
  }
  span:nth-of-type(2){
  @include sc(2rem, #ccc);
  }
  span:nth-of-type(3), span:nth-of-type(4){
  @include sc(1rem, #ccc);
    font-weight: bold;
  }
  }
  .list_item_right{
    flex: 2;
    margin-left: 1.5rem;
  h4{
  @include sc(.7rem, #ccc);
    margin-left: -.7rem;
  }
  ul{
  li{
    list-style-type: disc;
  @include sc(.4rem, #ccc);
  }
  }
  }
  }
  .list_item_footer{
    background-color: #f9f9f9;
    padding: .4rem .4rem;
    border-bottom-left-radius: 0.25rem;
    border-bottom-right-radius: 0.25rem;
  ul{
  li{
    list-style-type: disc;
  @include sc(.4rem, #ccc);
    margin-left: .4rem;
  }
  }
  }
  .expired{
    fill: #ddd;
  @include wh(3rem, 3rem);
    top: .6rem;
    right: .2rem;
    position: absolute;
  }
  }
  }
</style>

