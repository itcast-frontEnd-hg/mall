<template>
  <div class="header">
    <!-- 顶部条 -->
    <div class="nav-topbar">
        <div class="container">
          <div class="topbar-menu">
            <a href="javascript:;">小米商城</a>
            <a href="javascript:;">MUI</a>
            <a href="javascript:;">云服务</a>
            <a href="javascript:;">协议服务</a>
          </div>
        <div class="topbar-user">
          <a href="javascript:;" v-if="username">{{username}}</a>
          <a href="javascript:;" v-if="!username" @click="login">登录</a>
          <a href="javascript:;" v-if="username" @click="logout">退出</a>
          <a href="/#/order/list" v-if="username">我的订单</a>
          <a href="javascript:;" class="my-cart" @click="goToCart"><span class="icon-cart"></span>购物车({{cartCount}})</a>
        </div>
      </div>
    </div>
    <!-- 顶部组件 -->
    <div class="nav-header">
      <div class="container">
        <div class="header-logo">
          <a href="/#/index"></a>
        </div>
        <div class="header-menu">
          <div class="item-menu">
            <span>小米手机</span>
            <div class="children">
              <ul>
                <li class="product" 
                  v-for="(item,index) in phoneList" 
                  :key="index">
                  <a v-bind:href="'/#/product/'+ item.id" target="_blank">
                    <div class="pro-img">
                      <img v-lazy="item.mainImage" :alt="item.subtitle">
                    </div>
                    <div class="pro-name">{{item.name}}</div>
                    <div class="pro-price">{{item.price | currency}}</div>
                  </a>
                </li>
                <!-- <li class="product">
                  <a href="" target="_blank">
                    <div class="pro-img">
                      <img src="//cdn.cnbj1.fds.api.mi-img.com/mi-mall/82ddffd7562c54f9166fa876c143ff22.png?thumb=1&w=200&h=138&f=webp&q=90" alt="">
                    </div>
                    <div class="pro-name">小米10 Pro</div>
                    <div class="pro-price">4999元起</div>
                  </a>
                </li>
                <li class="product">
                  <a href="" target="_blank">
                    <div class="pro-img">
                      <img src="//cdn.cnbj1.fds.api.mi-img.com/mi-mall/a4a76ee684e51f0ee531ef3dc7f0aeaf.png?thumb=1&w=200&h=138&f=webp&q=90" alt="">
                    </div>
                    <div class="pro-name">小米10</div>
                    <div class="pro-price">3799元起</div>
                  </a>
                </li>
                <li class="product">
                  <a href="" target="_blank">
                    <div class="pro-img">
                      <img src="//cdn.cnbj1.fds.api.mi-img.com/mi-mall/3bf20f1df3f2e22c5b29ff07634f3c59.png?thumb=1&w=200&h=138&f=webp&q=90" alt="">
                    </div>
                    <div class="pro-name">小米10 青春版 5G</div>
                    <div class="pro-price">1899元起</div>
                  </a>
                </li>
                <li class="product">
                  <a href="" target="_blank">
                    <div class="pro-img">
                      <img src="//cdn.cnbj1.fds.api.mi-img.com/mi-mall/5d19da60f9f62eb2aa5dcdbd7df19f0f.png?thumb=1&w=200&h=138&f=webp&q=90" alt="">
                    </div>
                    <div class="pro-name">小米MIX Alpha</div>
                    <div class="pro-price">19999元</div>
                  </a>
                </li> -->
              </ul>
            </div>
          </div>
          <div class="item-menu">
            <span>RedMi红米</span>
            <div class="children">
              <ul>
                <li class="product">
                  <a href="" target="_blank">
                    <div class="pro-img">
                      <img v-lazy="'//cdn.cnbj1.fds.api.mi-img.com/mi-mall/31d0dc82068abcaa46464b4baa9fbbdf.jpg?thumb=1&w=200&h=138&f=webp&q=90'" alt="">
                    </div>
                    <div class="pro-name">Redmi K30 至尊纪念版</div>
                    <div class="pro-price">1999元</div>
                  </a>
                </li>
                <li class="product">
                  <a href="" target="_blank">
                    <div class="pro-img">
                      <img v-lazy="'//cdn.cnbj1.fds.api.mi-img.com/mi-mall/0203f4e7dafcc0c9016a1b48556abf30.jpg?thumb=1&w=200&h=138&f=webp&q=90'" alt="">
                    </div>
                    <div class="pro-name">Redmi K30 Pro 系列</div>
                    <div class="pro-price">2999元起</div>
                  </a>
                </li>
                <li class="product">
                  <a href="" target="_blank">
                    <div class="pro-img">
                      <img v-lazy="'//cdn.cnbj1.fds.api.mi-img.com/mi-mall/cff2977b8aab1e43b94b2f00083f4ae1.jpg?thumb=1&w=200&h=138&f=webp&q=90'" alt="">
                    </div>
                    <div class="pro-name">Redmi K30 系列</div>
                    <div class="pro-price">1399元起</div>
                  </a>
                </li>
                <li class="product">
                  <a href="" target="_blank">
                    <div class="pro-img">
                      <img v-lazy="'//cdn.cnbj1.fds.api.mi-img.com/mi-mall/6a6548361871303764d6c66142074524.png?thumb=1&w=200&h=138&f=webp&q=90'" alt="">
                    </div>
                    <div class="pro-name">Redmi 10X</div>
                    <div class="pro-price">999元起</div>
                  </a>
                </li>
                <li class="product">
                  <a href="" target="_blank">
                    <div class="pro-img">
                      <img v-lazy="'//cdn.cnbj1.fds.api.mi-img.com/mi-mall/dacd6a3d8440b7a038e9778702bd6db6.png?thumb=1&w=200&h=138&f=webp&q=90'" alt="">
                    </div>
                    <div class="pro-name">Redmi Note 8</div>
                    <div class="pro-price">899元起</div>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div class="item-menu">
            <span>电视</span>
            <div class="children">
              <ul>
                <li class="product">
                  <a href="" target="_blank">
                    <div class="pro-img">
                      <img v-lazy="'/imgs/nav-img/nav-3-1.jpg'" alt="">
                    </div>
                    <div class="pro-name">小米壁画电视 65英寸</div>
                    <div class="pro-price">6999元</div>
                  </a>
                </li>
                <li class="product">
                  <a href="" target="_blank">
                    <div class="pro-img">
                      <img v-lazy="'/imgs/nav-img/nav-3-2.jpg'" alt="">
                    </div>
                    <div class="pro-name">小米全面屏电视ES5A</div>
                    <div class="pro-price">1999元</div>
                  </a>
                </li>
                <li class="product">
                  <a href="" target="_blank">
                    <div class="pro-img">
                      <img v-lazy="'/imgs/nav-img/nav-3-3.png'" alt="">
                    </div>
                    <div class="pro-name">小米电视4A 32英寸</div>
                    <div class="pro-price">699元</div>
                  </a>
                </li>
                <li class="product">
                  <a href="" target="_blank">
                    <div class="pro-img">
                      <img v-lazy="'/imgs/nav-img/nav-3-4.jpg'" alt="">
                    </div>
                    <div class="pro-name">小米电视4A 55英寸</div>
                    <div class="pro-price">1799元</div>
                  </a>
                </li>
                <li class="product">
                  <a href="" target="_blank">
                    <div class="pro-img">
                      <img v-lazy="'/imgs/nav-img/nav-3-5.jpg'" alt="">
                    </div>
                    <div class="pro-name">小米电视4A 65英寸</div>
                    <div class="pro-price">2699元</div>
                  </a>
                </li>
                <li class="product">
                  <a href="" target="_blank">
                    <div class="pro-img">
                      <img v-lazy="'/imgs/nav-img/nav-3-6.png'" alt="">
                    </div>
                    <div class="pro-name">查看全部</div>
                    <div class="pro-price">小米电视</div>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="header-search">
          <div class="wrapper">
            <!-- 定义warpper能辅助我们做一些样式,还有定位 -->
            <input type="text" name="keyword">
            <a href="javascript:;"></a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  export default {
    name: 'nav-header',
    data(){
      return {
        // username: this.$store.state.username,
        phoneList: []
      }
    },
    computed:{
      /*username(){
        // 当username这个变量发生变化的时候将会重新计算，重新调用
        return this.$store.state.username
      },
      cartCount(){
        return this.$store.state.cartCount
      },*/
      ...mapState(['username', 'cartCount'])
    },
    filters:{
      currency(val){
        if(!val)return '0.00';
        return '￥' + val.toFixed(2) + '元'; 
      }
    },
    // 初始化调用方法
    mounted(){
      this.getProductList();
      // 要判断是否从登录页面跳过来的
      // 这里的route指的是当前路由的实例 router指的是全局路由
      let params = this.$route.params;
      if(params && params.from == 'login'){
        this.getCartCount();
      } 
    },
    methods:{
      login(){
        this.$router.push('/login');
      },
      getProductList(){
        this.axios.get('/products',{
          params:{
            categoryId: '100012',
            pageSize: 6
          }
        }).then((res)=> {
          // Math.max(res.list, 6);
          // 判断手机是不是6行
          this.phoneList = res.list;
        });
      },
      // 这里这样添加一次是因为这个页面是单向的 重新登录后并不会同步购物车的数量
        getCartCount(){
        this.axios.get('/carts/products/sum').then((res=0)=>{
          // 获取购物车商品数量总和
          this.$store.dispatch('saveCartCount', res);
        });
      },
      logout(){
        this.axios.post('/user/logout').then(() =>{
          this.$message.success('退出成功');
          this.$cookie.set('userid','', {expires:'-1'});//这里作用是可以将数据过期
          //即刻清空
          this.$store.dispatch('saveUserName',''); //清空用户名
          this.$store.dispatch('saveCartCount','0'); //清空购物车的数量
        });
      },
      goToCart(){
        // 路由跳转
        this.$router.push('/cart');
      }
    }
  }
