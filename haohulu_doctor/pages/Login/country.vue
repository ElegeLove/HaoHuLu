<template>
	<view >
		<uni-indexed-list :options="textData" :show-select="false" @tap="bindClick"/>
	</view>
</template>

<script>
	import uniIndexedList from '@/components/uni-indexed-list/uni-indexed-list.vue'
	export default {
		components: {
			uniIndexedList
		},
		data() {
			return {
				textData:[
					{
					letter: "常用国家或地区",
					"data": [
						{name:"中国",num:'86'},
						{name:"中国香港",num:'852'},
						{name:"中国澳门",num:'853'},
						{name:"中国台湾",num:'886'},
						{name:"阿尔巴尼亚",num:'355'},
						{name:"阿尔巴尼亚",num:'355'}
					] }, 
					{ 
					letter: "A", 
					"data": [
						{name:"阿克苏机场",num:'123'},
						{name:"阿拉山口机场",num:'123'},
						{name:"阿勒泰机场",num:'123'},
						{name:"阿里昆莎机场",num:'123'},
						{name:"安庆天柱山机场",num:'123'},
						{name:"澳门国际机场",num:'123'}
					] }, 
					 { 
						 letter: "B", 
						 data: [
							 {name:"保山机场",num:'456'},
							 {name:"包头机场",num:'456'},
							 {name:"北海福成机场",num:'456'},
							 {name:"北京南苑机场",num:'456'},
							 {name:"北京首都国际机场",num:'456'}
						 ] }, 
					 { letter: "C", data: [
						 {name:"阿克苏机场",num:'789'},
						 {name:"阿拉山口机场",num:'789'},
						 {name:"阿勒泰机场",num:'789'},
						 {name:"阿里昆莎机场",num:'789'},
						 {name:"安庆天柱山机场",num:'789'},
						 {name:"澳门国际机场",num:'789'}
					 ] }, 
					 { letter: "D", data: [] }, 
					 { letter: "E", data: [] }, 
					 { letter: "F", data: [] }, 
					 { letter: "G", data: [] }, 
					 { letter: "H", data: [] }, 
					 { letter: "I", data: [] }, 
					 { letter: "J", data: [] }, 
					 { letter: "K", data: [] }, 
					 { letter: "L", data: [] }, 
					 { letter: "M", data: [] },
					 { letter: "N", data: [] }, 
					 { letter: "O", data: [] }, 
					 { letter: "P", data: [] }, 
					 { letter: "Q", data: [] }, 
					 { letter: "R", data: [] }, 
					 { letter: "S", data: [] }, 
					 { letter: "T", data: [] }, 
					 { letter: "U", data: [] }, 
					 { letter: "V", data: [] }, 
					 { letter: "W", data: [] }, 
					 { letter: "X", data: [] }, 
					 { letter: "Y", data: [] }, 
					 { letter: "Z", data: [] }, 
					 { letter: "#", data: [] },
				 ]
			}
		},
		methods: {
			bindClick(e){
				let pages = getCurrentPages();  //获取所有页面栈实例列表
				let nowPage = pages[ pages.length - 1];  //当前页页面实例
				let prevPage = pages[ pages.length - 2 ];  //上一页页面实例
				console.log(prevPage.$vm)
				prevPage.$vm.areaCode = e.item.name.num;   //修改上一页data里面的sh参数值为100
				uni.navigateBack({  //uni.navigateTo跳转的返回，默认1为返回上一级
				    delta: 1
				});
				// uni.navigateTo({
				// 	url: '/?num='+e.item.name.num,
				// 	success: res => {},
				// 	fail: () => {},
				// 	complete: () => {}
				// });
			}
			
		}
	}
</script>

<style scoped>

</style>
