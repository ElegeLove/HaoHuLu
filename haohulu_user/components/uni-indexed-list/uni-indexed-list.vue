<template>
	<view class="uni-indexed-list" ref="list" id="list">
		<!-- #ifdef APP-NVUE -->
		<list class="uni-indexed-list__scroll" scrollable="true" show-scrollbar="false">
			<cell v-for="(list, idx) in lists" :key="idx" :ref="'uni-indexed-list-' + idx">
				<!-- #endif -->
				<!-- #ifndef APP-NVUE -->
				<scroll-view :scroll-into-view="scrollViewId" class="uni-indexed-list__scroll" scroll-y>
					<view v-for="(item, a) in datalists" :key="a">
						<view class="uni-indexed-list_my_title">{{item.title}}</view>
						<view class="uni-indexed-list_my_text" v-for="(itemChel,b) in item.items" :key="b" @tap="bindClick(itemChel)">
							<view class="uni-indexed-list_my_text_main">
								<view>{{itemChel.name.name}}</view>
								<view v-if="itemChel.name.num">+{{itemChel.name.num}}</view>
							</view>
						</view>
					</view>
					<!-- /^[A-Za-z]*$/.test(value.letter) -->
					<view v-for="(list, idx) in lists" :key="idx" :id="'uni-indexed-list-' + idx">
						<!-- #endif -->
						<uni-indexed-list-item :list="list" :loaded="loaded" :idx="idx" :showSelect="showSelect" @itemClick="onClick"></uni-indexed-list-item>
						<!-- #ifndef APP-NVUE -->
					</view>
				</scroll-view>
				<!-- #endif -->
				<!-- #ifdef APP-NVUE -->
			</cell>
		</list>
		<!-- #endif -->
		<view :class="touchmove ? 'uni-indexed-list__menu--active' : ''" @touchstart="touchStart" @touchmove.stop.prevent="touchMove"
		 @touchend="touchEnd" class="uni-indexed-list__menu">
			<view class="uni-indexed-list__menus">
				<view v-for="(list, key) in lists" :key="key" class="uni-indexed-list__menu-item">
					<text class="uni-indexed-list__menu-text" :class="touchmoveIndex == key ? 'uni-indexed-list__menu-text--active' : ''">{{ list.key }}</text>
				</view>
			</view>
		</view>
		<view v-if="touchmove" class="uni-indexed-list__alert-wrapper">
			<text class="uni-indexed-list__alert">{{ lists[touchmoveIndex].key }}</text>
		</view>
	</view>
