<template>
    <view class="content">
		<view class="inv-h-w">
			<view :class="['inv-h',Inv==2?'inv-h-se':'']" @tap="checkInfo(2)">进行中</view>
			<view :class="['inv-h',Inv==6?'inv-h-se':'']" @tap="checkInfo(6)">已完成</view>
			<view :class="['inv-h',Inv==4?'inv-h-se':'']" @tap="checkInfo(4)">取消单</view>
		</view>
		<view class="tab1" v-show="Inv == 2">
			<scroll-view class="main" scroll-y="true" :style="{height:heights}">
				<view class="null" v-if="list.length <= 0">暂无数据</view>
				<view class="item" v-for="(item,i) in list" :key="i">
					<view class="item_header" @tap="showInfo(item.order_sn)">
						<view class="item_top">
							<view class="top_time">
								<text class="top_time_left">{{item.start_date_slot}}</text>
								<text class="top_time_right">{{item.date_text}}</text>
							</view>
							<view class="top_adrss">{{item.address}}</view>
							<view>{{item.member_name}}（{{item.sex_text}}）</view>
						</view>
						<view class="item_header_right" v-if="item.order_status ==2">
							<image class="icon_header_img" src="../../static/images/Doctor_time.png" alt="" srcset=""></image>
							<view>等待上门</view>
						</view>
						<view class="item_header_right" v-if="item.order_status ==3">
							<image class="icon_header_img" src="../../static/images/Doctor_time.png" alt="" srcset=""></image>
							<view>正在进行中</view>
						</view>
					</view>
					<view class="item_main">
						<view @tap="showInfo(item.order_sn)">
							<view class="main_title">详情描述</view>
							<text class="main_text">{{item.desc }}</text>
							<view class="main_imgs">
								<image class="main_img" v-for="(itemChild,j) in item.images" :key="j" :src="itemChild"></image>
								<!-- <image class="main_img" src="../../static/images/img.png"></image> -->
							</view>
							<view class="main_title">特殊情况</view>
							<text class="main_text">{{item.special_intro }}</text>
							<view class="main_price">
								<text>价格 ：</text>
								<text class="price_num">&yen;{{item.price }}</text>
							</view>
						</view>
						<view class="item_btn" v-if="item.order_status == 2">
							<view class="main_btn" @tap="clickMe(item.order_sn )">
								<text>我已上门</text>
							</view>
							<view class="main_btns" @tap="clickPhone(item.mobile)">
								<text>联系对方</text>
							</view>
						</view>
						<view class="item_btn" v-if="item.order_status == 3">
							<view class="main_btn" @tap="clicksure(item.order_sn )">
								<text>确认完成</text>
							</view>
						</view>
						<view class="item_btn" v-if="item.order_status == 5">
							<view class="main_btn" style="background-color: #ccc;">
								<text>等待对方确认</text>
							</view>
						</view>
					</view>
				</view>
				<view v-if="list.length > 0">
					<uni-load-more :status="status" :content-text="contentText" color="#007aff" />
				</view>
			</scroll-view>
		</view>
		<view class="tab2" v-show="Inv == 6">
			<scroll-view class="main" scroll-y="true" :style="{height:heights}">
				<view class="null" v-if="list.length <= 0">暂无数据</view>
				<view class="item" v-for="(item,o) in list" :key="o">
					<view class="item_header" @tap="showInfo(item.order_sn)">
						<view class="item_top">
							<view class="top_time">
								<text class="top_time_left">{{item.start_date_slot }}</text>
								<text class="top_time_right">{{item.date_text}}</text>
							</view>
							<view class="top_adrss">{{item.address }}</view>
							<view>{{item.member_name }}（{{item.sex_text }}）</view>
						</view>
						<view class="item_header_right">
							<image class="icon_header_img" src="../../static/images/Doctor_time.png" alt="" srcset=""></image>
							<view>已完成</view>
						</view>
					</view>
					<view class="item_main">
						<view @tap="showInfo(item.order_sn)">
							<view class="main_title">详情描述</view>
							<text class="main_text">{{item.desc }}</text>
							<view class="main_imgs">
								<image class="main_img" v-for="(itemChild,j) in item.images" :key="j" :src="itemChild"></image>
							</view>
							<view class="main_title">特殊情况</view>
							<text class="main_text">{{item.special_intro }}</text>
							<view class="main_price">
								<text>价格 ：</text>
								<text class="price_num">&yen;{{item.price }}</text>
							</view>
						</view>
						<view v-if="item.is_pay_thank == 0" class="main_btn" @tap="clickPing(item.order_sn)">
							<text>去感谢平台</text>
						</view>
						<view v-if="item.is_pay_thank == 1" class="main_btn noBtn">
							<text>感谢您的支持</text>
						</view>
					</view>
				</view>
				<view v-if="list.length  > 0">
					<uni-load-more :status="status" :content-text="contentText" color="#007aff" />
				</view>
			</scroll-view>
		</view>
		<view class="tab3" v-show="Inv == 4">
			<scroll-view class="main" scroll-y="true" :style="{height:heights}">
				<view class="null" v-if="list.length <= 0">暂无数据</view>
				<view class="item" v-for="(item,u) in list" :key="u" @tap="showInfo(item.order_sn)">
					<view class="item_header">
						<view class="item_top">
							<view class="top_time">
								<text class="top_time_left">{{item.start_date_slot }}</text>
								<text class="top_time_right">{{item.date_text}}</text>
							</view>
							<view class="top_adrss">{{item.address }}</view>
							<view>{{item.member_name }}（{{item.sex_text }}）</view>
						</view>
						<view class="item_header_right">
							<image class="icon_header_img" src="../../static/images/Doctor_time.png" alt="" srcset=""></image>
							<view>已取消</view>
						</view>
					</view>
					<view class="item_main">
						<view class="main_title">详情描述</view>
						<text class="main_text">{{item.desc }}</text>
						<view class="main_imgs">
							<image class="main_img" v-for="(itemChild,j) in item.images" :key="j" :src="itemChild"></image>
						</view>
						<view class="main_title">特殊情况</view>
						<text class="main_text">{{item.special_intro }}</text>
						<view class="main_price">
							<text>价格 ：</text>
							<text class="price_num">&yen;{{item.price }}</text>
						</view>
					</view>
				</view>
				<view v-if="list.length  > 0">
					<uni-load-more :status="status" :content-text="contentText" color="#007aff" />
				</view>
			</scroll-view>
		</view>
    </view>
