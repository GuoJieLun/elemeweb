<template>
  <div class="rating_page">
    <header-top :head-title="headTitle" goBack="true"></header-top>
    <section class="profile-info">
      <section class="headportrait">
        <input type="file" class="profileinfopanel-upload">
        <h2>头像</h2>
        <div class="headportrait-div">
          <img :src="imgPath" class="headportrait-div-top" v-if="avatar">
          <span class="headportrait-div-top" v-else>
                <svg>
                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#avatar-default"></use>
                </svg>
            </span>
          <span class="headportrait-div-bottom">
                <svg fill="#d8d8d8">
                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                </svg>
            </span>
        </div>
      </section>
      <router-link to="/profile/setusername" class="info-router">
        <section class="headportrait headportraitwo">
          <h2>用户名</h2>
          <div class="headportrait-div">
            <p>{{username}}</p>
            <span class="headportrait-div-bottom">
                            <svg fill="#d8d8d8">
                                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                            </svg>
                        </span>
          </div>
        </section>
      </router-link>
      <router-link to="/profile/info/address" class="info-router">
        <section class="headportrait headportraitwo headportraithree">
          <h2>收货地址</h2>
          <div class="headportrait-div">
                            <span class="headportrait-div-bottom">
                                <svg fill="#d8d8d8">
                                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                                </svg>
                            </span>
          </div>
        </section>
      </router-link>
      <section class="bind-phone">
        账号绑定
      </section>
      <section class="info-router" @click="changePhone">
        <section class="headportrait headportraitwo headportraithree">
          <h2><img src="../../../images/bindphone.png" style="display:inline-block;margin-right:.4rem;" alt="">手机</h2>
          <div class="headportrait-div">
            <p>{{infotel}}</p>
            <span class="headportrait-div-bottom">
                  <svg fill="#d8d8d8">
                      <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                  </svg>
              </span>
          </div>
        </section>
      </section>
      <section class="bind-phone">
        安全设置
      </section>
      <router-link to="/forget" class="info-router">
        <section class="headportrait headportraitwo headportraithree">
          <h2>登录密码</h2>
          <div class="headportrait-div">
            <p>修改</p>
            <span class="headportrait-div-bottom">
                  <svg fill="#d8d8d8">
                      <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                  </svg>
              </span>
          </div>
        </section>
      </router-link>
      <section class="exitlogin" @click="exitlogin">退出登录</section>

    </section>
    <section class="coverpart" v-if="show">
      <section class="cover-background"></section>
      <section class="cover-content" :class="{ 'cover-animate' : isEnter, 'cover-animate-leave':isLeave }">
        <div class="sa-icon">
          <span class="sa-body"></span>
          <span class="sa-dot"></span>
        </div>
        <h2>是否退出登录</h2>
        <div class="sa-botton">
          <button class="waiting" @click="waitingThing">再等等</button>
          <div style="display:inline-block;">
            <button class="quitlogin" @click="outLogin">退出登录</button>
          </div>
        </div>
      </section>
    </section>
    <alert-tip v-if="showAlert" @closeTip="showAlert = false" :alertText="alertText"></alert-tip>
    <transition name="router-slid" mode="out-in">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </transition>
  </div>
</template>
<script type="es6">
  import headerTop from '@/components/header/header'
  import alertTip from  '@/components/common/alertTip'
  import {getImgPath} from '@/components/common/mixin'
  import {mapState, mapMutations} from 'vuex'
  export default{
    data(){
      return {
        headTitle: '账户信息',
        username: '',    //用户名
        resetname: '', //重置用户名
        infotel: '',     //用户手机
        avatar: '',      //用户头像
        show: false,     //显示提示框
        isEnter: true,  //是否登陆
        isLeave: false, //是否退出
        showAlert: false,
        alertText: null,
      }
    },
    mixins: [getImgPath],
    components: {
      headerTop,
      alertTip
    },
    computed: {
      ...mapState([
        'userInfo', 'imgPath'
      ])
    },
    methods: {
      ...mapMutations([
        'OUT_LOGIN', 'SAVE_AVANDER'
      ]),
      exitlogin(){
        this.show = true;
        this.isEnter = true;
        this.isLeave = false;
      },
      waitingThing(){
        this.isEnter=false;
        this.isLeave=true;
        this.timer = setTimeout(() =>{
          clearTimeout(this.timer);
          this.show=false;
        },200)
      },
      outLogin(){
        this.OUT_LOGIN();
        this.waitingThing();
        this.$router.go(-1);
      },
      changePhone(){
        this.showAlert = true;
        this.alertText = '请在手机APP设置';
      },
    },

    watch: {

      userInfo: function (value) {
          console.log(value.username);
        if (value && value.user_id) {
          this.username = value.username;
          this.infotel = value.mobile;
          this.avatar = value.avatar;
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import "info.scss";
</style>
