<template>
  <div class="paddingTop">
    <header-top head-title="搜索" goBack="true"></header-top>
    <form class="search_form">
      <input type="search" name='search' v-model="searchValue" placeholder="请输入商家或美食名称" class="search_input"
             @input="checkInput">
      <input type="submit" name="submit" class="search_submit" @click.prevent="searchTarget('')">
    </form>
    <section v-if="restaurantList.length">
      <h4 class="title_restaurant">商家</h4>
      <ul class="list_container">
        <router-link :to="{path:'/shop',query:{id:item.id}}" tag="li" v-for="item in restaurantList" :key="item.id"
                     class="list_li">
          <section class="item_left">
            <img :src="imgBaseUrl + item.image_path" class="restaurant_img">
          </section>
          <section class="item_right">
            <div class="item_right_text">
              <p>
                <span>{{item.name}}</span>
                <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="24" height="14" class="pay_icon">
                  <polygon points="0,14 4,0 24,0 20,14" style="fill:none;stroke:#FF6000;stroke-width:1"/>
                  <line x1="1.5" y1="12" x2="20" y2="12" style="stroke:#FF6000;stroke-width:1.5"/>
                  <text x="3.5" y="9" style="fill:#FF6000;font-size:9;font-weight:bold;">支付</text>
                </svg>
              </p>
              <p>月售 {{item.month_sales}} 单</p>
              <p>{{item.delivery_fee}} 元起送 / 距离{{item.distance}}</p>
            </div>
            <ul class="item_right_detail">
              <li v-for="activities in item.restaurant_activity" :key="activities.id">
                <span :style="{backgroundColor: '#' + activities.icon_color}" class="activities_icon">{{activities.icon_name}}</span>
                <span>{{activities.name}}</span>
                <span class="only_phone">(手机客户端专享)</span>
              </li>
            </ul>
          </section>
        </router-link>
      </ul>
    </section>
    <section class="search_history" v-if="searchHistory.length && showHistory">
      <h4 class="title_restaurant">搜索历史</h4>
      <ul>
        <li v-for="(item,index) in searchHistory" :key="index" class="history_list">
          <span class="history_text ellipsis" @click="searchTarget(item)">{{item}}</span>
          <svg xmlns="http://www.w3.org/2000/svg" version="1.1" class="delete_icon" @click="deleteHistory(index)">
            <line x1="8" y1="8" x2="18" y2="18" style="stroke:#999;stroke-width:3"/>
            <line x1="18" y1="8" x2="8" y2="18" style="stroke:#999;stroke-width:3"/>
          </svg>
        </li>
      </ul>
      <footer class="clear_history" @click="clearAllHistory">清空搜索历史</footer>
    </section>
    <div class="search_none" v-if="emptyResult">很抱歉！无搜索结果</div>
    <div class="search_none" v-if="searchLoading">搜索中,请等待</div>
    <foot-guide></foot-guide>

  </div>

</template>
<script type="es6">
  import headerTop from '../../components/header/header'
  import footGuide from '../../components/footer/footGuide'
  import {imgBaseUrl} from '../../utils/env'
  import {searchRestaurant} from '../../service/getData'
  import {setStore, getStore} from '../../utils/utils'
  export default{
    data(){
      return {
        geohash: '', // msite页面传递过来的地址信息
        searchValue: '', // 搜索内容
        restaurantList: [], // 搜索返回的结果
        imgBaseUrl, // 图片域名地址
        searchHistory: [], // 搜索历史记录
        showHistory: true, // 是否显示历史记录，只有在返回搜索结果后隐藏
        emptyResult: false, // 搜索结果为空时显示
        searchLoading:false
      }
    },
    components: {
      headerTop,
      footGuide
    },
    methods: {
      async searchTarget(historyValue){
          this.searchLoading = true;
        if (historyValue) {
          this.searchValue = historyValue;
        } else if (!this.searchValue) {
          return
        }
        this.showHistory = false;
        if (this.searchValue == '1992') {//模拟数据为空时
          this.restaurantList = [];
        } else {
          this.restaurantList = await searchRestaurant(this.geohash, this.searchValue);
        }
        this.searchLoading = false;
        this.emptyResult = !this.restaurantList.length;

        /**
         * 判断搜索是否存在
         */
        let history = getStore('searchHistory');
        if (history) {
          let checkrepeat = false;
          this.searchHistory = JSON.parse(history);
          this.searchHistory.forEach(item => {
            if (item == this.searchValue) {
              checkrepeat = true;
            }
          });
          if (!checkrepeat) {
            this.searchHistory.push(this.searchValue);
          }
        } else {
          this.searchHistory.push(this.searchValue);
        }
        setStore('searchHistory', this.searchHistory)
      },
      checkInput(){
        if (this.searchValue == '') {
          this.showHistory = true;
          this.restaurantList = [];
          this.emptyResult = false;
        }
      },
      deleteHistory(index){
        this.searchHistory.splice(0, index);
        setStore('searchHistory', this.searchHistory);
      },
      clearAllHistory(){
        this.searchHistory = [];
        setStore('searchHistory', []);
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import "search.scss";
</style>
