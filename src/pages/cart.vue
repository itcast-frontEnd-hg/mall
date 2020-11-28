<template>
  <div class="cart">
      <order-header title="我的购物车">
        <template v-slot:tip>
            <span>温馨提示：产品是否购买成功，以最终下单为准哦，请尽快结算</span>
        </template>
      </order-header>
      <div class="wrapper">
          <div class="container">
              <div class="cart-box">
                <ul class="cart-item-head">
                    <li class="col-1"><span class="checkbox" v-bind:class="{'checked':allChecked}" @click="toggleAll"></span>全选</li>
                    <li class="col-3">商品名称</li>
                    <li class="col-1">单价</li>
                    <li class="col-2">数量</li>
                    <li class="col-1">小计</li>
                    <li class="col-1">操作</li>
                </ul>
                <ul class="cart-item-list">
                  <!-- v-for进行列表循环 -->
                  <li class="cart-item" v-for="(item,index) in list" v-bind:key="index">
                    <div class="item-check">
                      <!-- v-bind判断什么时候返回checked，如果checked为true的话，就添加checked -->
                        <span class="checkbox" v-bind:class="{'checked':item.productSelected}" @click="updateCart(item)"></span>
                    </div>
                    <div class="item-name">
                      <img v-lazy="item.productMainImage" alt="">
                      <span>{{item.productName + ' , ' + item.productSubtitle}}</span>
                    </div>
                    <div class="item-price">{{item.productPrice}}</div>
                    <div class="item-num">
                      <div class="num-box">
                          <a href="javascript:;" @click="updateCart(item, '-')">-</a>
                          <span>{{item.quantity}}</span>
                          <a href="javascript:;" @click="updateCart(item, '+')">+</a>
                      </div>
                    </div>
                    <!-- 这里是显示商品的总价格 -->
                    <div class="item-total">{{item.productTotalPrice}}</div>
                    <!-- 显示删除购物车商品 -->
                    <div class="item-del" @click="delProduct(item)"></div>
                  </li>
                </ul>
              </div>
              <div class="order-wrap clearfix">
                  <div class="cart-tip fl">
                      <a href="/#/index">继续购物</a>
                      共<span>{{list.length}}</span>件商品，已选择<span>{{checkedNum}}</span>件
                  </div>
                  <div class="total fr">
                      合计：<span>{{cartTotalPrice}}</span>元  
                      <a href="javascript:;" class="btn" @click="order">去结算</a>
                  </div>
              </div>
          </div>
      </div>
      <service-bar></service-bar>
      <nav-footer></nav-footer>
  </div>
