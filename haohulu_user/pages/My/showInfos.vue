<template>
    <view>
        <view class="userInfo">
        	<image class="userInfo_log"  :src="orderInfo.doctor_head"></image>
        	<view>
        		<view>
        			<text class="userInfo_name">{{orderInfo.doctor_name}}</text>
        			<view class="userSex" v-if="orderInfo.sex==1">
        				<image class="userInfo_sex" src="../../static/images/Homepage_man.png"></image>
        				<text class="userInfo_val">男</text>
        			</view>
					<view class="userSex" v-if="orderInfo.sex==2">
        				<image class="userInfo_sex" src="../../static/images/Homepage_woman.png"></image>
        				<text class="userInfo_val">女</text>
        			</view>
        		</view>
        		<view class="userInfo_num">执业资格证编号：{{orderInfo.vocation_num}}</view>
        	</view>
        </view>
		<view class="main">
			<view class="skillTitle">擅长方向：</view>
			<view class="skill">{{orderInfo.special_intro}}</view>
			<view class="synopsisTitle">个人简介：</view>
			<view class="synopsis">{{orderInfo.desc}}</view>
			<view class="synopsisTitle">证件图片：</view>
			<view class="certificate">
				<!-- <image class="certificate_img" src="../../static/images/img.png"></image>
				<image class="certificate_img" src="../../static/images/img.png"></image> -->
				<video v-if="orderInfo.video != ''" class="certificate_img" enable-danmu danmu-btn controls :src="orderInfo.video" mode=""></video>
				<image class="certificate_img" v-for="(imgUrl,i) in imgArr" :key="i" :src="imgUrl" @tap="showImg(i)"></image>
			</view>
			<view class="mainBtn" @tap="callPhone(orderInfo.mobile)">拨打电话</view>
		</view>
    </view>
</template>

<script>
    import Vue from 'vue';
	export default Vue.extend({
		data() {
			return {
				orderInfo:{},
				imgArr:[]
			}
		},
		onLoad:function(option){
			console.log(option.id)
			let that = this;
			this.httpTokenRequest({
				url: "/member/order/get_order_info",
				method: "POST",
				dataType: 'jsonp',
				data: {
					"order_sn": option.id
				},
				hideLoading: true,
			}).then(
				(res) => {
					console.log(res)
					if (res.data.code == 1) {
						that.orderInfo = res.data.data.result;
						that.imgArr = [];
						console.log(that.orderInfo)
						for (let i in that.orderInfo.images) {
						    that.imgArr.push(that.orderInfo.images[i]);
						}
					}
				}
			).catch(
				(err) => {
					console.log(err)
			
				}
			)
		},
		methods: {
			userInfo(){
                uni.navigateTo({
                    url: '/pages/My/PersonalInfo',
                    success: res => {},
                    fail: () => {},
                    complete: () => {}
                });
			},
			Grab(){
				console.log(12121)
			},
			showImg(i) {
				//预览图片
				uni.previewImage({
					urls: this.imgArr,
					current: this.imgArr[i]
				});
			},
			//拨打电话
			callPhone(phone){
				uni.makePhoneCall({
					// 手机号
					phoneNumber: phone,
					// 成功回调
					success: (res) => {
						console.log('调用成功!')
					},
					// 失败回调
					fail: (res) => {
						console.log('调用失败!')
					}
				});
			},
		}
	});
</script>

<style scoped>
	.userInfo{
		width: 100%;
		padding: 30upx;
		box-sizing: border-box;
		border-bottom: 20upx solid #F5F5F5;
		display: flex;
		align-items: center;
	}
	.userInfo_log{
		width: 100upx;
		height: 100upx;
		border-radius: 50%;
		margin-right: 20upx;
	}
	.userInfo_name{
		font-size: 32upx;
		color: #000000;
	}
	.userSex{
		display: flex;
		align-items: center;
	}
	.userInfo_sex{
		width: 30upx;
		height: 30upx;
		margin: 0 10upx 0 24upx;
	}
	.userInfo_val{
		font-size: 24upx;
		color: #666666;
	}
	.userInfo_num{
		font-size: 24upx;
		color: #999999;
	}
	.main{
		width: 100%;
		padding: 0 30upx;
		box-sizing: border-box;
	}
	.skillTitle,.synopsisTitle{
		font-size: 30upx;
		font-weight: bold;
		color: #000000;
		margin: 40upx 0 30upx;
	}
	.synopsisTitle{
		margin-top: 90upx;
	}
	.skill,.synopsis{
		font-size: 28upx;
		color: #333333;
		margin-top: 50upx;
	}
	.certificate{
		display: flex;
		align-items: center;
		margin-top: 40upx;
	}
	.certificate_img{
		width: 130upx;
		height: 130upx;
		border-radius: 10upx;
		margin-right: 20upx;
	}
	.mainBtn{
		width: 100%;
		height: 88upx;
		border-radius: 44upx;
		background-color: #FFC833;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 36upx;
		color: #333333;
		margin-top: 140upx;
	}
</style>