</template>
<script>
	import uniIcons from '../uni-icons/uni-icons.vue'
	import uniIndexedListItem from './uni-indexed-list-item.vue'
	// #ifdef APP-NVUE
	const dom = weex.requireModule('dom');
	// #endif
	// #ifdef APP-PLUS
	function throttle(func, delay) {
		var prev = Date.now();
		return function() {
			var context = this;
			var args = arguments;
			var now = Date.now();
			if (now - prev >= delay) {
				func.apply(context, args);
				prev = Date.now();
			}
		}
	}

	function touchMove(e) {
		let pageY = e.touches[0].pageY
		let index = Math.floor((pageY - this.winOffsetY) / this.itemHeight)
		if (this.touchmoveIndex === index) {
			return false
		}
		let item = this.lists[index]
		if (item) {
			// #ifndef APP-NVUE
			this.scrollViewId = 'uni-indexed-list-' + index
			this.touchmoveIndex = index
			// #endif
			// #ifdef APP-NVUE
			dom.scrollToElement(this.$refs['uni-indexed-list-' + index][0], {
				animated: false
			})
			this.touchmoveIndex = index
			// #endif
		}
	}
	const throttleTouchMove = throttle(touchMove, 40)
	// #endif

	/**
	 * IndexedList 索引列表
	 * @description 用于展示索引列表
	 * @tutorial https://ext.dcloud.net.cn/plugin?id=375
	 * @property {Boolean} showSelect = [true|false] 展示模式
	 * 	@value true 展示模式
	 * 	@value false 选择模式
	 * @property {Object} options 索引列表需要的数据对象
	 * @event {Function} click 点击列表事件 ，返回当前选择项的事件对象
	 * @example <uni-indexed-list options="" showSelect="false" @tap=""></uni-indexed-list>
	 */
	export default {
		name: 'UniIndexedList',
		components: {
			uniIcons,
			uniIndexedListItem
		},
		props: {
			options: {
				type: Array,
				default () {
					return []
				}
			},
			showSelect: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				lists: [],
				datalists: [],
				winHeight: 0,
				itemHeight: 0,
				winOffsetY: 0,
				touchmove: false,
				touchmoveIndex: -1,
				scrollViewId: '',
				touchmoveTimeout: '',
				loaded: false
			}
		},
		watch: {
			options: {
				handler: function() {
					this.setList()
				},
				deep: true
			}
		},
		mounted() {
			setTimeout(() => {
				this.setList()
			}, 50)
			setTimeout(() => {
				this.loaded = true
			}, 300);
		},
		methods: {
			setList() {
				let index = 0;
				this.lists = [];
				this.datalists = [];
				this.options.forEach((value, index) => {
					if (value.data.length === 0) {
						return
					}
					let indexBefore = index
					let items = value.data.map(item => {
						let obj = {}
						obj['key'] = value.letter
						obj['name'] = item
						obj['itemIndex'] = index
						index++
						obj.checked = item.checked ? item.checked : false
						return obj
					})
						this.datalists.push({
							title: value.letter,
							key: value.letter,
							items: items,
							itemIndex: indexBefore
						})
						if(value.data[0].num){
							if(value.letter != "常用国家或地区"){
								this.lists.push({
									title: value.letter,
									key: value.letter,
									items: items,
									itemIndex: indexBefore
								})
							}
						}else{
							if(value.letter != "常用城市"){
								this.lists.push({
									title: value.letter,
									key: value.letter,
									items: items,
									itemIndex: indexBefore
								})
							}
						}
				})
				// #ifndef APP-NVUE
				uni.createSelectorQuery()
					.in(this)
					.select('#list')
					.boundingClientRect()
					.exec(ret => {
						this.winOffsetY = ret[0].top
						this.winHeight = ret[0].height
						this.itemHeight = this.winHeight / this.lists.length
					})
				// #endif
				// #ifdef APP-NVUE
				dom.getComponentRect(this.$refs['list'], (res) => {
					this.winOffsetY = res.size.top
					this.winHeight = res.size.height
					this.itemHeight = this.winHeight / this.lists.length
				})
				// #endif
			},
			touchStart(e) {
				this.touchmove = true
				let pageY = e.touches[0].pageY
				let index = Math.floor((pageY - this.winOffsetY) / this.itemHeight)
				let item = this.lists[index]
				if (item) {
					this.scrollViewId = 'uni-indexed-list-' + index
					this.touchmoveIndex = index
					// #ifdef APP-NVUE
					dom.scrollToElement(this.$refs['uni-indexed-list-' + index][0], {
						animated: false
					})
					// #endif
				}
			},
			touchMove(e) {
				// #ifndef APP-PLUS
				let pageY = e.touches[0].pageY
				let index = Math.floor((pageY - this.winOffsetY) / this.itemHeight)
				if (this.touchmoveIndex === index) {
					return false
				}
				let item = this.lists[index]
				if (item) {
					this.scrollViewId = 'uni-indexed-list-' + index
					this.touchmoveIndex = index
				}
				// #endif
				// #ifdef APP-PLUS
				throttleTouchMove.call(this, e)
				// #endif
			},
			touchEnd() {
				this.touchmove = false
				this.touchmoveIndex = -1
			},
			onClick(e) {
				let {
					idx,
					index
				} = e
				let obj = {}
				for (let key in this.lists[idx].items[index]) {
					obj[key] = this.lists[idx].items[index][key]
				}
				let select = []
				if (this.showSelect) {
					this.lists[idx].items[index].checked = !this.lists[idx].items[index].checked
					this.lists.forEach((value, idx) => {
						value.items.forEach((item, index) => {
							if (item.checked) {
								let obj = {}
								for (let key in this.lists[idx].items[index]) {
									obj[key] = this.lists[idx].items[index][key]
								}
								select.push(obj)
							}
						})
					})
				}
				this.$emit('click', {
					item: obj,
					select: select
				})
			},
			bindClick(val){
				if(val.name.num){
					// uni.navigateTo({
					// 	url: '/?num='+val.name.num,
					// 	success: res => {},
					// 	fail: () => {},
					// 	complete: () => {}
					// });
					let pages = getCurrentPages();  //获取所有页面栈实例列表
					let nowPage = pages[ pages.length - 1];  //当前页页面实例
					let prevPage = pages[ pages.length - 2 ];  //上一页页面实例
					prevPage.$vm.areaCode = val.name.num;   //修改上一页data里面的sh参数值为100
					uni.navigateBack({  //uni.navigateTo跳转的返回，默认1为返回上一级
					    delta: 1
					});
				}else{
					let pages = getCurrentPages();  //获取所有页面栈实例列表
					let nowPage = pages[ pages.length - 1];  //当前页页面实例
					let prevPage = pages[ pages.length - 2 ];  //上一页页面实例
					prevPage.$vm.adrss = val.name;   //修改上一页data里面的sh参数值为100
					uni.navigateBack({  //uni.navigateTo跳转的返回，默认1为返回上一级
					    delta: 1
					});
					// uni.navigateTo({
					// 	url: '/pages/index/incAddress?num='+JSON.stringify(val.name),
					// 	success: res => {},
					// 	fail: () => {},
					// 	complete: () => {}
					// });
				}
				
			}
		}
	}
