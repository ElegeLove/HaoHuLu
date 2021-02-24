<template>
	<view class="content">
		<view class="uni-textarea">
			<textarea class="main_txt" placeholder-style="color:rgba(153,153,153,1)" maxlength="70" :value='detalVal' @input="candicine" placeholder="有什么个人特殊情况吗" />
		</view>
		<view class="btn" @tap="btn">完成</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				detalVal:''
			}
		},
		onBackPress(options) {
			plus.key.hideSoftKeybord(); 
		},
		onLoad:function(option){
			if(option.val){
				this.detalVal = option.val;
			}
		},
		methods: {
			candicine(e){
				this.detalVal = e.target.value;
			},
			btn(){
				console.log(this.detalVal)
				let pages = getCurrentPages();  //获取所有页面栈实例列表
				let nowPage = pages[ pages.length - 1];  //当前页页面实例
				let prevPage = pages[ pages.length - 2 ];  //上一页页面实例
				// prevPage.$vm.$refs.discovery.backSpecial(this.detalVal)
				prevPage.$vm.specialCase = this.detalVal;   //修改上一页data里面的sh参数值为100
				uni.navigateBack({  //uni.navigateTo跳转的返回，默认1为返回上一级
				    delta: 1
				});
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
	.main_txt{
		width: 100%;
		height: 300upx;
		padding: 30upx 24upx;
		box-sizing: border-box;
		background:rgba(245,245,245,1);
		border-radius:10upx;
		font-size:28upx;
		font-family:'PingFang SC';
		font-weight:500;
		color:#333333;
		line-height:45upx;
	}
	.btn{
		width: 100%;
		height:88upx;
		margin-top: 164upx;
		background:rgba(255,200,51,1);
		border-radius:44upx;
		font-size:36upx;
		font-family:'PingFang SC';
		font-weight:500;
		color:rgba(51,51,51,1);
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
