import Vue from 'vue'
import VueRouter  from 'vue-router'
import Home from './pages/home'
import Index from './pages/index'
// import Login from './pages/login'
// import Product from './pages/product'
// import Detail from './pages/detail'
// import Cart from './pages/cart'
// import Order from './pages/order'
// import OrderConfirm from './pages/orderConfirm' //订单确认
// import OrderList from './pages/orderList' //订单列表
// import OrderPay from './pages/orderPay'//订单支付
// import AliPay from './pages/alipay'
Vue.use(VueRouter);

const routes = [
    {
        path:'/',
        name: 'home',
        component: Home,
        redirect: '/index',
        children:[
            {
                path:'/index',
                name: 'index',
                component: Index,
            },{
                path:'/product/:id',
                name: 'product',
                // 路由按需加载 防止刚进网页需要加载全部页面而导致页面空白
                // component: resolve => require(['../pages/index.vue'], resolve)
                // component: Product
                // 这里的resolve是要访问路由的时候才能运行
                component: () => import('./pages/product.vue')
            },{
                path:'/detail/:id',
                name: 'detail',
                component: () => import('./pages/detail.vue')
            }
        ]
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('./pages/login.vue')
    },
    {
        path: '/cart',
        name: 'cart',
        component: () => import('./pages/cart.vue')
    },
    {
        path: '/order',
        name: 'order',
        component: () => import('./pages/order.vue'),
        children:[
            {
                path: 'list', 
                name: 'order-List',//订单列表
                component: () => import('./pages/orderList.vue')
            },
            {
                path: 'confirm',
                name: 'order-confirm', //订单确认
                component: () => import('./pages/orderConfirm.vue')
            },
            {
                path: 'pay',
                name: 'order-pay',
                component: () => import('./pages/orderPay.vue')
            },
            {
                path: 'alipay',
                name: 'alipay',
                component: () => import('./pages/alipay.vue')
            }
        ]
    }
]
const router = new VueRouter({
    routes
})

export default router