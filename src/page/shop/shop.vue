<template>
  <div>
    <section v-if="!showLoading" class="shop_container">
      <header class="shop_detail_header" ref="shopheader" :style="{zIndex:showActivities ? '14':'10'}">
        <img :src="getImgPath(shopDetailData.image_path)" class="header_cover_img">
        <section class="description_header">
          <router-link to="shop/shopDetail" class="description_top">
            <section class="description_left">
              <img :src="getImgPath(shopDetailData.image_path)">
            </section>
            <section class="description_right">
              <h4 class="description_title ellipsis">{{shopDetailData.name}}</h4>
              <p class="description_text">
                商家配送／{{shopDetailData.order_lead_time}}分钟送达／配送费¥{{shopDetailData.float_delivery_fee}}</p>
              <p class="description_promotion ellipsis">公告：{{promotionInfo}}</p>
            </section>
            <svg width="14" height="14" xmlns="http://www.w3.org/2000/svg" version="1.1" class="description_arrow">
              <path d="M0 0 L8 7 L0 14" stroke="#fff" stroke-width="1" fill="none"/>
            </svg>
          </router-link>
          <footer class="description_footer" v-if="shopDetailData.activities.length" @click="showActivitiesFun">
            <p class="ellipsis">
              <span class="tip_icon"
                    :style="{backgroundColor: '#' + shopDetailData.activities[0].icon_color, borderColor: '#' + shopDetailData.activities[0].icon_color}">{{shopDetailData.activities[0].icon_name}}</span>
              <span>{{shopDetailData.activities[0].description}}（APP专享）</span>
            </p>
            <p>{{shopDetailData.activities.length}}个活动</p>
            <svg class="footer_arrow">
              <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-left"></use>
            </svg>
          </footer>
        </section>
      </header>
      <transition name="fade">
        <section class="activities_details" v-if="showActivities">
          <h2 class="activities_shoptitle">{{shopDetailData.name}}</h2>
          <h3 class="activities_ratingstar">
            <rating-star :rating='shopDetailData.rating'></rating-star>
          </h3>
          <section class="activities_list">
            <header class="activities_title_style"><span>优惠信息</span></header>
            <ul>
              <li v-for="item in shopDetailData.activities" :key="item.id">
                <span class="activities_icon"
                      :style="{backgroundColor: '#' + item.icon_color, borderColor: '#' + item.icon_color}">{{item.icon_name}}</span>
                <span>{{item.description}}（APP专享）</span>
              </li>
            </ul>
          </section>
          <section class="activities_shopinfo">
            <header class="activities_title_style"><span>商家公告</span></header>
            <p>{{promotionInfo}}</p>
          </section>
          <svg width="60" height="60" class="close_activities" @click.stop="showActivitiesFun">
            <circle cx="30" cy="30" r="25" stroke="#555" stroke-width="1" fill="none"/>
            <line x1="22" y1="38" x2="38" y2="22" style="stroke:#999;stroke-width:2"/>
            <line x1="22" y1="22" x2="38" y2="38" style="stroke:#999;stroke-width:2"/>
          </svg>
        </section>
      </transition>
      <section class="change_show_type" ref="chooseType">
        <div>
          <span :class="{activity_show:changeShowType == 'food'}" @click="changeShowType = 'food'">商品</span>
        </div>
        <div>
          <span :class="{activity_show:changeShowType == 'rating'}" @click="changeShowType = 'rating'">评价</span>
        </div>
      </section>
      <transition name="fade-choose">
        <section v-show="changeShowType == 'food'" class="food_container">
          <section class="menu_container">
            <section class="menu_left" id="wrapper_menu">
              <ul>
                <li v-for="(item,index) in menuList" :key="index" class="menu_left_li"
                    :class="{activity_menu: index == menuIndex}" @click="chooseMenu(index)">
                  <img :src="getImgPath(item.icon_url)" v-if="item.icon_url">
                  <span>{{item.name}}</span>
                  <span class="category_num" v-if="categoryNum[index]&&item.type==1">{{categoryNum[index]}}</span>
                </li>
              </ul>
            </section>
            <section class="menu_right" ref="menuFoodList">
              <ul>
                <li v-for="(item,index) in menuList" :key="index">
                  <header class="menu_detail_header">
                    <section class="menu_detail_header_left">
                      <strong class="menu_item_title">{{item.name}}</strong>
                      <span class="menu_item_description">{{item.description}}</span>
                    </section>
                    <span class="menu_detail_header_right" @click="showTitleDetail(index)"></span>
                    <p class="description_tip" v-if="index == TitleDetailIndex">
                      <span>{{item.name}}</span>
                      {{item.description}}
                    </p>
                  </header>
                  <section v-for="(foods,foodindex) in item.foods" :key="foodindex" class="menu_detail_list">
                    <router-link
                      :to="{path: 'shop/foodDetail', query:{image_path:foods.image_path, description: foods.description, month_sales: foods.month_sales, name: foods.name, rating: foods.rating, rating_count: foods.rating_count, satisfy_rate: foods.satisfy_rate, foods, shopId}}"
                      tag="div" class="menu_detail_link">
                      <section class="menu_food_img">
                        <img :src="getImgPath(foods.image_path)">
                      </section>
                      <section class="menu_food_description">
                        <h3 class="food_description_head">
                          <strong class="description_foodname">{{foods.name}}</strong>

                        </h3>
                      </section>
                    </router-link>
                  </section>
                </li>
              </ul>
            </section>
          </section>
        </section>
      </transition>
      <transition name="fade-choose">
        <section v-show="changeShowType == 'rating'">2</section>
      </transition>
    </section>
    <loading v-show="showLoading || loadRatings"></loading>

  </div>
