<template>
  <div>
    <header-top sigini-up="msite">
      <router-link :to="'/search/' + geohash" class="link_search" slot="search">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" version="1.1">
          <circle cx="9" cy="9" r="8" stroke="rgb(255,255,255)" stroke-width="2" fill="none"/>
          <line x1="15" y1="15" x2="20" y2="20" style="stroke:rgb(255,255,255);stroke-width:2"/>
        </svg>
      </router-link>
      <router-link to="/home" slot="msite-title" class="msite_title">
        <span class="title_text ellipsis">{{msietTitle}}</span>
      </router-link>
    </header-top>
    <nav class="msite_nav">
      <div class="swiper-container">
        <div class="swiper-wrapper">
          <div class="swiper-slide food_types_container" v-for="(item,index) in foodTypes" :key="index">
              <router-link :to="{path:'/food'}" class="link_to_food" v-for="foodItem in item" :key="foodItem.id">
                <figure>
                  <img :src="imgBaseUrl + foodItem.image_url">
                  <figcaption>{{foodItem.title}}</figcaption>
                </figure>
              </router-link>
          </div>
        </div>
        <div class="swiper-pagination"></div>
      </div>
    </nav>
    <div class="shop_list_container">
      <header class="shop_header">
        <svg class="shop_icon">
          <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#shop"></use>
        </svg>
        <span class="shop_header_title">附近商家</span>
      </header>
      <shop-list v-if="hasGetData" :geohash="geohash"></shop-list>
    </div>
  </div>
</template>
<script>
  import '../../plugins/swiper.min.js'
  import headerTop from '../../components/header/header'
  import shopList from '../../components/common/shoplist'
  import {msiteAdress, msiteFoodTypes} from 'src/service/getData'
  export default{
    data(){
      return {
        geohash: '', // city页面传递过来的地址geohash
        msietTitle: '请选择地址...', // msiet页面头部标题
        foodTypes: [], // 食品分类列表
        hasGetData: false, //是否已经获取地理位置数据，成功之后再获取商铺列表信息
        imgBaseUrl: 'https://fuss10.elemecdn.com'
      }
    },
    async beforeMount(){
      this.geohash = this.$route.query.goehash || 'wtw3sm0q087';
      this.hasGetData = true;
      let res = await msiteAdress(this.geohash);
      this.msietTitle = res.name;
    },
    mounted(){
      msiteFoodTypes(this.geohash).then(res => {
        let resLength = res.length;
        let resArr = res.concat([]);
        let foodArr = [];
        for (let i = 0, j = 0; i < resLength; i += 8, j++) {
          var spArr = resArr.splice(0, 8);
          foodArr[j] = spArr;
        }
        this.foodTypes = foodArr;
      }).then(() => {
        //初始化swiper
        new Swiper('.swiper-container', {
          pagination: '.swiper-pagination',
          loop: true
        });
      })
    },
    components: {
      headerTop,
      shopList
    },
  }
</script>
<style lang="scss" scoped>
  @import "../../style/swiper.min.css";
  @import "msite.scss";
</style>
