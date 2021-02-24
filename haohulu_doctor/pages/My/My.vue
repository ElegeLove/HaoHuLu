<template>
    <view>
        <view class="header">
            <image class="top_img" @tap="tipInfo" src="../../static/images/My_message.png" alt="" srcset="">
            <view class="user_info">
                <image class="user_icon" @tap="userInfo(dataInfo.status)" :src="dataInfo.head" alt="" srcset="">
                <view>
                    <text class="user_name" @tap="userInfo(dataInfo.status)">{{dataInfo.name}}</text>
                    <view class="examine" @tap="Toexamine(dataInfo.status)">
                        <image class="examine_icon" src="../../static/images/Physician_review.png" alt="" srcset="">
                        <text class="examine_info">{{dataInfo.status_text}}</text>
                    </view>
                </view>
            </view>
            <view class="orderNum">
                <view class="orderMain" @tap="orderInfo">
                    <view class="orderLeft">
                        <view class="order_text">{{list.today_order_num}}单</view>
                        <view class="order_day">今日完成</view>
                    </view>
                    <view class="orderRight">
                        <view class="order_text">&yen;{{list.today_income}}</view>
                        <view class="order_day">今日收入</view>
                    </view>
                </view>
            </view>
        </view>
        <view class="main">
            <view class="list" @tap="goWallet">
                <view class="list_left">
                    <image class="my_icon" src="../../static/images/doctor_me_wallet.png" alt="" srcset="">
                    <text class="main_txt">钱包</text>
                </view>
                <image class="icon_right" src="../../static/images/Publish_arrow.png" alt="" srcset="">
            </view>
            <view class="list" @tap="kefu">
                <view class="list_left">
                    <image class="my_icon" src="../../static/images/Doctor_me_customerservice.png" alt="" srcset="">
                    <text class="main_txt">联系客服</text>
                </view>
                <image class="icon_right" src="../../static/images/Publish_arrow.png" alt="" srcset="">
            </view>
            <view class="list" @tap="aboutUs">
                <view class="list_left">
                    <image class="my_icon" src="../../static/images/doctor_me_about.png" alt="" srcset="">
                    <text class="main_txt">关于我们</text>
                </view>
                <image class="icon_right" src="../../static/images/Publish_arrow.png" alt="" srcset="">
            </view>
            <view class="list" @tap="loginOut">
                <view class="list_left">
                    <image class="my_icon" src="../../static/images/Doctor_me_quit.png" alt="" srcset="">
                    <text class="main_txt">退出登录</text>
                </view>
                <image class="icon_right" src="../../static/images/Publish_arrow.png" alt="" srcset="">
            </view>
        </view>
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
	import uniPopup from "@/components/uni-popup/uni-popup.vue"
	export default({
		components: {
			uniPopup
		},
		data() {
			return {
				title: 'Hello',
				dataInfo:{name:'王医生'},
				list:{
					today_order_num:'',
					today_income:''
				}
			}
		},
		onShow:function(){
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
							console.log(res.data)
							that.dataInfo = res.data.data.result;
							if(that.dataInfo.head == ''){
								that.dataInfo.head ='../../static/images/logo.png';
							}
						}
					}
				).catch(
					(err) => {
						console.log(err)
						
					}
				);
			this.httpTokenRequest({
			        url : "/doctor/doctor/income_list",
			        method : "POST",
					dataType:'jsonp',
			        data : {
						"page_no":1,
						"page_size":5
					},
			        hideLoading : true,
			    }).then(
					(res) => {
						if(res.data.code == 1){
							that.list = res.data.data;
						}
					}
				).catch(
					(err) => {
						console.log(err)
					}
				)
		},
		methods: {
            tipInfo(){
                uni.navigateTo({
                	url: "/pages/My/NotifyInfo",
                	success: res => {},
                	fail: (err) => {console.log(err)},
                	complete: () => {}
                });
            },
            Toexamine(status){
				if(status == 1){
					uni.navigateTo({
						url: "/pages/My/inAudit",
						success: res => {},
						fail: (err) => {console.log(err)},
						complete: () => {}
					});
				}else if(status == 2){
					uni.navigateTo({
						url: "/pages/My/auditPass",
						success: res => {},
						fail: (err) => {console.log(err)},
						complete: () => {}
					});
				}
            },
			kefu(){
				var that = this;
				this.httpRequest({
					url : "/share/index/config",
					method : "POST",
					data : {
						"identity":'customer_service_mobile'
					},
					hideLoading : true,
				}).then(
					(res) => {
						if(res.data.code == 1){
							uni.makePhoneCall({
							 	// 手机号
							    phoneNumber: res.data.data.result.value,
								// 成功回调
								success: (res) => {
									console.log('调用成功!')	
								},
								// 失败回调
								fail: (res) => {
									console.log('调用失败!')
								}
							  });
						}else{
							uni.showToast({
								title: res.data.msg,
								icon:'none',
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
            userInfo(status){
				if(status == 1){
					uni.navigateTo({
						url: "/pages/My/inAudit",
						success: res => {},
						fail: (err) => {console.log(err)},
						complete: () => {}
					});
				}else if(status == 2){
					uni.navigateTo({
						url: "/pages/My/auditPass",
						success: res => {},
						fail: (err) => {console.log(err)},
						complete: () => {}
					});
				}else{
					uni.navigateTo({
					    url: '/pages/My/PersonalInfo',
					    success: res => {},
					    fail: () => {},
					    complete: () => {}
					});
				}
            },
            goWallet(){
                uni.navigateTo({
                    url: '/pages/My/Wallet',
                    success: res => {},
                    fail: () => {},
                    complete: () => {}
                });
            },
            loginOut(){
				this.$refs.popup.open()
            },
            aboutUs(){
                uni.navigateTo({
                    url: '/pages/My/About',
                    success: res => {},
                    fail: () => {},
                    complete: () => {}
                });
            },
            orderInfo(){
                uni.navigateTo({
                    url: '/pages/My/Summary',
                    success: res => {},
                    fail: () => {},
                    complete: () => {}
                });
            },
			cancel() {
				this.$refs.popup.close();
			},
			popSure(){
				let that = this;
				uni.removeStorage({
					key: 'token',
					success: function (res) {
						that.$refs.popup.close();
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
	});
</script>

<style scoped>
    .header{
        height: 415upx;
        background: #FFC833;
        margin-top: 0;
        position: relative;
    }
    .top_img{
        width: 54upx;
        height: 54upx;
        position: absolute;
        right: 33upx;
        top: 50upx;
    }
    .user_info{
        position: absolute;
        top: 90upx;
        display: flex;
        align-items: center;
    }
    .user_icon{
        width: 170upx;
        height: 170upx;
        border-radius: 50%;
        margin: 0 30upx;
    }
    .user_name{
        font-size: 48upx;
        color: #ffffff;
    }
    .examine{
        display: flex;
        align-items: center;
    }
    .examine_info{
        font-size: 24upx;
        color: #fff;
    }
    .examine_icon{
        width: 40upx;
        height: 40upx;
        margin-right: 12upx;
    }
    .orderNum{
        width: 100%;
        height: 150upx;
        box-sizing: border-box;
        position: absolute;
        bottom: -75upx;
        padding: 0 30upx;
    }
    .orderMain{
        width: 100%;
        height: 100%;
        padding: 36upx 0;
		border-radius: 10upx;
        box-sizing: border-box;
        background:rgba(255,255,255,1);
        box-shadow:0upx 5upx 16upx 0upx rgba(99,99,99,0.1);
        display: flex;
        align-items: center;
    }
    .orderLeft,.orderRight{
        width: 50%;
        text-align: center;
    }
    .orderLeft{
        border-right: 1upx solid #E5E5E5;
    }
    .order_text{
        font-size: 36upx;
        color: #333333;
    }
    .order_day{
        font-size: 24upx;
        color: #999999;
    }
    .main{
        width: 100%;
        padding: 0 30upx;
        margin-top: 142upx;
        box-sizing: border-box;
    }
    .list{
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1upx solid #E5E5E5;
        padding: 44upx 0;
    }
    .list_left{
        display: flex;
        align-items: center;
    }
    .my_icon{
        width: 64upx;
        height: 64upx;
        margin-right: 30upx;
    }
    .icon_right{
        width: 30upx;
        height: 30upx;
    }
    .main_txt{
        font-size: 30upx;
        color: #323232;
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