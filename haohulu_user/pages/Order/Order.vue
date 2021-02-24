<template>
	<view class="content">
		<view class="content_main">
			<view class="uni-textarea">
				<textarea class="main_txt mainTitle" maxlength="300" :value='detalVal' @input="candicine" placeholder="填写详情描述..." />
				</view>
			<view class="unlodImg">
				<view class="unlodImg_item">
					<image class="headimgsize" @tap="changeImg" v-if="changeimg == ''" :src="headimgurl"></image>
					<view class="delImg" @tap="del(0)" v-if="changeimg != ''">
						<image src="../../static/images/Details_cancelleds.png"></image>
					</view>
				    <video class="headimgsize" duration="30"  v-if="changeimg != ''" enable-danmu show-mute-btn controls :src="headimgurl || changeimg" mode=""></video>
				</view>
				<view class="unlodImg_item" v-if="imgsArr.length > 0" v-for="(item,i) in imgsArr" :key="i">
					<view class="delImg" @tap="del(1,i)">
						<image src="../../static/images/Details_cancelleds.png"></image>
					</view>
				    <image class="headimgsize" :src="item" mode=""></image>
				    <!-- <image class="headimgsize" @tap="changesImg" :src="headimgsurl || changesimg" mode=""></image> -->
				</view>
				<view class="unlodImg_item" v-if="imgsArr.length < 3">
				    <!-- userinfo.headimgurl是用户登陆的头像也就是未更改时的头像 changeimg是用户更改后的头像 -->
					<!-- <image class="delImg" @tap="del(1)" v-if="changesimg != ''" src="../../static/images/Details_cancelled.png"></image> -->
				    <!-- <image class="headimgsize" v-for="(item,i) in imgsArr" :key="i" :src="item" mode=""></image> -->
				    <image class="headimgsize" @tap="changesImg" :src="headimgsurl" mode=""></image>
				</view>
			</view>
			<view class="list" @tap="goSpecial">
			    <view class="list_left">
			        <text class="main_txt">特殊情况（选填）</text>
			    </view>
				<view class="icon_img">
					<text class="icon_name" v-if="specialCase == ''">个人特殊情况</text>
					<text class="icon_name specialText fontSize" v-else>{{specialCase}}</text>
					<image class="icon_right" src="../../static/images/Publish_arrow.png" alt="" srcset="">
				</view>
			</view>
			<view class="list" @tap="goAdrss">
			    <view class="list_left">
			        <text class="main_txt">上门地址</text>
			    </view>
				<view class="icon_img">
					<view class="icon_name" :style="newAdrssval.mobile==''?'':'color:#333333'">
						<view class="adssVal">{{newAdrssval.address}}</view>
						<view v-if="newAdrssval.sex == 0">{{newAdrssval.member_name}}</view>
						<view v-if="newAdrssval.sex != 0">{{newAdrssval.member_name}}（{{newAdrssval.sex==1?'男':'女'}}）&nbsp;{{newAdrssval.mobile}}</view>
					</view>
					<image class="icon_right" src="../../static/images/Publish_arrow.png" alt="" srcset="">
				</view>
			</view>
			<view class="list" @tap="showMask">
			    <view class="list_left">
			        <text class="main_txt">上门时间</text>
			    </view>
				<view class="icon_img">
					<text class="icon_name fontSize" v-if="datatime.timeStamp">{{datatime._dateRange}}</text>
					<text class="icon_name" v-else>{{datatime._dateRange}}</text>
					<image class="icon_right" src="../../static/images/Publish_arrow.png" alt="" srcset="">
				</view>
			</view>
			<view class="list">
			    <view class="list_left">
			        <text class="main_txt">悬赏</text>
			    </view>
				<input class="icon_name inputVal" placeholder-style="color:#999999" :value="priceVal" @input="chagePrice" type="number" placeholder="请输入愿意支付的价格">
				<!-- <view class="icon_img">
					<text class="icon_name">请输入愿意支付的价格</text>
				</view> -->
			</view>
			<view class="list paymode" @tap="open">
			    <view class="list_left">
			        <text class="main_txt">付款方式</text>
			    </view>
				<view class="icon_img">
					<!-- <text class="icon_name" v-if="select == -1">微信支付</text> -->
					<text class="icon_nameRen">{{select==0?'微信支付':'支付宝支付'}}</text>
					<image class="icon_right" src="../../static/images/Publish_arrow.png" alt="" srcset="">
				</view>
			</view>
		</view>
		<view class="footer">
			<view class="btn" @tap="subBtn">立即发布</view>
		</view>
		<uni-popup ref="popup" type="bottom" maskClick>
			<view class="popTitle">付款方式</view>
			<image @tap="hindpop" class="popImg" src="../../static/images/Details_cancelled.png" mode=""></image>
			<view class="account" @tap="isSelect" v-bind:id="0">
				<view class="account_left">
					<image class="icon_wx" src="../../static/images/weixinlingqian.png" mode=""></image>
					<text class="left_text">微信支付</text>
				</view>
				<view class="account_right">
					<view>
						<image class="select" v-if="select == 0" src="../../static/images/Publish_selected.png" mode=""></image>
						<image class="select" v-else src="../../static/images/Release_notselected.png" mode=""></image>
					</view>
				</view>
			</view>
			<view class="account" @tap="isSelect" v-bind:id="1">
				<view class="account_left">
					<image class="icon_wx" src="../../static/images/pic_zhifubao.png" mode=""></image>
					<text class="left_text">支付宝支付</text>
				</view>
				<view class="account_right">
					<view>
						<image class="select" v-if="select == 1" src="../../static/images/Publish_selected.png" mode=""></image>
						<image class="select" v-else src="../../static/images/Release_notselected.png" mode=""></image>
					</view>
				</view>
			</view>
			<view class="popBtn" @tap="subSure">确定</view>
		</uni-popup>
		<hTimeAlert
			title="上门时间"
			rangeStartTime="00:00:00"
			rangeEndTime="24:00:00"
			defaultTime="2020/3/30 18:00:00"
			intervalTime="60"
			dayStartIntTime="0"
			rangeDay="2"
			:isShow="isShow"
			:maskHide="maskHide"
			:rangeType="rangeType"
			:closeBtn="closeBtn"
			@closeAlert="handelClose"
		>
		</hTimeAlert>
    </view>
