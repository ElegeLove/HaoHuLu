<template>
	<view class="content">
		<view class="list listHeader">
			<view class="list_left">
				<text class="main_txt">头像</text>
			</view>
			<view class="icon_img">
				<!-- <image class="icon_left" src="../../static/images/logo.png" alt="" srcset=""> -->
				<view class="item-right" @tap="cardImg">
					<!-- userinfo.headimgurl是用户登陆的头像也就是未更改时的头像 changeimg是用户更改后的头像 -->
					<image class="icon_left" :src="cardimgurl || cardimg" mode=""></image>
				</view>
				<image class="icon_right" src="../../static/images/Publish_arrow.png" alt="" srcset="">
			</view>
		</view>
		<view class="list" @tap="unpdataUser">
			<view class="list_left">
				<text class="main_txt">用户名</text>
			</view>
			<view class="icon_img">
				<text class="icon_name">{{nameVal.name}}</text>
				<image class="icon_right" src="../../static/images/Publish_arrow.png" alt="" srcset="">
			</view>
		</view>
		<view class="list" @tap="aboutUs">
			<view class="list_left">
				<text class="main_txt">关于好葫芦</text>
			</view>
			<image class="icon_right" src="../../static/images/Publish_arrow.png" alt="" srcset="">
		</view>
		<view class="list_btn" @tap="goOut">退出登录</view>
		<uni-popup ref="popup" type="center">
			<view class="popmain">
				<view class="poptop">
					<view class="">确认退出</view>
					<image class="popImg" @tap="cancel" src="../../static/images/Details_cancelled.png" mode=""></image>
				</view>
				<view class="poptext">要退出该账号吗？</view>
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
	export default({
		components: {
			uniPopup
		},
		data() {
			return {
				userName: '',
				nameVal: {},
				cardimgurl: '../../static/images/logo.png',
				cardimg: '',
			}
		},
		onShow: function() {
			this.getUserInfo();
		},
		methods: {
			getUserInfo(){
				let that = this;
				this.httpTokenRequest({
					url: "/member/member/get_member_info",
					method: "POST",
					dataType: 'jsonp',
					data: {},
					hideLoading: true,
				}).then(
					(res) => {
						if (res.data.code == 1) {
							that.nameVal = res.data.data.result;
							that.cardimgurl = res.data.data.result.head;
						}
					}
				).catch(
					(err) => {
						console.log(err)
				
					}
				)
			},
			onBackPress(options) {
				let pages = getCurrentPages();  //获取所有页面栈实例列表
				let nowPage = pages[ pages.length - 1];  //当前页页面实例
				let prevPage = pages[ pages.length - 2 ];  //上一页页面实例
				prevPage.$vm.$refs.data.getOrderList()
				// prevPage.$vm.specialCase = this.detalVal;   //修改上一页data里面的sh参数值为100
				// uni.navigateBack({  //uni.navigateTo跳转的返回，默认1为返回上一级
				//     delta: 1
				// });
			},
			cardImg() {
				let that = this;
				uni.chooseImage({
					count: 1,
					success: (chooseImageRes) => {
						const tempFilePaths = chooseImageRes.tempFilePaths;
						that.cardimgurl = '';
						that.cardimg = chooseImageRes.tempFiles[0].path;
						console.log(that.cardimg)
						uni.uploadFile({
							url: "http://haohulu.mx5918.com/index.php/share/upload/index",
							filePath: chooseImageRes.tempFiles[0].path,
							name: 'file',
							success: (res) => {
								let data = JSON.parse(res.data)
								if (data.code == 1) {
									that.vocation_card = data.data.attachment_id;
									that.httpTokenRequest({
										url: "/member/member/edit_head",
										method: "POST",
										dataType: 'jsonp',
										data: {
											attachment_id: data.data.attachment_id
										},
										hideLoading: true,
									}).then(
										(ress) => {
											if (ress.data.code == 1) {
												that.httpTokenRequest({
													url: "/member/member/edit_head",
													method: "POST",
													dataType: 'jsonp',
													data: {
														"attachment_id": ress.data.data.attachment_id
													},
													hideLoading: true,
												}).then(
													(res) => {
														if (res.data.code == 1) {
															// that.getUserInfo();
															uni.showToast({
																title: '上传成功',
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
											} else {
												uni.showToast({
													title: ress.data.msg,
													icon: 'none',
													duration: 2000
												});
											}
										}
									).catch(
										(errs) => {
											uni.showToast({
												title: JSON.stringify(errs),
												icon: 'none',
												duration: 2000
											});
										}
									)
								}
							},
							fail: (err) => {
								uni.showToast({
									title: JSON.stringify(err),
									icon: 'none',
									duration: 2000
								});
							}
						});
					}
				});
			},
			aboutUs() {
				uni.navigateTo({
					url: '/pages/My/About',
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
			goOut() {
				this.$refs.popup.open()
			},
			cancel() {
				this.$refs.popup.close();
			},
			popSure(){
				let that = this;
				that.httpTokenRequest({
					url: "/member/member/logout",
					method: "POST",
					dataType: 'jsonp',
					data: {},
					hideLoading: true,
				}).then(
					(res) => {
						console.log(res)
						this.$refs.popup.close();
						if (res.data.code == 1) {
							uni.removeStorage({
								key: 'token',
								success: function(res) {
									uni.reLaunch({
										url: '/pages/Login/login',
										success: res => {},
										fail: () => {},
										complete: () => {}
									});
								}
							});
						}
					}
				).catch(
					(err) => {
						console.log(err)
					}
				)
			},
			unpdataUser() {
				uni.navigateTo({
					url: '/pages/My/userName',
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
		width: 100%;
		padding: 0 30upx;
		box-sizing: border-box;
	}

	.list {
		width: 100%;
		height: 90upx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-bottom: 1upx solid #E5E5E5;
		padding: 20upx 0;
	}
	.list_left {
		display: flex;
		align-items: center;
	}

	.icon_img {
		display: flex;
		align-items: center;
	}

	.icon_left {
		width: 90upx;
		height: 90upx;
		border-radius: 50%;
	}

	.icon_right {
		width: 30upx;
		height: 30upx;
		margin-left: 18upx;
	}

	.icon_name {
		font-size: 30upx;
		color: #999999;
	}

	.main_txt {
		font-size: 30upx;
		color: #323232;
	}

	.list_btn {
		width: 100%;
		height: 88upx;
		border-radius: 44upx;
		background-color: #FFC833;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 36upx;
		color: #333333;
		margin-top: 148upx;
	}
	.popmain {
		width: 500upx;
		height: 380upx;
		background: rgba(255, 255, 255, 1);
		border-radius: 10upx;
		padding: 0 30upx 20upx;
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
