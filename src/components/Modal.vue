<template>
    <transition name="slide">
        <!-- 父级容器 -->
        <div class="modal" v-show="showModal">
            <!-- 遮罩层 -->
            <div class="mask"></div>
            <!-- 弹框 -->
            <div class="modal-dialog">
                <div class="modal-header">
                    <span>{{title}}</span>
                    <a href="javascript:;" class="icon-close" v-on:click="$emit('cancel')"></a>
                </div>
                <div class="modal-body">
                    <slot name="body"></slot>
                </div> 
                <div class="modal-footer">
                    <!-- v-on:click="emit('submit')"这个子组件传到点击事件是父组件，是要通过emit进行传递 -->
                    <a href="javascript:;" class="btn" v-if="btnType==1" v-on:click="$emit('submit')">{{sureText}}</a>
                    <a href="javascript:;" class="btn" v-if="btnType==2" v-on:click="$emit('cancel')">{{cancelText}}</a>
                    <!--v-if="btnType==3"这里表示两个按钮都有包括  -->
                    <div class="btn-group" v-if="btnType==3">
                        <a href="javascript:;" class="btn" v-on:click="$emit('submit')">{{sureText}}</a>
                        <a href="javascript:;" class="btn" v-on:click="$emit('cancel')">{{cancelText}}</a>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>
 
<script>
export default {
    name: 'modal',
    props:{
        // 弹框类型：小small、中middle、大large、表单form
        modalType:{
            type: String,
            default: 'form'
        },
        // 弹框标题
        title: String,
        // 按钮类型: 1:确定按钮，2：取消按钮 3：确定取消
        btnType: String,
        // 动态设定按钮的文本 
        sureText:{
            type: String,
            default:'确定'
        },
        cancelText:{
            type: String,
            default: '取消'
        },
        showModal:Boolean
    }
}
</script>

<style lang="scss">
@import './../assets/scss/config.scss';
@import './../assets/scss/mixin.scss';
@import './../assets/scss/modal.scss';
</style>