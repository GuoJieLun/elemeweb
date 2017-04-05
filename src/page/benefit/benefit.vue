<template>
  <div class="rating_page">
    <header-top head-title="我的优惠" go-back="true"></header-top>
    <section v-if="!showLoading">
      <section class="category_title">
        <span :class="{choosed: categoryType === 1}" @click="categoryType = 1">红包</span>
        <span :class="{choosed: categoryType === 2}" @click="categoryType = 2">商家代金券</span>
      </section>
      <transition name="router-fade">
        <section v-if="categoryType === 1">
          <section class="hongbao_container">
            <header class="hongbao_title">
              <section class="total_number">
                有 <span>{{hongbaoList.length}}</span> 个红包即将到期
              </section>
              <section class="hongbao_description">
                <img src="../../images/description.png" height="24" width="24">
                <router-link to="/benefit/hbDescription" class="hongbao_detail">红包说明</router-link>
              </section>
            </header>
            <ul class="hongbao_list_ul">
              <li class="hongbao_list_li" v-for=" item in hongbaoList" :key="item.id">
                <section class="list_item">
                  <div class="list_item_left">
                    <span>¥</span>
                    <span>{{String(item.amount).split('.')[0]}}</span>
                    <span>.</span>
                    <span>{{String(item.amount).split('.')[1]||0}}</span>
                  </div>
                  <div class="list_item_right">
                    <h4>{{item.name}}</h4>
                    <ul>
                      <li v-for="(des, index) in item.descriptions" :key="index">
                        {{des}}
                      </li>
                    </ul>
                  </div>
                </section>
                <footer class="list_item_footer" v-if="item.extra_limit">
                  <ul>
                    <li v-for="(limit,index) in item.extra_limit" :key="index">
                      {{limit}}
                    </li>
                  </ul>
                </footer>
              </li>
            </ul>
          </section>
          <router-link to="/benefit/hbHistory" class="history_hongbao">
            <span class="check_history">查看历史红包</span>
            <svg class="history_right">
              <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
            </svg>
          </router-link>
          <footer class="hongbao_footer">
            <router-link to="/benefit/exchange" class="hongbao_style" style="border-right: 1px solid #f5f5f5">
              兑换红包
            </router-link>
            <router-link to="/benefit/commend" class="hongbao_style">
              推荐有奖
            </router-link>
          </footer>
        </section>
      </transition>
      <transition name="router-fade">
        <section v-if="categoryType ===2" class="voucher_container">
          <section class="hongbao_description voucher_header">
            <img src="../../images/description.png" height="24" width="24">
            <router-link to="/benefit/coupon" class="hongbao_detail">商家代金券说明</router-link>
          </section>
          <section class="unable_use">
            <img src="../../images/voucher.png" height="170" width="300">
            <p>无法使用代金券</p>
            <p>非客户端或客户端版本过低</p>
            <router-link to="/download" class="download_app">
              下载或升级客户端
            </router-link>
          </section>
        </section>

      </transition>
    </section>
    <alert-tip v-if="showAlert" @closeTip="showAlert = false" :alertText="alertText"></alert-tip>
    <loading v-if="showLoading"></loading>
    <transition name="router-slid" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>
<script type="es6">
  import headerTop from '@/components/header/header'
  import alertTip from '@/components/common/alertTip'
  import loading from  '@/components/common/loading'
  import {mapState, mapMutations} from 'vuex'
  import {getHongbaoNum} from '@/service/getData'

  export default {
    data(){
      return {
        showAlert: false,
        alertText: null,
        showLoading: true, //加载动画
        hongbaoList: null, //红包列表
        categoryType: 1, //红包与商家代金券切换
      }
    },
    computed: {
      ...mapState([
        'userInfo'
      ])
    },
    methods: {
      ...mapMutations([
        'CLEAR_CART'
      ]),
      async initData(){
        if (this.userInfo) {
          this.hongbaoList = await getHongbaoNum(this.userInfo.user_id);
          this.showLoading = false;
        }
      }
    },
    components: {
      headerTop,
      alertTip,
      loading
    },
    watch: {
      'userInfo': function (value) {
        this.initData();
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import "benefit.scss";
</style>
