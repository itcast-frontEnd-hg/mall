<template>
    <div class="product">
        <product-param v-bind:title="product.name">
            <template v-slot:buy>
                <button class="btn" @click="buy">立即购买</button>
            </template>
        </product-param>
        <div class="content">
          <div class="item-bg">
            <h2>{{product.name}}</h2>
            <h3>{{product.subtitle}}</h3>
            <p>
              <a href="" id="">全球首款双频 GP</a>
              <span>|</span>
              <a href="" id="">骁龙845</a>
              <span>|</span>
              <a href="" id="">AI 变焦双摄</a>
              <span>|</span>
              <a href="" id="">红外人脸识别</a>
            </p>
            <div class="price">
              <span>￥<em>{{product.price}}</em></span>
            </div>
          </div>
          <div class="item-bg-2"></div>
          <div class="item-bg-3"></div>
          <div class="item-swiper">
              <swiper :options="swiperOption">
                <swiper-slide><img src="/imgs/product/gallery-2.png" alt=""></swiper-slide>
                <swiper-slide><img src="/imgs/product/gallery-3.png" alt=""></swiper-slide>
                <swiper-slide><img src="/imgs/product/gallery-4.png" alt=""></swiper-slide>
                <swiper-slide><img src="/imgs/product/gallery-5.jpg" alt=""></swiper-slide>
                <swiper-slide><img src="/imgs/product/gallery-6.jpg" alt=""></swiper-slide>
                <!-- Optional controls -->
                <div class="swiper-pagination" slot="pagination"></div>
              </swiper>
            <p class="desc">小米8 AI变焦双摄拍摄</p>
          </div>
        <div class="item-video">
          <h2>60帧超慢动作摄影<br/>慢慢回味每一瞬间的精彩</h2>
          <p>后置960帧电影般超慢动作视频，将眨眼间的美妙展现得淋漓尽致！<br/>更能AI 精准分析视频内容，15个场景智能匹配背景音效。</p>
          <div class="video-bg" @click="showSlide='slideDown'"></div>
          <!-- 当点击的时候，让他下拉 -->
          <div class="video-box" v-show="showSlide">
            <!-- 这里的v-if判断是只有你等于slideDown的时候，才展示这个动画
            但是这样的话动画执行顺序就会混乱，所以要将slideDown去掉 -->
            <!-- 遮罩层 -->
            <div class="overlay"></div>
            <!-- 这里判断如何是slideDown就显示，反之就不显示 -->
            <!-- 通过v-bind动态绑定属性 从而实现视频动画效果 -->
              <div class="video" v-bind:class="showSlide"> 
                <!-- 本身showSlide就是等于slideDown，slideDown这两个class名称
                所以我们可以当字符串进行渲染，showSlide默认为空 -->
                <!-- 当你点击关闭的时候就点击up -->
                <!-- 这里不仅要把这个变改成up，同时要把这个变量改成空字符串 -->
                <span class="icon-close" @click="closeVideo"></span><!-- 关闭按钮 -->
                <!--muted:负责静音输出 autoplay:负责自动播放  -->
                <video src="/imgs/product/video.mp4" muted autoplay controls="controls"></video>
              </div>
            </div>  
        </div>
      </div>
    </div>
</template>
<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
import ProductParam from './../components/ProductParam'
export default {
    name:'product',
    components:{
      swiper,
      swiperSlide,
      ProductParam
    },
    data(){
      return {
        showSlide:'',//控制动画效果 这里默认不能给布尔值
        product:{},//商品信息
        swiperOption:{
          autoplay:true,
          slidesPerView:3,
          spaceBetween: 30,
          freeMode: true,
          pagination: {
            el: '.swiper-pagination',
            clickable :true,
          }
        }
      }
    },
    // mounted是函数 这里是要初始化数据 获取商品id
    mounted(){
      this.getProductInfo();
    },
    methods:{
      getProductInfo(){
        // 这里是要获取参数
        let id = this.$route.params.id;
        // 要调用商品的接口
        this.axios.get(`/products/${id}`).then((res)=>{
          // 只要对象发生变化 自动会触发setter
          this.product = res;
        });
      },
        buy(){
        let id = this.$route.params.id;
        this.$router.push(`/detail/${id}`);
      },
      closeVideo(){
        this.showSlide='slideUp';
        setTimeout(()=>{
          // 这里是要等他动画过渡完成之后，过渡完的这个变量置为空
          this.showSlide='';
        },600)
      }
    }
  }
