<template>
  <div class="city_container">
    <header-top :head-title="cityname" go-back="true">
      <router-link to="/home" slot="changecity" class="change_city">切换城市</router-link>
    </header-top>
    <form class="city_form" v-on:submit.prevent>
      <div>
        <input
          type="search"
          name="city"
          class="city_input input_style"
          required
          v-model="inputValue"
          placeholder="输入学校、商务楼、地址">
      </div>
      <div>
        <input
          @click="postpois"
          name="submit"
          class="city_submit input_style"
          type="submit">
      </div>
    </form>
    <header v-if="historytitle" class="pois_search_history">搜索历史</header>
    <ul class="getpois_ul">
      <li v-for="(item,index) in placelist" :key="index" @click='nextpage(index, item.geohash)'>
        <h4 class="pois_name ellipsis">{{item.name}}</h4>
        <p class="pois_address ellipsis">{{item.address}}</p>
      </li>
    </ul>
    <div class="search_none_place" v-if="placeNone">很抱歉！无搜索结果</div>

  </div>
</template>
<script>
  import headerTop from '@/components/header/header'
  import {currentcity, searchplace} from '@/service/getData'
  import {getStore, setStore,removeStore} from '../../utils/utils'
  export  default{
    data(){
      return {
        inputValue: '', // 搜索地址
        cityid: '', // 当前城市id
        cityname: '', // 当前城市名字
        placelist: [], // 搜索城市列表
        placeHistory:[], // 历史搜索记录
        historytitle: true, // 默认显示搜索历史头部，点击搜索后隐藏
        placeNone: false, // 搜索无结果，显示提示信息
      }
    },
    components: {
      headerTop
    },
    mounted(){
      this.cityid = this.$route.params.cityid;
      //获取当前城市名字
      currentcity(this.cityid).then(res => {
        this.cityname = res.name;
      });
      //获取搜索历史
      if (getStore('placeHistory')) {
        this.placelist = JSON.parse(getStore('placeHistory'));
      }
    },
    methods: {
      postpois(){
        //值不为空时才触发
        if (this.inputValue) {
          searchplace(this.cityid, this.inputValue).then(res => {
            this.historytitle = false;
            this.placelist = res;
            this.placeNone = res.length ? false : true;
          });
        }
      },
      /**
       * 点击搜索结果进入下一页面时进行判断是否已经有一样的历史记录
       * 如果没有则新增，如果有则不做重复储存，判断完成后进入下一页
       */
      nextpage(index, geohash){
        let history = getStore('placeHistory');
        let choosePlace = this.placelist[index];
        if (history) {
          let checkrepeat = false;
          this.placeHistory = JSON.parse(history);
          this.placeHistory.forEach(item => {
            if (item.geohash == geohash) {
              checkrepeat = true;
            }
          })
          if (!checkrepeat) {
            this.placeHistory.push(choosePlace)
          }
        }else {
          this.placeHistory.push(choosePlace)
        }
        setStore('placeHistory',this.placeHistory);
        this.$router.push({path:'/msite', query:{geohash}})
      }
    }
  }
</script>
<style lang="scss">
  @import "city.scss";
</style>
