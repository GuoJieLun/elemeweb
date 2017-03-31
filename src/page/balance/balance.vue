<template>
  <div class="page">
    <header-top :head-title="title" go-back="true"></header-top>
    <section class="content_container">
      <section class="content">
        <header class="content_header">
          <span class="content_title_style">当前余额</span>
          <section class="contetn_description">
            <img src="../../images/description.png" height="24" width="24">
            <router-link to="/balance/detail" class="content_title_style">余额说明</router-link>
          </section>
        </header>
        <p class="content_num">
          <span>0.00</span>
          <span>元</span>
        </p>
        <div class="promit_button">提现</div>
      </section>
    </section>
    <p class="deal_detail">交易明细</p>
    <div class="no_log">
      <img src="../../images/no-log.png">
      <p>暂无明细记录</p>
    </div>
    <transition name="router-slid" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>
<script type="es6">
  import headerTop from '@/components/header/header'
  export  default {
    data(){
      return {
        title: '我的余额'
      }
    },
    components: {
      headerTop
    }
  }
</script>
<style lang="scss" scoped>
  @import "balance.scss";
</style>
