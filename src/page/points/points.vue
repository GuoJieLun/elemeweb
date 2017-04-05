<template>
  <div class="page">
    <header-top head-title="我的积分" go-back="true"></header-top>
    <section class="content_container">
      <section class="content">
        <header class="content_header">
          <span class="content_title_style">当前积分</span>
          <section class="contetn_description">
            <img src="../../images/description.png" height="24" width="24">
            <router-link to="/points/detail" class="content_title_style">积分说明</router-link>
          </section>
        </header>
        <p class="content_num">
          <span>0</span>
          <span>分</span>
        </p>
        <div class="promit_button" @click="usePoint">积分兑换商品</div>
      </section>
    </section>
    <p class="deal_detail">最近30天积分纪录</p>
    <div class="no_log">
      <img src="../../images/no-log.png">
      <p>最近30天无积分纪录</p>
      <p>快去下单赚取大量积分吧</p>
    </div>
    <alert-tip v-show="showAlert" @closeTip="showAlert = false" :alertText="alertText"></alert-tip>
    <transition name="router-slid" mode="out-in">
        <router-view></router-view>
    </transition>
  </div>
</template>
<script type="es6">
  import headerTop from '@/components/header/header'
  import alertTip from '@/components/common/alertTip'
  export default{
    data(){
      return {
        showAlert: false,
        alertText: null,
      }
    },
    components: {
      headerTop,
      alertTip
    },
    methods:{
      usePoint(){
        this.showAlert = true;
        this.alertText = '快去下单吧!!';
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import "points.scss";
</style>
