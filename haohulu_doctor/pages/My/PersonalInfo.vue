<template>
	<view>
		<view class="main">
			<view class="user_icon">
				<text class="user_text">头像</text>
				<!-- <image class="user_img" src="../../static/images/logo.png" alt="" srcset=""> -->
				<view class="user_img" @tap="userImgs">
					<!-- userinfo.headimgurl是用户登陆的头像也就是未更改时的头像 changeimg是用户更改后的头像 -->
					<image class="user_img" :src="userimgurl || changeUserimg" mode=""></image>
				</view>
			</view>
			<view class="userName">
				<text class="user_text">姓名</text>
				<input class="user_name fontSize" maxlength="10" :value="nameVal" @input="chageName" type="text" placeholder="请填写姓名" placeholder-class="fontSize">
			</view>
			<view class="sex_main">
				<text class="user_text">性别</text>
				<view class="user_sex fontSize">
					<view class="sex_left" @tap="sexchage(0)">
						<image class="sex_img" :src="sexIndex==0?'../../static/images/Publish_selected.png':'../../static/images/Release_notselected.png'"
						 alt="" srcset="">
							<text>女</text>
					</view>
					<view class="sex_right" @tap="sexchage(1)">
						<image class="sex_img" :src="sexIndex==1?'../../static/images/Publish_selected.png':'../../static/images/Release_notselected.png'"
						 alt="" srcset="">
							<text>男</text>
					</view>
				</view>
			</view>
		</view>
		<view class="IDCard">身份证信息</view>
		<view class="card_main">
			<view class="user_icon">
				<text class="item-title">人像面照片</text>
				<view class="item-right" @tap="changeImg">
					<!-- userinfo.headimgurl是用户登陆的头像也就是未更改时的头像 changeimg是用户更改后的头像 -->
					<image class="headimgsize" :src="headimgurl || changeimg" mode=""></image>
				</view>
			</view>
			<view class="user_icon">
				<text class="item-title">国徽面照片</text>
				<view class="item-right" @tap="changeImgs">
					<!-- userinfo.headimgurl是用户登陆的头像也就是未更改时的头像 changeimg是用户更改后的头像 -->
					<image class="headimgsize" :src="headimgurls || changeimgs" mode=""></image>
				</view>
			</view>
			<view class="userName noborder">
				<text class="user_text">身份证号码</text>
				<input class="user_name fontSize" maxlength="18" :value="idcard_num" @input="chageCarId" type="number" placeholder="请填写身份证号码" placeholder-class="fontSize">
			</view>
		</view>
		<view class="IDCard">执业资格证信息</view>
		<view class="card_main">
			<view class="user_icon">
				<text class="item-title">证件照片</text>
				<view class="item-right" @tap="cardImg">
					<!-- userinfo.headimgurl是用户登陆的头像也就是未更改时的头像 changeimg是用户更改后的头像 -->
					<image class="headimgsize" :src="cardimgurl || cardimg" mode=""></image>
				</view>
			</view>
			<view class="userName">
				<text class="user_text">证件编号</text>
				<input class="user_name fontSize" maxlength="25" :value="code" @input="chageCode" type="number" placeholder="请填写证件编号" placeholder-class="fontSize">
			</view>
		</view>
		<view class="order_box">
			<view class="order_btn" @tap="next">
				<text>下一步</text>
			</view>
		</view>
	</view>
</template>

