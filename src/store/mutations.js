// 商城Vuex-mutations 读取数据
export default {
    saveUserName(state,username){
        state.username = username;
    },
    savecartCount(state, count){
        state.cartCount = count;
    }
}