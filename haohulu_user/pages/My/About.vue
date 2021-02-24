<template>
    <view>
        <view class="main">
			<view class="main_text" v-html="version"></view>
            <!-- <view class="main_content">
                <image class="icon" :src="logoImg" alt="" srcset="">
                <view class="title">好葫芦</view>
                <view class="main_text" v-html="version"></view>
            </view> -->
        </view>
    </view>
</template>

<script>
    import Vue from 'vue';
	export default Vue.extend({
		data() {
			return {
                title: 'Hello',
				logoImg:'',
				version:''
			}
        },
		onLoad: function (option) { //option为object类型，会序列化上个页面传递的参数
			var that = this;
			// this.httpRequest({
			// 	url : "/share/index/config",
			// 	method : "POST",
			// 	data : {
			// 		"identity":"app_logo"
			// 	},
			// 	hideLoading : true,
			// }).then(
			// 	(res) => {
			// 		if(res.data.code == 1){
			// 			that.logoImg = res.data.data.result.path;
			// 		}else{
			// 			uni.showToast({
			// 				title: res.data.msg,
			// 				icon:'none',
			// 				duration: 2000
			// 			});
			// 		}
			// 	}
			// ).catch(
			// 	(err) => {
			// 		uni.showToast({
			// 			title: JSON.stringify(err),
			// 			icon:'none',
			// 			duration: 2000
			// 		});
			// 	}
			// )
			this.httpRequest({
				url : "/share/index/config",
				method : "POST",
				data : {
					"identity":"app_aboutus"
				},
				hideLoading : true,
			}).then(
				(res) => {
					if(res.data.code == 1){
						that.version = res.data.data.result.value;
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
	.main{
		width: 100%;
		padding: 0 30upx;
		box-sizing: border-box;
	}
    /* .main{
        width: 100%;
        position: fixed;
        top: 40%;
        display: flex;
        justify-content: center;
        align-items: center;
    } */
    /* .main_content{
        text-align: center;
    }
    .title,.main_text{
        font-size: 48upx;
        color: #333333;
    }
    .main_text{
        font-size: 30upx;
    }
    .icon{
        width: 170upx;
        height: 170upx;
        border-right: 50%;
    } */
</style>