</template>
<script type="es6">
  import {mapState, mapMutations} from 'vuex'
  import {msiteAdress, shopDetails, foodMenu, getRatingList, ratingScores, ratingTags} from 'src/service/getData'
  import loading from 'src/components/common/loading'
  import ratingStar from 'src/components/common/ratingStar'
  import {loadMore, getImgPath} from 'src/components/common/mixin'
  import BScroll from 'better-scroll'

  export default{
    data(){
      return {
        geohash: '', //geohash位置信息
        shopId: null, //商店id值
        showLoading: true, //显示加载动画
        changeShowType: 'food',//切换显示商品或者评价
        shopDetailData: null, //商铺详情
        showActivities: false, //是否显示活动详情
        menuList: [], //食品列表
        menuIndex: 0, //已选菜单索引值，默认为0
        menuIndexChange: true,//解决选中index时，scroll监听事件重复判断设置index的bug
        shopListTop: [], //商品列表的高度集合
        TitleDetailIndex: null, //点击展示列表头部详情
        categoryNum: [], //商品类型右上角已加入购物车的数量
        totalPrice: 0, //总共价格
        cartFoodList: [], //购物车商品列表
        showCartList: false,//显示购物车列表
        receiveInCart: false, //购物车组件下落的圆点是否到达目标位置
        ratingList: null, //评价列表
        ratingOffset: 0, //评价获取数据offset值
        ratingScoresData: null, //评价总体分数
        ratingTagsList: null, //评价分类列表
        ratingTageIndex: 0, //评价分类索引
        preventRepeatRequest: false,// 防止多次触发数据请求
        ratingTagName: '',//评论的类型
        loadRatings: false, //加载更多评论是显示加载组件
        foodScroll: null,  //食品列表scroll
        showSpecs: false,//控制显示食品规格
        specsIndex: 0, //当前选中的规格索引值
        choosedFoods: null, //当前选中视频数据
        showDeleteTip: false, //多规格商品点击减按钮，弹出提示框
        showMoveDot: [], //控制下落的小圆点显示隐藏
        windowHeight: null, //屏幕的高度
        elLeft: 0, //当前点击加按钮在网页中的绝对top值
        elBottom: 0, //当前点击加按钮在网页中的绝对left值
        ratingScroll: null, //评论页Scroll
        wrapperMenu: null,
      }
    },
    mixins: [loadMore, getImgPath],
    created(){
      this.geohash = this.$route.query.geohash;
      this.shopId = this.$route.query.id;
    },
    components: {
      loading,
      ratingStar
    },
    computed: {
      promotionInfo: function () {
        return this.shopDetailData.promotion_info || '欢迎光临，用餐高峰期请提前下单，谢谢。';
      }
    },
    mounted(){
      this.initData();
      this.windowHeight = window.innerHeight;
    },
    methods: {
      ...mapMutations([
        'RECORD_ADDRESS', 'ADD_CART', 'REDUCE_CART', 'INIT_BUYCART', 'CLEAR_CART', 'RECORD_SHOPDETAIL'
      ]),
      async initData(){
        if (!this.latitude) {
          //获取位置信息
          let res = await msiteAdress(this.geohash);
          //存入vuex
          this.RECORD_ADDRESS(res);
        }
        //获取商铺信息
        this.shopDetailData = await shopDetails(this.shopId, this.latitude, this.longitude);
        //获取食品列表
        this.menuList = await foodMenu(this.shopId);

      console.log(this.menuList);
        this.hideLoading();

      },
      hideLoading(){
        this.timer = setTimeout(() => {
          clearTimeout(this.timer);
          this.showLoading = false;

        }, 600)
      },
      showActivitiesFun(){
        this.showActivities = !this.showActivities;
      },
      chooseMenu(index){

      },
      showTitleDetail(index){

      }
    },
    watch: {
      showLoading: function (value) {
          if(!value){
              this.$nextTick(() => {
                this.wrapperMenu = new BScroll('#wrapper_menu', {
                  click: true,
                });
              })
          }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "shop.scss";
</style>
