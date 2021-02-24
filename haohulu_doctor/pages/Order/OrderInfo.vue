<template>
	<view class="content">
		<view class="item">
			<view class="item_header">
				<view class="item_top">
					<view class="top_time">
						<text class="top_time_left">{{dataInfo.start_date_slot}}</text>
						<text class="top_time_right">{{dataInfo.date_text}}</text>
					</view>
					<view class="top_adrss">{{dataInfo.address}}</view>
					<view>{{dataInfo.member_name}}（{{dataInfo.sex_text}}）</view>
				</view>
				<view class="item_header_right">
					<image class="icon_header_img" src="../../static/images/Doctor_time.png" alt="" srcset=""></image>
					<view v-if="showId == 2 && dataInfo.order_status != 5">等待上门</view>
					<view v-if="dataInfo.order_status == 5">正在进行中</view>
					<view v-if="showId == 6">已完成</view>
					<view v-if="showId == 4">已取消</view>
				</view>
			</view>
			<view class="item_main">
				<view class="main_title">详情描述</view>
				<text class="main_text">{{dataInfo.desc}}</text>
				<view class="main_imgs">
					<image class="main_img" v-for="(item,i) in dataInfo.images" :key="i" :src="item" @tap="showImg(i)"></image>
					<!-- <image class="main_img" src="../../static/images/img.png"></image> -->
				</view>
				<view class="main_title">特殊情况</view>
				<text class="main_text">{{dataInfo.special_intro}}</text>
				<view class="main_price">
					<text>价格 ：</text>
					<text class="price_num">&yen;{{dataInfo.price}}</text>
				</view>
			</view>
		</view>
		<view class="orderInfo">
			<view class="order_time" @tap="orderTime">
				<text class="order_time_title">接单时间</text>
				<view class="order_time_right">
					<text>{{dataInfo.confirm_time}}</text>
					<image class="order_time_img" src="../../static/images/Publish_arrow.png"></image>
				</view>
			</view>
			<view class="order_num">
				<text class="order_time_title">订单号</text>
				<view class="order_time_right">
					<text>{{dataInfo.order_sn}}</text>
				</view>
			</view>
			<view class="order_box">
				<view class="item_btn" v-if="dataInfo.order_status == 2">
					<view class="main_btn" @tap="clickMe(dataInfo.order_sn )">
						<text>我已上门</text>
					</view>
					<view class="main_btns" @tap="clickPhone(dataInfo.mobile)">
						<text>联系对方</text>
					</view>
				</view>
			</view>
			<view v-if="dataInfo.order_status == 5" class="order_box">
				<view class="order_btn" style="background-color: #ccc;">
					<text>等待对方确认</text>
				</view>
			</view>
			<view v-if="dataInfo.order_status != 5">
				<view v-if="dataInfo.order_status != 2">
					<view class="order_box" v-if="showId == 2 || showId == 6">
						<view class="order_btn" @tap="sure(showId)" v-if="showId == 2 && dataInfo.order_status == 3">
							<text>确认完成</text>
						</view>
						<view class="order_btn" @tap="sure(showId)" v-if="showId == 6 && dataInfo.is_pay_thank == 0">
							<text>去感谢平台</text>
						</view>
						<view class="order_btn noPay" v-if="showId == 6 && dataInfo.is_pay_thank == 1">
							<text>感谢您的支持</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<uni-popup ref="popup" maskClick>
			<image @tap="hindpop" class="popImg" src="../../static/images/Details_cancelled.png" mode=""></image>
			<Y-Steps :infoList="dataInfo.order_text"></Y-Steps>
		</uni-popup>
	</view>
</template>