<script>
	// import Ctpic from '@/components/custom-picture/custom-picture.js';
	export default ({
		data() {
			return {
				nameVal: '',
				sexIndex: 3,
				idcard_num: '',
				userimgurl: '../../static/images/logo.png',
				changeUserimg: '',
				headimgurl: '../../static/images/Doctor_add.png',
				changeimg: '',
				headimgurls: '../../static/images/Doctor_add.png',
				changeimgs: '',
				cardimgurl: '../../static/images/Doctor_add.png',
				cardimg: '',
				code: '',
				head: '',
				idcard_before: '',
				idcard_after: '',
				vocation_card: ''
			}
		},
		onBackPress(options) {
			plus.key.hideSoftKeybord(); 
		},
		methods: {
			chageName(e) {
				this.nameVal = e.target.value;
			},
			sexchage(sex) {
				this.sexIndex = sex;
			},
			// sexchages(){
			//     this.sexIndex = 1;
			// },
			chageCarId(e) {
				this.idcard_num = e.target.value;
			},
			chageCode(e) {
				this.code = e.target.value;
			},
			getBase64Image(img) {
			    var canvas = document.createElement("canvas");
			    canvas.width = img.width;
			    canvas.height = img.height;
			    var ctx = canvas.getContext("2d");
			    ctx.drawImage(img, 0, 0, img.width, img.height);
			    var ext = img.src.substring(img.src.lastIndexOf(".") + 1).toLowerCase();
			    var dataURL = canvas.toDataURL("image/" + ext);
			    return dataURL;
			},
			userImgs() {
				let that = this;
				uni.chooseImage({
					count:1,
					sizeType: ['original', 'compressed'],
					success: (chooseImageRes) => {
						// console.log(chooseImageRes)
						const tempFilePaths = chooseImageRes.tempFilePaths;
						that.userimgurl = '';
						that.changeUserimg = tempFilePaths[0];
						uni.uploadFile({
							url: "http://haohulu.mx5918.com/index.php/share/upload/index",
							filePath: tempFilePaths[0],
							name: 'file',
							success: (res) => {
								let data = JSON.parse(res.data);
								if (data.code == 1) {
									that.head = data.data.attachment_id;
								}
							},
							fail: (err) => {
								console.log(err)
							}
						});
					}
				});
			},
			changeImg() {
				let that = this;
				uni.chooseImage({
					count:1,
					success: (chooseImageRes) => {
						const tempFilePaths = chooseImageRes.tempFilePaths;
						that.headimgurl = '';
						that.changeimg = tempFilePaths[0]
						uni.uploadFile({
							url: "http://haohulu.mx5918.com/index.php/share/upload/index",
							filePath: chooseImageRes.tempFiles[0].path,
							name: 'file',
							success: (res) => {
								let data = JSON.parse(res.data)
								console.log(data)
								if (data.code == 1) {
									that.idcard_before = data.data.attachment_id;
								}
							},
							fail: (err) => {
								console.log(err)
							}
						});
					}
				});
			},
			changeImgs() {
				let that = this;
				uni.chooseImage({
					count:1,
					success: (chooseImageRes) => {
						const tempFilePaths = chooseImageRes.tempFilePaths;
						that.headimgurls = '';
						that.changeimgs = tempFilePaths[0];
						uni.uploadFile({
							url: "http://haohulu.mx5918.com/index.php/share/upload/index",
							filePath: chooseImageRes.tempFiles[0].path,
							name: 'file',
							success: (res) => {
								let data = JSON.parse(res.data)
								console.log(data)
								if (data.code == 1) {
									that.idcard_after = data.data.attachment_id;
								}
							},
							fail: (err) => {
								console.log(err)
							}
						});
					}
				});
			},
			cardImg() {
				let that = this;
				uni.chooseImage({
					count:1,
					success: (chooseImageRes) => {
						const tempFilePaths = chooseImageRes.tempFilePaths;
						that.cardimgurl = '';
						that.cardimg = tempFilePaths[0];
						uni.uploadFile({
							url: "http://haohulu.mx5918.com/index.php/share/upload/index",
							filePath: chooseImageRes.tempFiles[0].path,
							name: 'file',
							success: (res) => {
								let data = JSON.parse(res.data)
								console.log(data)
								if (data.code == 1) {
									that.vocation_card = data.data.attachment_id;
								}
							},
							fail: (err) => {
								console.log(err)
							}
						});
					}
				});
			},
			next() {
				let obj = {
					head: this.head,
					name: this.nameVal,
					sex: this.sexIndex,
					idcard_before: this.idcard_before,
					idcard_after: this.idcard_after,
					idcard_num: this.idcard_num,
					vocation_card: this.vocation_card,
					vocation_num: this.code
				}
				if(obj.head == ''){
					uni.showToast({
						title: '请上传头像',
						icon:'none',
						duration: 2000
					});
				}else if(obj.name == ''){
					uni.showToast({
						title: '请填写姓名',
						icon:'none',
						duration: 2000
					});
				}else if(obj.sex != 0 && obj.sex != 1){
					uni.showToast({
						title: '请选择性别',
						icon:'none',
						duration: 2000
					});
				}else if(obj.idcard_before == ''){
					uni.showToast({
						title: '请上传身份证人像面照片',
						icon:'none',
						duration: 2000
					});
				}else if(obj.idcard_after == ''){
					uni.showToast({
						title: '请上传身份证国徽面照片',
						icon:'none',
						duration: 2000
					});
				}else if(obj.idcard_num == ''){
					uni.showToast({
						title: '请填写身份证号码',
						icon:'none',
						duration: 2000
					});
				}else if(obj.vocation_card == ''){
					uni.showToast({
						title: '请上传证件照片',
						icon:'none',
						duration: 2000
					});
				}else if(obj.vocation_num == ''){
					uni.showToast({
						title: '请填写证件编号',
						icon:'none',
						duration: 2000
					});
				}else{
					uni.navigateTo({
						url: "/pages/My/OtherInfo?obj=" + JSON.stringify(obj),
						success: res => {},
						fail: (err) => {
							console.log(err)
						},
						complete: () => {}
					});
				}
			}
		}
	});
