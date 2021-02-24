<script>
	export default {
		onLaunch: function() {
			// console.log('App Launch')
			uni.getStorage({
				key: 'token',
				success: function(ress) {
					uni.reLaunch({
						url: "/pages/index/index",
						success: res => {},
						fail: (err) => {console.log(err)},
						complete: () => {}
					});
				},
				fail:function(){
					uni.reLaunch({
						url: "/pages/Login/login",
						success: res => {},
						fail: (err) => {console.log(err)},
						complete: () => {}
					});
				}
			});
		},
		onShow: function() {
			// console.log('App Show')
		},
		onHide: function() {
			// console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	/* .uni-modal__btn_default{
		border: none !important;
		border-radius: 50% !important;
	} */
	uni-modal .uni-modal__ft:after{
		border: none;
	}
	uni-modal .uni-modal__ft{
		display: flex;
		justify-content: space-around;
		align-items: center;
		margin-bottom: 20upx;
	}
	uni-modal .uni-modal__btn{
		/* border: none !important; */
		width:208upx;
		height:88upx;
		border:1upx solid rgba(51,51,51,1);
		border-radius:44upx;
		flex:none;
	}
	uni-modal .uni-modal__btn_primary{
		border: none;
		background-color: #FFC833;
		flex:none;
	}
	uni-modal .uni-modal__btn:after{
		border: none;
	}
</style>