<script>
	import uniPopup from "@/components/uni-popup/uni-popupss.vue"
	import YSteps from "@/components/Y-Steps/Y-Steps.vue";
	export default ({
		components: {
			uniPopup,
			YSteps
		},
		data() {
			return {
				showId: 0,
				dataInfo: {
					member_name: '',
					sex_text: '',
					price: ''
				},
				orderId:''
			}
		},
		onLoad: function(option) { //option为object类型，会序列化上个页面传递的参数
			this.showId = option.id;
			this.orderId = option.orderId;
			this.getOrderInfo(option.orderId)

		},
		onShow:function(){
			this.dataInfo={
					member_name: '',
					sex_text: '',
					price: ''
				};
			this.getOrderInfo(this.orderId);
		},
		methods: {
			getOrderInfo(id) {
				let that = this;
				this.httpTokenRequest({
					url: "/doctor/index/order_info",
					method: "POST",
					dataType: 'jsonp',
					data: {
						"order_sn": id
					},
					hideLoading: true,
				}).then(
					(res) => {
						console.log(res)
						if (res.data.code == 1) {
							that.dataInfo = res.data.data.result;
							// for (let val in that.list) {
							// that.imgArr = [];
							// console.log(that.orderInfo)
							let imgArr = [];
							for (let i in that.dataInfo.images) {
								imgArr.push(that.dataInfo.images[i]);
							}
							that.dataInfo.images = imgArr;
							// }
						} else {
							uni.showToast({
								title: res.data.msg,
								icon: 'none',
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
			showImg(i) {
				//预览图片
				uni.previewImage({
					urls: this.dataInfo.images,
					current: this.dataInfo.images[i]
				});
			},
			//下单时间
			orderTime() {
				this.$refs.popup.open()
			},
			hindpop() {
				this.$refs.popup.close();
			},
			clickMe(orderId) {
				var that = this;
				this.httpTokenRequest({
					url: "/doctor/order/order_on_door",
					method: "POST",
					dataType: 'jsonp',
					data: {
						"order_sn": orderId,
						"order_status": 3
					},
					hideLoading: true,
				}).then(
					(res) => {
						console.log(res)
						if (res.data.code == 1) {
							uni.showToast({
								title: res.data.msg,
								icon: 'none',
								duration: 2000
							});
							that.getOrderInfo(that.orderId)
						} else {
							uni.showToast({
								title: res.data.msg,
								icon: 'none',
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
			clickPhone(phone) {
				uni.makePhoneCall({
					// 手机号
					phoneNumber: phone,
					// 成功回调
					success: (res) => {
						console.log('调用成功!')
					},
					// 失败回调
					fail: (res) => {
						console.log('调用失败!')
					}
				});
			},
			sure(i) {
				let that = this;
				if (i == 2) {
					this.httpTokenRequest({
						url: "/doctor/order/order_confirm",
						method: "POST",
						dataType: 'jsonp',
						data: {
							"order_sn": that.dataInfo.order_sn
						},
						hideLoading: true,
					}).then(
						(res) => {
							console.log(res)
							if (res.data.code == 1) {
								uni.navigateTo({
									url: "/pages/Order/Surefinish",
									success: res => {},
									fail: (err) => {
										console.log(err)
									},
									complete: () => {}
								});
							} else {
								uni.showToast({
									title: res.data.msg,
									icon: 'none',
									duration: 2000
								});
							}
						}
					).catch(
						(err) => {
							console.log(err)

						}
					)
				} else if (i == 6) {
					uni.navigateTo({
						url: "/pages/Order/payThanks?orderId=" + that.dataInfo.order_sn,
						success: res => {},
						fail: (err) => {
							console.log(err)
						},
						complete: () => {}
					});
				}
			}
		}
	});
</script>

<style scoped>
	.content {
		background-color: #F5F5F5;
	}

	.item {
		width: 100%;
		/* border-radius:10upx; */
		background: #FFFFFF;
		overflow: hidden;
		/* margin-top: 30upx; */
	}

	.item_header {
		width: 100%;
		background: #FFC833;
		padding: 27upx 35upx;
		box-sizing: border-box;
		color: #FFFFFF;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.item_top {
		font-size: 26upx;
	}

	.top_time {
		display: flex;
		align-items: center;
		margin-bottom: 32upx;
	}

	.top_time_left {
		font-size: 48upx;
	}

	.top_time_right {
		font-size: 30upx;
		margin-left: 22upx;
	}

	.item_header_right {
		text-align: center;
		font-size: 30upx;
	}

	.icon_header_img {
		width: 67upx;
		height: 67upx;
		margin-bottom: 22upx;
	}

	.top_adrss {
		margin-bottom: 17upx;
	}

	.item_main {
		padding: 38upx 26upx;
		background: #FFFFFF;
	}

	.main_title {
		height: 29upx;
		line-height: 29upx;
		font-size: 30upx;
		color: #000000;
		border-left: 6upx solid #FFC833;
		padding-left: 13upx;
		margin-bottom: 29upx;
	}

	.main_text {
		font-size: 28upx;
		color: #333333;
	}

	.main_imgs {
		margin: 35upx 0 90upx;
	}

	.main_img {
		width: 130upx;
		height: 130upx;
		border-radius: 10upx;
		margin-right: 20upx;
	}

	.main_price {
		margin-top: 42upx;
		border-top: 1upx solid #E5E5E5;
		padding-top: 30upx;
		font-size: 28upx;
		color: #333333;
		display: flex;
		align-items: center;
	}

	.price_num {
		font-size: 40upx;
		color: #FF0000;
		font-weight: 500;
	}

	.orderInfo {
		width: 100%;
		padding: 0 28upx 100upx;
		margin-top: 20upx;
		box-sizing: border-box;
		background: #FFFFFF;
	}

	.order_time,
	.order_num {
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		line-height: 128upx;
		border-bottom: 1upx solid #E5E5E5;
	}

	.order_time_img {
		width: 28upx;
		height: 24upx;
		margin-left: 19upx;
	}

	.order_num {
		border: none;
	}

	.order_time_title {
		font-size: 30upx;
		color: #000000;
	}

	.order_time_right {
		font-size: 30upx;
		color: #666666;
	}

	.order_box {
		width: 100%;
		padding: 10upx 30upx 20upx;
		box-sizing: border-box;
		background-color: #FFFFFF;
		position: fixed;
		bottom: 0;
		left: 0;
	}

	.order_btn {
		width: 100%;
		height: 88upx;
		background: #FFC833;
		border-radius: 44upx;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.noPay {
		background-color: #F5F5F5;
	}

	.popImg {
		width: 36upx;
		height: 36upx;
		position: absolute;
		top: 34upx;
		right: 34upx;
	}

	.item_btn {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.main_btn,
	.main_btns {
		width: 400upx;
		height: 60upx;
		border-radius: 30upx;
		margin-top: 48upx;
		background: #FFC833;
		font-size: 28upx;
		color: #333333;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.main_btns {
		background: #FFFFFF;
		border: 1upx solid #FFC833;
		margin-left: 16upx;
	}
</style>
