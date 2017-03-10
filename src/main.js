// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router'
import FastClick from 'fastclick'
import './utils/rem'
import store from './store'



if('addEventListener' in document){
  document.addEventListener('DOMContentLoaded',function () {
    FastClick.attach(document.body);
  },false);
}

Vue.config.productionTip = false
Vue.config.debug = true;
/* eslint-disable no-new */
new Vue({
  store,
  router,
}).$mount('#app')
