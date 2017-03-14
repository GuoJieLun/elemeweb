<template>
  <div class="shoplist_container">
    <ul v-load-more="loaderMore" v-if="shopListArr.length" type="1">
      <router-link :to="{path:'shop',query:{geohash, id: item.id}}" tag="li" class="shop_li" v-for="item in shopListArr" :key="item.id">
        <section>
          <img :src="getImgPath(item.image_path)" class="shop_img">
        </section>
        <hgroup class="shop_right">
          <header class="shop_detail_header">
            <h4 :class="item.is_premium? 'premium': ''" class="shop_title ellipsis">{{item.name}}</h4>
            <ul class="shop_detail_ul">
              <li v-for="item in item.supports" :key="item.id" class="supports">
                {{item.icon_name}}
              </li>
            </ul>
          </header>
          <h5 class="rating_order_num">
            <section class="rating_order_num_left">
              <section class="rating_section">
                <rating-star :rating='item.rating'></rating-star>
                <span class="rating_num">
                  {{item.rating}}
                </span>
              </section>
              <section class="order_section">
                月售{{item.recent_order_num}}单
              </section>
            </section>
            <section class="rating_order_num_right" v-if="item.delivery_mode">
              <span class="delivery_style delivery_left">{{item.delivery_mode.text}}</span>
              <span class="delivery_style delivery_right">准时达</span>
            </section>
          </h5>
          <h5 class="fee_distance">
            <section class="fee">
              ¥{{item .float_minimum_order_amount}}起送
              <span class="segmentation">/</span>
              {{item.piecewise_agent_fee.tips}}
            </section>
            <section class="distance_time">
              <span>
                {{ item.distance > 1000 ? (item.distance/1000).toFixed(2) + 'km' : item.distance + 'm' }}
                <span class="segmentation">/</span>
              </span>
              <span class="order_time">{{item.order_lead_time}}分钟</span>
            </section>
          </h5>
        </hgroup>
      </router-link>
    </ul>
    <p v-else class="empty_data">没有更多了</p>
    <aside class="return_top" @click="backTop" v-if="showBackStatus">
      <svg class="back_top_svg">
        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#backtop"></use>
      </svg>
    </aside>
    <transition name="loading">
      <loading v-show="showLoading"></loading>
    </transition>
  </div>
</template>
<script type="es6">
  import {mapState} from 'vuex'
  import {shopList} from '@/service/getData'
  import {showBack, animate} from '@/utils/utils'
  import {loadMore, getImgPath} from './mixin'
  import ratingStar from './ratingStar'
  import loading from './loading'

  export default{
    data(){
      return {
        offset: 0, // 批次加载店铺列表，每次加载20个 limit = 20
        shopListArr: [], // 店铺列表数据
        preventRepeatReuqest: false, //到达底部加载数据，防止重复加载
        showBackStatus: false, //显示返回顶部按钮
        showLoading: true, //显示加载动画
      }
    },
    components: {
      ratingStar,
      loading
    },
    props: ['restaurantCategoryId', 'restaurantCategoryIds', 'sortByType', 'deliveryMode', 'supportIds', 'confirmSelect', 'geohash'],
    mixins: [loadMore, getImgPath],
    computed: {
      ...mapState([
        'latitude', 'longitude'
      ])
    },
    mounted(){
      this.initData();
    },
    methods: {
      async initData(){
        let res = await shopList(this.latitude, this.longitude, this.offset, this.restaurantCategoryId);
        this.shopListArr = [...res];
        this.hideLoading();
        showBack(status => {
          this.showBackStatus = status;
        });
      },
      //到达底部加啊哎更多数据
      async loaderMore(){
        if (this.preventRepeatReuqest) {
          return;
        }
        this.showLoading = true;
        this.preventRepeatReuqest = true;
        this.offset += 20;
        let res = await shopList(this.latitude, this.longitude, this.offset, this.restaurantCategoryId);
        this.shopListArr = [...this.shopListArr, ...res];
        //当获取数据小于20，说明没有更多数据，不需要再次请求数据
        if (res.length < 20) {
          return
        }
        this.preventRepeatReuqest = false;

      },
      backTop(){
        animate(document.body, {scrollTop: '0'}, 400, 'ease-out');
      },
      //开发环境与编译环境loading隐藏方式不同
      hideLoading(){
        if (process.env.NODE_ENV !== 'development') {
          clearTimeout(this.timer);
          this.timer = setTimeout(() => {
            clearTimeout(this.timer);
            this.showLoading = false;
          }, 500)
        } else {
          this.showLoading = false;
        }
      }
    }
  }
</script>
<style lang="scss">
  @import "shoplist.scss";
</style>
