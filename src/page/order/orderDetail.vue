<template>
  <div class="order_detail_page">
    <header-top head-title="订单详情" go-back="true"></header-top>
    <section v-if="!showLoading" id="scroll_section" class="scroll_container">
      <section class="scroll_insert">
        <section class="order_titel">
          <img :src="orderDetail.restaurant_image_url">
          <p>{{orderDetail.status_bar.title}}</p>
          <p>{{orderDetail.timeline_node.description}}</p>
          <router-link class="order_again" :to="{path: '/shop',query:{geohash, id:orderDetail.restaurant_id}}">再来一单
          </router-link>
        </section>
        <section class="food_list">
          <router-link class="food_list_header" :to=" {path: '/shop', query:{geohash, id:orderDetail.restaurant_id}} ">
            <div class="shop_name">
              <img :src="orderDetail.restaurant_image_url">
              <span>{{orderDetail.restaurant_name}}</span>
            </div>
            <svg fill="#333" class="arrow_right">
              <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
            </svg>
          </router-link>
          <ul class="food_list_ul">
            <li v-for="item in orderDetail.basket.group[0]">
              <p class="food_name ellipsis">{{item.name}}</p>
              <div class="quantity_price">
                <span>X{{item.quantity}}</span>
                <span>¥{{item.price}}</span>
              </div>
            </li>
          </ul>
          <div class="deliver_fee">
            <span>配送费</span>
            <span>{{orderDetail.basket.deliver_fee&&orderDetail.basket.deliver_fee.price || 0}}</span>
          </div>
          <div class="pay_ment">实付{{orderDetail.total_amount.toFixed(2)}}</div>
        </section>
        <section class="order_detail_style">
          <header>配送信息</header>
          <section class="item_style">
            <p class="item_left">送达时间：</p>
            <div class="item_right">
              <p>{{orderData.deliver_time}}</p>
            </div>
          </section>
          <section class="item_style">
            <p class="item_left">送货地址：</p>
            <div class="item_right">
              <p>{{orderData.consignee}}</p>
              <p>{{orderData.phone}}</p>
              <p>{{orderData.address}}</p>
            </div>
          </section>
          <section class="item_style">
            <p class="item_left">配送方式：</p>
            <div class="item_right">
              <p>蜂鸟专送</p>
            </div>
          </section>
        </section>
        <section class="order_detail_style">
          <header>订单信息</header>
          <section class="item_style">
            <p class="item_left">订单号：</p>
            <div class="item_right">
              <p>{{orderDetail.id}}</p>
            </div>
          </section>
          <section class="item_style">
            <p class="item_left">支付方式：</p>
            <div class="item_right">
              <p>在线支付</p>
            </div>
          </section>
          <section class="item_style">
            <p class="item_left">下单时间：</p>
            <div class="item_right">
              <p>{{orderDetail.formatted_created_at}}</p>
            </div>
          </section>
        </section>
      </section>
    </section>
    <transition name="loading">
      <loading v-if="showLoading"></loading>
    </transition>
  </div>
</template>
<script type="es6">
  import headerTop from '@/components/header/header'
  import loading from '@/components/common/loading'
  import BScroll from 'better-scroll'
  import {getOrderDetail} from '@/service/getData'
  import {getImgPath} from '@/components/common/mixin'
  import {mapState, mapMutations} from 'vuex'
  export default{
    data(){
      return {
        showLoading: true, //显示加载动画
        orderData: null
      }
    },
    components: {
      headerTop,
      loading
    },
    mixins: [getImgPath],
    mounted(){

    },
    computed: {
      ...mapState([
        'orderDetail', 'geohash', 'userInfo'
      ])
    },
    methods: {
      async initData(){
        if (this.userInfo) {
          let res = await getOrderDetail(this.userInfo.user_id, this.orderDetail.unique_id);
          this.timer = setTimeout(() => {
            clearTimeout(this.timer);
            this.showLoading = false;
            this.orderData = [...res];
            this.$nextTick(() => {
              new BScroll('#scroll_section', {
                deceleration: 0.001,
                bounce: true,
                swipeTime: 1800,
                click: true,
              });
            })
          }, 1000)
        }
      }
    },
    watch: {
      'userInfo': function (value) {
        if (value && value.user_id) {
          this.initData();
        }

      }
    }
  }
</script>
<style lang="scss" scoped>
  @import "orderDetail.scss";
</style>
