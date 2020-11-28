import Vue from 'vue'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueLazyLoad from 'vue-lazyload'
import VueCookie from 'vue-cookie'
import {Message} from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import store from './store'
import App from './App.vue'
// import env from './env'  
const mock = false;
if(mock){
  require('./mock/api');
}

// 根据前端的跨域方式做调整 /a/b : /api/a/b => /a/b
// mock的地址
// axios.defaults.baseURL = 'https://www.easy-mock.com/mock/5f901f37bcca63581f44c721/api';
axios.defaults.baseURL = '/api'; //这个是跟后台对接的地址
axios.defaults.timeout = 8000;  
// 根据环境变量获取不同的请求地址
// axios.defaults.baseURL = env.baseURL;
//接口错误拦截
axios.interceptors.response.use(function(response){
  let res = response.data; //这个才是接口的返回值
  let path = location.hash;
  if(res.status == 0){
    return res.data;
  }else if(res.status == 10){
    if(path != '#/index'){
      // 判断不在首页的话 不会跳转到登录页面
      window.location.href = '/#/login';
      return Promise.reject(res);
    }
  }else{
    Message.warning(res.msg);
    return Promise.reject(res);
  }
},(error)=>{
  let res = error.response;
  Message.error(res.data.message);
  return Promise.reject(error);
});

Vue.use(VueAxios, axios);
Vue.use(VueCookie);
// Vue.use(Message);
Vue.use(VueLazyLoad, {
  loading: '/imgs/loading-svg/loading-bars.svg'
});
Vue.prototype.$message = Message; //这里是通过原型的方式拓展一个对象，把Message给绑定上去
Vue.config.productionTip = false;

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
