<template>
	<view class="main">
		<text class="main_title">擅长方向</text>
		<view class="uni-textarea">
			<textarea class="main_txt fontSizes" :value="speciality" @input="special" placeholder="填写您擅长的方向" placeholder-class="fontSizes"/>
		</view>
		<text class="main_title">个人简介</text>
		<view class="uni-textarea">
			<textarea class="main_txt fontSizes" :value="desc" @input="clickDesc" placeholder="填写您的个人简介" placeholder-class="fontSizes"/>
		</view>
		<view class="order_box">
		    <view class="order_btn" @tap="next">
		        <text>提交审核</text>
		    </view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				obj:{},
				speciality:'',
				desc:''
			}
		},
		onLoad: function (option) { //option为object类型，会序列化上个页面传递的参数
			this.obj = JSON.parse(option.obj);
		},
		onBackPress(options) {
			plus.key.hideSoftKeybord(); 
		},
		methods: {
			special(e){
				this.speciality = e.target.value;
			},
			clickDesc(e){
				this.desc = e.target.value;
			},
			next(){
				let obj1 = {
					speciality:this.speciality,
					desc:this.desc
				}
				let obj2={
				    ...this.obj,
				    ...obj1
				}
				let that = this;
				if(obj1.speciality == ''){
					uni.showToast({
						title: '请填写擅长方向',
						icon:'none',
						duration: 2000
					});
				}else if(obj1.desc == ''){
					uni.showToast({
						title: '请填写个人简介',
						icon:'none',
						duration: 2000
					});
				}else{
					that.httpTokenRequest({
					        url : "/doctor/doctor/doctor_audit",
					        method : "POST",
							dataType:'jsonp',
					        data : obj2,
					        hideLoading : true,
					    }).then(
							(res) => {
								if(res.data.code == 1){
									uni.navigateTo({
										url: "/pages/My/inAudit",
										success: res => {},
										fail: (err) => {
											console.log(err)
										},
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
				}
			}
		}
	}
</script>

<style scoped>
	.main{
		width: 100%;
		padding: 0 30upx;
		box-sizing: border-box;
	}
	.main_title{
		font-size: 30upx;
		color: #000000;
	}
	.main_txt{
		width: 100%;
		height: 300upx;
		background: #F5F5F5;
		padding: 30upx 24upx;
		border-radius: 10upx;
		box-sizing: border-box;
		font-size: 28upx;
		color: #333333;
		margin: 28upx 0 60upx;
	}
	.fontSizes{
		font-size:28upx;
		font-family:'PingFang SC';
		font-weight:500;
		color: #333333;
	}
	.order_box{
	    width: 100%;
	    padding: 0 30upx 20upx;
	    box-sizing: border-box;
		position: fixed;
		left: 0;
		bottom: 50upx;
	}
	.order_btn{
	    width: 100%;
	    height: 88upx;
	    background: #FFC833;
		color: #333333;
		font-size: 36upx;
	    border-radius: 44upx;
	    display: flex;
	    justify-content: center;
	    align-items: center;
	    /* margin-top: 50upx; */
	}
</style>