</script>
<style lang="scss" scoped>
	.uni-indexed-list {
		position: absolute;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
	}

	.uni-indexed-list__scroll {
		flex: 1;
	}

	.uni-indexed-list__menu {
		width: 24px;
		height: 100%;
		// background-color: #fff;
		/* #ifndef APP-NVUE */
		// display: flex;
		position: fixed;
		top: 0;
		right: 0;
		/* #endif */
		flex-direction: row;
		display: flex;
		align-items: center;
		// flex-direction: row-reverse;
		// justify-content: center;
		// align-items: center;
	}
	.uni-indexed-list__menus{
		padding: 0;
		margin: 0;
	}

	.uni-indexed-list__menu-item {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex: 1;
		align-items: center;
		justify-content: center;
	}

	.uni-indexed-list__menu-text {
		line-height: 20px;
		font-size: 12px;
		text-align: center;
		color: #000000;
	}

	.uni-indexed-list__menu--active {
		background-color: rgb(200, 200, 200);
	}

	.uni-indexed-list__menu-text--active {
		color: #007aff;
	}

	.uni-indexed-list__alert-wrapper {
		position: absolute;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		align-items: center;
		justify-content: center;
	}

	.uni-indexed-list__alert {
		width: 80px;
		height: 80px;
		border-radius: 80px;
		text-align: center;
		line-height: 80px;
		font-size: 35px;
		color: #fff;
		background-color: rgba(0, 0, 0, 0.5);
	}
	.uni-indexed-list_my_title{
		font-size: 14px;
		background-color: rgb(247,247,247);
		color: #333333;
		padding: 6px 12px;
		line-height: 24px;
	}
	.uni-indexed-list_my_text{
		// padding: 0 12px;
		padding-left: 15px;
		padding-right: 30px;
		background-color: #fff;
		font-size: 14px;
		// line-height: 24px;
	}
	.uni-indexed-list_my_text_main{
		padding: 15px 0 15px 0;
		padding-right: 12px;
		line-height: 24px;
		color: #666666;
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-bottom: 1px solid #E5E5E5;
	}
	.uni-indexed-list_my_text:last-child .uni-indexed-list_my_text_main{
		border: none;
	}
</style>
