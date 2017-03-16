<template>
  <div class="food_container">
    <header-top :head-title="headTitle" goBack="true"></header-top>
    <section class="sort_container">
      <div class="sort_item" :class="{choose_type:sortBy == 'food'}">
        <div class="sort_item_container" @click="chooseType('food')">
          <div class="sort_item_border">
            <span :class="{ category_title:sortBy == 'food'}">{{foodTitle}}</span>
            <svg width="10" height="10" xmlns="http://www.w3.org/2000/svg" version="1.1" class="sort_icon">
              <polygon points="0,3 10,3 5,8"/>
            </svg>
          </div>
        </div>
        <transition name="showlist" v-show="category">
          <section v-show="sortBy == 'food'" class="category_container sort_detail_type">
            <section class="category_left">
              <ul>
                <li v-for="(item,index) in category"
                    :key="index"
                    :class="{category_active:restaurant_category_id == item.id}"
                    @click="selectCategoryName(item.id,index)"
                    class="category_left_li">
                  <section>
                    <img :src="getImgPath(item.image_url)" v-if="index" class="category_icon">
                    <span>{{item.name}}</span>
                  </section>
                  <section>
                    <span class="category_count">{{item.count}}</span>
                    <svg v-if="index" width="8" height="8" xmlns="http://www.w3.org/2000/svg" version="1.1"
                         class="category_arrow">
                      <path d="M0 0 L6 4 L0 8" stroke="#bbb" stroke-width="1" fill="none"/>
                    </svg>
                  </section>
                </li>
              </ul>
            </section>
            <section class="category_right">
              <ul>
                <li
                  v-for="(item,index) in categoryDetail"
                  class="category_right_li"
                  @click="getCategoryIds(item.id,item.name)"
                  :class="{category_right_choosed: restaurant_category_ids == item.id || (!restaurant_category_ids)&&index == 0}"
                  :key="item.id">
                  <span>{{item.name}}</span>
                  <span>{{item.count}}</span>
                </li>
              </ul>
            </section>
          </section>
        </transition>
      </div>
      <div class="sort_item" :class="{choose_type:sortBy == 'sort'}">
        <div class="sort_item_container" @click="chooseType('sort')">
          <div class="sort_item_border">
            <span :class="{category_title:sortBy == 'sort'}">排序</span>
            <svg width="10" height="10" xmlns="http://www.w3.org/2000/svg" version="1.1" class="sort_icon">
              <polygon points="0,3 10,3 5,8"/>
            </svg>
          </div>
        </div>
        <transition name="showlist">
          <section v-show="sortBy == 'sort'" class="sort_detail_type">
            <ul class="sort_list_container" @click="sortList($event)">
              <li class="sort_list_li" v-for="(item,index) in sortArr" :key="index">
                <svg>
                  <use xmlns:xlink="http://www.w3.org/1999/xlink" :xlink:href=item.svgName></use>
                </svg>
                <p :data="item.id" :class="{sort_select: sortByType == item.id}">
                  <span>{{item.text}}</span>
                  <svg v-if="sortByType == item.id">
                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#selected"></use>
                  </svg>
                </p>
              </li>
            </ul>
          </section>
        </transition>

      </div>
      <div class="sort_item" :class="{choose_type:sortBy == 'activity'}">
        <div class="sort_item_container" @click="chooseType('activity')">
          <span :class="{category_title: sortBy == 'activity'}">筛选</span>
          <svg width="10" height="10" xmlns="http://www.w3.org/2000/svg" version="1.1" class="sort_icon">
            <polygon points="0,3 10,3 5,8"/>
          </svg>
        </div>
        <transition name="showlist">
          <section v-show="sortBy == 'activity'" class="sort_detail_type filter_container">
            <section style="width: 100%;">
              <header class="filter_header_style">配送方式</header>
              <ul class="filter_ul">
                <li v-for="item in Delivery" :key="item.id" class="filter_li" @click="selectDeliveryMode(item.id)">
                  <svg :style="{opacity: (item.id == 0)&&(delivery_mode !== 0)? 0: 1}">
                    <use xmlns:xlink="http://www.w3.org/1999/xlink"
                         :xlink:href="delivery_mode == item.id? '#selected':'#fengniao'"></use>
                  </svg>
                  <span :class="{selected_filter: delivery_mode == item.id}">{{item.text}}</span>
                </li>
              </ul>
            </section>
            <section style="width:100%">
              <header class="filter_header_style">商家属性（可以多选）</header>
              <ul class="filter_ul" style="paddingBottom: .5rem;">
                <li v-for="(item,index) in Activity" :key="item.id" class="filter_li" @click="selectSupportIds(index, item.id)">
                  <svg v-show="support_ids[index].status" class="activity_svg">
                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#selected"></use>
                  </svg>
                  <span class="filter_icon" :style="{color: '#' + item.icon_color, borderColor: '#' + item.icon_color}" v-show="!support_ids[index].status">{{item.icon_name}}</span>
                  <span :class="{selected_filter: support_ids[index].status}">{{item.name}}</span>
                </li>
              </ul>
            </section>
            <footer class="confirm_filter">
              <div class="clear_all filter_button_style" @click="clearAll">清空</div>
              <div class="confirm_select filter_button_style" @click="confirmSelectFun">确定<span v-show="filterNum">({{filterNum}})</span></div>
            </footer>
          </section>
        </transition>
      </div>
    </section>
    <transition name="showcover">
      <div class="back_cover" v-show="sortBy"></div>
    </transition>
    <section class="shop_list_container">
      <shop-list v-if="latitude"  @DidConfrim="clearAll"
        :geohash="geohash"
        :restaurantCategoryId="restaurant_category_id"
        :restaurantCategoryIds="restaurant_category_ids"
        :sortByType='sortByType'
        :deliveryMode="delivery_mode"
        :confirmSelect="confirmStatus"
        :supportIds="support_ids">

      </shop-list>
    </section>
  </div>
