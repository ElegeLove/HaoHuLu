<template>
	<view>
		<scroll-view class="orderList" scroll-y="true" :style="{height:heights}">
			<view class="orderNull" v-if="orderList.length < 1">
				暂无订单
			</view>
			<view class="item" v-for="(item,i) in orderList" :key="i" @click="GoOrderInfo(item.order_sn)">
				<view class="item_title">
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
						<view>{{item.member_name}}（{{item.sex_text}}）&nbsp;{{item.mobile}}</view>
						<view>{{item.address}}</view>
					</view>
					<image class="itemInfo_right" :src="item.head"></image>
				</view>
			</view>
			<!-- <view class="item" @click="GoOrderInfo">
				<view class="item_title">
					<view class="item_title_left">取消订单成功</view>
					<view class="item_title_right">&yen;50.00</view>
				</view>
				<view class="item_text">若在预约上门时间内无人接单金额将原路退回</view>
				<view class="itemInfo">
					<view class="itemInfo_left">
						<view class="itemInfo_left_num">
							<text class="itemInfo_left_time">15:00 - 16:00</text>
							<text class="itemInfo_left_day">昨天</text>
						</view>
						<view>李言（男） 15245784589</view>
						<view>重庆市江北区金刚大厦25-6</view>
					</view>
					<image class="itemInfo_right" src="../../static/images/user_img.png"></image>
				</view>
			</view>
			<view class="item" @click="GoOrderInfo">
				<view class="item_title">
					<view class="item_title_left">超时未被接单，已退款</view>
					<view class="item_title_right">&yen;50.00</view>
				</view>
				<view class="item_text">接单人将在近期与您取得联系，请留意</view>
				<view class="itemInfo">
					<view class="itemInfo_left">
						<view class="itemInfo_left_num">
							<text class="itemInfo_left_time">15:00 - 16:00</text>
							<text class="itemInfo_left_day">2019.05.12</text>
						</view>
						<view>李言（男） 15245784589</view>
						<view>重庆市江北区金刚大厦25-6</view>
					</view>
					<image class="itemInfo_right" src="../../static/images/user_img.png"></image>
				</view>
			</view> -->
			<view v-if="orderList.length > 0">
				<uni-load-more :status="status" :content-text="contentText" color="#007aff" />
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue'
	export default {
		components: {
			uniLoadMore
		},
		data() {
			return {
				orderList: [],
				heights: '',
				status: 'more',
				pageNum:1,
				statusTypes: [{
					value: 'more',
					text: '加载前'
				}, {
					value: 'loading',
					text: '加载中'
				}, {
					value: 'noMore',
					text: '没有更多'
				}],
				contentText: {
					contentdown: '查看更多',
					contentrefresh: '加载中...',
					contentnomore: '没有更多'
				}
			}
		},
		onLoad: function(option) {
			this.pageNum = 1;
			let that = this;
			uni.getSystemInfo({
				success(res) {
					that.heights = uni.upx2px(res.windowHeight * 2) + 'px';
				}
			});
			this.getOrderList(this.pageNum,5);
			// setTimeout(function(){  
			// 	uni.startPullDownRefresh();  
			// },300) 
		},
		//下拉刷新
		onPullDownRefresh: function() {
			this.orderList = [];
			this.pageNum = 1;
			this.getOrderList(this.pageNum,5);
			// setTimeout(function(){  
			// 	uni.stopPullDownRefresh();  
			// },1000)  
		},
		// 上拉加载
		onReachBottom: function() {
			let _self = this
			if (_self.status != 'more') {//loadingType!=0;直接返回
				return false;
			}
			this.status = 'loading'
			uni.showNavigationBarLoading()

			// console.log('reach');
			// setTimeout(function() {
			// 	for (var i = 0; i < 10; i++) {
			// 		_self.list_array.push("000" + i)
			// 	}
			// 	_self.status = 'more'
			// 	uni.hideNavigationBarLoading()
			// }, 2000);
			_self.getOrderList(_self.pageNum,5);
		},
		methods: {
			getOrderList(pageNum,pageList) {
				let that = this;
				this.httpTokenRequest({
					url: "/member/order/get_order_list",
					method: "POST",
					dataType: 'jsonp',
					data: {
						"page_no": pageNum, //页码,
						"page_size":pageList
					},
					hideLoading: true,
				}).then(
					(res) => {
						if (res.data.code == 1) {
							// that.orderList = res.data.data.list;
							if (res.data.data.list.length < 2) {
								uni.getSystemInfo({
									success(res) {
										that.heights = uni.upx2px(res.windowHeight * 2) + 'px';
									}
								});
							}
							if (that.orderList.length==res.data.data.total) {//没有数据
								that.status = 'noMore';
								uni.hideNavigationBarLoading();//关闭加载动画
								return false;
							}else{
								that.orderList = that.orderList.concat(res.data.data.list);//将数据拼接在一起
								that.pageNum++
								// for(var i=that.orderList.length;i<res.data.data.total;i++){
								// }
								that.status = 'more';//将loadingType归0重置
								uni.hideNavigationBarLoading();//关闭加载动画
							}
								uni.stopPullDownRefresh();
						}
						uni.stopPullDownRefresh();
					}
				).catch(
					(err) => {
						console.log(err)

					}
				)
			},
			GoOrderInfo(id) {
				uni.navigateTo({
					url: "/pages/My/orderInfo?orderId=" + id,
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
		padding: 30upx 28upx;
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
		margin: 24upx 0;
	}

	.item_title_right {
		color: #FA0404;
	}

	.item_text {
		font-size: 26upx;
		color: #666666;
		line-height: 80upx;
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
		margin-bottom: 36upx;
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

	.itemInfo_right {
		width: 120upx;
		height: 120upx;
		border-radius: 50%;
	}
</style>
