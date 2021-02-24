<template>
	<view class="content" v-html="main">
        
	</view>
</template>

<script>
    import Vue from 'vue';
	export default Vue.extend({
		data() {
			return {
				main:''
            }
		},
		onLoad: function (option) { //option为object类型，会序列化上个页面传递的参数
			var that = this;
			this.httpRequest({
				url : "/share/index/config",
				method : "POST",
				data : {
					"identity":"doctor_app_user_agreement"
				},
				hideLoading : true,
			}).then(
				(res) => {
					if(res.data.code == 1){
						that.main = res.data.data.result.value;
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
					uni.showToast({
						title: JSON.stringify(err),
						icon:'none',
						duration: 2000
					});
				}
			)
		},
		methods: {
		}
	});
</script>

<style scoped>
    .content{
        padding: 0 30upx;
        font-size: 28upx;
        color: #333333;
    }
</style>
