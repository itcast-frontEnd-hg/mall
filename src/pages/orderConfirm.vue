<template>
  <div class="order-confirm">
    <order-header title="订单确认">
      <template v-slot:tip>
        <span>请认真填写收货地址</span>  
      </template>
    </order-header>
    <svg version="1.1"
         xmlns="http://www.w3.org/2000/svg"
         xmlns:xlink="http://www.w3.org/1999/xlink"
         style="position: absolute; width: 0px; height: 0px; overflow: hidden;">
      <defs>
        <symbol id="icon-add"
                viewBox="0 0 31 32">
          <title>add</title>
          <path d="M30.745 15.152h-14.382v-14.596c0-0.308-0.243-0.557-0.543-0.557s-0.543 0.249-0.543 0.557v14.596h-14.665c-0.3 0-0.543 0.249-0.543 0.557s0.243 0.557 0.543 0.557h14.665v15.177c0 0.307 0.243 0.557 0.543 0.557s0.543-0.249 0.543-0.557v-15.177h14.382c0.3 0 0.543-0.249 0.543-0.557s-0.243-0.557-0.543-0.557z"
                class="path1"></path>
        </symbol>
        <symbol id="icon-edit"
                viewBox="0 0 32 32">
          <title>edit</title>
          <path d="M28.287 8.51l-4.805-4.806 0.831-0.831c0.472-0.472 1.086-0.777 1.564-0.777 0.248 0 0.452 0.082 0.622 0.253l3.143 3.144c0.539 0.54 0.133 1.529-0.524 2.186l-0.831 0.831zM26.805 9.992l-1.138 1.138-4.805-4.806 1.138-1.138 4.805 4.806zM24.186 12.612l-14.758 14.762-4.805-4.806 14.758-14.762 4.805 4.806zM7.379 28.288l-4.892 1.224 1.223-4.894 3.669 3.67zM31.123 4.011l-3.143-3.144c-0.567-0.567-1.294-0.867-2.103-0.867-1.036 0-2.174 0.52-3.045 1.391l-20.429 20.436c-0.135 0.134-0.23 0.302-0.276 0.487l-2.095 8.385c-0.089 0.355 0.017 0.736 0.276 0.995 0.198 0.198 0.461 0.307 0.741 0.307 0.085 0 0.171-0.010 0.254-0.031l8.381-2.096c0.185-0.047 0.354-0.142 0.487-0.276l20.43-20.436c1.409-1.41 2.042-3.632 0.524-5.15v0z"
                class="path1"></path>
        </symbol>
        <symbol id="icon-del"
                viewBox="0 0 32 32">
          <title>delete</title>
          <path d="M11.355 4.129v-2.065h9.29v2.065h-9.29zM6.194 29.935v-23.742h19.613v23.742h-19.613zM30.968 4.129h-8.258v-3.097c0-0.569-0.463-1.032-1.032-1.032h-11.355c-0.569 0-1.032 0.463-1.032 1.032v3.097h-8.258c-0.569 0-1.032 0.463-1.032 1.032s0.463 1.032 1.032 1.032h3.097v24.774c0 0.569 0.463 1.032 1.032 1.032h21.677c0.569 0 1.032-0.463 1.032-1.032v-24.774h3.097c0.569 0 1.032-0.463 1.032-1.032s-0.463-1.032-1.032-1.032v0z"
                class="path1"></path>
          <path d="M10.323 9.806c-0.569 0-1.032 0.463-1.032 1.032v14.452c0 0.569 0.463 1.032 1.032 1.032s1.032-0.463 1.032-1.032v-14.452c0-0.569-0.463-1.032-1.032-1.032z"
                class="path2"></path>
          <path d="M16 9.806c-0.569 0-1.032 0.463-1.032 1.032v14.452c0 0.569 0.463 1.032 1.032 1.032s1.032-0.463 1.032-1.032v-14.452c0-0.569-0.463-1.032-1.032-1.032z"
                class="path3"></path>
          <path d="M21.677 9.806c-0.569 0-1.032 0.463-1.032 1.032v14.452c0 0.569 0.463 1.032 1.032 1.032s1.032-0.463 1.032-1.032v-14.452c0-0.569-0.463-1.032-1.032-1.032z"
                class="path4"></path>
        </symbol>
      </defs>
    </svg>
    <div class="wrapper">
      <div class="container">
        <div class="order-box">
          <div class="item-address">
            <h2 class="addr-title">收货地址</h2>
            <div class="addr-list clearfix">
              <!-- 这里的list是指商城的列表 -->
                <!-- 
                  这里的checked功能实现的前提：
                  是要选中的这个索引和本身的这个索引是一样的时候就能点亮 
                -->
              <div class="addr-info"
                  :class="{'checked':index == checkIndex}"
                  @click="checkIndex=index"
                  v-for="(item,index) in list"
                  :key="index">
                <h2>{{item.receiverName}}</h2>
                <div class="phone">{{item.receiverMobile}}</div>
                <!-- 地区 -->
                <div class="street">{{item.receiverProvince + ' ' + item.receiverCity + ' ' + item.receiverDistrict + ' ' + item.receiverAddress}}</div>
                <div class="action">
                  <!-- 这里绑定的是删除地址 -->
                  <a href="javascript:;"
                     class="fl"
                     @click="delAddress(item)">
                    <!-- 删除图标 svg用法，icon-del上面定义，xlink链入方法 -->
                    <svg class="icon icon-del">
                      <use xlink:href="#icon-del"></use>
                    </svg>
                  </a>
                  <!-- 修改地址 -->
                  <a href="javascript:;"
                     class="fr"
                     @click="editAddressModal(item)">
                    <svg class="icon icon-edit">
                      <use xlink:href="#icon-edit"></use>
                    </svg>
                  </a>
                </div>
              </div>
              <div class="addr-add"
                  @click="openAddressModal">
                <div class="icon-add"></div>
                <div>添加新地址</div>
              </div>
            </div>
          </div>
          <div class="item-good">
            <h2>商品</h2>
            <ul>
              <!-- 这里循环的是购物车的商品数据 -->
              <li v-for="(item,index) in cartList"
                  :key="index">
                <div class="good-name">
                  <img v-lazy="item.productMainImage" alt="">
                  <!-- 手机名+小标题 -->
                  <span>{{item.productName + ' ' + item.productSubtitle}}</span>
                </div>
                <div class="good-price">{{item.productPrice}}元x{{item.quantity}}</div>
                <div class="good-total">{{item.productTotalPrice}}元</div>
              </li>
            </ul>
          </div>
          <div class="item-shipping">
            <h2>配送方式</h2>
            <span>包邮</span>
          </div>
          <div class="item-invoice">
            <h2>发票</h2>
            <a href="javascript:;">电子发票</a>
            <a href="javascript:;">个人</a>
          </div>
          <div class="detail">
            <div class="item">
              <span class="item-name">商品件数：</span>
              <span class="item-val">{{count}}件</span>
            </div>
            <div class="item">
              <span class="item-name">商品总价：</span>
              <span class="item-val">{{cartTotalPrice}}元</span>
            </div>
            <div class="item">
              <span class="item-name">优惠活动：</span>
              <span class="item-val">0元</span>
            </div>
            <div class="item">
              <span class="item-name">运费：</span>
              <span class="item-val">0元</span>
            </div>
            <div class="item-total">
              <span class="item-name">应付总额：</span>
              <span class="item-val">{{cartTotalPrice}}元</span>
            </div>
          </div>
          <div class="btn-group">
            <a href="/#/cart"
               class="btn btn-default btn-large">返回购物车</a>
            <a href="javascript:;"
               class="btn btn-large"
               @click="orderSubmit">去结算</a>
          </div>
        </div>
      </div>
    </div>
    <!-- 定义增加地址填写弹框 -->
    <modal title="新增确认"
          btnType="1"
          :showModal="showEditModal"
          @cancel="showEditModal=false"
          @submit="submitAddress"
    >
    <!-- 最后是要点击提交事件 -->
    <!-- 这里点击取消后，会触发父组件的方法 -->
      <template v-slot:body>
        <div class="edit-wrap">
          <div class="item">
            <input type="text"
                class="input"
                placeholder="姓名"
                v-model="checkedItem.receiverName">
            <input type="text"
                class="input"
                placeholder="手机号"
                v-model="checkedItem.receiverMobile">
          </div>
          <div class="item">
            <!-- 省 -->
            <select name="province"
              v-model="checkedItem.receiverProvince">
              <option value="北京">北京</option>
              <option value="天津">天津</option>
              <option value="河北">河北</option>
            </select>
            <!-- 市 -->
            <select name="city"
              v-model="checkedItem.receiverCity">
              <option value="北京">北京</option>
              <option value="天津">天津</option>
              <option value="河北">石家庄</option>
            </select>
            <!-- 区县 -->
            <select name="district"
              v-model="checkedItem.receiverDistrict">
              <option value="北京">昌平区</option>
              <option value="天津">海淀区</option>
              <option value="河北">东城区</option>
              <option value="天津">西城区</option>
              <option value="河北">顺义区</option>
              <option value="天津">房山区</option>
            </select>
          </div>
          <!-- 这里是放详细地址 -->
          <div class="item">
            <textarea name="street"
              v-model="checkedItem.receiverAddress"></textarea>
          </div>
          <div class="item">
            <input type="text"
              class="input"
              placeholder="邮编"
              v-model="checkedItem.receiverZip">
          </div>
        </div>
      </template>
    </modal>
    <!-- 定义删除地址弹框 -->
    <modal title="删除确认"
        btnType="1"
        :showModal="showDelModal"
        @cancel="showDelModal=false"
        @submit="submitAddress">
      <template v-slot:body>
        <p>您确认要删除此地址吗？</p>
      </template>
    </modal>
  </div>
