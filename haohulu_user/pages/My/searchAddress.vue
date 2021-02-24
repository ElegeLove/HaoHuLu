<template>
	<view class="content">
		<view class="top">
			<view class="top_left">
				<view class="phoneVelLeft" @tap="goCountry">
					<text class="phoneText">{{adrss.name}}</text>
					<image class="phoneIcon" src="../../static/images/icon_bottom.png"></image>
				</view>
				<image class="phoneIcons" src="../../static/images/Address_search.png"></image>
				<input id='tipinput' class="uni-input top_input" :value="dataVal" @input="chagePhone" type="text" placeholder="输入小区名字等进行搜索" />
			</view>
			<text class="top_right" @tap="cancel">取消</text>
		</view>
		<scroll-view class="main" scroll-x="true" lower-threshold='50' @scrolltolower="lower">
			<view class="valNull" v-if="dataList.length<1">暂无数据</view>
			<view class="item" v-for="(list,i) in dataList" :key="i" @tap="addAddrss(list)">
				<view class="item_top">
					<view class="">{{list.name}}</view>
					<view class="item_top_right">
						<image class="phoneIcons" src="../../static/images/Address_distance.png"></image>
						<text>{{list.distance}}km</text>
					</view>
				</view>
				<view class="main_text">{{list.district}}</view>
				<!-- <view class="main_text">{{list.cityname}}{{list.adname}}</view> -->
			</view>
		</scroll-view>
	</view>
</template>

<!-- <script type="text/javascript" src="https://webapi.amap.com/maps?v=1.4.15&key=1506f02c200b53de982fae605398a55e&plugin=AMap.Autocomplete"></script> -->
<script>
	import uniIndexedList from '@/components/uni-indexed-list/uni-indexed-list.vue'
	import AMap from '@/components/amap-wx/amap-wx.js'
	export default {
		data() {
			return {
				dataVal: '',
				adrss: {
					"id": 2324,
					"pid": 2323,
					"shortname": "重庆",
					"name": "重庆市",
					"merger_name": "中国,重庆,重庆市",
					"pinyin": "chongqing",
					"code": "023",
					"zip_code": "400000",
					"first": "Z",
					"lng": "106.504962",
					"lat": "29.533155"
				},
				amapPlus: null,
				key: 'c4eca7fcd0c940b68beaa1cf3db3657c',
				dataList: [],
				state: ''
			}
		},
		onBackPress(options) {
			plus.key.hideSoftKeybord();
		},
		onLoad: function(option) {
			// uni.chooseLocation({
			// 	keyword: this.dataVal,
			// 	success: function(res) {
			// 		console.log('111')
			// 		console.log(res)
			// 		// console.log('位置名称：' + res.name);
			// 		// console.log('详细地址：' + res.address);
			// 		// console.log('纬度：' + res.latitude);
			// 		// console.log('经度：' + res.longitude);
			// 	}
			// });

			this.amapPlus = new AMap.AMapWX({
				key: this.key
			});
			let that = this;
			uni.getLocation({
				type: 'gcj02',
				geocode: true,
				success: function(res) {
					console.log(res)
					that.adrss.lng = res.longitude;
					that.adrss.lat = res.latitude;
					that.getAdrss(that.adrss, that.dataVal);
					// that.adrssVal = res;
					// that.adrss.address = res.address.street;
					// that.list = [];
					// that.getList(1, 5, res.longitude, res.latitude);
				},
				fail: function(err) {
					uni.showModal({
						title: JSON.stringify(err),
						icon: "none"
					})
				}
			});

		},
		onShow: function(option) {
			this.getAdrss(this.adrss, this.dataVal);
			uni.stopPullDownRefresh();

		},
		onPullDownRefresh() {
			// setTimeout(function() {
			// 	uni.stopPullDownRefresh();
			// }, 1000);
			this.getAdrss(this.adrss, this.dataVal);
		},
		methods: {
			goCountry() {
				uni.navigateTo({
					url: "/pages/My/optCity",
					success: res => {},
					fail: (err) => {
						console.log(err)
					},
					complete: () => {}
				});
			},
			chagePhone(e) {
				this.dataVal = e.target.value;
				this.getAdrss(this.adrss, this.dataVal)
			},
			getAdrss(obj, val) {
				let that = this;
				// uni.chooseLocation({
				// 	keyword: val,
				// 	success: function(res) {
				// 		console.log(res)
				// 		// console.log('位置名称：' + res.name);
				// 		// console.log('详细地址：' + res.address);
				// 		// console.log('纬度：' + res.latitude);
				// 		// console.log('经度：' + res.longitude);
				// 	}
				// });

				// self.getInputtips(e.target.value,['', ''], '');

				that.amapPlus.getInputtips({
					location: obj.lng + ',' + obj.lat,
					city: obj.name,
					citylimit: true,
					keywords: val,
					success: function(data) {
						// console.log(data)
						that.dataList = [];
						if (data.tips) {
							data.tips.forEach((item, i) => {
								if(item.location){
									let location = item.location.split(',')
									let latlng = {
										lat: location[1],
										lng: location[0]
									}
									item.distance = that.getDistance(obj,latlng);
								}else{
									item.distance = 0;
								}
								
							})
							that.dataList = data.tips;
						}
						uni.stopPullDownRefresh();
					},
					fail: function(err) {
						that.shoeLoding = false;
						uni.stopPullDownRefresh();
					}
				})

				// that.dataList = [];
				// that.amapPlus.getPoiAround({
				// 	location: obj.lng + ',' + obj.lat,
				// 	keywords: val,
				// 	city: obj.name,
				// 	citylimit:true,
				// 	success: function(data) {
				// 		// that.mapResult = data.poisData;
				// 		// for (var i = 0, len = that.mapResult.length; i < len; i++) {
				// 		// 	that.mapResult[i].check = false;
				// 		// }
				// 		// that.mapHiden = false;
				// 		// that.shoeLoding = false;
				// 		// console.log("回调成功1111111111: " + JSON.stringify(that.mapResult));
				// 		console.log(data)
				// 		if (data.poisData) {
				// 			that.dataList = data.poisData;
				// 			// that.getMapSta1(data.poisData, 0)
				// 		}
				// 	},
				// 	fail: function(err) {
				// 		console.log(err)
				// 		that.shoeLoding = false;
				// 	}
				// })

				// AMap.plugin('AMap.Autocomplete', function(){
				//   // 实例化Autocomplete
				//   var autoOptions = {
				//     //city 限定城市，默认全国
				//     city: '全国'
				//   }
				//   var autoComplete= new AMap.Autocomplete(autoOptions);
				//   autoComplete.search(e.target.value, function(status, result) {
				//     // 搜索成功时，result即是对应的匹配数据
				// 	console.log(result)
				//   })
				// })
			},
			getDistance(news, latlng) {
			    var lat = [news.lat, latlng.lat]
			    var lng = [news.lng, latlng.lng] 
			    var R = 6378137;
			    var dLat = (lat[1] - lat[0]) * Math.PI / 180;
			    var dLng = (lng[1] - lng[0]) * Math.PI / 180;
			    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(lat[0] * Math.PI / 180) * Math.cos(lat[1] * Math.PI / 180) * Math.sin(dLng / 2) * Math.sin(dLng / 2);
			    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
			    var d = R * c / 1000;
			    return Math.round(d * 100) / 100;
			},
			lower: function(e) {
				console.log(e)
				console.log(121212)
			},
			addAddrss(val) {
				let pages = getCurrentPages(); //获取所有页面栈实例列表
				let nowPage = pages[pages.length - 1]; //当前页页面实例
				let prevPage = pages[pages.length - 2]; //上一页页面实例
				prevPage.$vm.newAdrss = val; //修改上一页data里面的sh参数值为100
				uni.navigateBack({ //uni.navigateTo跳转的返回，默认1为返回上一级
					delta: 1
				});
			},
			cancel() {
				uni.navigateBack()
			}
		}
	}