</template>
<script>
import OrderHeader from './../components/OrderHeader'
import ServiceBar from './../components/ServiceBar'
import NavFooter from './../components/NavFooter'
import { Message } from 'element-ui'
export default {
  name: 'Cart',
  components: {
    OrderHeader,
    ServiceBar,
    NavFooter
  },
  data () {
    return {
      list: [], // 商品列表
      allChecked: false, // 是否全选
      cartTotalPrice: 0, // 商品总金额
      checkedNum: 0// 选中商品数量
    }
  },
  mounted () {
    this.getCartList();
    // console.log(this);
  },
  methods:{
    // 获取购物车列表
    getCartList () {
      this.axios.get('/carts').then((res) => {
        this.renderData(res)// 公共部分
      })
    },
    // 更新购物车数量和购物车单选状态
    // 这里的item是指当前点击这个商品的信息
    updateCart (item, type) {
      // 先获取商品的数量
      let quantity = item.quantity;
      // 控制你商品是否选中
      let selected = item.productSelected;
      if (type === '-') {
         // 这里需要数量来控制数量的加减，所以要提前把这个数量获取到
        if (quantity === 1) {
          // Message.warning('保留')
          // this.$message.warning('商品至少保留一件')
          this.$message.warning('商品至少保留一件');
          return;
        }
        --quantity;
      } else if (type === '+') {
        // 这里也要进行判断，防止超过库存
        // productStock是库存
        if (quantity > item.productStock) {
          // Message.warning('购买数量不能超过库存数量')
          // this.$message.warning('购买数量不能超过库存数量')
          this.$message.warning('购买数量不能超过库存数量');
          return;
        }
        ++quantity;
      } else {
        // 单选
        selected = !item.productSelected;
      }
      // 这里是要调用接口，更新购物车某个产品数量
      this.axios.put(`/carts/${item.productId}`, {
        quantity,
        selected
      }).then((res) => {
        // 这里返回的还是商品的购物车列表
        this.renderData(res);// 公共部分
      });
    },
    // 删除购物车商品
    delProduct(item) {
      this.axios.delete(`/carts/${item.productId}`).then((res) => {
        // Message.success('删除成功');
        this.$message.success('删除成功');
        this.renderData(res);// 公共部分
      })
    },
    // 控制全选功能
    toggleAll () {
      // 首先要判断当前是选中还是非选中
      // 用接口更新全选和非全选
      const url = this.allChecked ? '/carts/unSelectAll' : '/carts/selectAll'
      this.axios.put(url).then((res) => {
        this.renderData(res); // 公共部分
      })
    },
    // 在这里可以定义公共方法，这样就不用重复写，可以直接调用
    // 公共赋值
    renderData (res) {
      this.list = res.cartProductVoList || [];
      this.allChecked = res.selectedAll;
      this.cartTotalPrice = res.cartTotalPrice;
      // 筛选选中的商品已选中checkedNum件
      this.checkedNum = this.list.filter(item => item.productSelected).length
    },
    // 购物车下单
    order() {
      // 首要判断购物车有没有商品
      // 只要里面有一件商品选中的话，都可以提交
      // 这里返回的是布尔值
      const isCheck = this.list.every(item => !item.productSelected);
      // 这里要判断商品是否被选中 如若没选的话，将会提示你必须选一件商品
      if (isCheck) {
        Message.warning('请选择一件商品');
      } else {
        this.$router.push('/order/confirm');
      }
    }
  }
}
</script>
<style lang="scss">
.cart {
  .wrapper {
    background-color: #f5f5f5;
    padding-top: 30px;
    padding-bottom: 114px;
    .cart-box {
      background-color: #fff;
      font-size: 14px;
      color: #999999;
      text-align: center;
      .checkbox {
        display: inline-block;
        width: 22px;
        height: 22px;
        border: 1px solid #e5e5e5;
        vertical-align: middle;
        margin-right: 17px;
        cursor: pointer;
        &.checked {
          background: url("/imgs/icon-gou.png") #ff6600 no-repeat center;
          background-size: 16px 12px;
          border: none;
        }
      }
      .cart-item-head {
        display: flex;
        height: 79px;
        line-height: 79px;
        .col-1 {
          flex: 1;
        }
        .col-2 {
          flex: 2;
        }
        .col-3 {
          flex: 3;
        }
      }
      .cart-item-list {
        .cart-item {
          display: flex;
          align-items: center;
          height: 125px;
          border-top: 1px solid #e5e5e5;
          font-size: 16px;
          .item-check {
            flex: 1;
          }
          .item-name {
            flex: 3;
            font-size: 18px;
            color: #333333;
            display: flex;
            align-items: center;
            img {
              width: 80px;
              height: 80px;
              vertical-align: middle;
            }
            span {
              margin-left: 30px;
            }
          }
          .item-price {
            flex: 1;
            color: #333333;
          }
          .item-num {
            flex: 2;
            .num-box {
              display: inline-block;
              width: 150px;
              height: 40px;
              line-height: 40px;
              border: 1px solid #e5e5e5;
              font-size: 14px;
              a {
                display: inline-block;
                width: 50px;
                color: #333333;
              }
              span {
                display: inline-block;
                width: 50px;
                color: #333333;
              }
            }
          }
          .item-total {
            flex: 1;
            color: #ff6600;
          }
          .item-del {
            flex: 1;
            width: 14px;
            height: 12px;
            background: url("/imgs/icon-close.png") no-repeat center;
            background-size: contain;
            cursor: pointer;
          }
        }
      }
    }
    .order-wrap {
      font-size: 14px;
      color: #666666;
      margin-top: 20px;
      height: 50px;
      line-height: 50px;
      .cart-tip {
        margin-left: 29px;
        a {
          color: #666666;
          margin-right: 37px;
        }
        span {
          color: #ff6600;
          margin: 0 5px;
        }
      }
      .total {
        font-size: 14px;
        color: #ff6600;
        span {
          font-size: 24px;
        }
        a { 
          width: 202px;
          height: 50px;
          line-height: 50px;
          font-size: 18px;
          margin-left: 37px;
        }
      }
    }
  }
}
</style>
