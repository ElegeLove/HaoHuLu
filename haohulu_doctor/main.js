import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false;
// import uniPop from '@/components/uni-popup/uni-popup.vue';
// import uniPop from './components/uni-popup/uni-popup.vue';
// Vue.component('uni-pop', uniPop);
 // import Ctpic from '@/components/custom-picture/custom-picture.js';
 // Vue.prototype.$Ctpic = new Ctpic();   //挂载到原型上

// Vue.prototype.siteBaseUrl = 'http://haohulu.mx5918.com/index.php/member/';
// const baseUrl = 'http://haohulu.mx5918.com/index.php/member/';
const baseUrl = 'http://haohulu.mx5918.com/index.php';
Vue.prototype.httpRequest = (opts) => {
	let httpDefaultOpts = {
		url: baseUrl + opts.url,
		data: opts.data,
		method: opts.method,
		header: opts.method == 'get' ? {
			'X-Requested-With': 'XMLHttpRequest',
			"Accept": "application/json",
			"Content-Type": "application/json; charset=UTF-8"
		} : {
			'X-Requested-With': 'XMLHttpRequest',
			'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
			// 'Access-Control-Allow-Origin' : "http://192.168.56.1",
			"Accept": "application/json",
			"Content-Type": "application/json; charset=UTF-8"
		},
		dataType: 'json',
	}
	let promise = new Promise(function(resolve, reject) {
		uni.request(httpDefaultOpts).then(
			(res) => {
				resolve(res[1])
			}
		).catch(
			(response) => {
				reject(response)
			}
		)
	})
	return promise
};
//带Token请求
Vue.prototype.httpTokenRequest = (opts) => {
	let token = "";
	uni.getStorage({
		key: 'token',
		success: function(ress) {
			token = ress.data
		}
	});
	//此token是登录成功后后台返回保存在storage中的
	let httpDefaultOpts = {
		url: baseUrl + opts.url,
		data: opts.data,
		method: opts.method,
		header: opts.method == 'get' ? {
			'key': token,
			'X-Requested-With': 'XMLHttpRequest',
			"Accept": "application/json",
			"Content-Type": "application/json; charset=UTF-8"
		} : {
			'key': token,
			'X-Requested-With': 'XMLHttpRequest',
			'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
			// 'Access-Control-Allow-Origin' : "http://192.168.56.1",
			"Accept": "application/json",
			"Content-Type": "application/json; charset=UTF-8"
		},
		dataType: 'json',
	}
	let promise = new Promise(function(resolve, reject) {
		uni.request(httpDefaultOpts).then(
			(res) => {
				resolve(res[1])
			}
		).catch(
			(response) => {
				reject(response)
			}
		)
	})
	return promise
};

// export default {
// 	baseUrl,
// 	httpRequest,
// 	httpTokenRequest
// }
App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
