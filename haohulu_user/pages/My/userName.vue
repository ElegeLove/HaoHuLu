<template>
	<view class="content">
		<view class="userName">
		    <text class="user_text">用户名</text>
		    <input class="user_name" maxlength="12" :value="userName" @input="chageUser" type="text" placeholder="请输入用户名">
		</view>
		<view class="msg">*最多12个中英文、数字组成</view>
		<view class="btn" @click="updataUser">确定</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userName:''
			}
		},
		onBackPress(options) {
			plus.key.hideSoftKeybord(); 
		},
		methods: {
			chageUser(e){
				this.userName = e.target.value;
			},
			updataUser(){
				let that = this;
				if(that.userName==''){
					uni.showToast({
					    title: '用户名不能为空',
						icon:'none',
					    duration: 2000
					});
				}else{
					this.httpTokenRequest({
						url: "/member/member/edit_member_name",
						method: "POST",
						dataType: 'jsonp',
						data: {
							name:that.userName
						},
						hideLoading: true,
					}).then(
						(res) => {
							console.log(res)
							if (res.data.code == 1) {
								uni.navigateBack();
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
	.content{
		width: 100%;
		padding: 0 30upx;
		box-sizing: border-box;
	}
	.userName{
	    padding: 40upx 0;
	    border-bottom: 1upx solid #E5E5E5;
	    display: flex;
	    justify-content: space-between;
	    align-items: center;
	}
	.user_text{
	    font-size: 30upx;
	    color: #323232;
	}
	.user_name{
	    text-align: right;
		font-size: 30upx;
		color: #999999;
	}
	.msg{
		font-size: 24upx;
		color: #999999;
		margin-top: 20upx;
	}
	.btn{
		width: 100%;
		height: 88upx;
		border-radius: 44upx;
		background-color: #FFC833;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 36upx;
		color: #333333;
		margin-top: 170upx;
	}
</style>
