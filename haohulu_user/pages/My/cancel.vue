<template>
	<view>
		<view class="main">
			<image class="main_img" src="../../static/images/payment_successful.png" mode=""></image>
			<view class="main_title">订单已取消</view>
		</view>
		<view class="btnBox" @tap="showInfo">
			<view class="btn">返回</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				orderId:''
			}
		},
		onLoad:function(option){
			this.orderId = option.orderId
		},
		methods: {
			showInfo(){
				uni.navigateBack()
			}
		}
	}
</script>

<style scoped>
	.main{
		width: 100%;
		margin-top: 150upx;
		text-align: center;
	}
	.main_img{
		width: 156upx;
		height: 156upx;
		border-radius: 50%;
	}
	.main_title{
		margin: 40upx 0 24upx;
		font-size:36upx;
		font-family:'PingFang SC';
		font-weight:500;
		color:rgba(51,51,51,1);
	}
	.btnBox{
		width: 100%;
		padding: 0 30upx;
		margin-top: 120upx;
		box-sizing: border-box;
	}
	.btn{
		width: 100%;
		height: 88upx;
		border-radius: 44upx;
		background-color: #FFC833;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size:36upx;
		font-family:'PingFang SC';
		font-weight:500;
		color:rgba(51,51,51,1);
	}
</style>
