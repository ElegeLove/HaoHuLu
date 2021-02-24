<template>
	<view>
		<view class="main">
			<view class="userName">
				<text class="user_text">姓名</text>
				<input class="user_name" placeholder-style="color:#999999;" :value="nameVal" @input="chageName" type="text" placeholder="请填写姓名">
			</view>
			<view class="sex_main">
				<text class="user_text">性别</text>
				<view class="user_sex">
					<view class="sex_left" @tap="sexchage(2)">
						<image class="sex_img" :src="sexIndex==2?'../../static/images/Publish_selected.png':'../../static/images/Release_notselected.png'"
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
			<view class="userName">
				<text class="user_text">手机号码</text>
				<input class="user_name" placeholder-style="color:#999999;" maxlength="11" :value="phoneVal" @input="chagePhone" type="text" placeholder="填写手机号码">
			</view>
			<view class="userName">
				<text class="user_text">地址</text>
				<!-- <input class="user_name" :value="nameVal" @input="chageName" type="text" placeholder="填写手机号码"> -->
				<view class="user_name sousu" @tap="goSearch">
					<text style="color: #999999;" v-if="newAdrss.name == ''">搜索上门地址</text>
					<text v-else>{{newAdrss.name}}</text>
					<image class="icon_right" src="../../static/images/Publish_arrow.png" alt="" srcset="">
				</view>
			</view>
			<view class="userName">
				<text class="user_text">门牌号</text>
				<input class="user_name" placeholder-style="color:#999999;" :value="adrssVal" @input="chageAdrss" type="text" placeholder="街道、楼牌号等">
			</view>
		</view>
		<view class="btnBox" v-if="show==1">
			<view class="btn" @tap="sureBtn">确认修改</view>
		</view>
		<view class="btnBox" v-if="show==2">
			<view class="btn" @tap="subBtn">保存</view>
		</view>
		<uni-popup ref="popup" type="center">
			<view class="popmain">
				<view class="poptop">
					<view class="">确认删除</view>
					<image class="popImg" @tap="cancels" src="../../static/images/Details_cancelled.png" mode=""></image>
				</view>
				<view class="poptext">要删除该地址吗？</view>
				<view class="popbtns">
					<view class="popbtn" @tap="cancels">取消</view>
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
				nameVal: '',
				sexIndex: 1,
				phoneVal: '',
				adrssVal: '',
				adrssId: '',
				newAdrss: {
					name: ''
				},
				show: ''
			}
		},
		onBackPress(options) {
			plus.key.hideSoftKeybord();
		},
		onNavigationBarButtonTap(e) {
			plus.key.hideSoftKeybord();
			this.$refs.popup.open()
		},
		onLoad: function(option) {
			let webView = this.$mp.page.$getAppWebview();
			let tn = webView.getStyle().titleNView;
			if (option.adrssVal) {
				tn.buttons[0].text = '删除';
				tn.titleText = '编辑上门地址';
				let objVal = JSON.parse(option.adrssVal);
				this.adrssId = objVal.id;
				this.nameVal = objVal.member_name;
				this.sexIndex = objVal.sex;
				this.phoneVal = objVal.mobile;
				this.adrssVal = objVal.housenum;
				this.newAdrss = {
					name: objVal.address,
					district: objVal.area_str,
					location: objVal.longitude + ',' + objVal.latitude
				};
				this.show = '1';
			} else {
				tn.buttons = [];
				this.show = '2';
			}
			webView.setStyle({
				titleNView: tn
			});
		},
		methods: {
			cancels() {
				this.$refs.popup.close();
			},
			popSure() {
				let that = this;
				that.httpTokenRequest({
					url: "/member/address/address_del",
					method: "POST",
					dataType: 'jsonp',
					data: {
						"address_id": that.adrssId
					},
					hideLoading: true,
				}).then(
					(res) => {
						this.$refs.popup.close();
						if (res.data.code == 1) {
							uni.showToast({
								title: '删除成功',
								icon: 'none',
								duration: 2000
							});
							setTimeout(() => {
								uni.navigateBack()
							}, 1000)
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
						uni.showToast({
							title: JSON.stringify(err),
							icon: 'none',
							duration: 2000
						});
					}
				)
			},
			chageName(e) {
				this.nameVal = e.target.value;
			},
			sexchage(sex) {
				this.sexIndex = sex;
			},
			chagePhone(e) {
				this.phoneVal = e.target.value;
			},
			goSearch() {
				uni.navigateTo({
					url: "/pages/My/searchAddress",
					success: res => {},
					fail: (err) => {
						console.log(err)
					},
					complete: () => {}
				});
			},
			chageAdrss(e) {
				this.adrssVal = e.target.value;
			},
			//编辑
			sureBtn() {
				let location = this.newAdrss.location.split(',')
				let that = this;
				this.httpTokenRequest({
					url: "/member/address/add_address",
					method: "POST",
					dataType: 'jsonp',
					data: {
						"address_id": that.adrssId,
						"member_name": that.nameVal,
						"sex": that.sexIndex,
						"mobile": that.phoneVal,
						"area_str": that.newAdrss.district,
						"housenum": that.adrssVal,
						"address": that.newAdrss.name,
						"latitude": location[1],
						"longitude": location[0]
					},
					hideLoading: true,
				}).then(
					(res) => {
						if (res.data.code == 1) {
							uni.navigateBack();
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
			//新建
			subBtn() {
				let location = this.newAdrss.location.split(',')
				let that = this;
				this.httpTokenRequest({
					url: "/member/address/add_address",
					method: "POST",
					dataType: 'jsonp',
					data: {
						"member_name": that.nameVal,
						"sex": that.sexIndex,
						"mobile": that.phoneVal,
						"area_str": that.newAdrss.district,
						"housenum": that.adrssVal,
						"address": that.newAdrss.name,
						"latitude": location[1],
						"longitude": location[0]
					},
					hideLoading: true,
				}).then(
					(res) => {
						if (res.data.code == 1) {
							uni.navigateBack();
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
			}
		}
	});
</script>

<style scoped>
	.main {
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
		padding: 40upx 0;
	}

	.user_text {
		width: 200upx;
	}

	.user_text,
	.item-title {
		font-size: 30upx;
		color: #323232;
	}

	.user_img {
		width: 90upx;
		height: 90upx;
		border-radius: 50%;
	}

	.user_name {
		text-align: right;
		font-size: 30upx;
		font-family: 'PingFang SC';
		font-weight: 500;
		/* color: rgba(153, 153, 153, 1); */
		color: #333333;
	}

	.user_sex {
		display: flex;
		align-items: center;
		font-size: 30upx;
		font-family: 'PingFang SC';
		font-weight: 500;
		color: rgba(153, 153, 153, 1);
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

	.sousu {
		display: flex;
		align-items: center;
	}

	.icon_right {
		width: 30upx;
		height: 30upx;
		margin-left: 18upx;
	}

	.btnBox {
		width: 100%;
		padding: 20upx 30upx;
		box-sizing: border-box;
		position: fixed;
		left: 0;
		bottom: 0;
	}

	.btn {
		width: 100%;
		height: 88upx;
		background: rgba(255, 200, 51, 1);
		border-radius: 44upx;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 36upx;
		font-family: 'PingFang SC';
		font-weight: 500;
		color: rgba(51, 51, 51, 1);
	}

	.popmain {
		width: 500upx;
		height: 400upx;
		background: rgba(255, 255, 255, 1);
		border-radius: 10upx;
		padding: 0 20upx 20upx;
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

	.popImg {
		width: 40upx;
		height: 40upx;
		position: absolute;
		top: -20upx;
		right: -10upx;
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
