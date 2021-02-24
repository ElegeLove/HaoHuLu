<template>
    <view class="content">
        <view class="main">
            <view class="user_icon">
                <text class="user_text">头像</text>
                <!-- <image class="user_img" src="../../static/images/logo.png" alt="" srcset=""> -->
				<view class="user_img">
					<!-- userinfo.headimgurl是用户登陆的头像也就是未更改时的头像 changeimg是用户更改后的头像 -->
					<image class="user_img" :src="dataVal.head" mode=""></image>
				</view>
            </view>
            <view class="userName">
                <text class="user_text">姓名</text>
                <text class="user_name">{{dataVal.name}}</text>
            </view>
            <view class="sex_main">
                <text class="user_text">性别</text>
                <text class="user_name">{{dataVal.sex_text}}</text>
                <!-- <view class="user_sex">
                    <view class="sex_left" @tap="sexchage(0)">
                        <image class="sex_img" :src="sexIndex==0?'../../static/images/Publish_selected.png':'../../static/images/Release_notselected.png'" alt="" srcset="">
                        <text>女</text>
                    </view>
                    <view class="sex_right" @tap="sexchage(1)">
                        <image class="sex_img" :src="sexIndex==1?'../../static/images/Publish_selected.png':'../../static/images/Release_notselected.png'" alt="" srcset="">
                        <text>男</text>
                    </view>
                </view> -->
            </view>
        </view>
        <view class="IDCard">身份证信息</view>
        <view class="card_main">
            <view class="user_icon">
                <text class="item-title">人像面照片</text>
                <view class="item-right">
                    <!-- userinfo.headimgurl是用户登陆的头像也就是未更改时的头像 changeimg是用户更改后的头像 -->
                    <image class="headimgsize" :src="dataVal.idcard_before" mode=""></image>
                </view>
            </view>
			<view class="user_icon">
                <text class="item-title">国徽面照片</text>
                <view class="item-right">
                    <!-- userinfo.headimgurl是用户登陆的头像也就是未更改时的头像 changeimg是用户更改后的头像 -->
                    <image class="headimgsize" :src="dataVal.idcard_after" mode=""></image>
                </view>
            </view>
			<view class="userName noborder">
			    <text class="user_text">身份证号码</text>
			    <text class="user_name">{{dataVal.idcard_num}}</text>
			</view>
        </view>
		<view class="IDCard">执业资格证信息</view>
        <view class="card_main">
            <view class="user_icon">
                <text class="item-title">证件照片</text>
                <view class="item-right">
                    <!-- userinfo.headimgurl是用户登陆的头像也就是未更改时的头像 changeimg是用户更改后的头像 -->
                    <image class="headimgsize" :src="dataVal.vocation_card" mode=""></image>
                </view>
            </view>
			<view class="userName noborder">
			    <text class="user_text">证件编号</text>
			    <text class="user_name">{{dataVal.vocation_num}}</text>
			</view>
        </view>
		<view class="IDCard">擅长方向</view>
        <view class="card_main_box">
            <text class="main_box_text">{{dataVal.speciality}}</text>
        </view>
		<view class="IDCard">个人简介</view>
        <view class="card_main_box">
            <text class="main_box_text">{{dataVal.desc}}</text>
        </view>
		<!-- <view class="order_box">
		    <view class="order_btn" @tap="next">
		        <text>下一步</text>
		    </view>
		</view> -->
    </view>
</template>

<script>
    import Vue from 'vue';
	export default Vue.extend({
		data() {
			return {
				dataVal:{}
			}
        },
		onLoad:function(option){
			var that = this;
			this.httpTokenRequest({
			        url : "/doctor/doctor/doctor",
			        method : "POST",
					dataType:'jsonp',
			        data : {},
			        hideLoading : true,
			    }).then(
					(res) => {
							console.log(res)
						if(res.data.code == 1){
							that.dataVal = res.data.data.result;
						}
					}
				).catch(
					(err) => {
						console.log(err)
						
					}
				);
		},
		methods: {
		}
	});
</script>

<style scoped>
	.content{
		width: 100%;
		padding-bottom: 20upx;
	}
    .main,.card_main{
        width: 100%;
        padding: 0 30upx;
        box-sizing: border-box;
        border-top: 1upx solid #E5E5E5;
    }
	.main{
		border: none;
	}
    .user_icon,.userName,.sex_main{
        padding: 15upx 0;
        border-bottom: 1upx solid #E5E5E5;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .userName{
        padding: 40upx 0;
    }
	.noborder{
		border: none;
	}
    .sex_main{
        border: none;
        padding: 40upx 0;
    }
	.user_text{
		width: 300upx;
	}
    .user_text,.item-title{
        font-size: 30upx;
        color: #323232;
    }
    .user_img{
        width: 90upx;
        height: 90upx;
        border-radius: 50%;
    }
    .user_name{
        text-align: right;
		font-size:30upx;
		font-family:'PingFang SC';
		font-weight:500;
		color:rgba(102,102,102,1);
    }
    .user_sex{
        display: flex;
        align-items: center;
    }
    .sex_left,.sex_right{
        display: flex;
        align-items: center;
    }
    .sex_left{
        margin-right: 100upx;
    }
    .sex_img{
        width: 36upx;
        height: 36upx;
        margin-right: 16upx;
    }
    .IDCard{
        width: 100%;
        height: 80upx;
        padding: 28upx 0 28upx 30upx;
        font-size: 24upx;
        color: #666666;
        box-sizing: border-box;
        background:rgba(245,245,245,1);
    }
    .card_main{
        border: none;
    }
    .headimgsize{
        width: 80upx;
        height: 80upx;
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
		color: #333333;
		font-size: 36upx;
	    border-radius: 44upx;
	    display: flex;
	    justify-content: center;
	    align-items: center;
	    margin-top: 50upx;
	}
	.card_main_box{
		width: 100%;
		background-color: #FFFFFF;
		padding: 30upx;
		box-sizing: border-box;
		font-size:28upx;
		font-family:'PingFang SC';
		font-weight:500;
		color:rgba(102,102,102,1);
		line-height: 36upx;
	}
</style>