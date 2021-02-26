<template>
	<view class="content">
		<view class="top">
			<image class="tips" @click="gotoTips" src="../../static/images/My_messages.png"></image>
			<view class="user" @click="gotoUser">
				<view>
					<view class="user_name">{{nameVal.name}}</view>
					<view class="user_msg">再累，身体最重要</view>
				</view>
				<image class="userInfo_log" :src="nameVal.head"></image>
			</view>
			<view class="device">
				<view class="device_item" @tap="callPolice">
					<view class="device_item_title">SOS</view>
					<view class="device_item_text">一键报警</view>
				</view>
				<view class="device_item service" @tap="kefu">
					<view class="device_item_title">客服</view>
					<view class="device_item_text">联系客服</view>
				</view>
				<view class="device_item" @tap="goAdrss">
					<view class="device_item_title">地址</view>
					<view class="device_item_text">上门地址</view>
				</view>
			</view>
			<view class="main_title">
				<view>进行中</view>
				<view class="allOrder" @click="allOrder">
					<text class="allOrder_text">全部订单</text>
					<image class="allOrder_img" src="../../static/images/My_arrow.png"></image>
				</view>
			</view>
		</view>
		<view class="orderList" :style="{height:heights}">
			<view class="orderNull" v-if="listVal.length < 1">
				暂无订单
			</view>
			<view class="item" v-for="(item,i) in listVal" :key='i'>
				<view class="" @tap="goInfo(item.order_sn)">
					<view class="item_title">
						<!-- <view class="item_title_left" v-if="item.order_status == 1">正在等待接单...</view>
						<view class="item_title_left" v-if="item.order_status == 2">预约成功，等待上门</view>
						<view class="item_title_left" v-if="item.order_status == 5">订单正在进行中</view> -->
						<view class="item_title_left">{{item.order_status_text}}</view>
						<view class="item_title_right">&yen;{{item.price}}</view>
					</view>
					<view class="item_text">{{item.order_tile_text}}</view>
					<view class="itemInfo">
						<view class="itemInfo_left">
							<view class="itemInfo_left_num">
								<text class="itemInfo_left_time">{{item.start_date_slot}}</text>
								<text class="itemInfo_left_day">{{item.date_text}}</text>
							</view>
							<view>{{item.member_name}}（{{item.sex==1?'男':'女'}}）&nbsp;{{item.mobile}}</view>
							<view class="adssInfo">{{item.area_str}}{{item.address}}</view>
						</view>
						<image class="itemInfo_right" :src="item.head"></image>
					</view>
				</view>
				<view class="itemBtn" v-if="item.order_status == 1 || item.order_status == 2">
					<view class="itemBtn_left" v-if="item.order_status == 2" @tap="callPhone(item.mobile)">拨打电话</view>
					<view class="itemBtn_right" @tap="cancelOrder(item.order_sn)">取消订单</view>
				</view>
				<view class="itemBtn" @tap="sureFinish(item.order_sn)" v-if="item.order_status == 5">
					<view class="itemBtn_left">确认完成</view>
				</view>
			</view>
		</view>
		<uni-popup ref="popup" type="center">
			<view class="popmain">
				<view class="poptop">
					<view class="">确认取消</view>
					<image class="popImg" @tap="cancel" src="../../static/images/Details_cancelled.png" mode=""></image>
				</view>
				<view class="poptext">要取消该订单吗？</view>
				<view class="popbtns">
					<view class="popbtn" @tap="cancel">取消</view>
					<view class="popbtn popsure" @tap="popSure">确定</view>
				</view>
			</view>
		</uni-popup>
		<uni-popup ref="popupsure" type="center">
			<view class="popmains">
				<view class="poptop">
					<view class="">确认完成</view>
					<image class="popImgs" @tap="cancelsu" src="../../static/images/Details_cancelled.png" mode=""></image>
				</view>
				<view class="poptext">确认后即表示该订单完成</view>
				<view class="popbtns">
					<view class="popbtn" @tap="cancelsu">取消</view>
					<view class="popbtn popsure" @tap="popSuresu">确定</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import uniPopup from "@/components/uni-popup/uni-popupss.vue"
	export default({
		components: {
			uniPopup
		},
		data() {
			return {
				nameVal:{},
				heights:'',
				listVal:[],
				orderId:''
			}
		},
		onShow: function() {
			this.getOrderList();
		},
		methods: {
			getOrderList(){
				let that = this;
				let token = '';
				uni.getStorage({
					key: 'token',
					success: function(ress) {
						token = ress.data
					}
				});
				console.log(token)
				this.httpTokenRequest({
					url: "/member/member/get_member_info",
					method: "POST",
					dataType: 'jsonp',
					data: {},
					hideLoading: true,
				}).then(
					(res) => {
						console.log(res)
						if (res.data.code == 1) {
							that.nameVal = res.data.data.result;
							if(that.nameVal.head == ''||!that.nameVal.head){
								that.nameVal.head = '../../static/images/logo.png';
							}
						}
					}
				).catch(
					(err) => {
						console.log(err)
						
					}
				)
				this.httpTokenRequest({
					url: "/member/member/get_member_order",
					method: "POST",
					dataType: 'jsonp',
					data: {},
					hideLoading: true,
				}).then(
					(res) => {
						console.log(res)
						if (res.data.code == 1) {
							that.listVal = res.data.data.result;
							if (res.data.data.result.length < 2) {
								uni.getSystemInfo({
									success(res) {
										that.heights = uni.upx2px(res.windowHeight) + 'px';
									}
								});
							}
						}
					}
				).catch(
					(err) => {
						console.log(err)
						
					}
				)
			},
			gotoTips() {
				uni.navigateTo({
					url: "/pages/My/NotifyInfo",
					success: res => {},
					fail: (err) => {
						console.log(err)
					},
					complete: () => {}
				});
			},
			allOrder() {
				uni.navigateTo({
					url: "/pages/My/allOrder",
					success: res => {},
					fail: (err) => {
						console.log(err)
					},
					complete: () => {}
				});
			},
			gotoUser() {
				uni.navigateTo({
					url: "/pages/My/PersonalInfo",
					success: res => {},
					fail: (err) => {
						console.log(err)
					},
					complete: () => {}
				});
			},
			callPolice(){
				uni.makePhoneCall({
					// 手机号
					phoneNumber: '110',
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
			kefu() {
				var that = this;
				this.httpRequest({
					url: "/share/index/config",
					method: "POST",
					data: {
						"identity": 'customer_service_mobile'
					},
					hideLoading: true,
				}).then(
					(res) => {
						if (res.data.code == 1) {
							uni.makePhoneCall({
								// 手机号
								phoneNumber: res.data.data.result.value,
								// 成功回调
								success: (res) => {
									console.log('调用成功!')
								},
								// 失败回调
								fail: (res) => {
									console.log('调用失败!')
								}
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
			},
			goAdrss(){
				uni.navigateTo({
					url: "/pages/My/homeAddress",
					success: res => {},
					fail: (err) => {
						console.log(err)
					},
					complete: () => {}
				});
			},
			goInfo(id){
				uni.navigateTo({
					url: "/pages/My/orderInfo?orderId="+id,
					success: res => {},
					fail: (err) => {
						console.log(err)
					},
					complete: () => {}
				});
			},
			//取消订单
			cancelOrder(id){
				this.orderId = id;
				this.$refs.popup.open()
			},
			cancel() {
				this.$refs.popup.close();
			},
			popSure(){
				let that = this;
				that.httpTokenRequest({
						url : "/member/Order/set_order_cancel",
						method : "POST",
						dataType:'jsonp',
						data : {
							"order_sn":that.orderId
						},
						hideLoading : true,
					}).then(
						(res) => {
							this.$refs.popup.close();
							if(res.data.code == 1){
								that.getOrderList();
								uni.showToast({
									title: res.data.msg,
									icon:'none',
									duration: 2000
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
			//确认完成
			sureFinish(id){
				this.orderId = id;
				this.$refs.popupsure.open()
			},
			cancelsu() {
				this.$refs.popupsure.close();
			},
			popSuresu(){
				let that = this;
				that.httpTokenRequest({
						url : "/member/Order/set_order_complete",
						method : "POST",
						dataType:'jsonp',
						data : {
							"order_sn":that.orderId
						},
						hideLoading : true,
					}).then(
						(res) => {
							this.$refs.popupsure.close();
							if(res.data.code == 1){
								that.getOrderList();
								uni.showToast({
									title: res.data.msg,
									icon:'none',
									duration: 2000
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
			//拨打电话
			callPhone(phone){
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
			}
		}
	});
</script>

<style scoped>
	.content {
		padding-top: 50upx;
		padding-bottom: 80upx;
	}

	.top {
		width: 100%;
		padding: 30upx;
		box-sizing: border-box;
	}

	.tips {
		width: 50upx;
		height: 50upx;
	}

	.user {
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;

	}

	.user_name {
		font-size: 48upx;
		color: #000000;
	}

	.user_msg {
		font-size: 24upx;
		color: #999999;
		margin-top: 30upx;
	}

	.userInfo_log {
		width: 167upx;
		height: 167upx;
		border-radius: 50%;
	}

	.device {
		width: 100%;
		margin-top: 58upx;
		display: flex;
		justify-content: space-around;
		align-items: center;
	}

	.device_item {
		width: 218upx;
		height: 120upx;
		border-radius: 10upx;
		background: #F5F5F5;
		padding: 25upx 0 0 30upx;
	}

	.service {
		margin: 0 20upx;
	}

	.device_item_title {
		font-size: 32upx;
		color: #333333;
		margin-bottom: 20upx;
	}

	.device_item_text {
		font-size: 24upx;
		color: #999999;
	}

	.main_title {
		width: 100%;
		height: 29upx;
		line-height: 29upx;
		font-size: 36upx;
		color: #000000;
		border-left: 8upx solid #FFC833;
		padding-left: 13upx;
		margin-top: 70upx;
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.allOrder {
		display: flex;
		align-items: center;
	}

	.allOrder_text {
		font-size: 24upx;
		color: #666666;
		margin-right: 10upx;
	}

	.allOrder_img {
		width: 20upx;
		height: 20upx;
	}

	.orderList {
		width: 100%;
		padding: 30upx;
		box-sizing: border-box;
		background: #F5F5F5;
	}
	.orderNull{
		width: 100%;
		text-align: center;
		margin-top: 100upx;
	}
	.item {
		width: 100%;
		padding: 20upx 28upx;
		box-sizing: border-box;
		background: #FFFFFF;
		border-radius: 10upx;
		margin-bottom: 30upx;
	}

	.item_title {
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 36upx;
		color: #333333;
		margin: 10upx 0;
	}

	.item_title_right {
		color: #FA0404;
	}

	.item_text {
		font-size: 26upx;
		color: #666666;
		line-height: 50upx;
		border-bottom: 1upx solid #E5E5E5;
	}

	.itemInfo {
		width: 100%;
		margin-top: 35upx;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.itemInfo_left {
		font-size: 26upx;
		color: #999999;
	}

	.itemInfo_left_num {
		margin-bottom: 20upx;
	}

	.itemInfo_left_time {
		font-size: 36upx;
		color: #333333;
		margin-right: 40upx;
	}

	.itemInfo_left_day {
		font-size: 24upx;
		color: #333333;
	}
	
	.adssInfo{
		width: 520upx;
	}
	
	.itemInfo_right {
		width: 120upx;
		height: 120upx;
		border-radius: 50%;
	}

	.itemBtn {
		margin: 67upx 0 37upx;
		display: flex;
		align-items: center;
	}

	.itemBtn_left,
	.itemBtn_right {
		width: 180upx;
		height: 60upx;
		border-radius: 30upx;
		font-size: 28upx;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.itemBtn_left {
		background: #FFC833;
		color: #333333;
		margin-right: 22upx;
	}

	.itemBtn_right {
		color: #FFC833;
		border: 2upx solid #FFC833;
	}
	
	.popmain,.popmains {
		width: 500upx;
		height: 380upx;
		background: rgba(255, 255, 255, 1);
		border-radius: 10upx;
		padding: 0 20upx;
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
	
	.popImg,.popImgs {
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
