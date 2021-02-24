<template>
	<view>
		<view class="orderMain">
			<view class="order_text">可用余额</view>
			<view class="order_day">&yen;{{wallet.money}}</view>
		</view>
		<view class="listTitle">
			<text>提现金额</text>
		</view>
		<view class="withdraw">
			<view class="withdraw_num">
				<view class="left_price">&yen;</view>
				<!-- <view class="num_left"> -->
				<input class="num_inp" :value="moneyVal" @input="chageVal" type="text" placeholder="请输入提现金额">
				<!-- </view> -->
				<view class="num_right" @tap="clickAll">全部</view>
			</view>
		</view>
		<view class="listTitle">
			<text>提现至</text>
		</view>
		<view class="main">
			<view class="account" @tap="isSelect(0)">
				<view class="account_left">
					<image class="icon_wx" src="../../static/images/weixinlingqian.png" mode=""></image>
					<text class="left_text">微信支付</text>
				</view>
				<view class="account_right">
					<text class="right_text" v-if="wallet.is_bind_wx == 0" @tap="clickBind(0)">未绑定</text>
					<text class="right_text" v-if="wallet.is_bind_wx == 1">已绑定</text>
					<view>
						<image class="select" v-if="select == 0" src="../../static/images/Publish_selected.png" mode=""></image>
						<image class="select" v-else src="../../static/images/Release_notselected.png" mode=""></image>
					</view>
				</view>
			</view>
			<view class="account" @tap="isSelect(1)">
				<view class="account_left">
					<image class="icon_wx" src="../../static/images/pic_zhifubao.png" mode=""></image>
					<text class="left_text">支付宝支付</text>
				</view>
				<view class="account_right">
					<text class="right_text" v-if="wallet.is_bind_ali == 0" @tap="clickBind(1)">未绑定</text>
					<text class="right_text" v-if="wallet.is_bind_ali == 1">已绑定</text>
					<view>
						<image class="select" v-if="select == 1" src="../../static/images/Publish_selected.png" mode=""></image>
						<image class="select" v-else src="../../static/images/Release_notselected.png" mode=""></image>
					</view>
				</view>
			</view>
		</view>
		<view class="footer" @tap="subMonny">
			<view class="btn">确定</view>
		</view>
	</view>
</template>