</template>
<script>
import OrderHeader from './../components/OrderHeader'
import Modal from './../components/Modal'
export default {
  name: 'OrderConfirm',
  data () {
    return {
      list: [], // 收货地址列表
      cartList: [], // 购物车中需要结算的商品列表
      cartTotalPrice: 0, // 商品总金额
      count: 0, // 商品结算数量
      checkedItem: {}, //选中的商品对象 这里还要实现删除 还有增添的功能
      userAction: '', //用户行为 判断点的是哪个 0表示新增 1表示编辑  2表示删除
      showDelModal: false, // 是否显示删除弹框
      showEditModal: false, //是否显示新增或者编辑弹框(或者关闭弹框)
      checkIndex: 0// 当前收货地址选中索引
    }
  },
  components: {
    OrderHeader,
    Modal
  },
  mounted () {
    this.getAddressList();
    this.getCartList();
  },
  methods: {
    getAddressList () {
      //获取收货地址
      this.axios.get('/shippings').then((res) => {
        this.list = res.list;
      })
    },
    // 打开新增地址弹框
    openAddressModal () {
      // 用户行为：新增
      this.userAction = 0;
      this.checkedItem = {};
      this.showEditModal = true;
    },
    // 打开修改地址弹框
    editAddressModal (item) {
      // 用户行为 0：新增 1：编辑 2：删除
      this.userAction = 1
      // 赋值为新增的信息列表
      this.checkedItem = item;
      this.showEditModal = true;
    },
    // 删除地址
    delAddress (item) {
      // 选中的信息列表
      this.checkedItem = item;
      // 删除功能   用户行为 0：新增 1：编辑 2：删除
      this.userAction = 2;
      this.showDelModal = true;
    },
    // 地址删除、编辑、新增功能
     // 0表示新增 1表示编辑  2表示删除
    submitAddress () {
      const { checkedItem, userAction } = this
      // 定义调用接口办法,get/post/delete  和地址 还有参数(下面定义)
      let method; let url; let params = {}
      // 这里编辑，更新，删除要使用不用方法，所以要将他们抽取出来
      if (userAction === 0) {
        // eslint-disable-next-line no-unused-expressions
        method = 'post'
        url = '/shippings'
      } else if (userAction === 1) {
        // eslint-disable-next-line no-unused-expressions
        method = 'put'
        url = `/shippings/${checkedItem.id}`
      } else {
        // eslint-disable-next-line no-unused-expressions
        method = 'delete'
        url = `/shippings/${checkedItem.id}`
      }
      // 这里加判断条件主要是不管是0还是1都要进行编辑的
      if (userAction === 0 || userAction === 1) {
        // 相当于 let receiverName=checkedItem.receiverName
        const { receiverName, receiverMobile, receiverProvince, receiverCity, receiverDistrict, receiverAddress, receiverZip } = checkedItem
        // 这里还要再进行判断，来校验信息，查看信息有没有报错
        // 首先判断名字有没有填，没填就要提示
        // 这里也可以定义一个错误的error信息，统一去弹框 这样不会出现代码冗余
        // 定义弹框提示的内容
        let errMsg = ''
        if (!receiverName) {
          errMsg = '请输入收货人名称'
        } else if (!receiverMobile || !/\d{11}/.test(receiverMobile)) {
          errMsg = '请输入正确格式的手机号'
        } else if (!receiverProvince) {
          errMsg = '请选择省份'
        } else if (!receiverCity) {
          errMsg = '请选择对应的城市'
        } else if (!receiverAddress || !receiverDistrict) {
          errMsg = '请输入收货地址'
        } else if (!/\d{6}/.test(receiverZip)) {
          errMsg = '请输入六位邮编'
        }
        if (errMsg) {
          // 弹框
          this.$message.error(errMsg);
          return;
        }
        params = {
          receiverName,
          receiverMobile,
          receiverProvince,
          receiverCity,
          receiverDistrict,
          receiverAddress,
          receiverZip
        }
      }
      // this.axios.get()
      this.axios[method](url, params).then(() => {
        this.closeModal();
        // 重新拉取一次，怕别的地方删除地址了，这里还在
        this.getAddressList();
        this.$message.success('操作成功');
      })
    },
    // 提交完数据清空
    // 这里弹框功能实现后将要关闭，因为这三个功能都要实现，所以就要用closeModal
    closeModal () {
      this.checkedItem = {};
      // 用户行为清空
      this.userAction = '';
      // 关闭删除地址提示
      this.showDelModal = false;
      // 关闭新增地址弹窗
      this.showEditModal = false;
    },
    getCartList () {
      this.axios.get('/carts').then((res) => {
        // 获取购物车中所有商品数据
        const list = res.cartProductVoList;
        //商品总金额 ：这里是指当前购物车选中的总金额
        this.cartTotalPrice = res.cartTotalPrice;
        //要获取购物车商品的数量（这里可能包括商品选中的和非选中的）
        this.cartList = list.filter(item => item.productSelected);
        // 如果这里的item过滤出来是true的话 就证明当前是选中的状态
        // map会改变数组，foreach不会
        this.cartList.map((item) => { //cartList是表示要结算的商品
          // 循环出件数
          this.count += item.quantity; //这里是要累加的商品 
        })
      })
    },
    // 订单提交
    orderSubmit () {
      //这是我们当前选中的索引,通过列表去找这个索引 
      const item = this.list[this.checkIndex];
      //判断item是否为空 为空就不存在
      if (!item) {
        this.$message.error('请选择一个收货地址');
        return;
      }
      // 这里是要根据收货地址来创建订单号
      this.axios.post('/orders', {
        // 购物地址模块id
        shippingId: item.id
      }).then((res) => {
        // res就会返回我们订单的订单号
        this.$router.push({
          // 获取到订单
          path: '/order/pay',
          query: {
            // 这个最后会传到订单结算页面中去
            // 获取订单号
            orderNo: res.orderNo
          }
        })
      })
    }
  }
}
</script>
<style lang="scss">
.order-confirm {
  .wrapper {
    background-color: #f5f5f5;
    padding-top: 30px;
    padding-bottom: 84px;
    .order-box {
      background-color: #ffffff;
      padding-left: 40px;
      padding-bottom: 40px;
      .addr-title {
        font-size: 20px;
        color: #333333;
        font-weight: 200;
        margin-bottom: 21px;
      }
      .item-address {
        padding-top: 38px;
        .addr-list {
          .addr-info,
          .addr-add {
            box-sizing: border-box;
            float: left;
            width: 271px;
            height: 180px;
            border: 1px solid #e5e5e5;
            margin-right: 15px;
            padding: 15px 24px;
            font-size: 14px;
            color: #757575;
          }
          .addr-info {
            cursor: pointer;
            h2 {
              height: 27px;
              font-size: 18px;
              font-weight: 300;
              color: #333;
              margin-bottom: 10px;
            }
            .street {
              height: 50px;
            }
            .action {
              height: 50px;
              line-height: 50px;
              .icon {
                width: 20px;
                height: 20px;
                fill: #666666;
                vertical-align: middle;
                &:hover {
                  fill: #ff6700;
                }
              }
            }
            &.checked {
              border: 1px solid #ff6700;
            }
          }
          .addr-add {
            text-align: center;
            color: #999999;
            cursor: pointer;
            .icon-add {
              width: 30px;
              height: 30px;
              border-radius: 50%;
              background: url("/imgs/icon-add.png") #e0e0e0 no-repeat center;
              background-size: 14px;
              margin: 0 auto;
              margin-top: 45px;
              margin-bottom: 10px;
            }
          }
        }
      }
      .item-good {
        margin-top: 34px;
        border-bottom: 1px solid #e5e5e5;
        padding-bottom: 12px;
        h2 {
          border-bottom: 1px solid #e5e5e5;
          padding-bottom: 5px;
        }
        li {
          display: flex;
          align-items: center;
          height: 40px;
          line-height: 40px;
          margin-top: 10px;
          font-size: 16px;
          color: #333333;
          .good-name {
            flex: 5;
            img {
              width: 30px;
              height: 30px;
              vertical-align: middle;
            }
          }
          .good-price {
            flex: 2;
          }
          .good-total {
            padding-right: 44px;
            color: #ff6600;
          }
        }
      }
      .item-shipping,
      .item-invoice {
        margin-top: 31px;
        line-height: 20px;
        h2 {
          display: inline-block;
          margin-right: 71px;
          font-size: 20px;
          width: 80px;
        }
        span,
        a {
          font-size: 16px;
          color: #ff6700;
          margin-right: 23px;
        }
      }
      .detail {
        padding: 50px 44px 33px 0;
        border-bottom: 1px solid #f5f5f5;
        text-align: right;
        font-size: 16px;
        color: #666666;
        .item-val {
          color: #ff6700;
        }
        .item {
          line-height: 15px;
          margin-bottom: 12px;
        }
        .item-val {
          display: inline-block;
          width: 100px;
        }
        .item-total {
          .item-val {
            font-size: 28px;
          }
        }
      }
      .btn-group {
        margin-top: 37px;
        text-align: right;
      }
    }
  }
  .edit-wrap {
    font-size: 14px;
    .item {
      margin-bottom: 15px;
      .input {
        display: inline-block;
        width: 283px;
        height: 40px;
        line-height: 40px;
        padding-left: 15px;
        border: 1px solid #e5e5e5;
        & + .input {
          margin-left: 14px;
        }
      }
      select {
        height: 40px;
        line-height: 40px;
        border: 1px solid #e5e5e5;
        margin-right: 15px;
      }
      textarea {
        height: 62px;
        width: 100%;
        padding: 13px 15px;
        box-sizing: border-box;
        border: 1px solid #e5e5e5;
      }
    }
  }
}
</style>