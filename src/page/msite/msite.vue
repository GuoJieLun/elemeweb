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
          <div class="swiper-slide">
              1
          </div>
          <div class="swiper-slide">
            2
          </div>
        </div>
        <div class="swiper-pagination"></div>
      </div>
    </nav>
  </div>
</template>
<script>
  import '../../plugins/swiper.min.js'
  import headerTop from '../../components/header/header'
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
    mounted(){
      new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        loop: true
      });
    },
    components: {
      headerTop
    },
  }
</script>
<style lang="scss" scoped>
  @import "../../style/swiper.min.css";
  @import "msite.scss";
</style>
