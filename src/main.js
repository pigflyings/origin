import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/global.css';
import axios from "axios";
import * as auth from "@/main";
import VueRouter from 'vue-router';
import router from './router';
import store from './store';
Vue.prototype.$axios=axios;
Vue.prototype.$httpUrl='http://localhost:8090'
Vue.config.productionTip = false
// Vue.use(ElementUI);
Vue.use(VueRouter);
//这个方法需要放在new Vue之前，不然按F5刷新页面不会调用这个方法
const adminInfo = "adminInfo"
router.beforeEach(function (to, from, next) {
  console.log('是否需要登录才能访问')
  if (to.meta["needLogin"]) {
    if (auth.getAdminInfo()) {
      console.log(auth.getAdminInfo())
      console.log('有cookie信息')
      next();
    }else {
      console.log('无cookie信息')

      next({
        path:'/'
      });
    }
  }else{
    next();
  }
})
Vue.use(ElementUI,{size:'small'});
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')

import Cookies from 'js-cookie'





//获取用户信息
export function getAdminInfo() {
  const admin = Cookies.get(adminInfo)
  if(admin){
    return JSON.parse(admin)
  }
  return ''
}
//存储用户信息
export function setAdminInfo(admin) {
  return Cookies.set(adminInfo, JSON.stringify(admin))
}
//移除用户信息
export function removeAdminInfo() {

  return Cookies.remove(adminInfo)
}
