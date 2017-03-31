<template>
  <div class="download_page">
    <header-top head-title="下载" go-back='true'></header-top>
    <section class="dowload_container">
      <img src='../../images/elmlogo.jpeg' class="logo_img">
      <p>下载饿了么APP</p>
      <div class="determine" >下载</div>
    </section>
  </div>
</template>
<script type="es6">
  import headerTop from '@/components/header/header'

  export default{
    components:{
      headerTop
    }
  }
</script>
<style lang="scss" scoped>
  @import 'src/style/mixin';

  .download_page{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #fff;
    z-index: 202;
    padding-top: 1.95rem;
  p, span{
    font-family: Helvetica Neue,Tahoma,Arial;
  }
  }
  .dowload_container{
    text-align: center;
  .logo_img{
    border-radius: 1rem;
    margin-top: 1rem;
  }
  p{
  @include sc(.8rem, #666);
    margin-bottom: 1rem;
  }
  .determine{
    background-color: #4cd964;
  @include sc(.7rem, #fff);
    text-align: center;
    margin: 0 .7rem;
    line-height: 1.8rem;
    border-radius: 0.2rem;
    margin-top: 0.5rem;
  }
  }
</style>
