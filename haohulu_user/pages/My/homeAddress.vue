<template>
	<view class="content">
		<scroll-view scroll-y="true" :style="{height:heights}">
			<view class="dataNull" v-if="adrssList.length < 1">暂无地址，请去添加地址</view>
			<view class="main" v-for="(item,i) in adrssList" :key="i">
				<view class="main_left" @tap="adrssInfo(item)">
					<view class="main_title">{{item.member_name}}（{{item.sex==1?'男':'女'}}）&nbsp;{{item.mobile}}</view>
					<view class="main_text">{{item.area_str}}{{item.address}}{{item.housenum}}</view>
				</view>
				<view class="item_right" @tap="updata(item)">
					<image src="../../static/images/Address_edit.png" mode=""></image>
				</view>
			</view>
			<view v-if="adrssList.length > 0">
				<uni-load-more :status="status" :content-text="contentText" color="#007aff" />
			</view>

		</scroll-view>
		<view class="btnBox">
			<view class="btn" @tap='newAdrss'>+&nbsp;新增地址</view>
		</view>
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
				adrssList: [],
				heights: '',
				status: 'more',
				pageNum: 1,
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
		onShow: function() {
			this.pageNum = 1;
			let that = this;
			uni.getSystemInfo({
				success(res) {
					that.heights = uni.upx2px(res.windowHeight * 2) + 'px';
				}
			});
			this.getAdrssList(this.pageNum, 5);
		},
		//下拉刷新
		onPullDownRefresh: function() {
			this.adrssList = [];
			this.pageNum = 1;
			this.getAdrssList(this.pageNum, 5);
			// setTimeout(function(){  
			// 	uni.stopPullDownRefresh();  
			// },1000)  
		},
		// 上拉加载
		onReachBottom: function() {
			let _self = this
			if (_self.status != 'more') { //loadingType!=0;直接返回
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
			_self.getAdrssList(_self.pageNum, 5);
		},
		methods: {
			getAdrssList(pageNum, pageSize) {
				let that = this;
				this.httpTokenRequest({
					url: "/member/address/get_address",
					method: "POST",
					dataType: 'jsonp',
					data: {
						"page_no": pageNum,
						"page_size": pageSize
					},
					hideLoading: true,
				}).then(
					(res) => {
						console.log(res)
						if (res.data.code == 1) {
							// that.adrssList = res.data.data.result;

							if (that.adrssList.length == res.data.data.total) { //没有数据
								that.status = 'noMore';
								uni.hideNavigationBarLoading(); //关闭加载动画
								return false;
							} else {
								that.adrssList = that.adrssList.concat(res.data.data.result); //将数据拼接在一起
								that.pageNum++
								// for(var i=that.orderList.length;i<res.data.data.total;i++){
								// }
								that.status = 'more'; //将loadingType归0重置
								uni.hideNavigationBarLoading(); //关闭加载动画
							}
							uni.stopPullDownRefresh();
						} else {
							uni.showToast({
								title: res.data.msg,
								icon: 'none',
								duration: 2000
							});
						}
						uni.stopPullDownRefresh();
					}
				).catch(
					(err) => {
						console.log(err)

					}
				)
			},
			newAdrss() {
				uni.navigateTo({
					url: "/pages/My/newHomeAddress",
					success: res => {},
					fail: (err) => {
						console.log(err)
					},
					complete: () => {}
				});
			},
			adrssInfo(val) {
				let pages = getCurrentPages(); //获取所有页面栈实例列表
				let nowPage = pages[pages.length - 1]; //当前页页面实例
				let prevPage = pages[pages.length - 2]; //上一页页面实例
				// prevPage.$vm.$refs.discovery.callBack(val)
				prevPage.$vm.newAdrssval = val; //修改上一页data里面的sh参数值为100
				uni.navigateBack({ //uni.navigateTo跳转的返回，默认1为返回上一级
					delta: 1
				});
			},
			updata(val) {
				uni.navigateTo({
					url: "/pages/My/newHomeAddress?adrssVal=" + JSON.stringify(val),
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
	.content {
		width: 100%;
		padding: 10upx 30upx 134upx;
		box-sizing: border-box;
	}

	.dataNull {
		width: 100%;
		text-align: center;
		padding-top: 200upx;
	}

	.main {
		width: 100%;
		margin-bottom: 50upx;
		border-bottom: 1upx solid #E5E5E5;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.main_left {
		font-family: 'PingFang SC';
		font-weight: 500;
	}

	.main_text {
		width: 600upx;
		font-size: 26upx;
		color: rgba(153, 153, 153, 1);
		margin: 30upx 0;
	}

	.main_title {
		font-size: 30upx;
		color: rgba(51, 51, 51, 1);
	}

	.item_right {
		width: 70upx;
		height: 70upx;
		border-radius: 50%;
		z-index: 20;
	}

	.item_right image {
		width: 100%;
		height: 100%;
	}

	.btnBox {
		width: 100%;
		height: 134upx;
		background-color: #FFFFFF;
		padding: 23upx 30upx;
		box-sizing: border-box;
		position: fixed;
		left: 0;
		bottom: 0;
	}

	.btn {
		width: 100%;
		height: 88upx;
		border-radius: 44upx;
		background-color: #FFC833;
		font-size: 36upx;
		font-family: 'PingFang SC';
		font-weight: 500;
		color: rgba(51, 51, 51, 1);
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
