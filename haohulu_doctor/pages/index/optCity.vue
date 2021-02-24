<template>
	<view>
		<uni-indexed-list :options="textData" :show-select="false" @tap="bindClick"/>
	</view>
</template>

<script>
	import uniIndexedList from '@/components/uni-indexed-list/uni-indexed-list.vue'
	import areaList from '@/pages/area.json'
	export default {
		data() {
			return {
				textData:[
					{
					letter: "常用城市",
					"data": [
						{
							"id": 2324,
							"pid": 2323,
							"shortname": "重庆",
							"name": "重庆市",
							"merger_name": "中国,重庆,重庆市",
							"pinyin": "chongqing",
							"code": "023",
							"zip_code": "400000",
							"first": "C",
							"lng": "106.504962",
							"lat": "29.533155"
						},
						{
							id: 802,
							pid: 801,
							shortname: "上海",
							name: "上海市",
							merger_name: "中国,上海,上海市",
							pinyin: "shanghai",
							code: "021",
							zip_code: "200000",
							first: "S",
							lng: "121.472644",
							lat: "31.231706"
						},
						{
							id: 2368,
							pid: 2367,
							shortname: "成都",
							name: "成都市",
							merger_name: "中国,四川省,成都市",
							pinyin: "chengdu",
							code: "028",
							zip_code: "610015",
							first: "C",
							lng: "104.065735",
							lat: "30.659462"
						},
						{
							id: 2,
							pid: 1,
							shortname: "北京",
							name: "北京市",
							merger_name: "中国,北京,北京市",
							pinyin: "beijing",
							code: "010",
							zip_code: "100000",
							first: "B",
							lng: "116.405285",
							lat: "39.904989"
						},
						{
							id: 1965,
							pid: 1964,
							shortname: "广州",
							name: "广州市",
							merger_name: "中国,广东省,广州市",
							pinyin: "guangzhou",
							code: "020",
							zip_code: "510032",
							first: "G",
							lng: "113.280637",
							lat: "23.125178"
						}
					] }, 
					 { letter: "A", data: [] }, 
					 { letter: "B", data: [] }, 
					 { letter: "C", data: [] }, 
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
					 { letter: "Z", data: [] }
				 ]
			}
		},
		onLoad: function (option) { //option为object类型，会序列化上个页面传递的参数
			let dataList = areaList.list;
			var that = this;
			for (let i in that.textData) {
				for (let i2 in dataList) {
					if(that.textData[i].letter == dataList[i2].first){
						that.textData[i].data.push(dataList[i2])
					}
				}
			}
			// this.httpRequest({
			// 	url : "/share/index/area_list",
			// 	method : "POST",
			// 	data : {
			// 		"identity":"app_user_agreement"
			// 	},
			// 	hideLoading : true,
			// }).then(
			// 	(res) => {
			// 		if(res.data.code == 1){
			// 			that.main = res.data.data.result.value;
			// 		}else{
			// 			uni.showToast({
			// 				title: res.data.msg,
			// 				icon:'none',
			// 				duration: 2000
			// 			});
			// 		}
			// 	}
			// ).catch(
			// 	(err) => {
			// 		console.log(err)
					
			// 	}
			// )
		},
		methods: {
			bindClick(e){
				let pages = getCurrentPages();  //获取所有页面栈实例列表
				let nowPage = pages[ pages.length - 1];  //当前页页面实例
				let prevPage = pages[ pages.length - 2 ];  //上一页页面实例
				prevPage.$vm.adrss = e.item.name;   //修改上一页data里面的sh参数值为100
				uni.navigateBack({  //uni.navigateTo跳转的返回，默认1为返回上一级
				    delta: 1
				});
				// uni.navigateTo({
				// 	url: '/pages/index/incAddress?num='+JSON.stringify(e.item.name),
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
