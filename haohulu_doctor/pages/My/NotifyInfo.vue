<template>
	<view class="content">
		<scroll-view class="main" scroll-y="true" :style="{height:heights}">
			<view class="null" v-if="list.length <= 0">暂无数据</view>
			<view class="item" v-for="(item,i) in list" :key="i">
				<view class="item_time">{{item.create_time }}</view>
				<view class="item_main">
					<view class="item_main_title">{{item.title }}</view>
					<view class="item_main_text">{{item.content }}</view>
				</view>
			</view>
		</scroll-view>
		<view v-if="list > 0">
			<uni-load-more :status="status" :content-text="contentText" color="#007aff" />
		</view>
	</view>
</template>

<script>
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue'
	export default {
		components: {
			uniLoadMore
		},
		data() {
			return {
				list:[],
				heights:'',
				status: 'more',
				pageNum:1,
				statusTypes: [{
					value: 'more',
					text: '加载前'
				}, {
					value: 'loading',
					text: '加载中'
				}, {
					value: 'noMore',
					text: '没有更多'
				}],
				contentText: {
					contentdown: '查看更多',
					contentrefresh: '加载中...',
					contentnomore: '没有更多'
				}
			}
		},
		 onLoad:function(option){
			 let that = this;
			uni.getSystemInfo({
			    success(res) {
					that.heights = uni.upx2px(res.windowHeight*2) + 'px';
			    }
			});
			this.getList(1,5);
		},
		//下拉刷新
		onPullDownRefresh: function() {
			this.list = [];
			this.pageNum = 1;
			this.getList(this.pageNum,5);
		},
		// 上拉加载
		onReachBottom: function() {
			let _self = this
			if (_self.status != 'more') {//loadingType!=0;直接返回
				return false;
			}
			this.status = 'loading'
			uni.showNavigationBarLoading();
			_self.getList(_self.pageNum,5);
		},
		methods: {
			getList(pageNum,pageSize){
				let that = this;
				this.httpTokenRequest({
				        url : "/doctor/msg/msg_list",
				        method : "POST",
						dataType:'jsonp',
				        data : {
							"page_no":pageNum,
							"page_size":pageSize
						},
				        hideLoading : true,
				    }).then(
						(res) => {
							if(res.data.code == 1){
								// that.list = res.data.data.list;
								if(res.data.data.list.length < 2){
									uni.getSystemInfo({
									    success(res) {
											that.heights = uni.upx2px(res.windowHeight*2) + 'px';
									    }
									});
								}else{
									that.heights = '';
								}
								if (that.list.length==res.data.data.total) {//没有数据
									that.status = 'noMore';
									uni.hideNavigationBarLoading();//关闭加载动画
									uni.stopPullDownRefresh();
									return false;
								}else{
									that.pageNum++
										that.list = that.list.concat(res.data.data.list);//将数据拼接在一起
									// for(var i=that.orderList.length;i<res.data.data.total;i++){
									// }
									that.status = 'more';//将loadingType归0重置
									uni.hideNavigationBarLoading();//关闭加载动画
								}
							}
							uni.stopPullDownRefresh();
						}
					).catch(
						(err) => {
							console.log(err)
							
						}
					)
			}
		}
	}
</script>

<style scoped>
	.content{
		background: #F5F5F5;
	}
	.main{
		width: 100%;
		padding: 36upx 30upx;
		box-sizing: border-box;
	}
	.null {
		width: 100%;
		text-align: center;
		margin-top: 200upx;
	}
	.item{
		margin-bottom: 56upx;
	}
	.item_time{
		width: 100%;
		font-size: 24upx;
		color: #999999;
		text-align: center;
		margin-bottom: 42upx;
	}
	.item_main{
		width: 100%;
		background: #FFFFFF;
		border-radius:10upx;
		padding: 36upx 27upx;
		box-sizing: border-box;
	}
	.item_main_title{
		font-size: 36upx;
		color: #333333;
		font-weight: bold;
		line-height: 100upx;
		border-bottom: 1upx solid #E5E5E5;
		margin-bottom: 30upx;
	}
	.item_main_text{
		font-size: 26upx;
		color: #666666;
	}
</style>
