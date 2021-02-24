<template>
	<view class="content">
		<view class="null" v-if="list.length <= 0">暂无数据</view>
		<view class="list" v-for="(item,i) in list" :key="i">
			<view class="listLeft">
				<view>微信 - {{item.doctor_name }}(昵称昵称)</view>
				<view class="listLeft_text">{{item.create_time }}</view>
			</view>
			<view class="listRight">
				<view v-if="item.type == 0">+{{item.price}}</view>
				<view v-if="item.type == 1">-{{item.price}}</view>
				<view v-if="item.status == 0" class="listRight_text">处理中</view>
				<view v-if="item.status == 1" class="listRight_text">提现成功</view>
				<view v-if="item.status == 2" class="listRight_text">提现失败</view>
			</view>
		</view>
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
				var that = this;
				this.httpTokenRequest({
				        url : "/doctor/account/account_log_list",
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
								}
								uni.hideNavigationBarLoading();//关闭加载动画
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
		width: 100%;
		padding: 0 30upx;
		box-sizing: border-box;
	}
	.list{
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-bottom: 1upx solid #F5F5F5;
		padding: 30upx 0;
	}
	.null {
		width: 100%;
		text-align: center;
		margin-top: 200upx;
	}
	.listLeft{
		text-align: left;
		font-size: 28upx;
		font-weight: 500;
		color: #222222;
	}
	.listLeft_text{
		font-size: 24upx;
		color: #888888;
		margin-top:20upx;
	}
	.listRight{
		text-align: right;
		font-size: 30upx;
		font-weight: 500;
		color: #FF0303;
	}
	.listRight_text{
		font-size: 24upx;
		color: #999999;
		margin-top:20upx;
	}
</style>
