<template>
	<view>
		<view class="box">
			<view class="main">
				<image class="main_img" src="../../static/images/payment_successful.png" mode=""></image>
				<view class="main_text">支付成功</view>
				<view class="main_price">感谢您的支持，合作愉快</view>
			</view>
		</view>
		<view class="box_btn">
			<view class="btn" @tap="payPrice(1)">
				<text>返回</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		onBackPress(options) {
			uni.navigateBack({
				delta:3
			})
		},
		methods: {
			payPrice(){
				uni.navigateBack({
					delta:3
				})
			}
		}
	}
</script>

<style scoped>
	.box{
		width: 100%;
		display: flex;
		justify-content: center;
	}
	.main{
		margin-top: 136upx;
		text-align: center;
	}
	.main_img{
		width: 156upx;
		height: 156upx;
		border-radius: 50%;
	}
	.main_text{
		font-size:36upx;
		font-family:'PingFang SC';
		font-weight:500;
		color:rgba(51,51,51,1);
		margin: 36upx 0 22upx;
	}
	.main_price{
		font-size:30upx;
		font-family:'PingFang SC';
		font-weight:500;
		color:rgba(153,153,153,1);
	}
	.box_btn{
		width: 100%;
		padding: 0 30upx;
		box-sizing: border-box;
		margin-top: 156upx;
	}
	.btn{
		width: 100%;
		height: 88upx;
		border-radius: 44upx;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size:36upx;
		font-family:'PingFang SC';
		font-weight:500;
		color:rgba(51,51,51,1);
		background-color: #FFC833;
		margin-top: 30upx;
	}
</style>