</script>

<style scoped>
	.main,
	.card_main {
		width: 100%;
		padding: 0 30upx;
		box-sizing: border-box;
		border-top: 1upx solid #E5E5E5;
	}

	.main {
		border: none;
	}

	.user_icon,
	.userName,
	.sex_main {
		padding: 15upx 0;
		border-bottom: 1upx solid #E5E5E5;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.userName {
		padding: 40upx 0;
	}

	.noborder {
		border: none;
	}

	.sex_main {
		border: none;
		padding: 40upx 0;
	}

	.user_text {
		width: 300upx;
	}

	.user_text,
	.item-title {
		font-size:30upx;
		font-family:'PingFang SC';
		font-weight:500;
		color:rgba(51,51,51,1);
	}

	.user_img {
		width: 90upx;
		height: 90upx;
		border-radius: 50%;
	}
	.fontSize{
		font-size:30upx;
		font-family:'PingFang SC';
		font-weight:500;
		color:rgba(153,153,153,1);
	}
	.user_name {
		text-align: right;
	}

	.user_sex {
		display: flex;
		align-items: center;
	}

	.sex_left,
	.sex_right {
		display: flex;
		align-items: center;
	}

	.sex_left {
		margin-right: 100upx;
	}

	.sex_img {
		width: 36upx;
		height: 36upx;
		margin-right: 16upx;
	}

	.IDCard {
		width: 100%;
		height: 80upx;
		padding: 28upx 0 28upx 30upx;
		font-size: 24upx;
		color: #666666;
		box-sizing: border-box;
		background: rgba(245, 245, 245, 1);
	}

	.card_main {
		border: none;
	}

	.headimgsize {
		width: 80upx;
		height: 80upx;
	}

	.order_box {
		width: 100%;
		padding: 0 30upx 20upx;
		box-sizing: border-box;
	}

	.order_btn {
		width: 100%;
		height: 88upx;
		background: #FFC833;
		color: #333333;
		font-size: 36upx;
		border-radius: 44upx;
		display: flex;
		justify-content: center;
		align-items: center;
		margin-top: 50upx;
	}
</style>
