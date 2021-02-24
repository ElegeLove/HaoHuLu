<template>
    <view>
		<view class="item">
            <view class="item_header">
                <view class="item_top">
                    <view class="top_time">
                        <text class="top_time_left">15:00 - 16:00</text>
                        <text class="top_time_right">今天</text>
                    </view>
                    <view class="top_adrss">重庆市江北区金刚大厦25-6</view>
                    <view>李言（男）</view>
                </view>
                <view class="item_header_right">
                    <image class="icon_header_img" src="../../static/images/Doctor_time.png" alt="" srcset=""></image>
                    <view>等待上门</view>
                </view>
            </view>
            <view class="item_main">
                <view class="main_title">详情描述</view>
                <text class="main_text">医生，钻研学习医学科学技术，挽救生命以治病为业的人一般指临床医生。</text>
                <view class="main_imgs">
                    <image class="main_img" src="../../static/images/img.png"></image>
                    <image class="main_img" src="../../static/images/img.png"></image>
                </view>
                <view class="main_title">特殊情况</view>
                <text class="main_text">医生，钻研学习医学科学技术，挽救生命以治病为业的人一般指临床医生。</text>
                <view class="main_price">
                    <text>价格 ：</text>
                    <text class="price_num">&yen;310.00</text>
                </view>
            </view>
        </view>
        <view class="orderInfo">
            <view class="order_time">
                <text class="order_time_title">接单时间</text>
                <view class="order_time_right">
                    <text>2019-10-15 15:23</text>
                    <image class="order_time_img" src="../../static/images/Publish_arrow.png"></image>
                </view>
            </view>
            <view class="order_num">
                <text class="order_time_title">订单号</text>
                <view class="order_time_right">
                    <text>5215478598745</text>
                </view>
            </view>
            <view class="order_box">
                <view class="order_btn" @click="sure">
                    <text>确认完成</text>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
    import Vue from 'vue';
	export default Vue.extend({
		data() {
			return {
				Inv:0
			}
		},
		methods: {
            sure(){
				uni.navigateTo({
					url: "/pages/Order/Surefinish",
					success: res => {},
					fail: (err) => {console.log(err)},
					complete: () => {}
				});
			}
		}
	});
</script>

<style scoped>
    page{
		background-color: #F5F5F5;
	}
	.item{
		width: 100%;
		/* border-radius:10upx; */
		background: #FFFFFF;
		overflow: hidden;
		/* margin-top: 30upx; */
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
	.orderInfo{
        width: 100%;
        padding: 0 28upx;
        margin-top: 30upx;
        box-sizing: border-box;
        background: #FFFFFF;
    }
    .order_time,.order_num{
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        line-height: 128upx;
        border-bottom: 1upx solid #E5E5E5;
    }
    .order_time_img{
        width: 28upx;
        height: 24upx;
        margin-left: 19upx;
    }
    .order_num{
        border: none;
    }
    .order_time_title{
        font-size: 30upx;
        color: #000000;
    }
    .order_time_right{
        font-size: 30upx;
        color: #666666;
    }
    .order_box{
        width: 100%;
        padding: 0 30upx 20upx;
        box-sizing: border-box;
    }
    .order_btn{
        width: 100%;
        height: 88upx;
        background: #FFC833;
        border-radius: 44upx;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 50upx;
    }
</style>