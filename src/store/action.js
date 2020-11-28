// 商城Vuex-actions 保存用户信息（传输）
export default {
    saveUserName(context, username){
        context.commit('saveUserName', username);
    },
    savecartCount(context, count){
        context.commit('savecartCount', count);
    }
}