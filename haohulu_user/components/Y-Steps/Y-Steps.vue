<template>
	<!-- 获取一个数组，结构为[{date:'时间',info:'内容内容'}] -->
	<!-- @click事件返回点击标签元素的索引值 第一项为0 -->
	<view class="bg">
		<view class="steps">
			<view class="steps_item" v-for="(i, index) in infoList" :key="index">
				<view v-if="index != 0" :style="{backgroundColor:color}"></view>
				<!-- <text :style="{backgroundColor:color}">{{ index + 1 }}</text> -->
				<text :style="{backgroundColor:color}"></text>
			</view>
		</view>
		<view class="info_list">
			<view class="info_item" v-for="(i, index) in infoList" :key="index" :style="{ animation: 'info ' + (index * 0.2 + 1) + 's' }" @tap="topage(index)">
				<view class="infoLeft">{{ i.action }}</view>
				<text>{{ i.create_time }}</text>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	name: 'YSteps',
	props: {
		infoList: {
			type: Array,
			default: []
		},
		color:{
			type:String,
			default:'#FFC833'
		}
	},
	data() {
		return {};
	},
	onLoad(e) {
		//获取列表
	},
	methods: {
		topage(e) {
			this.$emit('click', e);
		}
	}
};
</script>

<style lang="scss">
@keyframes info {
	0% {
		transform: translate(100px, 0);
	}
	60% {
		transform: translate(-10px, 0);
	}
	100% {
		transform: translate(0, 0);
	}
}
page {
	background-color: #f2f2f2;
}
.bg {
	margin-top: 20upx;
	background-color: #FFFFFF;
	display: flex;
}
.steps {
	display: flex;
	flex-direction: column;
	width: 60upx;
	margin: 0 10upx;
	margin-top: 50upx;
	.steps_item {
		display: flex;
		flex-direction: column;
		align-items: center;
		view {
			height: 80upx;
			width: 5upx;
		}
		text {
			display: flex;
			flex-direction: column;
			align-items: center;
			width: 20upx;
			line-height: 40upx;
			height: 20upx;
			border-radius: 50%;
			background-color: #ff3838;
			color: #ffffff;
			font-size: 10px;
		}
	}
}
.info_list {
	display: flex;
	flex-direction: column;
	flex: 1;
	.info_item {
		background-color: #fff;
		height: 80upx;
		margin: 20upx 0 0;
		margin-right: 30upx;
		border-radius: 10upx;
		display: flex;
		align-items: center;
		.infoLeft{
			margin-right: 100upx;
			font-size:30upx;
			color:rgba(51,51,51,1);
		}
		text {
			font-size:24upx;
			font-family:'PingFang SC';
			font-weight:500;
			color:rgba(153,153,153,1);
		}
		view {
			font-size: 14px;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: rgba(102, 102, 102, 1);
			line-height: 20px;
			overflow: hidden;
			text-overflow: ellipsis;
			display: -webkit-box;
			-webkit-line-clamp: 2;
			flex-direction: column;
		}
	}
	.info_item:active {
		opacity: 0.6;
	}
}
</style>
