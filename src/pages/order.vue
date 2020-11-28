<template>
  <div>
    <!-- 这里是要根据不同页面来嵌套不同的标题 -->
    <!-- <order-header v-bind:title="title"> 
      <template v-slot:tip>
        <span>{{tip}}</span>  
      </template>
    </order-header> -->
    <router-view></router-view>
    <service-bar></service-bar>
    <nav-footer></nav-footer>
  </div>
</template>

<script>
import ServiceBar from './../components/ServiceBar'
import NavFooter from './../components/NavFooter'
export default {
  name: 'order',
  data(){
    return{
      title:'',
      tip:''
    }
  },
  components:{
    NavFooter,
    ServiceBar
  }
  //先获取当前路由的地址 ,根据当前获取的路由地址，从而添加不同的标题  
  // 页面在跳转的时候mounted这个不会跟随跳转，只有我们在渲染的时候才会进来
  // mounted(){
  //   let path = this.$route.path;
  //   if(path == '/order/confirm'){
  //     this.title = '订单确认',
  //     this.tip = '请认真填写收货地址';
  //   }else if(path == '/order/list'){
  //     this.title = '订单列表',
  //     this.tip = '请谨防钓鱼链接或诈骗电话，了解更多>';
  //   }else if(path == '/order/pay'){
  //     this.title = '订单支付',
  //     this.tip = '请谨防钓鱼链接或诈骗电话，了解更多>';
  //   }else{
  //     this.title = '订单支付',
  //     this.tip = '请谨防钓鱼链接或诈骗电话，了解更多>';
  //   }
  // }
}
</script>

<style>

</style>