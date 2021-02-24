<template>
	<view class="content">
        <image class="logo" src="../../static/images/logo.png"></image>
		<view>
            <text class="title">{{title}}</text>
        </view>
		<view class="uni-form-item uni-column phoneVel">
			<view class="phoneVelLeft" @tap="goCountry">
				<text class="phoneText">+{{areaCode}}</text>
        		<image class="phoneIcon" src="../../static/images/icon_bottom.png"></image>
			</view>
			<input class="uni-input" placeholder-style="color:#cacaca" :value="phoneVal" @input="chagePhone" maxlength='11' type="number" placeholder="请输入手机号" />
		</view>
		<view class="uni-form-item uni-column verCode">
			<input class="uni-input" maxlength="6" placeholder-style="color:#cacaca" :value="verCodeVal" @input="chageCodeVal" type="number" placeholder="请输入验证码" />
			<button class="verCodeReight" type="primary" @tap="verCode" :disabled="disabled">
				<text class="verCodeText">{{codeVel}}</text>
			</button>
		</view>
		<view class="logoBtn" @tap="loginClick">登录</view>
		<view class="footer">
			<text>登录即表示您同意</text>
			<text class="footer_text" @tap="Agreement">《好葫芦用户协议》</text>
		</view>
	</view>
</template>

<script>
    import Vue from 'vue';
    export default Vue.extend({
    	data() {
    		return {
    			title: '好葫芦',
    			codeVel:'获取验证码',
    			disabled:false,
    			phoneVal:'',
    			verCodeVal:'',
    			areaCode:86
    		}
    	},
    	onLoad:function(option){
    		if(option.num){
    			this.areaCode = option.num;
    		}else{
    			this.areaCode = 86;
    		}
    	},
    	methods: {
    		goCountry(){
    			uni.navigateTo({
    				url: "/pages/Login/country",
    				success: res => {},
    				fail: (err) => {console.log(err)},
    				complete: () => {}
    			});
    		},
    		loginClick(){
    			var that = this;
    			this.httpRequest({
    				url : "/member/login/index",
    				method : "POST",
    				dataType:'jsonp',
    				data : {
    					'mobile' : that.phoneVal,
    					"captcha":that.verCodeVal,
    					"area_code":that.areaCode
    				},
    				hideLoading : true,
    			}).then(
    				(res) => {
						console.log(res)
    					if(res.data.code == 1){
    						uni.setStorage({
    							key:"token",
    							data:res.data.data.key
    						})
    						uni.reLaunch({
    							url: "/pages/tab/tab",
    							success: res => {},
    							fail: (err) => {console.log(err)},
    							complete: () => {}
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
    		verCode(){
    			var that = this;
    			this.httpRequest({
    			        url : "/member/login/get_sms_captcha",
    			        method : "POST",
    					dataType:'jsonp',
    			        data : {
    						'mobile' : that.phoneVal
    					},
    			        hideLoading : true,
    			    }).then(
    					(res) => {
    						if(res.data.code == 1){
    							this.disabled = true;
    							this.codeVel = res.data.data.result.sms_time;
    							let codeNum = parseInt(this.codeVel);
    							let that = this;
    							let timer = setInterval(function(){
    								codeNum--;
    								if(codeNum < 0){
    									clearInterval(timer);
    									that.disabled = false;
    									that.codeVel = '获取验证码';
    								}else{
    									that.codeVel = codeNum.toString();
    									that.disabled = true;
    								}
    							},1000)
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
    			
    			// uni.request({
    			//         url: '/api/login/get_sms_captcha',
    			//         method: 'POST',
    			// 		header: {'content-type' : "application/x-www-form-urlencoded",'Access-Control-Allow-Origin' : "http://192.168.56.1"},
    			//         data: {
    			//             'mobile' : this.phoneVal
    			//         },
    			//         success: res => {
    			//             console.log("getMachineNum success:" + JSON.stringify(res));
    			//         },
    			//         fail: (e) => {
    			//             console.log("getMachineNum fail:" + JSON.stringify(e));
    			//         },
    			//         complete: () => {}
    			//     });
    			
    		},
    		Agreement(){
    			uni.navigateTo({
    				url: "/pages/Login/agreement",
    				success: res => {},
    				fail: (err) => {console.log(err)},
    				complete: () => {}
    			});
    		},
    		chagePhone(e){
    			this.phoneVal = e.target.value;
    		},
    		chageCodeVal(e){
    			this.verCodeVal = e.target.value;
    		}
    	}
    });
</script>

<style scoped>
	.content {
		text-align: center;
		height: 400upx;
		padding: 100upx 75upx 0;
		box-sizing: border-box;
	}
    .logo{
        height: 200upx;
        width: 200upx;
        margin-top: 100upx;
    }
	.title {
		font-size: 48upx;
		color: #333333;
	}
	.phoneVel,.verCode{
		display: flex;
		align-items: center;
		margin-top: 150upx;
		border-bottom: 1upx solid #E5E5E5;
		padding-bottom: 18upx;
	}
	.phoneVelLeft{
		width: 110upx;
		height: 58upx;
		background: #F5F5F5;
		padding: 10upx 20upx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-right: 34upx;
	}
	.phoneText{
		font-size: 30upx;
		color: #666666;
	}
	.phoneIcon{
		width: 30upx;
		height: 30upx;
		/* margin-left: 27upx; */
	}
	.uni-input{
		width: 400upx;
		text-align: left;
		font-size: 30upx;
		color: #666666;
	}
	.fontSizes{
		font-size:30upx;
		font-family:'PingFang SC';
		font-weight:500;
		color:rgba(202,202,202,1);
	}
	.uni-input-placeholder{
		color: #CACACA !important;
	}
	.verCode{
		justify-content: space-between;
		margin-top: 60upx;
	}
	.verCodeReight{
		width: 200upx;
		height: 44upx;
		line-height: 44upx;
		padding: 0 20upx;
		border-left: 1upx solid #E5E5E5 !important;
		text-align: center;
		background: #FFFFFF !important;
		box-sizing: border-box;
		border-radius: 0;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	button::after{ border: none; }
	.verCodeText{
		color: #FFC833;
		font-size: 30upx;
	}
	.logoBtn{
		height: 100upx;
		height: 88upx;
		margin-top: 72upx;
		background: #FFC833;
		border-radius: 44upx;
		color: #333333;
		font-size: 40upx;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.footer{
		font-size: 24upx;
		text-align: center;
		color: #999999;
		margin-top: 24upx;
	}
	.footer_text{
		color: #FFC833;
	}
</style>