</script>

<style lang="scss">
  @import './../assets/scss/base.scss';
  @import './../assets/scss/mixin.scss';
  @import './../assets/scss/config.scss';
  .header{
    .nav-topbar{
      height: 39px;
      line-height: 39px;
      background-color: #333333;
      color: #b0b0b0;
      .container{
        // display: flex;
        // justify-content:space-between;
        // align-items: center;
        @include flex();
        a{
          // 样式进行填充
          display: inline-block;
          color: #B0B0B0;
          margin-right: 17px;
        }
        .my-cart{
          width: 110px;
          background-color: #ff6600;
          text-align: center;
          color: #ffffff;
          margin-right: 0;
          .icon-cart{
            @include bgImg(16px,12px,'/imgs/icon-cart-checked.png');
            margin-right: 4px;
            // display: inline-block; 
            // margin-right: 4px;  
            // width: 16px;
            // height: 12px;
            // background: url('/imgs/icon-cart-checked.png') no-repeat center;
            // background-size: contain; //填充填满
          }
        }
      }
    }
    .nav-header{
      .container{
        position: relative;
        height: 112px;
        @include flex();
        .header-menu{
            display: inline-block;
            width: 643px;
            padding-left: 209px;
            .item-menu{
            display: inline-block;
            color: #333333;
            font-weight: bold;
            font-size: 16px;
            line-height: 112px;
            margin-right: 20px;
            span{
              cursor: pointer;
            }
            // hover是控制item-menu里面的下拉菜单
            &:hover{
              color: $colorA;
              .children{
                height: 220px;
                opacity: 1;
              }
            }
            .children{
              position: absolute;
              top: 112px;
              left: 0;
              width: 1226px;
              height: 0;
              opacity: 0;
              overflow: hidden;
              border-top: 1px solid #e5e5e5;
              box-shadow: 0px 7px 6px 0px rgba(0, 0, 0, 0.11);
              z-index: 10;
              transition: all .5s;
              background-color: #ffffff;
              .product{
                position: relative;
                float: left;
                width: 16.6%;
                height: 220px;
                font-size: 12px;
                line-height: 12px;
                text-align: center;
                // 这里面的a是行内元素 要撑开
                a{
                  display: inline-block;
                }
                img{
                  width: auto;
                  height: 111px;
                  margin-top: 26px;
                }
                .pro-img{
                  height: 137px;
                } 
                .pro-name{
                  font-weight: bold;
                  margin-top: 19px;
                  margin-bottom: 8px;
                  color: $colorB;
                }
                .pro-price{
                  color: $colorA;
                }
              /* 
                每张图片旁边的线只是图片大小的一半，不能直接加border-right
                所以只能用伪类元素去做绝对定位
              */  
                &:before{
                  // 这个伪元素是空元素 必须要加content
                  content: ' ';
                  position: absolute;
                  top: 28px;
                  right: 0;
                  border-left: 1px solid $colorF;
                  height: 100px;
                  width: 1px;
                }
                // 最后旁边的线去除
                &:last-child::before{
                  display: none;
                }
              }
            }
          }
        }
        .header-search{
          width: 319px;
          .wrapper{
            height: 50px;
            border: 1px solid #e0e0e0;
            display: flex;
            align-items: center;
            input{
              border: none;
              box-sizing: border-box;
              border-right: 1px solid #e0e0e0;
              width: 264px;
              height: 50px;
              padding-left: 14px;
            }
            a{
              display: inline-block;
              width: 18px;
              height: 18px;
              background: url('/imgs/icon-search.png') no-repeat center;
              background-size: contain;
              margin-left: 17px;
            }
          }
        }
      }
    }
  }
</style>