</script>

<style lang="scss">
  @import './../assets/scss/mixin.scss';
  .product{
    .content{
      .item-bg{
        background:url('/imgs/product/product-bg-1.png') no-repeat center;
        height:718px;
        text-align:center;
        h2{
          font-size:80px;
          padding-top:55px;
        }
        h3{
          font-size:24px;
          letter-spacing: 10px;
        }
        p{
          margin-top:21px;
          margin-bottom:40px;
          a{
            font-size:16px;
            color:#333333;
          }
          span{
            margin:0 15px;
          }
        }
        .price{
          font-size:30px;
          color:#333333;
          em{
            font-style:normal;
            font-size:38px;
          }
        }
      }
      .item-bg-2{
        background:url(/imgs/product/product-bg-2.png) no-repeat center;
        height:480px;
        background-size:1226px 397px;
      }
      .item-bg-3{
        background:url(/imgs/product/product-bg-3.png) no-repeat center;
        height:638px;
        background-size:cover;
      }
      .item-swiper{
        margin:36px auto 52px;
        .desc{
          font-size:18px;
          color:#333333;
          text-align:center;
        }
        img{
          width:100%;
        }
      }
      .item-video{
        height:1044px;
        background-color:#070708;
        margin-bottom:76px;
        color:#FFFFFF;
        text-align:center;
        h2{
          font-size:60px;
          padding-top:82px;
          margin-bottom:47px;
        }
        p{
          font-size:24px;
          margin-bottom:58px;
        }
        .video-bg{
          background:url('/imgs/product/gallery-1.png') no-repeat center;
          background-size:cover;
          width:1226px;
          height:540px;
          margin:0 auto 120px;
          cursor:pointer;
        }
        // 弹框模态功能
        .video-box{
          .overlay{
            @include position(fixed);
            background-color: #333333;
            opacity:.4;
            z-index: 10;
          }
          // 这个相当于视频下拉上滑的动画效果
          @keyframes slideDown {
            from{
              top: -50%;
              opacity: 0;
            }
            to{
              top: 50%;
              opacity: 1;
            }
          }
          @keyframes slideUp {
            // 这个透明度动画从负到正，跑完一次之后就消失了，不会固定到50%这个比例里面
            from{
              top: 50%;
              opacity: 1;
            }
            to{
              top: -50%; 
              opacity: 0;
            }
          }
          .video{
            position: fixed;
            top: -50%;
            left: 50%;
            transform: translate(-50%,-50%);
            z-index: 10;
            width: 1000px;
            height: 536px;
            opacity: 1;
            transition: all .6x;
            &.slideDown{
              // 通过js点击动画 通过animation指定动画的点击效果
              animation: slideDown .6s linear;
              // 当透明度动画结束之后，就要将top50%固定到这来
              top: 50%;
            }
            &.slideUp{
              // 通过js点击动画 通过animation指定动画的点击效果
              animation: slideUp .6s linear;
            }
            .icon-close{
              position: absolute;
              top: 20px;
              right: 20px;
              @include bgImg(20px,20px,'/imgs/icon-close.png');
              cursor: pointer; //鼠标移动上去之后有小手
              z-index: 11;
            }
            video{
              width: 100%;
              height: 100%;
              object-fit: cover; //cover是将视频里面的内容覆盖整个窗口 contain是将视频或者图片覆盖整个窗口
              outline: none;
            }
          }
        }
      }
    }
    button{
      margin-left:10px;
    }
  }
</style>