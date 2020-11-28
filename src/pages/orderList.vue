<template>
  <div class="order-list">
    <order-header title="订单列表">
      <template v-slot:tip>
        <span>请谨防钓鱼链接或诈骗电话，了解更多></span>
      </template>
    </order-header>
    <div class="wrapper">
      <div class="container">
        <div class="order-box">
          <loading v-if="loading"></loading>
          <div class="order" v-for="(order,index) in list" :key="index">
            <div class="order-title">
              <div class="item-info fl">
                {{order.createTime}}
                <span>|</span>
                {{order.receiverName}}
                <span>|</span>
                订单号：{{order.orderNo}}
                <span>|</span>
                {{order.paymentTypeDesc}}
              </div>
              <div class="item-money fr">
                <span>应付金额：</span>
                <span class="money">{{order.payment}}</span>
                <span>元</span>
              </div>
            </div>
            <div class="order-content clearfix">
              <div class="good-box fl">
                <div class="good-list"
                     v-for="(item,i) in order.orderItemVoList"
                     :key="i">
                  <div class="good-img">
                    <img v-lazy="item.productImage"
                         alt="">
                  </div>
                  <div class="good-name">
                    <div class="p-name">{{item.productName}}</div>
                    <div class="p-money">{{item.totalPrice + 'X' + item.quantity}}元</div>
                  </div>
                </div>
              </div>
              <!-- 订单状态:0-已取消 -10-未付款，20-已付款，40-已发货，50-交易成功，60-交易 -->
              <div class="good-state fr"
                   v-if="order.status == 20">
                   <!-- 这里判断order.statu是否等于20 ，等于20就代表已付款 -->
                <a href="javascript:;">{{order.statusDesc}}</a>
              </div>
              <div class="good-state fr"
                   v-else>
                <a href="javascript:;"
                   @click="goPay(order.orderNo)">{{order.statusDesc}}</a>
              </div>
            </div>
          </div>
          <el-pagination
          v-if="true"
          class="pagination"
          background
          layout="prev, pager, next"
          :pageSize="pageSize"
          :total="total"
          @current-change="handleChange">
          </el-pagination>
          <div class="load-more" v-if="false">
            <el-button type="primary" :loading="loading" @click="loadMore">加载更多</el-button>
          </div>
          <div class="scroll-more"
            v-infinite-scroll="scrollMore"
            infinite-scroll-disabled="true"
            infinite-scroll-distance="410"
            v-if="false"
          >
          <img src="/imgs/loading-svg/loading-spinning-bubbles.svg" alt="" v-show="loading">
          </div>
          <no-data v-if="!loading && list.length == 0"></no-data>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import OrderHeader from './../components/OrderHeader'
import Loading from './../components/Loading'
import NoData from './../components/NoData'
import { Pagination, Button } from 'element-ui'
import infiniteScroll from 'vue-infinite-scroll'
export default {
  name: 'order-list',
  components: {
    OrderHeader,
    Loading,
    NoData,
    [Pagination.name]: Pagination,
    [Button.name]:Button
  },
  directives:{
    infiniteScroll
  },
  data(){
    return{
      loading:false,
      list:[],
      pageSize:10,
      pageNum:1, //当前是第一页
      total:0,
      showNextpage:true,//加载更多，是否显示按钮
      busy:false,//滚动加载是否触发
    }
  },
  mounted(){
    this.getOrderList();
  },
  methods:{
    getOrderList(){
      this.loading = true;
      this.busy = true;
      // 这里有get请求就要加params
      this.axios.get('/orders',{
        params:{
          pageSize:10,
          pageNum:this.pageNum
        }
      }).then((res)=>{
        this.loading = false;
        this.list = res.list.concat(res.list);
        this.total = res.total;
        this.showNextpage = res.hasNextPage;
        this.busy = false;
      }).catch(()=>{
        this.loading = false;
      });
    },
    goPay(orderNo){
      // 三种路由跳转方式
      // this.$router.push('/order/pay');
      // this.$router.push({
      //   name: 'order-pay',
      //   query:{
      //     orderNo
      //   }
      // });
      this.$router.push({
        path:'/order/pay',
        query:{
          orderNo
        }
      });
    },
    // 接收pageNum就能知道当前是第几页了
    // 第一种方法：分页器
    handleChange(pageNum){
      /*
        先获取当前是第几页 然后获取订单列表的接口，
        重新查询下一个数据
        这里初始化pageNum是等于1，当分页器发生变化的时候，
        这里会把当前页码的数量重新保存给pageNum
      */
      this.pageNum = pageNum;
      this.getOrderList();
    },
    // 第一种方法：加载更多按钮
    loadMore(){
      /*
      pagenum
      第一步是要先给页码进行累加
      刚开始这里不知道是第几页，所以这里每点击一次数了之后才知道是第几页
      */
      this.pageNum++;
      this.getOrderList();
    },
    // 第三种方法：滚动加载，通过npm插件实现
    scrollMore(){ 
      this.busy = true;
      setTimeout(() =>{
        this.pageNum++;
        this.getList();
      },500);
    },
    // 专门给scrollMore使用
    getList(){
      // 当这里请求完成后要把loading关掉
      this.loading = true;
      // 这里有get请求就要加params
      this.axios.get('/orders',{
        params:{
          pageSize:10,
          pageNum:this.pageNum
        }
      }).then((res)=>{
        this.list = res.list.concat(res.list);
        this.loading = false;
        // 判断有没有下一页
        if(res.hasNextPage){
          this.busy = false;
        }else{
          this.busy = true;
        }
      });
    },
  }
}
</script>
<style lang="scss">
@import "./../assets/scss/config.scss";
@import "./../assets/scss/mixin.scss";
.order-list {
  .wrapper {
    background-color: $colorJ;
    padding-top: 33px;
    padding-bottom: 110px;
    .order-box {
      .order {
        background-color: $colorG;
        margin-bottom: 31px;
        &:last-child {
          margin-bottom: 0;
        }
        .order-title {
          background-color: $colorK;
          padding: 0 43px;
          font-size: 16px;
          color: $colorC;
          .item-info {
            span {
              margin: 0 9px;
            }
          }
          .money {
            font-size: 26px;
            color: $colorB;
          }
        }
        .order-content {
          padding: 0 43px;
          .good-box {
            width: 88%;
            .good-list {
              display: flex;
              align-items: center;
              height: 145px;
              .good-img {
                width: 112px;
                img {
                  width: 100%;
                }
              }
              .good-name {
                font-size: 20px;
                color: $colorB;
              }
            }
          }
          .good-state {
            font-size: 20px;
            color: $colorA;
            a {
              color: $colorA;
            }
          }
        }
      }
      // 分页器往右边
      .pagination {
        text-align: right;
      }
      // 分页器颜色覆盖
      .el-pagination.is-background .el-pager li:not(.disabled).active {
        background-color: #ff6600;
      }
      .el-button--primary{
        background-color: #ff6600;
        border-color: #ff6600;
      }
      // 按钮居中
      .load-more,
      .scroll-more {
        text-align: center;
      }
    }
  }
}
</style>