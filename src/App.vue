<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
export default {
  name: 'App',
  data(){
    return{
      res: {}
    }
  },
  mounted(){
    // 判断是否获得userid，true表示处于登录状态
    if(this.$cookie.get('userId')){
      this.getUser();
      this.getCartCount();
    }
  },
  methods:{
    getUser(){
      this.axios.get('/user').then((res={})=>{
        // to-do保存到vuex里面 防止页面刷新 在app.vue重新拉取一次用户信息
        this.$store.dispatch('saveUserName', res.username);
      });
      // 保存登录数据 
    },
    getCartCount(){
      this.axios.get('/carts/products/sum').then((res=0)=>{
        // 获取购物车商品数量总和
        this.$store.dispatch('saveCartCount', res);
      });
    }
  }
}
</script>

<style lang="scss">
@import './assets/scss/reset.scss';
@import './assets/scss/config.scss';
@import './assets/scss/button.scss';
</style>