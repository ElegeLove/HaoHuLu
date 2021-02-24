<template>
	<view>
		<view class="header">
			<view class="userInfo">
				<image class="userInfo_log" :src="showInfo.head"></image>
				<view>
					<view class="userInfo_right">
						<text class="userInfo_name">{{showInfo.name}}</text>
						<view class="item_sex" v-if="showInfo.sex == 1">
							<image class="userInfo_sex" src="../../static/images/Homepage_man.png"></image>
							<text class="userInfo_val">男</text>
						</view>
						<view class="item_sex" v-if="showInfo.sex == 2">
							<image class="items_sex" src="../../static/images/Homepage_woman.png"></image>
							<text class="items_val">女</text>
						</view>
					</view>
					<view class="userInfo_num">执业资格证编号：{{showInfo.vocation_num}}</view>
				</view>
			</view>
			<view class="skill">擅长方向：{{showInfo.speciality}}</view>
			<view v-if="show">
				<view class="synopsis">个人简介：{{showInfo.desc}}</view>
				<view class="certificate">
					<image class="certificate_img" @tap="_previewImage(showInfo.vocation_card)" :src="showInfo.vocation_card"></image>
					<!-- <image class="certificate_img" src="../../static/images/img.png"></image> -->
				</view>
			</view>
			<view class="show">
				<view @tap="isShow">
					<text class="show_text">{{showText}}</text>
					<image class="show_img" :src="showImg"></image>
				</view>
			</view>
		</view>
		<view class="main">
			<view class="main_title">过往案例</view>
			<view>
				<video class="myVideo" v-if="showData" initial-time="4" v-for="(item,i) in videos" :key="i" :src="item" :poster="item + '?vframe/jpg/offset/1'" preload="auto" @error="videoErrorCallback"
				 @timeupdate="playDara" enable-danmu show-mute-btn controls></video>
				<view class="myVideo" v-else v-for="(item,j) in videos" :key="j"></view>
			</view>
			<image class="main_img" @tap="_previewImage(showInfo.cover_img)" :src="showInfo.cover_img"></image>
			<view class="main_text" v-html="showInfo.attach"></view>
			<view class="footer">
				<!-- <view style="position: relative;"> -->
					<!-- <video src="" style="position: absolute;bottom: 0;left: 0;"> -->
						<view class="main_btn" @tap="subscribe">我要预约</view>
					<!-- </video> -->
				<!-- </view> -->
			</view>
		</view>
		<uni-popup ref="popup" type="center">
			<view class="popmain">
				<view class="poptop">
					<view class="">确认预约</view>
					<image class="popImg" @tap="cancel" src="../../static/images/Details_cancelled.png" mode=""></image>
				</view>
				<view class="poptext">
					<view>要预约该医生吗？</view>
					<view>预约后客服将会联系您</view>
				</view>
				<!-- <view class="poptexts">预约后客服将会联系您</view> -->
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
				showData: true,
				show: false,
				showText: '展开',
				showImg: '../../static/images/Icon_expand.png',
				showInfo: {
					speciality: '',
					vocation_num: '',
					desc: ''
				},
				videos: [],
				mainText: '<p>一、会员等级说明</p><br/><p>1.什么是"会员等级"方案？</p><p>这是为会员打造定制的一套回馈、增值奖励方案，会员级别越高享受的权益越多，更多的权益策略将在不断完善中，敬请期待。</p>'
			}
		},
		onLoad: function(option) {
			let that = this;
			this.httpTokenRequest({
				url: "/member/banner/get_case_details",
				method: "POST",
				dataType: 'jsonp',
				data: {
					id: option.id
				},
				hideLoading: true,
			}).then(
				(res) => {
					if (res.data.code == 1) {
						that.showInfo = res.data.data.list;
						that.showInfo.attach = res.data.data.list.attach.replace(/<img/g,
							'<img style="width:100% !important;height:auto !important"')
						let arr = []
						for (let i in res.data.data.list.videos) {
							arr.push(res.data.data.list.videos[i]); //属性
							//arr.push(obj[i]); //值
							// that.getVideo();
						}
						that.videos = arr;
					}
					// let arr = []
					// for (let i in that.showInfo.videos) {
					//     arr.push(that.showInfo.videos[i]); //属性
					//     //arr.push(obj[i]); //值
					// }
					// that.imgArr = arr;
					// console.log(that.imgArr)
				}
			).catch(
				(err) => {
					console.log(err)

				}
			)
			that.getVideo();
		},
		methods: {
			getVideo() {
				// 视频------视频截图 ~~ 视频播放状态 ~~
				const setMedia = function(video, scale = 0.8) {
					// 设置poster属性：（非本地视频资源会有跨域截图问题）
					video.addEventListener('loadeddata', function(e) {
						// 拿到图片
						let canvas = document.createElement('canvas');
						canvas.width = video.videoWidth * scale;
						canvas.height = video.videoHeight * scale;
						canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
						let src = canvas.toDataURL('image/png');
						// 显示在dom，测试用
						(function(flag = true) {
							if (!flag) {
								return;
							}
							let img = document.createElement('img');
							img.src = src;
							document.body.appendChild(img);
						})(0);
						// 设置属性
						video.setAttribute('poster', src);
					});
					// -------------------------------------------------------------------------------------

				};
				//视频：
				let videos = document.querySelectorAll('video');
				videos.forEach((video) => {
					setMedia(video);
				});
			},
			videoErrorCallback(e) {
				console.log(e)
			},
			playDara(e) {
				console.log(e)
			},
			userInfo() {
				uni.navigateTo({
					url: '/pages/My/PersonalInfo',
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
			_previewImage(image) {
				let imgArr = [];
				imgArr.push(image);
				//预览图片
				uni.previewImage({
					urls: imgArr,
					current: imgArr[0]
				});
			},
			isShow() {
				this.show = !this.show;
				if (this.show) {
					this.showText = '隐藏';
					this.showImg = '../../static/images/icon_up.png';
				} else {
					this.showText = '展开';
					this.showImg = '../../static/images/Icon_expand.png';
				}
			},
			subscribe() {
				this.$refs.popup.open()
				// this.showData = false;
			},
			cancel() {
				this.$refs.popup.close();
				// this.showData = true;
			},
			popSure() {
				let that = this;
				that.httpTokenRequest({
					url: "/member/member/add_arrange",
					method: "POST",
					dataType: 'jsonp',
					data: {
						"id": that.showInfo.id
					},
					hideLoading: true,
				}).then(
					(res) => {
						this.$refs.popup.close();
						this.showData = true;
						if (res.data.code == 1) {
							uni.showToast({
								title: '预约成功',
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
		}
	});
</script>

<style scoped>
	.header {
		width: 100%;
		padding: 0 30upx 30upx;
		box-sizing: border-box;
		box-shadow: 0upx 2upx 20upx 0upx rgba(144, 144, 144, 0.15);
	}

	.userInfo {
		display: flex;
		align-items: center;
	}

	.userInfo_log {
		width: 100upx;
		height: 100upx;
		border-radius: 50%;
		margin-right: 20upx;
	}

	.userInfo_right {
		display: flex;
		align-items: center;
	}

	.userInfo_name {
		font-size: 32upx;
		color: #000000;
	}

	.item_sex {
		display: flex;
		align-items: center;
	}

	.userInfo_sex {
		width: 30upx;
		height: 30upx;
		margin: 0 10upx 0 24upx;
	}

	.userInfo_val {
		font-size: 24upx;
		color: #666666;
	}

	.userInfo_num {
		font-size: 24upx;
		color: #999999;
	}

	.skill,
	.synopsis {
		font-size: 28upx;
		color: #333333;
		margin-top: 50upx;
	}

	.certificate {
		display: flex;
		align-items: center;
		margin-top: 40upx;
	}

	.certificate_img {
		width: 130upx;
		height: 130upx;
		border-radius: 10upx;
		margin-right: 20upx;
	}

	.show {
		width: 100%;
		text-align: center;
		margin-top: 70upx;
	}

	.show_text {
		font-size: 24upx;
		color: #333333;
		margin-right: 10upx;
	}

	.show_img {
		width: 20upx;
		height: 20upx;
	}

	.main {
		width: 100%;
		padding: 40upx 30upx 120upx;
		box-sizing: border-box;
	}

	.main_title {
		height: 29upx;
		line-height: 29upx;
		font-size: 36upx;
		color: #000000;
		border-left: 8upx solid #FFC833;
		padding-left: 13upx;
		margin-bottom: 29upx;
	}

	.myVideo,
	.main_img {
		width: 100%;
		height: 324upx;
		border-radius: 10upx;
		margin-top: 30upx;
		z-index: 0;
	}

	.main_text {
		width: 100%;
		font-size: 28upx;
		color: #333333;
		margin-top: 30upx;
	}

	.main_text img {
		width: 100% !important;
	}

	.footer {
		width: 100%;
		/* height: 88upx; */
		padding: 20upx 30upx 10upx;
		box-sizing: border-box;
		background-color: #FFFFFF;
		/* position: fixed;
		bottom: 0;
		left: 0; */
	}

	.main_btn {
		width: 100%;
		height: 88upx;
		font-size: 36upx;
		color: #333333;
		background: #FFC833;
		border-radius: 44upx;
		line-height: 88upx;
		text-align: center;
		z-index: 999999;
		/* margin-top: 10upx; */
	}

	.popmain {
		width: 600upx;
		height: 420upx;
		background: rgba(255, 255, 255, 1);
		border-radius: 10upx;
		/* padding: 50upx; */
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
		width: 40upx;
		height: 40upx;
		position: absolute;
		top: -20upx;
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
