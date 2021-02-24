<template>
	<view>
		<view class="box">
			<view class="main">
				<image class="main_img" src="../../static/images/Doctor_wallet.png" mode=""></image>
				<view class="main_text">本单入袋</view>
				<view class="main_price">&yen;{{price}}</view>
			</view>
		</view>
		<view class="box_btn">
			<view class="btn" @tap="payPrice(1)">
				<text>支付10%（￥{{price1}}）</text>
			</view>
			<view class="btn" @tap="payPrice(2)">
				<text>支付20%（￥{{price2}}）</text>
			</view>
		</view>
		<uni-popup ref="popups" type="center">
			<view class="popmain">
				<view class="poptop">
					<view class="">确认支付</view>
					<image class="popImgs" @tap="cancel" src="../../static/images/Details_cancelled.png" mode=""></image>
				</view>
				<view class="poptext">要支付平台感谢费吗？</view>
				<view class="popbtns">
					<view class="popbtn" @tap="cancel">取消</view>
					<view class="popbtn popsure" @tap="popSure">确定</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import uniPopup from "@/components/uni-popup/uni-popupss.vue"
	export default {
		components: {
			uniPopup
		},
		data() {
			return {
				orderId:'',
				price:'',
				price1:'',
				price2:'',
				indexs:''
			}
		},
		onLoad: function (option) { //option为object类型，会序列化上个页面传递的参数
			this.orderId = option.id;
			let that = this;
			this.httpTokenRequest({
					url : "/doctor/index/order_info",
					method : "POST",
					dataType:'jsonp',
					data : {
						"order_sn":that.orderId
					},
					hideLoading : true,
				}).then(
					(res) => {
						console.log(res)
						if(res.data.code == 1){
							that.price = res.data.data.result.price;
							console.log(parseFloat(res.data.data.result.price),typeof(parseFloat(res.data.data.result.price)))
							that.price1 = (parseFloat(res.data.data.result.price) * 0.1).toFixed(2);
							that.price2 = (parseFloat(res.data.data.result.price) * 0.2).toFixed(2);
						}else{
							uni.showToast({
								title: res.data.msg,
								icon:'none',
								duration: 2000
							});
						}
					}
				).catch(
					(err) => {
						console.log(err)
						
					}
				)
		},
		methods: {
			payPrice(i){
				this.indexs = i;
				this.$refs.popups.open();
			},
			cancel() {
				this.$refs.popups.close();
			},
			popSure() {
				let that = this;
				that.httpTokenRequest({
						url : "/doctor/order/thank_fee",
						method : "POST",
						dataType:'jsonp',
						data : {
							"order_sn":that.orderId,
							"level":that.indexs
						},
						hideLoading : true,
					}).then(
						(res) => {
							this.$refs.popups.close();
							if(res.data.code == 1){
								uni.navigateTo({
									url: "/pages/Order/paySuccess",
									success: res => {},
									fail: (err) => {console.log(err)},
									complete: () => {}
								});
							}else{
								uni.showToast({
									title: res.data.msg,
									icon:'none',
									duration: 2000
								});
							}
						}
					).catch(
						(err) => {
							console.log(err)
							
						}
					)
			},
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
		font-size:30upx;
		font-family:'PingFang SC';
		font-weight:500;
		color:rgba(51,51,51,1);
		margin: 36upx 0 22upx;
	}
	.main_price{
		font-size:60upx;
		font-family:'PingFang SC';
		font-weight:bold;
		color:rgba(254,1,1,1);
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
		font-size:30upx;
		font-family:'PingFang SC';
		font-weight:500;
		color:rgba(51,51,51,1);
		background-color: #FFC833;
		margin-top: 30upx;
	}
	.popmain {
		width: 500upx;
		height: 400upx;
		background: rgba(255, 255, 255, 1);
		border-radius: 10upx;
		padding: 0 20upx 40upx;
		box-sizing: border-box;
		z-index: 121;
	}
	
	.poptop {
		width: 100%;
		text-align: center;
		font-size: 36upx;
		font-family: 'PingFang SC';
		font-weight: 500;
		color: rgba(51, 51, 51, 1);
		position: relative;
	}
	
	.popImgs {
		width: 30upx;
		height: 30upx;
		position: absolute;
		top: -20upx;
		right: -20upx;
	}
	
	.poptext {
		width: 100%;
		text-align: center;
		font-size: 30upx;
		font-family: 'PingFang SC';
		font-weight: 500;
		color: rgba(102, 102, 102, 1);
		line-height: 48upx;
		margin: 100upx 0;
	}
	
	.popbtns {
		width: 100%;
		display: flex;
		justify-content: space-around;
		align-items: center;
	}
	
	.popbtn {
		width: 208upx;
		height: 88upx;
		border: 1upx solid rgba(51, 51, 51, 1);
		border-radius: 44upx;
		font-size: 36upx;
		font-family: 'PingFang SC';
		font-weight: 500;
		color: rgba(51, 51, 51, 1);
		display: flex;
		justify-content: center;
		align-items: center;
	}
	
	.popsure {
		border: none;
		background-color: #FFC833;
	}
</style>
