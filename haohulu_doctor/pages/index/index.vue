<template>
	<view class="content">
		<view class="header">
			<view class="header_left" @tap="clickLocation">
				<text v-if="adrss.address.street">{{adrss.address.street}}</text>
				<text v-else>{{adrss.address}}</text>
				<image class="icon_bottom" src="../../static/images/Doctor_arrow_down.png"></image>
			</view>
			<view class="header_right">附近订单</view>
		</view>
		<scroll-view class="main" scroll-y="true" :style="{height:heights}">
			<view class="null" v-if="list.length <= 0">暂无订单</view>
			<view class="item" v-for="(item,i) in list" :key="i" @tap="showInfo(item.order_sn)">
				<view class="item_top">
					<view class="top_time">
						<text class="top_time_left">{{item.start_date_slot}}</text>
						<text class="top_time_right">{{item.date_text}}</text>
					</view>
					<view class="top_adrss">{{item.address}}</view>
					<view>{{item.member_name}}（{{item.sex_text}}）</view>
				</view>
				<view class="item_main">
					<view class="main_title">详情描述</view>
					<text class="main_text">{{item.desc}}</text>
					<view class="main_imgs">
						<image class="main_img" v-for="(itemChild,k) in item.images" :key="k" :src="itemChild"></image>
					</view>
					<view class="main_title">特殊情况</view>
					<text class="main_text">{{item.special_intro }}</text>
					<view class="main_price">
						<text>价格 ：</text>
						<text class="price_num">&yen;{{item.price }}</text>
					</view>
				</view>
			</view>
			<view v-if="list.length > 0">
				<uni-load-more :status="status" :content-text="contentText" color="#007aff" />
			</view>
		</scroll-view>
		<view class="footer" @tap="userInfo" v-if="userStatus == 0 || userStatus == 3">
			<view class="footer_main">
				<img class="footer_icon" src="../../static/images/Doctor_editor.png" alt="">
				<text>填写个人资料并通过审核即可接单，点击此处去填写</text>
			</view>
		</view>
	</view>
</template>

<script>
	import AMap from '@/components/amap-wx/amap-wx.js'
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue'
	export default ({
		components: {
			uniLoadMore
		},
		data() {
			return {
				adrssVal: {},
				adrss: {
					address: ''
				},
				heights: '',
				// lng:'106.504962',
				// lat:'29.533155',
				list: [],
				amapPlus: null,
				// key: 'c4eca7fcd0c940b68beaa1cf3db3657c',
				key: '1506f02c200b53de982fae605398a55e',
				status: 'more',
				pageNum: 1,
				userStatus:'',
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
		onLoad: function() {
			let that = this;
			uni.getSystemInfo({
				success(res) {
					that.heights = uni.upx2px(res.windowHeight * 2) + 30 + 'px';
				}
			});
			
			this.amapPlus = new AMap.AMapWX({
				key: this.key
			});

			uni.getLocation({
				type: 'gcj02',
				geocode: true,
				success: function(res) {
					that.adrssVal = res;
					that.adrss.address = res.address.street;
					that.list = [];
					that.getList(1, 5, res.longitude, res.latitude);
				},
				fail: function(err) {
					uni.showModal({
						title: JSON.stringify(err),
						icon: "none"
					})
				}
			});
		},
		//下拉刷新
		onPullDownRefresh: function() {
			this.orderList = [];
			this.pageNum = 1;
			this.getList(this.pageNum, 5, this.adrss.longitude, this.adrss.latitude);
		},
		// 上拉加载
		onReachBottom: function() {
			let _self = this
			if (_self.status != 'more') { //loadingType!=0;直接返回
				return false;
			}
			this.status = 'loading'
			uni.showNavigationBarLoading();
			_self.getList(_self.pageNum, 1, _self.adrss.longitude, _self.adrss.latitude);
		},
		onShow: function() {
			var that = this;
			this.httpTokenRequest({
			        url : "/doctor/doctor/doctor",
			        method : "POST",
					dataType:'jsonp',
			        data : {},
			        hideLoading : true,
			    }).then(
					(res) => {
						if(res.data.code == 1){
							that.userStatus = res.data.data.result.status;
						}
					}
				).catch(
					(err) => {
						console.log(err)
						
					}
				);

			if (this.adrss.latitude) {
				this.adrssVal.longitude = this.adrss.longitude;
				this.adrssVal.latitude = this.adrss.latitude;
			}
			this.list = [];
			this.getList(1, 5, this.adrss.longitude, this.adrss.latitude);
		},
		methods: {
			getList(pageNum, pageSize, lng, lat) {
				let that = this;
				this.httpTokenRequest({
					url: "/doctor/index/order_list",
					method: "POST",
					dataType: 'jsonp',
					data: {
						"page_no": pageNum,
						"page_size": pageSize,
						"longitude": lng,
						"latitude": lat
					},
					hideLoading: true,
				}).then(
					(res) => {
						if (res.data.code == 1) {
							if (res.data.data.list.length < 2) {
								uni.getSystemInfo({
									success(res) {
										that.heights = uni.upx2px(res.windowHeight * 2) + 30 + 'px';
									}
								});
							}
							for (let val in that.list) {
								let imgArr = [];
								for (let i in that.list[val].images) {
								    imgArr.push(that.list[val].images[i]);
								}
								that.list[val].images = imgArr;
							}
							if (that.list.length == res.data.data.total) { //没有数据
								that.status = 'noMore';
								uni.hideNavigationBarLoading(); //关闭加载动画
								uni.stopPullDownRefresh();
								return false;
							} else {
								that.list = that.list.concat(res.data.data.list); //将数据拼接在一起
								that.pageNum++;
								that.status = 'more'; //将loadingType归0重置
								uni.hideNavigationBarLoading(); //关闭加载动画
							}

						}
						uni.stopPullDownRefresh();
					}
				).catch(
					(err) => {
						console.log(err)

					}
				)
			},
			clickLocation() {
				uni.navigateTo({
					url: '/pages/index/orderLocation',
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
			showInfo(id) {
				uni.navigateTo({
					url: "/pages/index/showInfo?orderId=" + id,
					success: res => {},
					fail: (err) => {
						console.log(err)
					},
					complete: () => {}
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
		}
	});
</script>

<style scoped>
	.content {
		background: #F5F5F5;
	}

	.header {
		width: 100%;
		height: 150upx;
		padding: 30upx 30upx 0;
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;
		align-items: center;
		background: #FFFFFF;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 2;
	}

	.header_left {
		font-size: 36upx;
		color: #333333;
	}

	.header_right {
		font-size: 24upx;
		color: #999999;
	}

	.icon_bottom {
		width: 30upx;
		height: 30upx;
		margin-left: 21upx;
	}

	.main {
		width: 100%;
		padding: 150upx 30upx 0;
		box-sizing: border-box;
	}

	.item {
		width: 100%;
		border-radius: 10upx;
		background: #FFFFFF;
		overflow: hidden;
		margin-top: 30upx;
	}

	.null {
		width: 100%;
		text-align: center;
		margin-top: 200upx;
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
		bottom: 0;
		left: 0;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.footer_main {
		display: flex;
		align-items: center;
	}

	.footer_icon {
		width: 30upx;
		height: 30upx;
		margin-right: 12upx;
	}
</style>
