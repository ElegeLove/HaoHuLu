<template>
	<view class="content">
		<image class="main_img" src="../../static/images/Doctor_inreview.png" mode=""></image>
		<view class="main_title">审核中</view>
		<view class="main_text">待工作人员24小时内审核通过审核后即可开始接单</view>
		<view class="main_btn" @tap="goBack">返回</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		onBackPress(options) {
			uni.reLaunch({
			    url: '/pages/My/My'
			});
		},
		methods: {
			goBack(){
				uni.reLaunch({
				    url: '/pages/My/My'
				});
			}
		}
	}
</script>

<style scoped>
	.content{
		width: 100%;
		padding: 0 30upx;
		box-sizing: border-box;
		text-align: center;
		font-family:'PingFang SC';
		font-weight:500;
	}
	.main_img{
		width: 126upx;
		height: 137upx;
		margin: 200upx 0 54upx;
	}
	.main_title,.main_btn{
		font-size:36upx;
		color:rgba(51,51,51,1);
	}
	.main_text{
		font-size:30upx;
		color:rgba(153,153,153,1);
		margin: 24upx 0 106upx;
	}
	.main_btn{
		width: 100%;
		height: 88upx;
		border-radius: 44upx;
		background-color: #FFC833;
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
