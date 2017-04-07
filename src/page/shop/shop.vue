<template>
  <div>
    <section class="shop_container">
          <header class="shop_detail_header">

          </header>
    </section>
  </div>
</template>
<script type="es6">
  import {mapState,mapMutations} from 'vuex'
  import {msiteAdress, shopDetails, foodMenu, getRatingList, ratingScores, ratingTags} from 'src/service/getData'
  import loading from 'src/components/common/loading'
  import ratingStar from 'src/components/common/ratingStar'
  import {loadMore, getImgPath} from 'src/components/common/mixin'
  import BScroll from 'better-scroll'

  export default{
    data(){
      return {}
    }
  }
</script>
<style lang="scss" scoped></style>
