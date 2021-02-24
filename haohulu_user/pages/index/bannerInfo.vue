<template>
    <view class="content">
        <image class="img" :src="banVal.url"></image>
		<view class="main" v-html="banVal.content">
			
		</view>
    </view>
</template>

<script>
    import Vue from 'vue';
	export default Vue.extend({
		data() {
			return {
				banVal:{}
			}
		},
		onLoad:function(option){
			let that = this;
			this.httpTokenRequest({
				url: "/member/banner/get_banner_content",
				method: "POST",
				dataType: 'jsonp',
				data: {id:option.id},
				hideLoading: true,
			}).then(
				(res) => {
					if (res.data.code == 1) {
						that.banVal = res.data.data.list;
						that.banVal.content = res.data.data.list.content.replace(/<img/g,'<img style="width:100% !important;height:auto !important"')
					}
				}
			).catch(
				(err) => {
					console.log(err)
					
				}
			)
		},
		methods: {
			
		}
	});
</script>

<style scoped>
	.content{
		width: 100%;
		padding: 0 30upx;
		box-sizing: border-box;
	}
	.img{
		width: 100%;
		height: 370upx;
		border-radius: 10upx;
		margin-bottom: 50upx;
	}
    .main{
		font-size: 28upx;
		color: #333333;
	}
</style>