<script>
	import Vue from 'vue';
	export default Vue.extend({
		data() {
			return {
				select: 0,
				wallet: {
					money: ''
				},
				moneyVal: ''
			}
		},
		onBackPress(options) {
			plus.key.hideSoftKeybord();
		},
		onNavigationBarButtonTap(e) {
			uni.navigateTo({
				url: '/pages/My/Bill',
				success: res => {},
				fail: () => {},
				complete: () => {}
			});
		},
		onLoad: function(option) {
			var that = this;
			this.httpTokenRequest({
				url: "/doctor/account/balance",
				method: "POST",
				dataType: 'jsonp',
				data: {
					"page_no": 1,
					"page_size": 5
				},
				hideLoading: true,
			}).then(
				(res) => {
					if (res.data.code == 1) {
						that.wallet = res.data.data;
					}
				}
			).catch(
				(err) => {
					console.log(err)

				}
			)
		},
		methods: {
			isSelect(id) {
				this.select = id;
			},
			chageVal(e) {
				this.moneyVal = e.target.value;
			},
			clickAll() {
				this.moneyVal = this.wallet.money;
			},
			subMonny() {
				var that = this;
				if (parseFloat(this.moneyVal) > parseFloat(this.wallet.money)) {
					this.moneyVal = ''
					uni.showToast({
						title: '已超过最大可用余额',
						icon: 'none',
						duration: 2000
					});
				} else {
					// pay_type 0微信1支付宝
					this.httpTokenRequest({
						url: "/doctor/account/withdrawal_apply",
						method: "POST",
						dataType: 'jsonp',
						data: {
							"pay_type": that.select,
							"moeny": that.moneyVal
						},
						hideLoading: true,
					}).then(
						(res) => {
							if (res.data.code == 1) {
								console.log(res.data)
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

			},

			// onNavigationBarButtonTap() {
			// 	uni.navigateTo({
			// 		url: '/pages/My/Bill',
			// 		success: res => {},
			// 		fail: () => {},
			// 		complete: () => {}
			// 	});
			// },

			clickBind(id) {
				let that = this;
				if (id == 0) {
					// uni.getProvider({
					//     service: 'oauth',
					//     success: function (res) {
					//         console.log(res.provider);
					//     }
					// });
					// uni.login({
					// 	provider: 'weixin',
					// 	success: function(loginRes) {
					// 		console.log(loginRes.authResult);
					// 	}
					// });
					// uni.login({
					//   provider: 'weixin',
					//   success: function (loginRes) {
					//     console.log(JSON.stringify(loginRes));
					// 	uni.showToast({
					// 		title: JSON.stringify(loginRes),
					// 		icon:'none',
					// 		duration: 2000
					// 	});
					//   }
					// });
					// uni.requestPayment({
					// 	provider: 'wxpay',
					// 	orderInfo: orderInfo,
					// 	success: function(res) {
					// 		console.log('success:' + JSON.stringify(res));
					// 		},
					// 	fail: function(err) {
					// 		console.log('fail:' + JSON.stringify(err));
					// 		}
					// });
					//判断是否有微信
					// uni.getProvider({
					//     service: 'oauth',
					//     success: function (res) {
					//         console.log(res);
					//     }
					// });

					var weixinService = null;
					// http://www.html5plus.org/doc/zh_cn/oauth.html#plus.oauth.getServices
					plus.oauth.getServices(function(services) {
						console.log(services)
						if (services && services.length) {
							for (var i = 0, len = services.length; i < len; i++) {
								if (services[i].id === 'weixin') {
									weixinService = services[i];
									console.log(weixinService)
									break;
								}
							}
							console.log(!weixinService)
							if (!weixinService) {
								console.log('没有微信登录授权服务');
								return;
							}
							// http://www.html5plus.org/doc/zh_cn/oauth.html#plus.oauth.AuthService.authorize
							weixinService.authorize(function(event) { //此处获取code的关键
								console.log(111)
								console.log(event)
								console.log(event.code, '这次是真的授权后返回的code')
								that.httpTokenRequest({
									url: "/doctor/weixin/auth",
									method: "POST",
									dataType: 'jsonp',
									data: {
										code: event.code
									},
									hideLoading: true,
								}).then(
									(res) => {
										console.log(res)
										if (res.data.code == 1) {
											console.log(res.data)
											// that.dataInfo = res.data.data.result;
											// if (that.dataInfo.head == '') {
											// 	that.dataInfo.head = '../../static/images/logo.png';
											// }
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
								);

							}, function(error) {
								console.error('authorize fail:' + JSON.stringify(error));
							}, {
								// http://www.html5plus.org/doc/zh_cn/oauth.html#plus.oauth.AuthOptions
								appid: 'wx9c8d2a56e561f817', //开放平台的应用标识。暂时填个假的充数，仅做演示。
							});
							
						} else {
							console.log('无可用的登录授权服务');
						}
					}, function(error) {
						console.error('getServices fail:' + JSON.stringify(error));
					});

					// uni.getProvider({
					// 	service: 'oauth',
					// 	success: function(res) {
					// 		//支持微信、qq和微博等
					// 		if (res.provider.indexOf("weixin") > -1) {
					// 			console.log(12121)
					// 			uni.login({
					// 				provider: 'weixin',
					// 				scopes: 'auth_user',
					// 				success: function(loginRes) {
					// 					console.log(loginRes)

					// 					// that.httpTokenRequest({
					// 					// 	url: "/doctor/weixin/auth",
					// 					// 	method: "POST",
					// 					// 	dataType: 'jsonp',
					// 					// 	data: {
					// 					// 		code:loginRes.authResult.unionid
					// 					// 	},
					// 					// 	hideLoading: true,
					// 					// }).then(
					// 					// 	(res) => {
					// 					// 		console.log(res)
					// 					// 		if (res.data.code == 1) {
					// 					// 			console.log(res.data)
					// 					// 			// that.dataInfo = res.data.data.result;
					// 					// 			// if (that.dataInfo.head == '') {
					// 					// 			// 	that.dataInfo.head = '../../static/images/logo.png';
					// 					// 			// }
					// 					// 		}else{
					// 					// 			uni.showToast({
					// 					// 				title: res.data.msg,
					// 					// 				icon: 'none',
					// 					// 				duration: 2000
					// 					// 			});
					// 					// 		}
					// 					// 	}
					// 					// ).catch(
					// 					// 	(err) => {
					// 					// 		console.log(err)

					// 					// 	}
					// 					// );

					// 					// console.log('-------获取openid(unionid)-----');
					// 					// console.log(JSON.stringify(loginRes));
					// 					// uni.showToast({
					// 					// 	title: JSON.stringify(loginRes),
					// 					// 	icon:'none',
					// 					// 	duration: 2000
					// 					// });
					// 					// 获取用户信息
					// 					uni.getUserInfo({
					// 						provider: 'weixin',
					// 						success: function(infoRes) {
					// 							console.log(infoRes);
					// 						}
					// 					});
					// 				},
					// 				fail: function(errr) {
					// 					console.log(errr)
					// 					uni.showToast({
					// 						title: JSON.stringify(errr),
					// 						icon: 'none',
					// 						duration: 2000
					// 					});
					// 				}
					// 			});
					// 		} else {
					// 			console.log(45454545)
					// 		}
					// 	}
					// });

					// let that = this; 
					// uni.login({
					//    provider: 'weixin',
					//    success: function (loginRes) {
					//        console.log(JSON.stringify(loginRes));
					// 	   uni.showToast({
					// 	   	title: JSON.stringify(loginRes),
					// 	   	icon:'none',
					// 	   	duration: 2000
					// 	   });
					// 	   that.httpTokenRequest({
					// 	           url : "/doctor/weixin/auth",
					// 	           method : "POST",
					// 	   		dataType:'jsonp',
					// 	           data : {
					// 	   			"code":"jfkadsjfasdfjkl"
					// 	   		},
					// 	           hideLoading : true,
					// 	       }).then(
					// 	   		(res) => {
					// 	   			if(res.data.code == 1){
					// 	   				console.log(res)
					// 	   				// that.dataInfo = res.data.data.result;
					// 	   				// for (let val in that.list) {
					// 	   				// 	// that.imgArr = [];
					// 	   				// 	// console.log(that.orderInfo)
					// 	   				// 	let imgArr = [];
					// 	   				// 	for (let i in that.dataInfo[val].images) {
					// 	   				// 	    imgArr.push(that.dataInfo[val].images[i]);
					// 	   				// 	}
					// 	   				// 	that.dataInfo[val].images = imgArr;
					// 	   				// }
					// 	   			}else{
					// 	   				uni.showToast({
					// 	   					title: res.data.msg,
					// 	   					icon:'none',
					// 	   					duration: 2000
					// 	   				});
					// 	   			}
					// 	   		}
					// 	   	).catch(
					// 	   		(err) => {
					// 	   			console.log(err)

					// 	   		}
					// 	   	)
					//    }
					// });

				}
				if (id == 1) {
					uni.getProvider({
						service: 'payment',
						success: function(res) {
							console.log(res)

						}
					});
				}
			}
		}
	});
</script>

<style scoped>
	.orderMain {
		width: 100%;
		height: 200upx;
		padding: 55upx 0;
		box-sizing: border-box;
		/* background:#FFC833; */
		background: linear-gradient(180deg, rgba(255, 200, 51, 1), rgba(255, 152, 51, 1));
		text-align: center;
	}

	.order_text {
		font-size: 24upx;
		color: #FFFFFF;
	}

	.order_day {
		font-size: 60upx;
		color: #FFFFFF;
	}

	.listTitle {
		font-size: 30upx;
		color: #333333;
		margin-top: 48upx;
		margin-left: 30upx;
		font-weight: 500;
	}

	.withdraw {
		width: 100%;
		padding: 0 30upx;
		margin-top: 40upx;
		box-sizing: border-box;
	}

	.withdraw_num {
		width: 100%;
		height: 100upx;
		padding: 28upx;
		background-color: #F5F5F5;
		border-radius: 10upx;
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.num_left {
		display: flex;
		align-items: center;
	}

	.left_price {
		font-size: 60upx;
		font-weight: bold;
		color: #EE1122;
		margin-right: 26upx;
	}

	.num_inp {
		font-size: 30upx;
		color: #999999;
		font-weight: 500;
	}

	.num_right {
		width: 100upx;
		font-size: 30upx;
		font-weight: 500;
		color: #FFBA33;
	}

	.main {
		width: 100%;
		padding: 0 30upx;
		box-sizing: border-box;
	}

	.account {
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-top: 43upx;
	}

	.account_left,
	.account_right {
		display: flex;
		align-items: center;
	}

	.icon_wx {
		width: 50upx;
		height: 50upx;
		border-radius: 50%;
		margin-right: 16upx;
	}

	.select {
		width: 36upx;
		height: 36upx;
		border-radius: 50%;
		margin-left: 26upx;
	}

	.left_text {
		font-size: 30upx;
		font-weight: 500;
		color: #434343;
	}

	.right_text {
		font-size: 24upx;
		font-weight: 500;
		color: #999999;
	}

	.footer {
		width: 100%;
		padding: 0 30upx;
		box-sizing: border-box;
		margin-top: 114upx;
	}

	.btn {
		width: 100%;
		height: 88upx;
		border-radius: 44upx;
		background-color: #FFC833;
		font-size: 36upx;
		font-weight: 500;
		color: #333333;
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
