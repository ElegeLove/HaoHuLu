<template>
	<view class="content">
		<view class="page-section-spacing" :dots-styles="dotsStyles">
			<!-- <swiper class="swiper" 
				indicator-dots="true" 
				autoplay="true" 
				interval="2000" 
				duration="500"
				circular="true"
				previousMargin= '58upx'
				nextMargin= '58upx'>
				<swiper-item v-for="(item , index) in banList" :key="index" @click="gotobannerInfo(item.id)">
					<image :src="item.url" mode="aspectFill"></image>
				</swiper-item>
			</swiper> -->
			<special-banner :banner-list="banList" :swiper-config="swiperConfig"></special-banner>
		</view>
		<view class="main">
			<view class="title">平台案例</view>
			<view class="items" @click="gotoInfo(item.id)" v-for="(item,i) in terraceVal" :key="i">
				<view class="items_Info">
					<image class="items_log" :src="item.head"></image>
					<text class="items_name">{{item.name}}</text>
					<view class="item_sex" v-if="item.sex == 1">
						<image class="items_sex" src="../../static/images/Homepage_man.png"></image>
						<text class="items_val">男</text>
					</view>
					<view class="item_sex" v-if="item.sex == 2">
						<image class="items_sex" src="../../static/images/Homepage_woman.png"></image>
						<text class="items_val">女</text>
					</view>
				</view>
				<image class="items_img" :src="item.cover_img" v-if="item.cover_img && item.cover_img != null"></image>
				<view class="items_text">{{item.desc}}</view>
			</view>
			<!-- <view class="items" @click="gotoInfo">
				<view class="items_Info">
					<image class="items_log" src="../../static/images/logo.png"></image>
					<text class="items_name">李医生</text>
					<image class="items_sex" src="../../static/images/Homepage_woman.png"></image>
					<text class="items_val">女</text>
				</view>
				<image class="items_img" src="../../static/images/banner_1.png"></image>
				<view class="items_text">医生，钻研学习医学科学技术，挽救生命以治病为业的人一般指临床医生。按照卫生部、卫健委，挽救生命以治病为业的人一般指临床医生。按照卫生部、卫健委，挽救生命以治病为业的人一般指临床医生。按照卫生部、卫健委</view>
			</view> -->
		</view>
	</view>
</template>

<script>
	import Vue from 'vue';
	import specialBanner from '@/components/EtherealWheat-banner/specialBanner.vue'
	export default Vue.extend({
		components: {
			specialBanner
		},
		data() {
			return {
				banList: [
				],
				swiperConfig: {
					indicatorDots: true,
					autoplay: true,
					interval: 3000,
					duration: 300,
					circular: true,
					previousMargin: '58upx',
					nextMargin: '58upx'
				},
				terraceVal: [],
				dotsStyles: {
					bottom: 10
				}
			}
		},
		onShow: function(option) {
			this.getHomeSlideFunc();
		},
		methods: {
			getHomeSlideFunc() {
				let that = this;
				this.httpTokenRequest({
					url: "/member/banner/get_banner_list",
					method: "GET",
					dataType: 'jsonp',
					data: {},
					hideLoading: true,
				}).then(
					(res) => {
						if (res.data.code == 1) {
							that.banList = res.data.data.list;
						}
					}
				).catch(
					(err) => {
						console.log(err)
				
					}
				)
				this.httpTokenRequest({
					url: "/member/banner/get_case",
					method: "GET",
					dataType: 'jsonp',
					data: {},
					hideLoading: true,
				}).then(
					(res) => {
						if (res.data.code == 1) {
							that.terraceVal = res.data.data.list;
						}
					}
				).catch(
					(err) => {
						console.log(err)
				
					}
				)
			},
			// gotobannerInfo(id) {
			// 	uni.navigateTo({
			// 		url: "/pages/index/bannerInfo?id=" + id,
			// 		success: res => {},
			// 		fail: (err) => {
			// 			console.log(err)
			// 		},
			// 		complete: () => {}
			// 	});
			// },
			gotoInfo(id) {
				uni.navigateTo({
					url: "/pages/index/showInfo?id=" + id,
					success: res => {},
					fail: (err) => {
						console.log(err)
					},
					complete: () => {}
				});
			},
		}
	});
</script>

<style scoped>
	.content {
		/* background: #F5F5F5; */
		padding-top: 50upx;
	}

	.swiper {
		width: 100%;
		/* margin: 0 auto; */
		height: 500upx;
		/* padding: 0 60upx;
		box-sizing: border-box; */
	}

	swiper-item image {
		width: 100%;
		height: 450upx;
		/* margin: 0 20upx; */
		/* margin: 0 10%; */
		/* width: 640upx;
		margin: 0 auto;
		height: 370upx; */
		/* padding: 0 100upx; */
		/* box-sizing: border-box; */
	}

	uni-swiper-item {
		overflow: visible;
		/* overflow: auto; */
	}

	uni-image {
		overflow: visible;
	}

	.main {
		width: 100%;
		padding: 0 30upx 120upx;
		box-sizing: border-box;
	}

	.title {
		font-size: 40upx;
		color: #000000;
	}

	.items {
		margin-top: 50upx;
	}

	.items_Info {
		display: flex;
		align-items: center;
		margin-bottom: 26upx;
	}

	.items_log {
		width: 70upx;
		height: 70upx;
		border-radius: 50%;
	}

	.items_name {
		color: #000000;
		font-size: 32upx;
		margin: 0 24upx 0 22upx;
	}

	.items_val {
		font-size: 24upx;
		color: #666666;
	}

	.item_sex {
		display: flex;
		align-items: center;
	}

	.items_sex {
		width: 30upx;
		height: 30upx;
	}

	.items_img {
		width: 100%;
		height: 324upx;
		border-radius: 10upx;
	}

	.items_text {
		margin-top: 30upx;
		font-size: 28upx;
		color: #333333;
		overflow: hidden;
		word-break: break-all;
		/* break-all(允许在单词内换行。) */
		text-overflow: ellipsis;
		/* 超出部分省略号 */
		display: -webkit-box;
		/** 对象作为伸缩盒子模型显示 **/
		-webkit-box-orient: vertical;
		/** 设置或检索伸缩盒对象的子元素的排列方式 **/
		-webkit-line-clamp: 2;
	}
</style>
