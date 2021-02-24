<template>
	<view>
		<view class="top">
			<text class="top_loc">当前定位</text>
			<view class="top_text" @tap="newAdrss">
				<image class="top_img" src="../../static/images/Doctor_location.png" mode=""></image>
				<text>重新定位</text>
			</view>
		</view>
		<view class="top adrss_text nowAdrss" @tap="goAdrssNow">
			{{adrssText}}
		</view>
		<view class="main_title">
			常用地址
		</view>
		<scroll-view scroll-y="true" class="list">
			<!-- <view class="item" v-for="(item,i) in listData" :key="i" @touchstart="anxia" @touchend="taiqi" @tap="goAdrss(item)" @longtap="del(item.address_id)"> -->
			<view class="item" v-for="(item,i) in listData" :key="i" @tap="goAdrss(item)" @longpress="del(item.address_id)">
				<view class="adrss_text">{{item.area_str}}</view>
				<view class="item_text">{{item.address}}</view>
			</view>
		</scroll-view>
		<view class="btn">
			<view class="main_btn" @tap="clickPing">
				<text>+&nbsp;添加常用地址</text>
			</view>
		</view>
		<!-- <uni-pop ref="uniPop"></uni-pop> -->
		<uni-popup ref="popup" type="center">
			<view class="popmain">
				<view class="poptop">
					<view class="">确认删除</view>
					<image class="popImg" @tap="cancel" src="../../static/images/Details_cancelled.png" mode=""></image>
				</view>
				<view class="poptext">要删除该常用地址吗？</view>
				<view class="popbtns">
					<view class="popbtn" @tap="cancel">取消</view>
					<view class="popbtn popsure" @tap="popSure">确定</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import uniPopup from "@/components/uni-popup/uni-popup.vue"
	export default {
		components: {
			uniPopup
		},
		data() {
			return {
				adrssVal: '',
				adrssObj: {},
				listData: [],
				adrssText: '',
				delId: '',
				indexi:0
			}
		},
		onShow: function() {
			this.getCommon(1, 10);
			let that = this;
			uni.getLocation({
				type: 'wgs84',
				geocode: true,
				success: function(res) {
					that.adrssText = res.address.city + res.address.district + res.address.street;
					that.adrssObj = res;
					// console.log('当前位置的经度：' + res.longitude);
					// console.log('当前位置的纬度：' + res.latitude);
				}
			});
			// var that = this;
			// that.httpTokenRequest({
			// 	url: "/doctor/address/get_list",
			// 	method: "POST",
			// 	dataType: 'jsonp',
			// 	data: {
			// 		"page_no": 1,
			// 		"page_size": 1
			// 	},
			// 	hideLoading: true,
			// }).then(
			// 	(res) => {
			// 		console.log(res)
			// 		if (res.data.code == 1) {
			// 			that.listData = res.data.data.list;
			// 		}
			// 	}
			// ).catch(
			// 	(err) => {
			// 		console.log(err)
			// 	}
			// )
		},
		methods: {
			getCommon(pageNum, pageSize) {
				let that = this;
				this.httpTokenRequest({
					url: "/doctor/address/get_list",
					method: "POST",
					dataType: 'jsonp',
					data: {
						"page_no": pageNum,
						"page_size": pageSize
					},
					hideLoading: true,
				}).then(
					(res) => {
						if (res.data.code == 1) {
							that.listData = res.data.data.list;
							console.log(that.listData)
						}
					}
				).catch(
					(err) => {
						console.log(err)
					}
				)
			},
			chageAdrss(e) {
				this.adrssVal = e.target.value;
			},
			newAdrss() {
				let that = this;
				uni.getLocation({
					type: 'wgs84',
					geocode: true,
					success: function(res) {
						console.log(res)
						that.adrssText = res.address.city + res.address.district + res.address.street;
						that.adrssObj = res;
						// console.log('当前位置的经度：' + res.longitude);
						// console.log('当前位置的纬度：' + res.latitude);
					},
					fail: (err) => {
						console.log(err)
					}
				});
			},
			// anxia() {
			// 	let num = 0;
			// 	this.time = setInterval(function() {
			// 		num++
			// 		this.indexi = num;
			// 		console.log(this.indexi)
			// 	}, 1000)
			
			// },
			// taiqi() {
			// 	clearInterval(this.time);
				
			// 	console.log(this.indexi)
			// 	if (this.indexi < 3) {}
			
			// },
			goAdrss(val) {
				let pages = getCurrentPages(); //获取页面栈
				//获取到返回的页面对象
				let prevPage = pages[pages.length - 2];
				prevPage.$vm.adrss = val; //app端写法
				// prevPage.custemOnReady(); //调用列表页面方法
				uni.navigateBack({
					delta: 1,
					animationType: 'slide-out-right'
				}) //返回到列表页面
			},
			goAdrssNow() {
				let pages = getCurrentPages(); //获取所有页面栈实例列表
				let nowPage = pages[pages.length - 1]; //当前页页面实例
				let prevPage = pages[pages.length - 2]; //上一页页面实例
				console.log(prevPage.$vm)
				prevPage.$vm.adrss = this.adrssObj; //修改上一页data里面的sh参数值为100
				uni.navigateBack({ //uni.navigateTo跳转的返回，默认1为返回上一级
					delta: 1
				});
			},
			del(id) {
				this.delId = id;
				var that = this;
				this.$refs.popup.open()

				// uni.showModal({
				// 	title: '确认删除',
				// 	content: '要删除该常用地址吗？',
				// 	confirmColor: '#000000',
				// 	success: function(res1) {
				// 		if (res1.confirm) {
				// 			this.httpTokenRequest({
				// 				url: "/doctor/address/address_del",
				// 				method: "POST",
				// 				dataType: 'jsonp',
				// 				data: {
				// 					"address_id": id
				// 				},
				// 				hideLoading: true,
				// 			}).then(
				// 				(res) => {
				// 					console.log(res)
				// 					// if(res.data.code == 1){
				// 					// 	that.listData = res.data.data.list;
				// 					// }
				// 				}
				// 			).catch(
				// 				(err) => {
				// 					console.log(err)

				// 				}
				// 			)
				// 		} else if (res1.cancel) {
				// 			console.log('用户点击取消');
				// 		}
				// 	}
				// });
			},
			cancel() {
				this.$refs.popup.close();
			},
			popSure() {
				this.httpTokenRequest({
					url: "/doctor/address/address_del",
					method: "POST",
					dataType: 'jsonp',
					data: {
						"address_id": this.delId
					},
					hideLoading: true,
				}).then(
					(res) => {
						this.$refs.popup.close();
						if (res.data.code == 1) {
							this.getCommon(1, 10);
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
			},
			clickPing() {
				uni.navigateTo({
					url: '/pages/index/incAddress',
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			}
		}
	}
</script>

<style scoped>
	.top {
		width: 100%;
		padding: 0 30upx;
		box-sizing: border-box;
		line-height: 60upx;
		font-family: 'PingFang SC';
		font-weight: 500;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.top_loc {
		font-size: 24upx;
		color: rgba(153, 153, 153, 1);
	}

	.top_text {
		display: flex;
		align-items: center;
		font-size: 24upx;
		color: rgba(255, 181, 0, 1);
	}

	.top_img {
		width: 50upx;
		height: 50upx;
	}

	.nowAdrss {
		padding-top: 30upx;
		padding-bottom: 30upx;
		border-bottom: 20upx solid #F5F5F5;
	}

	.adrss_text {
		font-size: 30upx;
		font-family: 'PingFang SC';
		font-weight: 500;
		color: rgba(51, 51, 51, 1);
	}

	.main_title {
		width: 100%;
		padding: 0 30upx;
		margin-top: 40upx;
		box-sizing: border-box;
		font-size: 24upx;
		font-family: 'PingFang SC';
		font-weight: 500;
		color: rgba(153, 153, 153, 1);
	}

	.list {
		width: 100%;
		padding: 0 30upx;
		box-sizing: border-box;
		margin-top: 20upx;
	}

	.item {
		margin-top: 50upx;
		font-size: 26upx;
		font-family: 'PingFang SC';
		font-weight: 500;
		color: rgba(153, 153, 153, 1);
	}

	.item_text {
		padding: 30upx 0;
		border-bottom: 1upx solid #E5E5E5;
	}

	.btn {
		width: 100%;
		padding: 0 30upx;
		box-sizing: border-box;
		position: fixed;
		left: 0;
		bottom: 0;
		background-color: #FFFFFF;
	}

	.main_btn {
		width: 100%;
		height: 88upx;
		margin: 20upx 0;
		background: rgba(255, 200, 51, 1);
		border: 1upx solid rgba(255, 200, 51, 1);
		border-radius: 44upx;
		font-size: 36upx;
		font-family: 'PingFang SC';
		font-weight: 500;
		color: rgba(51, 51, 51, 1);
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.popmain {
		width: 600upx;
		height: 486upx;
		background: rgba(255, 255, 255, 1);
		border-radius: 10upx;
		padding: 50upx;
		box-sizing: border-box;
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

	.popImg {
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
