<template>
    <view>
        <view class="main">
            <view class="main_content">
                <image class="icon" src="../../static/images/payment_successful.png" alt="" srcset="">
                <view class="title">确认完成</view>
                <view class="main_text">等待用户确认完成，用户确认后金额到账</view>
                <view class="order_box">
                    <view class="order_btn" @tap="goback">
                        <text>返回</text>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
    import Vue from 'vue';
	export default Vue.extend({
		data() {
			return {
                title: 'Hello',
			}
        },
		methods: {
            goback(){
                uni.navigateBack();
            }
		}
	});
</script>

<style scoped>
    .main{
        width: 100%;
        position: fixed;
        top: 30%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .main_content{
        text-align: center;
    }
    .title{
        font-size: 36upx;
        color: #333333;
        margin: 40upx 0 24upx;
    }
    .main_text{
        font-size: 30upx;
        color: #999999
    }
    .icon{
        width: 156upx;
        height: 156upx;
        border-right: 50%;
    }
    .order_box{
        width: 100%;
        /* padding: 0 30upx 20upx; */
        box-sizing: border-box;
    }
    .order_btn{
        width: 100%;
        height: 88upx;
        background: #FFC833;
        border-radius: 44upx;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 50upx;
    }
</style>