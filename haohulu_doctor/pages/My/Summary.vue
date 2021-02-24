<template>
    <view>
        <view class="orderMain">
            <view class="orderLeft">
                <view class="order_text">{{list.today_order_num }}单</view>
                <view class="order_day">今日完成</view>
            </view>
            <view class="orderRight">
                <view class="order_text">&yen;{{list.today_income }}</view>
                <view class="order_day">今日收入</view>
            </view>
        </view>
        <view class="listTitle">
            <text>月份汇总</text>
        </view>
        <scroll-view scroll-y="true" class="list">
			<view class="null" v-if="list.month_list.length <= 0">暂无数据</view>
            <view class="listItem" v-for="(item,i) in list.month_list" :key="i">
                <view>
                    <view class="listItem_mouth">{{item.month_text}}月</view>
                    <view class="listItem_num">完成{{item.month_order_num}}单</view>
                </view>
                <view class="listItem_riht">&yen;{{item.month_income }}</view>
            </view>
        </scroll-view>
		<view v-if="list.month_list.length > 0">
			<uni-load-more :status="status" :content-text="contentText" color="#007aff" />
		</view>
    </view>
</template>

<script>
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue'
	export default({
		components: {
			uniLoadMore
		},
		data() {
			return {
				list:{},
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
			this.getList(this.pageNum,10);
		},
		//下拉刷新
		onPullDownRefresh: function() {
			this.list.month_list = [];
			this.pageNum = 1;
			this.getList(this.pageNum,10);
		},
		// 上拉加载
		onReachBottom: function() {
			let _self = this
			if (_self.status != 'more') {//loadingType!=0;直接返回
				return false;
			}
			_self.status = 'loading'
			uni.showNavigationBarLoading();
			_self.getList(_self.pageNum,10);
		},
		methods: {
			getList(pageNum,pageSize){
				var that = this;
				this.httpTokenRequest({
				        url : "/doctor/doctor/income_list",
				        method : "POST",
						dataType:'jsonp',
				        data : {
							"page_no":pageNum,
							"page_size":pageSize
						},
				        hideLoading : true,
				    }).then(
						(res) => {
							console.log(res)
							if(res.data.code == 1){
								that.list = res.data.data;
								if (that.list.month_list.length==res.data.data.total) {//没有数据
									that.status = 'noMore';
									uni.hideNavigationBarLoading();//关闭加载动画
									uni.stopPullDownRefresh();
									return false;
								}else{
									that.pageNum++
										that.list.month_list = that.list.month_list.concat(res.data.data.month_list);//将数据拼接在一起
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
	});
</script>

<style scoped>
    .orderMain{
        width: 100%;
        height: 200upx;
        padding: 55upx 0;
        box-sizing: border-box;
        background:#FFC833;
        display: flex;
        align-items: center;
    }
    .orderLeft,.orderRight{
        width: 50%;
        text-align: center;
    }
    .orderLeft{
        border-right: 1upx solid rgba(245,245,245,0.3);
    }
    .order_text{
        font-size: 48upx;
        color: #FFFFFF;
    }
    .order_day{
        font-size: 24upx;
        color: #FFFFFF;
    }
    .listTitle{
        line-height: 30upx;
        font-size: 36upx;
        color: #333333;
        margin-top: 39upx;
        border-left: 8upx solid #333333;
        margin-left: 30upx;
        padding-left: 17upx;
        margin-bottom: 70upx;
    }
    .list{
        width: 100%;
        padding: 0 32upx 0 18upx;
        box-sizing: border-box;
    }
	.null {
		width: 100%;
		text-align: center;
		margin-top: 200upx;
	}
    .listItem{
        width: 100%;
        padding: 0 4upx 24upx 6upx;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1upx solid #E5E5E5;
        margin-top: 23upx;
    }
    .listItem_mouth{
        font-size: 30upx;
        color: #333333;
        font-weight: bold;
        margin-bottom: 22upx;
    }
    .listItem_num{
        font-size: 24upx;
        color: #999999;
    }
    .listItem_riht{
        font-size: 30upx;
        color: #FF3030;
        font-weight: bold;
		margin-right: 10upx;
    }
</style>