</template>

<script>
	import uniPopup from "@/components/uni-popup/uni-popup.vue"
	import hTimeAlert from "@/components/h-time-alert/h-time-alert.vue";
	export default ({
		components: {
			uniPopup,
			hTimeAlert
		},
		data() {
			return {
				headimgurl:'../../static/images/img2.png',
				changeimg:'',
				vadioId:'',
				headimgsurl:'../../static/images/img.png',
				changesimg:'',
				imgsId:[],
				imgsArr:[],
				detalVal:'',//详情描述
				specialCase:'',//特殊情况
				newAdrssval:{
					member_name: "选择问诊地址",
					sex: 0,
					mobile: "",
					address: ""
				},
				priceVal:'',
				select:0,
				isShow: false,
				maskHide: false,
				closeBtn: false,
				rangeType: true,
				dataTimes:'',
				datatime:{
					_dateRange:'选择期望上门时间'
				}
			}
		},
		onBackPress(options) {
			plus.key.hideSoftKeybord();
			uni.reLaunch({
				url: "/pages/tab/tab?id=0",
				success: res => {},
				fail: (err) => {
					console.log(err)
				},
				complete: () => {}
			});
		},
		methods: {
			//详情描述
			candicine(e){
				this.detalVal = e.target.value;
			},
			//特殊情况
			goSpecial(){
				if(this.specialCase != ''){
					uni.navigateTo({
						url: "/pages/My/special?val="+this.specialCase,
						success: res => {},
						fail: (err) => {
							console.log(err)
						},
						complete: () => {}
					});
				}else{
					uni.navigateTo({
						url: "/pages/My/special",
						success: res => {},
						fail: (err) => {
							console.log(err)
						},
						complete: () => {}
					});
				}
			},
			backSpecial(val){
				this.specialCase = val;
			},
			//上门地址
			goAdrss(){
				uni.navigateTo({
					url: "/pages/My/homeAddress",
					success: res => {},
					fail: (err) => {
						console.log(err)
					},
					complete: () => {}
				});
			},
			callBack(val){
				this.newAdrssval = val;
			},
			//视频上传
			changeImg() {
				let that = this;
			    uni.chooseVideo({
					maxDuration:30,
			        success: (chooseImageRes) => {
						if(Math.floor(parseFloat(chooseImageRes.duration)) <= 30){
							const tempFilePaths = chooseImageRes.tempFilePath;
							uni.uploadFile({
								url:"http://haohulu.mx5918.com/index.php/share/upload/index",
								filePath: chooseImageRes.tempFilePath,
								name: 'file',
								success:(res)=>{
									let data = JSON.parse(res.data);
									console.log(data)
									if(data.code == 1){
										that.headimgurl = '';
										that.changeimg = tempFilePaths;
										that.vadioId = data.data.attachment_id;
									}else{
										uni.showToast({
											title: data.msg,
											icon:'none',
											duration: 2000
										});
									}
								},
								fail:(err)=>{
									console.log(err)
								}
							});
						}else{
							uni.showToast({
								title: '上传视频时长不得超过30s',
								icon:'none',
								duration: 2000
							});
						}
			   
			        },
					fail:function(errs){
						console.log(errs)
					}
			    });
			},
			//图片上传
			changesImg() {
				let that = this;
			    uni.chooseImage({
					count:1,
			        success: (chooseImageRes) => {
			            const tempFilePaths = chooseImageRes.tempFilePaths;
						// that.headimgsurl = '';
			            // that.changesimg = tempFilePaths[0];
			            // that.imgsArr = that.imgsArr.concat(tempFilePaths);
						console.log(chooseImageRes)
						uni.uploadFile({
							url:"http://haohulu.mx5918.com/index.php/share/upload/index",
							filePath: chooseImageRes.tempFiles[0].path,
							name: 'file',
							success:(res)=>{
								let data = JSON.parse(res.data);
								console.log(data)
								if(data.code == 1){
									that.imgsArr = that.imgsArr.concat(tempFilePaths);
									that.imgsId = that.imgsId.concat(data.data.attachment_id);
								}else{
									uni.showToast({
									    title: data.msg,
										icon:'none',
									    duration: 2000
									});
								}
							},
							fail:(err)=>{
								console.log(err)
								uni.showToast({
								    title: JSON.stringify(err),
									icon:'none',
								    duration: 2000
								});
							}
						});
			        }
			    });
			},
			//删除图片或视频
			del(i,i2){
				if(i==0){
					this.headimgurl = '../../static/images/img2.png';
					this.changeimg = '';
				}else{
					this.imgsArr.splice(i2,1);
					this.imgsId.splice(i2,1);
				}
			},
			unpdataUser(){
				this.$refs.poptime.open()
			},
			//支付价格
			chagePrice(e){
				this.priceVal = e.target.value;
			},
			//时间段
			showMask() {
				this.isShow = true;
			},
			handelClose(data) {
				console.log(data)
				let index=data.dateRange.lastIndexOf(" ");
				let datamain = data.dateRange.substring(index+1,data.dateRange.length);
				this.dataTimes = datamain;
				if(datamain == '-'){
					this.datatime = {
						_dateRange:'选择期望上门时间'
					}	
				}else{
					this.datatime = data;
				}
				this.isShow = false;
			},
			//支付方式
			open(){
				this.$refs.popup.open()
			},
			//方式选择
			isSelect(e){
				this.select = e.currentTarget.id;
			},
			hindpop(){
				this.$refs.popup.close();
			},
			subSure(){
				this.$refs.popup.close();
			},
			//发布
			subBtn(){
				// console.log(this.detalVal)
				// console.log(this.vadioId)
				// console.log(this.imgsId)
				// console.log(this.specialCase)
				// console.log(this.newAdrssval)
				// console.log(this.datatime)
				// console.log(this.priceVal)
				// console.log(this.select)
				var that = this;
				let imgArr = '';
				if(this.imgsId.length > 0){
					imgArr = this.imgsId.join(',');
				}else{
					imgArr = '';
				}
				
				let data ={
					"images":imgArr,
					"latitude":that.newAdrssval.latitude,
					"longitude":that.newAdrssval.longitude,
					"address_id":that.newAdrssval.id,
					"start_date_slot":that.dataTimes,
					"pay_type":that.select,
					"price":that.priceVal,
					"special_intro":that.specialCase,
					"video":that.vadioId,
					"desc":that.detalVal,
					"trade_no":'324354'
				}
				console.log(data)
				if(that.dataTimes == '' || that.dataTimes == '-'){
					uni.showToast({
						title: '请选择上门时间',
						icon:'none',
						duration: 2000
					});
				}else{
					this.httpTokenRequest({
					        url : "/member/order/add_order",
					        method : "POST",
							dataType:'jsonp',
					        data : {
								"images":imgArr,
								"latitude":that.newAdrssval.latitude,
								"longitude":that.newAdrssval.longitude,
								"address_id":that.newAdrssval.id,
								"start_date_slot":that.dataTimes,
								"pay_type":that.select,
								"price":that.priceVal,
								"special_intro":that.specialCase,
								"video":that.vadioId,
								"desc":that.detalVal,
								"trade_no":'324354',
							},
					        hideLoading : true,
					    }).then(
							(res) => {
								console.log(res)
								if(res.data.code == 1){
									uni.navigateTo({
										url: "/pages/My/publish?orderId="+res.data.data,
										success: res => {},
										fail: (err) => {
											console.log(err)
										},
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
				}
			}
		}
	});
</script>

<style scoped>
	.content{
		width: 100%;
		padding: 0 30upx 20upx;
		box-sizing: border-box;
		position: fixed;
		top: 0;
		left: 0;
	}
	.content_main{
		width: 100%;
		margin-bottom: 200upx;
		/* padding-bottom: 200upx; */
	}
	.main_txt{
		width: 100%;
		height: 200upx;
		background: #FFFFFF;
		padding: 0 24upx 20upx;
		box-sizing: border-box;
		font-size: 28upx;
		color: #999999;
		margin: 0 0 20upx;
	}
	.mainTitle{
		margin: 0;
		padding-left: 0;
		padding-right: 0;
		text-align: justify;
	}
	.unlodImg{
		display: flex;
		align-items: center;
	}
	.unlodImg_item{
		width: 160upx;
		height: 160upx;
		border-radius: 10upx;
		margin-right: 16upx;
		position: relative;
	}
	.delImg{
		width: 30upx;
		height: 30upx;
		border-radius: 50%;
		background-color: #FFFFFF;
		position: absolute;
		top: -26upx;
		right: -14upx;
		z-index: 8;
	}
	.delImg image{
		width: 100%;
		height: 100%;
		z-index: 0;
	}
	.headimgsize{
	    width: 160upx;
	    height: 160upx;
	    border-radius: 10upx;
	}
	.list{
	    width: 100%;
	    display: flex;
	    justify-content: space-between;
	    align-items: center;
	    border-bottom: 1upx solid #E5E5E5;
	    padding: 30upx 0;
	}
	/* .list_left{
	    display: flex;
	    align-items: center;
	} */
	.icon_img{
		display: flex;
		align-items: center;
	}
	.icon_right{
	    width: 30upx;
	    height: 30upx;
		margin-left: 18upx;
	}
	.icon_name{
		font-size: 30upx;
		color: #999999;
		text-align: right;
	}
	.adssVal{
		width: 400upx;
		overflow: hidden;
		text-overflow:ellipsis;
		white-space: nowrap;
	}
	.icon_nameRen{
		color: #333333;
		font-size: 30upx;
		text-align: right;
	}
	.fontSize{
		color: #333333;
		font-size: 30upx;
	}
	.specialText{
		width: 260upx;
		overflow: hidden;
		text-overflow:ellipsis;
		white-space: nowrap;
	}
	.inputVal{
		text-align: right !important;
		color: #333333;
	}
	.main_txt{
	    font-size: 30upx;
	    color: #323232;
	}
	.account{
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-top: 43upx;
		z-index: 50;
	}
	.popTitle{
		width: 100%;
		text-align: center;
	}
	.account_left,.account_right{
		display: flex;
		align-items: center;
	}
	.icon_wx{
		width: 50upx;
		height: 50upx;
		border-radius: 50%;
		margin-right: 16upx;
	}
	.select{
		width: 36upx;
		height: 36upx;
		border-radius: 50%;
		margin-left: 26upx;
	}
	.left_text{
		font-size: 30upx;
		font-weight: 500;
		color: #434343;
	}
	.right_text{
		font-size: 24upx;
		font-weight: 500;
		color: #999999;
	}
	.footer{
		width: 100%;
		padding: 0 30upx 16upx;
		box-sizing: border-box;
		background-color: #FFFFFF;
		position: fixed;
		bottom: 40upx;
		left: 0;
	}
	.btn,.popBtn{
		width: 100%;
		height: 88upx;
		border-radius: 44upx;
		background-color: #FFC833;
		margin-top: 20upx;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 36upx;
		color: #333333;
	}
	.popImg{
		width: 36upx;
		height: 36upx;
		position: absolute;
		top: 34upx;
		right: 34upx;
	}
	.popBtn{
		margin-top: 100upx;
	}
</style>
