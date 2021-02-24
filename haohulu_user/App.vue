<script>
	export default {
		onLaunch: function() {
			// console.log('App Launch')
			// uni.onTabBarMidButtonTap(function(e){
			// 	uni.navigateTo({
			// 		url: "/pages/Order/Order",
			// 		success: res => {},
			// 		fail: (err) => {console.log(err)},
			// 		complete: () => {}
			// 	});
			// })
			uni.getStorage({
				key: 'token',
				success: function(ress) {
					uni.reLaunch({
						url: "/pages/tab/tab",
						success: res => {console.log(23222)},
						fail: (err) => {console.log(1212)},
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
		// onShow: function() {
		// 	// console.log('App Show')
		// },
		// onHide: function() {
		// 	// console.log('App Hide')
		// }
	}
</script>

<style>
	/*每个页面公共css */
	.uni-video-cover{
		z-index: 0 !important;
	}
</style>
