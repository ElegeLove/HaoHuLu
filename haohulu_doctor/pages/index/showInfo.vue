<template>
	<view class="content" :style="{height:heights}">
		<view class="item">
			<view class="item_top">
				<view class="top_time">
					<text class="top_time_left">{{dataInfo.start_date_slot}}</text>
					<text class="top_time_right">{{dataInfo.date_text}}</text>
				</view>
				<view class="top_adrss">{{dataInfo.address}}</view>
				<view>{{dataInfo.member_name}}（{{dataInfo.sex_text}}）</view>
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
		<view class="footer" @tap="userInfo" v-if="userStatus == 0 || userStatus == 3">
			<view>
				<img class="footer_icon" src="../../static/images/Doctor_editor.png" alt="">
				<text>填写个人资料并通过审核即可接单，点击此处去填写</text>
			</view>
		</view>
		<view class="btn">
			<button class="btn_text" @tap="Grab(dataInfo.order_sn)" :disabled="disabled">{{statusVsl}}</button>
		</view>
		<uni-popup ref="popups" type="center">
			<view class="popmain">
				<view class="poptop">
					<view class="">立即抢单</view>
					<image class="popImgs" @tap="cancel" src="../../static/images/Details_cancelled.png" mode=""></image>
				</view>
				<view class="poptext">要抢下该订单吗？抢单后如有变动无法前往请联系用户取消</view>
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
	export default ({
		components: {
			uniPopup
		},
		data() {
			return {
				dataInfo: {
					member_name: '',
					sex_text: '',
					price: '',
					ordersId:''
				},
				statusVsl: '立即抢单',
				userStatus: '',
				heights: '',
				disabled: false
			}
		},
		onLoad: function(option) { //option为object类型，会序列化上个页面传递的参数
			this.orderId = option.orderId;
			let that = this;
			uni.getSystemInfo({
				success(res) {
					that.heights = uni.upx2px(res.windowHeight * 2) + 'px';
				}
			});
			this.httpTokenRequest({
				url: "/doctor/doctor/doctor",
				method: "POST",
				dataType: 'jsonp',
				data: {},
				hideLoading: true,
			}).then(
				(res) => {
					if (res.data.code == 1) {
						that.userStatus = res.data.data.result.status;
					}
				}
			).catch(
				(err) => {
					console.log(err)

				}
			);
			this.httpTokenRequest({
				url: "/doctor/index/order_info",
				method: "POST",
				dataType: 'jsonp',
				data: {
					"order_sn": option.orderId
				},
				hideLoading: true,
			}).then(
				(res) => {
					console.log(res)
					if (res.data.code == 1) {
						that.dataInfo = res.data.data.result;
						let imgArr = [];
						for (let i in that.dataInfo.images) {
							imgArr.push(that.dataInfo.images[i]);
						}
						that.dataInfo.images = imgArr;
					}
				}
			).catch(
				(err) => {
					console.log(err)

				}
			)
		},
		methods: {
			showImg(i) {
				//预览图片
				uni.previewImage({
					urls: this.dataInfo.images,
					current: this.dataInfo.images[i]
				});
			},
			userInfo() {
				uni.navigateTo({
					url: '/pages/My/PersonalInfo',
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
			Grab(id) {
				this.ordersId = id;
				this.$refs.popups.open();
			},
			cancel() {
				this.$refs.popups.close();
			},
			popSure() {
				let that = this;
				that.httpTokenRequest({
					url: "/doctor/order/receipt",
					method: "POST",
					dataType: 'jsonp',
					data: {
						"order_sn": that.ordersId
					},
					hideLoading: true,
				}).then(
					(res) => {
						this.$refs.popups.close();
						if (res.data.code == 1) {
							that.statusVsl = '已抢下该订单';
							that.disabled = true
							uni.showToast({
								title: res.data.msg,
								icon: 'none',
								duration: 2000
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
		/* overflow: hidden; */
		/* margin-top: 30upx; */
	}

	.item_top {
		background: #FFC833;
		padding: 27upx 35upx;
		color: #FFFFFF;
		font-size: 26upx;
	}

	.top_time {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 32upx;
	}

	.top_time_left {
		font-size: 48upx;
	}

	.top_time_right {
		font-size: 30upx;
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

	.footer {
		width: 100%;
		height: 88upx;
		background: #FFC833;
		font-size: 24upx;
		color: #333333;
		position: fixed;
		bottom: 120upx;
		left: 0;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.footer_icon {
		width: 22upx;
		height: 22upx;
		margin-right: 12upx;
	}

	.btn {
		width: 100%;
		height: 120upx;
		background-color: #FFFFFF;
		padding: 16upx 30upx;
		box-sizing: border-box;
		position: fixed;
		bottom: 0;
		left: 0;
	}

	button::after {
		border: none;
	}

	.btn_text {
		width: 100%;
		height: 88upx;
		line-height: 84upx;
		font-size: 36upx;
		color: #333333;
		background: #FFC833;
		border-radius: 44upx;
		text-align: center;
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
