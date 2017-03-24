<template>
  <div class="restContainer">
    <header-top :headTitle="headTitle" goBack="true"></header-top>
    <form class="restForm">
      <section class="input_container phone_number">
        <input type="text" placeholder="手机号" name="phone" maxlength="11" v-model="phoneNumber" @input="inputPhone">
        <button @click.prevent="getVerifyCode" v-show="!computedTime" :class="{right_phone_number:rightPhoneNumber}">
          获取验证码
        </button>
        <button @click.prevent v-show="computedTime">已发送({{computedTime}}s)</button>
      </section>
      <section class="input_container">
        <input type="text" v-model="newPassWord" placeholder="新密码" name="newPassWord">
      </section>
      <section class="input_container">
        <input type="text" v-model="confirmPassWord" placeholder="再次输入新密码" name="confirmPassWord">
      </section>
      <section class="input_container">
        <input type="text" placeholder="验证码" name="mobileCode" v-model="mobileCode" maxlength="6">
      </section>
    </form>
    <div class="login_container" @click="resetButton">确认修改</div>
    <alert-tip v-if="showAlert" :showHide="showAlert" @closeTip="showAlert = false" :alertText="alertText"></alert-tip>
  </div>
</template>
<script type="es6">
  import headerTop from '@/components/header/header'
  import alertTip from '@/components/common/alertTip'
  import {mobileCode, checkExsis, sendMobile} from '@/service/getData'
  export default {
    data(){
      return {
        headTitle: '重置密码',
        phoneNumber: '13434218786', //电话号码
        newPassWord: null, //新密码
        rightPhoneNumber: false, //输入的手机号码是否符合要求
        confirmPassWord: null, //确认密码
        captchaCodeImg: null, //验证码地址
        mobileCode: null, //短信验证码
        computedTime: 0, //倒数记时
        showAlert: false, //显示提示组件
        alertText: null, //提示的内容
        accountType: 'mobile',//注册方式
      }
    },
    components: {
      headerTop,
      alertTip
    },
    computed:{
      //判断输入的电话号码
      inputPhone(){
        if(/^1\d{10}$/gi.test(this.phoneNumber)){
          this.rightPhoneNumber = true;
        }else{
          this.rightPhoneNumber = false;
        }
      }
    },
    methods: {
     async resetButton(){
        if (!this.rightPhoneNumber) {
          this.showAlert = true;
          this.alertText = '请输入正确的手机号';
          return
        }else if(!this.newPassWord){
          this.showAlert = true;
          this.alertText = '请输入新密码';
          return
        }else if(!this.confirmPassWord){
          this.showAlert = true;
          this.alertText = '请输确认密码';
          return
        }else if(this.newPassWord !== this.confirmPassWord){
          this.showAlert = true;
          this.alertText = '两次输入的密码不一致';
          return
        }else if(!this.mobileCode){
          this.showAlert = true;
          this.alertText = '请输验证码';
          return
        }

        //发送重置信息
        let res = await sendMobile(this.phoneNumber, this.mobileCode, this.accountType, this.newPassWord);

       if (res.message) {
          this.showAlert = true;
          this.alertText = res.message;
          return
        }else{
          this.showAlert = true;
          this.alertText = '密码修改成功';
        }
      },
      async getVerifyCode(){
        if (this.rightPhoneNumber) {
          this.computedTime = 30;
          this.timer = setInterval(() => {
            this.computedTime--;
            if (this.computedTime <= 0) {
              this.computedTime = 0;
              clearInterval(this.timer);
            }
          }, 1000);
          let res = await checkExsis(this.phoneNumber, this.accountType);
//          if (res.message) {
//            this.showAlert = true;
//            this.alertText = res.message;
//            return
//          } else if (!res.is_exists) {
//            this.showAlert = true;
//            this.alertText = '您输入的手机号尚未绑定';
//            return
//          }
          //获取验证信息
          let getCode = await mobileCode(this.phoneNumber);
          if (getCode.message) {
            this.showAlert = true;
            this.alertText = getCode.message;
            return
          }
          this.validate_token = getCode.validate_token;
        }
      }
    }

  }
</script>
<style lang="scss" scoped>
  @import '../../style/mixin.scss';


  .restContainer{
    padding-top: 1.95rem;
  }
  .restForm{
    background-color: #fff;
    margin-top: .6rem;
  .input_container{
    display: flex;
    justify-content: space-between;
    padding: .6rem .8rem;
    border-bottom: 1px solid #f1f1f1;
  input{
  @include sc(.7rem, #666);
  }
  button{
  @include sc(.65rem, #fff);
    font-family: Helvetica Neue,Tahoma,Arial;
    padding: .28rem .4rem;
    border: 1px;
    border-radius: 0.15rem;
  }
  .right_phone_number{
    background-color: #4cd964;
  }
  }
  .phone_number{
    padding: .3rem .8rem;
  }
  .captcha_code_container{
    height: 2.2rem;
  .img_change_img{
    display: flex;
    align-items: center;
  img{
  @include wh(3.5rem, 1.5rem);
    margin-right: .2rem;
  }
  .change_img{
    display: flex;
    flex-direction: 'column';
    flex-wrap: wrap;
    width: 2rem;
    justify-content: center;
  p{
  @include sc(.55rem, #666);
  }
  p:nth-of-type(2){
    color: #3b95e9;
    margin-top: .2rem;
  }
  }
  }
  }
  }
  .login_container{
    margin: 1rem .5rem;
  @include sc(.7rem, #fff);
    background-color: #4cd964;
    padding: .5rem 0;
    border: 1px;
    border-radius: 0.15rem;
    text-align: center;
  }
</style>