</template>

<script>
    import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue'
    export default ({
    	components: {
    		uniLoadMore
    	},
		data() {
			return {
				Inv:2,
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
		onShow:function(){
			console.log()
			this.list = [];
			this.pageNum = 1;
			this.orderList(1,5,this.Inv);
		},
		onLoad:function(option){
			let that = this;
			uni.getSystemInfo({
				success(res) {
					that.heights = uni.upx2px(res.windowHeight*2) + 'px';
				}
			});
			this.orderList(1,5,2);
		},
		//下拉刷新
		onPullDownRefresh: function() {
			this.list = [];
			this.pageNum = 1;
			this.orderList(this.pageNum,5,this.Inv);
		},
		// 上拉加载
		onReachBottom: function() {
			let _self = this
			if (_self.status != 'more') {//loadingType!=0;直接返回
				return false;
			}
			this.status = 'loading'
			uni.showNavigationBarLoading();
			_self.orderList(_self.pageNum,5,this.Inv);
		},
		methods: {
			orderList(pageNum,pageSize,i){
				let that = this;
				this.httpTokenRequest({
				        url : "/doctor/order/order_list",
				        method : "POST",
						dataType:'jsonp',
				        data : {
							"page_no":pageNum,
							"page_size":pageSize,
							"order_status":i
						},
				        hideLoading : true,
				    }).then(
						(res) => {
							console.log(res)
							if(res.data.code == 1){
								// that.list = res.data.data.list;
								if(res.data.data.list.length < 2){
									uni.getSystemInfo({
										success(res) {
											that.heights = uni.upx2px(res.windowHeight*2) + 'px';
										}
									});
								}
								for (let val in that.list) {
									// that.imgArr = [];
									// console.log(that.orderInfo)
									let imgArr = [];
									for (let i in that.list[val].images) {
									    imgArr.push(that.list[val].images[i]);
									}
									that.list[val].images = imgArr;
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
			},
			clickPing(id){
				uni.navigateTo({
					url: "/pages/Order/payThanks?id="+id,
					success: res => {},
					fail: (err) => {console.log(err)},
					complete: () => {}
				});
			},
			clickMe(orderId){
				var that = this;
				this.httpTokenRequest({
				        url : "/doctor/order/order_on_door",
				        method : "POST",
						dataType:'jsonp',
				        data : {
							"order_sn":orderId,
							"order_status":3
						},
				        hideLoading : true,
				    }).then(
						(res) => {
							console.log(res)
							if(res.data.code == 1){
								uni.showToast({
									title: res.data.msg,
									icon:'none',
									duration: 2000
								});
								that.list = [];
								that.pageNum = 1;
								that.orderList(1,5,2);
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
			},
			clicksure(id){
				this.httpTokenRequest({
						url : "/doctor/order/order_confirm",
						method : "POST",
						dataType:'jsonp',
						data : {
							"order_sn":id
						},
						hideLoading : true,
					}).then(
						(res) => {
							console.log(res)
							if(res.data.code == 1){
								uni.navigateTo({
									url: "/pages/Order/Surefinish",
									success: res => {},
									fail: (err) => {console.log(err)},
									complete: () => {}
								});
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
			},
			clickPhone(phone){
				uni.makePhoneCall({
				 	// 手机号
				    phoneNumber: phone,
					// 成功回调
					success: (res) => {
						console.log('调用成功!')	
					},
					// 失败回调
					fail: (res) => {
						console.log('调用失败!')
					}
				  });
			},
			checkInfo(index){
				this.Inv = index;
				this.list = [];
				this.pageNum = 1;
				this.orderList(1,5,this.Inv);
			},
			showInfo(orderId){
				uni.navigateTo({
					url: "/pages/Order/OrderInfo?id="+this.Inv+"&orderId="+orderId,
					success: res => {},
					fail: (err) => {console.log(err)},
					complete: () => {}
				});
			}
		}
	});
</script>

<style scoped>
	.inv-h-w{
		width: 100%;
		background-color: #FFFFFF;
		height: 100upx;
		padding-top: 50upx;
		display: flex;
		justify-content: space-around;
		align-items: center;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 2;
	}
	.inv-h{
		width: 110upx;
		font-size: 30upx;
		text-align: center;
		color: #999999;
		line-height: 40upx;
	}
	.inv-h-se{
		width: 110upx;
		color: #333333;
		font-size: 36upx;
		border-bottom: 12upx solid #FFC833;
	}
	.content{
		background-color: #F2F2F2;
	}
	.tab1,.tab2,.tab3{
		padding: 50upx 30upx 30upx;
	}
	.main{
		width: 100%;
		padding: 80upx 30upx 0;
		/* padding: 0 30upx; */
		box-sizing: border-box;
	}
	.null {
		width: 100%;
		text-align: center;
		margin-top: 200upx;
	}
	.item{
		width: 100%;
		border-radius:10upx;
		background: #FFFFFF;
		overflow: hidden;
		margin-top: 30upx;
	}
	.item_header{
		width: 100%;
		background: #FFC833;
		padding: 27upx 35upx;
		box-sizing: border-box;
		color: #FFFFFF;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.item_top{
		font-size: 26upx;
	}
	.top_time{
		display: flex;
		align-items: center;
		margin-bottom: 32upx;
	}
	.top_time_left{
		font-size: 48upx;
	}
	.top_time_right{
		font-size: 30upx;
		margin-left: 22upx;
	}
	.item_header_right{
		text-align: center;
		font-size: 30upx;
	}
	.icon_header_img{
		width: 67upx;
		height: 67upx;
		margin-bottom: 22upx;
	}
	.top_adrss{
		width: 400upx;
		margin-bottom: 17upx;
	}
	.item_main{
		padding: 38upx 26upx;
		background: #FFFFFF;
	}
	.main_title{
		height: 29upx;
		line-height: 29upx;
		font-size: 30upx;
		color: #000000;
		border-left: 6upx solid #FFC833;
		padding-left: 13upx;
		margin-bottom: 29upx;
	}
	.main_text{
		font-size: 28upx;
		color: #333333;
	}
	.main_imgs{
		margin: 35upx 0 90upx;
	}
	.main_img{
		width: 130upx;
		height: 130upx;
		border-radius: 10upx;
		margin-right: 20upx;
	}
	.main_price{
		margin-top: 42upx;
		border-top: 1upx solid #E5E5E5;
		padding-top: 30upx;
		font-size: 28upx;
		color: #333333;
		display: flex;
		align-items: center;
	}
	.price_num{
		font-size: 40upx;
		color: #FF0000;
		font-weight:500;
	}
	.item_btn{
		display: flex;
		align-items: center;
	}
	.main_btn,.main_btns{
		width: 210upx;
		height: 60upx;
		border-radius:30upx;
		margin-top: 48upx;
		background: #FFC833;
		font-size: 28upx;
		color: #333333;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.noBtn{
		background-color: #FFFFFF;
	}
	.main_btns{
		background: #FFFFFF;
		border: 1upx solid #FFC833;
		margin-left: 16upx;
	}
</style>