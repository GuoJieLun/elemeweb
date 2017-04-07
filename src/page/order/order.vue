<template>
  <div class="order_page">
    <header-top head-title="我的订单" go-back="true"></header-top>
    <ul class="order_list_ul">
      <li class="order_list_li" v-for="item in orderList" :key="item.id">
        <img :src="item.restaurant_image_url" class="restaurant_image">
        <section class="order_item_right">
          <div @click="showDetail(item)">
            <header class="order_item_right_header">
              <section class="order_header">
                <h4 >
                  <span class="ellipsis">{{item.restaurant_name}} </span>
                  <svg fill="#333" class="arrow_right">
                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                  </svg>
                </h4>
                <p class="order_time">{{item.formatted_created_at}}</p>
              </section>
              <p class="order_status">
                {{item.status_bar.title}}
              </p>
            </header>
            <section class="order_basket">
              <p class="order_name ellipsis">{{item.basket.group[0][0].name}}{{item.basket.group[0].length > 1 ? ' 等' + item.basket.group[0].length + '件商品' : ''}}</p>
              <p class="order_amount">¥{{item.total_amount.toFixed(2)}}</p>
            </section>
          </div>
          <div class="order_again">
            <compute-time v-if="item.status_bar.title == '等待支付'" :time="item.formatted_created_at"></compute-time>
            <router-link :to="{path: '/shop', query: {geohash, id: item.restaurant_id}}" tag="span" class="buy_again" v-else>再来一单</router-link>          </div>
        </section>
      </li>
    </ul>
    <foot-guide></foot-guide>
    <transition name="loading">
      <loading v-show="showLoading"></loading>
    </transition>
    <transition name="router-slid" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>
<script type="es6">
  import {mapState, mapMutations} from 'vuex'
  import headerTop from '@/components/header/header'
  import loading from '@/components/common/loading'
  import computeTime from '@/components/common/computeTime'

  import footGuide from '@/components/footer/footGuide'
  import {loadMore, getImgPath} from 'src/components/common/mixin'
  import {getOrderList} from '@/service/getData'

  export default{
    data(){
      return {
        orderList: null,
        offset: 0,
        preventRepeat: false,//防止重复获取
        showLoading: true
      }
    },
    mixins: [loadMore],
    components: {
      headerTop,
      loading,
      footGuide,
      computeTime
    },
    mounted(){

    },
    computed: {
      ...mapState([
        'userInfo', 'geohash'
      ])
    },
    methods: {
      ...mapMutations([
        'SAVE_ORDER'
      ]),
      async initData(){
        if (this.userInfo && this.userInfo.user_id) {
          let res = await getOrderList(this.userInfo.user_id, this.offset);
          clearTimeout(this.timer);
          this.timer = setTimeout(() => {
            clearTimeout(this.timer);
            this.showLoading = false;
            this.orderList = [...res];
          }, 1000)
        }
      },
      showDetail(item){
        this.SAVE_ORDER(item);
        this.preventRepeat = false;
        this.$router.push('/order/orderDetail');
      }
    },
    watch: {
      userInfo: function (value) {
        if (value && value.user_id && !this.orderList) {
          this.initData();
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import "order.scss";
</style>