</script>

<style scoped>
	.content {
		width: 100%;
		padding: 0 30upx;
		box-sizing: border-box;
	}

	.top {
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 30upx;
	}

	.top_left {
		width: 604upx;
		height: 80upx;
		padding: 27upx 0;
		box-sizing: border-box;
		border-radius: 40upx;
		background-color: #F5F5F5;
		display: flex;
		align-items: center;
		overflow: hidden;
	}

	.top_right {
		font-size: 30upx;
		font-family: 'PingFang SC';
		font-weight: 500;
		color: rgba(102, 102, 102, 1);
	}

	.phoneVelLeft {
		width: 130upx;
		height: 58upx;
		background: #F5F5F5;
		padding: 0 8upx 0 25upx;
		display: flex;
		align-items: center;
		margin-right: 34upx;
		border-right: 1upx solid #E1E1E1;
	}

	.phoneText {
		width: 92upx;
		white-space: nowrap;
		overflow: hidden;
		font-size: 24upx;
		font-family: 'PingFang SC';
		font-weight: 500;
		color: rgba(51, 51, 51, 1);
		line-height: 117upx;
	}

	.top_input {
		font-size: 28upx;
		font-family: 'PingFang SC';
		font-weight: 500;
		color: rgba(51, 51, 51, 1);
	}

	.item_top_right {
		display: flex;
		align-items: center;
	}

	.phoneIcon,
	.phoneIcons {
		width: 30upx;
		height: 30upx;
		margin-left: 24upx;
	}

	.phoneIcons {
		margin: 0;
		margin-right: 20upx;
	}

	.valNull {
		width: 100%;
		text-align: center;
		margin-top: 200upx;
	}

	.item {
		margin-top: 50upx;
		border-bottom: 1upx solid #E5E5E5;
	}

	.item_top {
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 30upx;
		font-family: 'PingFang SC';
		font-weight: 500;
		color: rgba(51, 51, 51, 1);
	}

	.main_text {
		font-size: 26upx;
		font-family: 'PingFang SC';
		font-weight: 500;
		color: rgba(153, 153, 153, 1);
		margin: 30upx 0;
	}
</style>
