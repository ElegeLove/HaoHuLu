<template>
	<view>
		<view class="main">
			<image class="main_img" src="../../static/images/payment_successful.png" mode=""></image>
			<view class="main_title">发布成功</view>
			<view class="main_text">接单后我们将以短信的形式告知您</view>
		</view>
		<view class="btnBox" @tap="showInfo">
			<view class="btn">查看订单</view>
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
				uni.navigateTo({
					url: "/pages/My/orderInfo?orderId="+this.orderId,
					success: res => {},
					fail: (err) => {
						console.log(err)
					},
					complete: () => {}
				});
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
	.main_text{
		font-size:30upx;
		font-family:'PingFang SC';
		font-weight:500;
		color:rgba(153,153,153,1);
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
