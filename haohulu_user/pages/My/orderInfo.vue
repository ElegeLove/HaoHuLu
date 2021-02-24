<template>
    <view>
		<view class="item_header">
			<!-- <view class="item_header_title">订单正在进行中</view> -->
			
			<!-- <view class="item_header_title" v-if="orderInfo.order_status == 1">正在等待接单...</view>
			<view class="item_header_title" v-if="orderInfo.order_status == 2">预约成功，等待上门</view>
			<view class="item_header_title" v-if="orderInfo.order_status == 5">订单正在进行中</view>
			<view class="item_text" v-if="orderInfo.order_status == 2 || orderInfo.order_status == 5">接单人将在近期与您取得联系，请留意</view>
			<view class="item_text" v-if="orderInfo.order_status == 1">若在预约上门时间内无人接单金额将原路退回</view> -->
			
			<view class="item_header_title">{{orderInfo.order_status_text}}</view>
			<view class="item_text">{{orderInfo.order_tile_text}}</view>
			<!-- <view class="item_header_text">接单人将在近期与您取得联系，请留意</view> -->
		</view>
		<view class="item">
            <view class="itemTop">
            	<view class="itemInfo">
            		<view class="itemInfo_left" v-if="orderInfo.member_name">
            			<view class="itemInfo_left_num">
            				<text class="itemInfo_left_time">{{orderInfo.start_date_slot}}</text>
            			</view>
            			<view class="userInfo">{{orderInfo.member_name}}（{{orderInfo.sex==1?'男':'女'}}）&nbsp;{{orderInfo.mobile}}</view>
            			<view class="adssInfo">{{orderInfo.area_str}}{{orderInfo.address}}</view>
            		</view>
					<view class="itemInfo_right">
						<image v-if="orderInfo.order_status == 2" :src="orderInfo.head" @tap="goShowInfo(orderInfo.order_sn)"></image>
						<image v-if="orderInfo.order_status != 2" :src="orderInfo.head"></image>
					</view>
            	</view>
            </view>
            <view class="item_main">
                <view class="main_title">详情描述</view>
                <text class="main_text">{{orderInfo.desc}}</text>
                <view class="main_imgs">
                    <!-- <image class="main_img" src="../../static/images/img.png"></image> -->
					<video v-if="orderInfo.video != '' && orderInfo.video" class="main_img" enable-danmu danmu-btn controls :src="orderInfo.video" mode=""></video>
                    <image class="main_img" v-for="(imgUrl,i) in imgArr" :key="i" :src="imgUrl" @tap="showImg(i)"></image>
                </view>
                <view class="main_title">特殊情况</view>
                <text class="main_text">{{orderInfo.special_intro}}</text>
                <view class="main_btn">
                	<view class="main_price">
                	    <text>总计 ：</text>
                	    <text class="price_num">&yen;{{orderInfo.price}}</text>
                	</view>
					<!-- <view class="order_btn" @click="sure">
						<text>确认完成</text>
					</view> -->
					<view class="itemBtn" v-if="orderInfo.order_status == 1 || orderInfo.order_status == 2">
						<view class="itemBtn_left" @tap="callPhone(orderInfo.mobile)" v-if="orderInfo.order_status == 2">拨打电话</view>
						<view class="itemBtn_right" @tap="cancelOrder(orderInfo.order_sn)">取消订单</view>
					</view>
					<view class="order_btn" v-if="orderInfo.order_status == 5" @tap="sureFinish(orderInfo.order_sn)">
						<view>确认完成</view>
					</view>
                </view>
            </view>
        </view>
        <view class="orderInfo">
            <!-- <view class="order_time" v-if="orderInfo.order_status != 4">
                <text class="order_time_title">保单号</text>
                <view class="order_time_right">
                    <text>1254789565</text>
                </view>
            </view> -->
            <view class="order_time" @tap="orderTime">
                <text class="order_time_title">下单时间</text>
                <view class="order_time_right">
                    <text>{{orderInfo.create_time}}</text>
                    <image v-if="orderInfo.order_status != 4" class="order_time_img" src="../../static/images/Publish_arrow.png"></image>
                </view>
            </view>
			<view class="order_time">
                <text class="order_time_title">付款方式</text>
                <view class="order_time_right">
                    <text>{{orderInfo.payment_text}}</text>
                </view>
            </view>
			<view class="order_num" v-if="orderInfo.order_status != 4">
                <text class="order_time_title">订单号</text>
                <view class="order_time_right">
                    <text>{{orderInfo.order_sn}}</text>
                </view>
            </view>
        </view>
		<uni-popup ref="popup" maskClick>
			<image @tap="hindpop" class="popImg" src="../../static/images/Details_cancelled.png" mode=""></image>
			<Y-Steps :infoList="orderInfo.order_text"></Y-Steps>
		</uni-popup>
		<uni-popup ref="popups" type="center">
			<view class="popmain">
				<view class="poptop">
					<view class="">确认取消</view>
					<image class="popImgs" @tap="cancel" src="../../static/images/Details_cancelled.png" mode=""></image>
				</view>
				<view class="poptext">要取消该订单吗？</view>
				<view class="popbtns">
					<view class="popbtn" @tap="cancel">取消</view>
					<view class="popbtn popsure" @tap="popSure">确定</view>
				</view>
			</view>
		</uni-popup>
		<uni-popup ref="popupsure" type="center">
			<view class="popmain">
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
    import YSteps from "@/components/Y-Steps/Y-Steps.vue";
	export default({
		components: {
			uniPopup,
			YSteps
		},
		data() {
			return {
				Inv:0,
				orderInfo:{
					price:''
				},
				imgArr:[],
				orderId:'',
				ordersId:'',
				List:[
				    {
				        date:'时间',
				        info:'内容'
				    },
				    {
				        date:'时间',
				        info:'内容'
				    }
				]
			}
		},
		onLoad:function(option){
			this.ordersId = option.orderId;
			this.getOrderInfo(option.orderId);
		},
		onShow:function(){
			this.getOrderInfo(this.ordersId);
		},
		methods: {
			getOrderInfo(id){
				let that = this;
				this.httpTokenRequest({
					url: "/member/order/get_order_info",
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
							that.orderInfo = res.data.data.result;
							that.imgArr = [];
							console.log(that.orderInfo)
							for (let i in that.orderInfo.images) {
							    that.imgArr.push(that.orderInfo.images[i]);
							}
						}
					}
				).catch(
					(err) => {
						console.log(err)
				
					}
				)
			},
			goShowInfo(id){
				uni.navigateTo({
					url: '/pages/My/showInfos?id='+id,
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
			showImg(i) {
				//预览图片
				uni.previewImage({
					urls: this.imgArr,
					current: this.imgArr[i]
				});
			},
			//取消订单
			cancelOrder(id){
				this.orderId = id;
				this.$refs.popups.open()
			},
			cancel() {
				this.$refs.popups.close();
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
							this.$refs.popups.close();
							if(res.data.code == 1){
								uni.redirectTo({
									url: "/pages/My/cancel",
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
			//确认完成
			sureFinish(id){
				console.log(id)
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
							console.log(res)
							that.$refs.popupsure.close();
							if(res.data.code == 1){
								uni.showToast({
									title: res.data.msg,
									icon:'none',
									duration: 2000
								});
								that.getOrderInfo(that.ordersId);
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
			},
			//下单时间
			orderTime(){
				this.$refs.popup.open()
			},
			hindpop(){
				this.$refs.popup.close();
			},
		}
	});
</script>

<style scoped>
	.item{
		padding-top: 35upx;
		background-color: #FFFFFF;
	}
	.item_header{
		width: 100%;
		padding: 40upx 30upx;
		box-sizing: border-box;
		background: #FFC833;
		color: #FFFFFF;
	}
	.item_header_title{
		margin-bottom: 30upx;
		font-size:36upx;
		font-family:'PingFang SC';
		font-weight:bold;
		color:rgba(255,255,255,1);
	}
	.item_text{
		font-size:26upx;
		font-family:'PingFang SC';
		font-weight:500;
		color:rgba(255,255,255,1);
	}
	.item_header_text{
		font-size: 26upx;
	}
	.itemTop{
		width: 100%;
		padding: 0 26upx;
		box-sizing: border-box;
		background-color: #FFFFFF;
	}
	.itemInfo{
		width: 100%;
		padding-bottom: 30upx;
		border-bottom: 1upx solid #E5E5E5;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.itemInfo_left{
		font-size: 26upx;
		color: #999999;
	}
	.itemInfo_left_num{
		margin-bottom: 36upx;
	}
	.itemInfo_left_time{
		font-size: 36upx;
		color: #333333;
		margin-right: 40upx;
	}
	.userInfo{
		color: #333333;
	}
	.adssInfo{
		width: 560upx;
	}
	.itemInfo_right{
		width: 120upx;
		height: 120upx;
		border-radius: 50%;
		overflow: hidden;
	}
	.itemInfo_right image{
		width: 100%;
		height: 100%;
	}
	.item_main{
		padding: 38upx 26upx;
		background: #FFFFFF;
	}
	.main_title{
		height: 29upx;
		line-height: 29upx;
		font-size: 30upx;
		color: #000000;
		border-left: 6upx solid #FFC833;
		padding-left: 13upx;
		margin-bottom: 29upx;
	}
	.main_text{
		font-size: 28upx;
		color: #333333;
	}
	.main_imgs{
		margin: 35upx 0 90upx;
	}
	.main_img{
		width: 130upx;
		height: 130upx;
		border-radius: 10upx;
		margin-right: 20upx;
		z-index: 0;
	}
	.main_price{
		font-size: 28upx;
		color: #333333;
		display: flex;
		align-items: center;
	}
	.price_num{
		font-size: 40upx;
		color: #FF0000;
		font-weight:500;
	}
	.orderInfo{
        width: 100%;
        padding: 0 28upx;
        margin-top: 30upx;
        box-sizing: border-box;
        background: #FFFFFF;
		border-top: 20upx solid #F5F5F5;
    }
    .order_time,.order_num{
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        line-height: 128upx;
        border-bottom: 1upx solid #E5E5E5;
    }
    .order_time_img{
        width: 28upx;
        height: 24upx;
        margin-left: 19upx;
    }
    .order_num{
        border: none;
    }
    .order_time_title{
        font-size: 30upx;
        color: #000000;
    }
    .order_time_right{
        font-size: 30upx;
        color: #666666;
    }
	.main_btn{
		width: 100%;
		margin-top: 42upx;
		border-top: 1upx solid #E5E5E5;
		padding-top: 40upx;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
    .order_btn{
        width: 180upx;
        height: 60upx;
        background: #FFC833;
        border-radius: 30upx;
		font-size: 28upx;
		color: #333333;
        display: flex;
        justify-content: center;
        align-items: center;
    }
	.itemBtn {
		/* margin: 67upx 0 37upx; */
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
	.uni-popup__wrapper-box[data-v-d68ba72a] {
		border-radius: 10upx !important;
	}
	.popImg{
		width: 36upx;
		height: 36upx;
		position: absolute;
		top: 34upx;
		right: 34upx;
	}
	.popmain {
		width: 500upx;
		height: 400upx;
		background: rgba(255, 255, 255, 1);
		border-radius: 10upx;
		padding: 20upx;
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
		top: 0upx;
		right: 0upx;
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