import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
uni.getSystemInfo({
	success: function (res) {
		let modelmes = res.model;
		// console.log("手机型号-------",res.model);
		if(modelmes.indexOf('iPhone X')>=0||modelmes.indexOf('iPhone XR')>=0||modelmes.indexOf('iPhone XS')>=0||modelmes.indexOf('iPhone 12')>=0||modelmes.indexOf('iPhone 11')>=0||modelmes.indexOf('iPhone11')>=0||modelmes.indexOf('iPhone12')>=0||modelmes.indexOf('iPhoneXR')>=0||modelmes.indexOf('iPhoneX')>=0){
			Vue.prototype.$is_bang = true
		}else{
			Vue.prototype.$is_bang = false
		}
	}
});
// Vue.prototype.siteBaseUrl = 'http://haohulu.mx5918.com/index.php/member/';
const baseUrl = 'http://haohulu.mx5918.com/index.php';
// const baseUrl = '';
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
		dataType: 'json'
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
		// uni.request({
		// 	url: baseUrl + opts.url,
		// 	data: opts.data,
		// 	method: opts.method,
		// 	header: opts.method == 'get' ? {
		// 		'X-Requested-With': 'XMLHttpRequest',
		// 		"Accept": "application/json",
		// 		"Content-Type": "application/json; charset=UTF-8"
		// 	} : {
		// 		'X-Requested-With': 'XMLHttpRequest',
		// 		'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
		// 		// 'Access-Control-Allow-Origin' : "http://192.168.56.1",
		// 		"Accept": "application/json",
		// 		"Content-Type": "application/json; charset=UTF-8"
		// 	},
		// 	dataType: 'json',
		// 	success: (res) => {
		// 		resolve(res);
		// 	},
		// 	fail: (err) => {
		// 		reject(res.data);
		// 	}
		// })
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

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