</template>
<script type="es6">
  import {mapState, mapMutations} from 'vuex'
  import headerTop from '../../components/header/header'
  import shopList from  '../../components/common/shoplist'
  import {getImgPath} from 'src/components/common/mixin'
  import {msiteAdress, foodCategory, foodDelivery, foodActivity} from 'src/service/getData'

  export default{
    data(){
      return {
        geohash: '', // city页面传递过来的地址geohash
        headTitle: '', // msiet页面头部标题
        foodTitle: '', // 排序左侧头部标题
        restaurant_category_id: '', // 食品类型id值
        restaurant_category_ids: '', //筛选类型的id
        sortBy: '', // 筛选的条件
        category: null, // category分类左侧数据
        categoryDetail: null, // category分类右侧的详细数据
        sortByType: null, // 根据何种方式排序
        Delivery: null, // 配送方式数据
        Activity: null, // 商家支持活动数据
        delivery_mode: null, // 选中的配送方式
        support_ids: [], // 选中的商铺活动列表
        filterNum: 0, // 所选中的所有样式的集合
        confirmStatus: false, // 确认选择
        sortArr: [
          {
            text: '智能排序',
            id: 0,
            svgName: '#default'
          },
          {
            text: '距离最近',
            id: 5,
            svgName: '#distance'
          },
          {
            text: '销售最高',
            id: 6,
            svgName: '#hot'
          },
          {
            text: '起送价最低',
            id: 1,
            svgName: '#price'
          },
          {
            text: '配速速度最快',
            id: 2,
            svgName: '#speed'
          },
          {
            text: '评分最高',
            id: 3,
            svgName: '#rating'
          }
        ]
      }
    },
    mixins: [getImgPath],
    created(){
      this.initData();
    },
    components: {
      headerTop,
      shopList
    },
    computed: {
      ...mapState([
        'latitude', 'longitude'
      ])
    },
    methods: {
      ...mapMutations([
        'RECORD_ADDRESS'
      ]),
      async initData(){
        this.geohash = this.$route.query.geohash;
        this.headTitle = this.$route.query.title;
        this.foodTitle = this.headTitle;
        this.restaurant_category_id = this.$route.query.restaurant_category_id;

        //防止页面刷新,vuex状态消息,经纬度需要重新获取,并插入vuex
        if (!this.latitude) {
          let res = await msiteAdress(this.geohash);
          // 记录当前经度纬度进入vuex
          this.RECORD_ADDRESS(res);
        }

        //获取category分类左侧数据
        this.category = await foodCategory(this.latitude, this.longitude);
        this.category.forEach(item => {
          if (this.restaurant_category_id == item.id) {
            this.categoryDetail = item.sub_categories;
          }
        });

        //获取筛选列表的配送方式
        this.Delivery = await foodDelivery(this.latitude, this.longitude);

        //获取筛选列表的商铺活动
        this.Activity = await foodActivity(this.latitude, this.longitude);
        this.Activity.forEach((item, index) => {
          this.support_ids[index] = {status: false, id: item.id};
        })
      },
      //点击顶部三个选项,展示不同的列表
      async chooseType(type){
        if (this.sortBy !== type) {
          this.sortBy = type;
          if (type == 'food') {
            this.foodTitle = '分类';
          } else {
            this.foodTitle = this.headTitle;
          }
        } else {
          this.sortBy = '';
          if (type == 'food') {
            this.foodTitle = this.headTitle;
          }
        }
      },
      //筛选配送方式
      selectDeliveryMode(id){
         if(this.delivery_mode == null){
             this.filterNum++;
             this.delivery_mode = id;
         }else if(this.delivery_mode == id){
             this.filterNum--;
             this.delivery_mode = null;
         }else{
             this.delivery_mode = id;
         }
      },
      //点击排序
      sortList(event){
        this.sortByType = event.target.getAttribute('data');
        this.sortBy = '';
      },
      //选中Category右侧列表的某个选项时，进行筛选，重新获取数据并渲染
      getCategoryIds(id, name){
        this.restaurant_category_ids = id;
        this.sortBy = '';
        this.headTitle = this.foodTitle = name;
      },
      //点击商家活动,状态去翻
      selectSupportIds(index, id){
        //数组替换新的值
        this.support_ids.splice(index, 1, {status: !this.support_ids[index].status, id: id});
        //重新计算filterNum的个数
        this.filterNum = this.delivery_mode == null ? 0 : 1;
        this.support_ids.forEach(item => {
          if (item.status) {
            this.filterNum++;
          }
        })
      },
      selectCategoryName(id, index){
        //第一个选项 -- 全部商家 因为没有自己的列表，所以点击则默认获取选所有数据
        if (index === 0) {
          this.restaurant_category_ids = null;
          this.sortBy = '';
          //不是第一个选项时，右侧展示其子级sub_categories的列表
        } else {
          this.restaurant_category_id = id;
          this.categoryDetail = this.category[index].sub_categories;

        }
      },
      //点击取消或者确认时，需要清空当前已选的状态值
      clearAll(){
        this.delivery_mode = null;
        this.support_ids.map(item => item.status = false);
        this.filterNum = 0;
      },
      //点击确认时，将需要筛选的id值传递给子组件，并且收回列表
      confirmSelectFun(){
        //状态改变时，因为子组件进行了监听，会重新获取数据进行筛选
        this.confirmStatus = !this.confirmStatus;
        this.sortBy = '';
      }
    }
  }

</script>
<style lang="scss" scoped>
  @import "food.scss";
</style>
