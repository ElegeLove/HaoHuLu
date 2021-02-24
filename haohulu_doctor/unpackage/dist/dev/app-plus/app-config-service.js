
var isReady=false;var onReadyCallbacks=[];
var isServiceReady=false;var onServiceReadyCallbacks=[];
var __uniConfig = {"pages":["pages/index/index","pages/Login/login","pages/Login/agreement","pages/index/showInfo","pages/Order/Order","pages/Order/OrderInfo","pages/Order/Surefinish","pages/My/My","pages/My/PersonalInfo","pages/My/OtherInfo","pages/My/NotifyInfo","pages/My/About","pages/My/Summary","pages/My/Wallet","pages/My/Bill","pages/index/orderLocation","pages/Login/country","pages/index/incAddress","pages/Order/payThanks","pages/Order/paySuccess","pages/index/optCity","pages/My/inAudit","pages/My/auditPass"],"window":{"navigationBarTextStyle":"black","navigationBarBackgroundColor":"#F8F8F8","backgroundColor":"#F8F8F8"},"tabBar":{"color":"#B4B3B3","selectedColor":"#FFC833","borderStyle":"white","backgroundColor":"#ffffff","list":[{"pagePath":"pages/index/index","iconPath":"static/images/icon_index.png","selectedIconPath":"static/images/icon_select_index.png","text":"首页"},{"pagePath":"pages/Order/Order","iconPath":"static/images/icon_order.png","selectedIconPath":"static/images/icon_select_order.png","text":"订单"},{"pagePath":"pages/My/My","iconPath":"static/images/icon_my.png","selectedIconPath":"static/images/icon_select_my.png","text":"我的"}]},"nvueCompiler":"uni-app","renderer":"auto","splashscreen":{"alwaysShowBeforeRender":true,"autoclose":false},"appname":"好葫芦-医生端","compilerVersion":"2.8.2","entryPagePath":"pages/index/index","networkTimeout":{"request":60000,"connectSocket":60000,"uploadFile":60000,"downloadFile":60000}};
var __uniRoutes = [{"path":"/pages/index/index","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarBackgroundColor":"#fff","enablePullDownRefresh":true,"compatible":{"ignoreVersion":true},"titleNView":false}},{"path":"/pages/Login/login","meta":{},"window":{"navigationBarBackgroundColor":"#fff","compatible":{"ignoreVersion":true},"titleNView":false}},{"path":"/pages/Login/agreement","meta":{},"window":{"navigationBarTitleText":"用户协议","navigationBarBackgroundColor":"#fff","type":"back","compatible":{"ignoreVersion":true},"titleText":"用户协议","titleSize":"36upx","titleColor":"#333333"}},{"path":"/pages/index/showInfo","meta":{},"window":{"navigationBarTitleText":"查看详情","navigationBarBackgroundColor":"#fff","type":"back","compatible":{"ignoreVersion":true},"titleText":"查看详情","titleSize":"36upx","titleColor":"#333333"}},{"path":"/pages/Order/Order","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarBackgroundColor":"#fff","enablePullDownRefresh":true,"compatible":{"ignoreVersion":true},"titleNView":false}},{"path":"/pages/Order/OrderInfo","meta":{},"window":{"navigationBarTitleText":"订单详情","navigationBarBackgroundColor":"#fff","type":"back","compatible":{"ignoreVersion":true},"titleText":"订单详情","titleSize":"36upx","titleColor":"#333333"}},{"path":"/pages/Order/Surefinish","meta":{},"window":{"navigationBarTitleText":"确认完成","navigationBarBackgroundColor":"#fff","type":"back","compatible":{"ignoreVersion":true},"titleText":"确认完成","titleSize":"36upx","titleColor":"#333333"}},{"path":"/pages/My/My","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarBackgroundColor":"#fff","compatible":{"ignoreVersion":true},"titleNView":false}},{"path":"/pages/My/PersonalInfo","meta":{},"window":{"navigationBarTitleText":"个人信息","navigationBarBackgroundColor":"#fff","type":"back","compatible":{"ignoreVersion":true},"titleNView":{"splitLine":{"color":"#F5F5F5","height":"1px"}}}},{"path":"/pages/My/OtherInfo","meta":{},"window":{"navigationBarTitleText":"其他信息","navigationBarBackgroundColor":"#fff","type":"back","compatible":{"ignoreVersion":true},"titleText":"其他信息","titleSize":"36upx","titleColor":"#333333"}},{"path":"/pages/My/NotifyInfo","meta":{},"window":{"navigationBarTitleText":"消息通知","enablePullDownRefresh":true,"navigationBarBackgroundColor":"#fff","type":"back","compatible":{"ignoreVersion":true},"titleText":"消息通知","titleSize":"36upx","titleColor":"#333333"}},{"path":"/pages/My/About","meta":{},"window":{"navigationBarTitleText":"关于好葫芦","navigationBarBackgroundColor":"#fff","type":"back","compatible":{"ignoreVersion":true},"titleText":"关于好葫芦","titleSize":"36upx","titleColor":"#333333"}},{"path":"/pages/My/Summary","meta":{},"window":{"navigationBarTitleText":"查看汇总","enablePullDownRefresh":true,"navigationBarBackgroundColor":"#fff","type":"back","compatible":{"ignoreVersion":true},"titleText":"查看汇总","titleSize":"36upx","titleColor":"#333333"}},{"path":"/pages/My/Wallet","meta":{},"window":{"navigationBarTitleText":"钱包","navigationBarBackgroundColor":"#fff","type":"back","compatible":{"ignoreVersion":true},"bounce":"none","titleText":"钱包","titleSize":"36upx","titleColor":"#333333","titleNView":{"buttons":[{"text":"账单","fontSize":"36upx","fontWeight":"500","float":"right","color":"#333333","onclick":"plus.webview.getWebviewById('pages/My/Summary')"}]}}},{"path":"/pages/My/Bill","meta":{},"window":{"navigationBarTitleText":"账单","enablePullDownRefresh":true,"navigationBarBackgroundColor":"#fff","type":"back","compatible":{"ignoreVersion":true},"titleText":"账单","titleSize":"36upx","titleColor":"#333333"}},{"path":"/pages/index/orderLocation","meta":{},"window":{"navigationBarTitleText":"选择接单位置","navigationBarBackgroundColor":"#fff","type":"back","compatible":{"ignoreVersion":true},"titleText":"查看详情","titleSize":"36upx","titleColor":"#333333"}},{"path":"/pages/Login/country","meta":{},"window":{"navigationBarTitleText":"选择国家或地区","navigationBarBackgroundColor":"#fff","type":"back","compatible":{"ignoreVersion":true},"titleText":"选择国家或地区","titleSize":"36upx","titleColor":"#333333"}},{"path":"/pages/index/incAddress","meta":{},"window":{"navigationBarTitleText":"添加接单地址","navigationBarBackgroundColor":"#fff","enablePullDownRefresh":true,"type":"back","compatible":{"ignoreVersion":true},"titleText":"添加接单地址","titleSize":"36upx","titleColor":"#333333"}},{"path":"/pages/Order/payThanks","meta":{},"window":{"navigationBarTitleText":"支付感谢费","navigationBarBackgroundColor":"#fff","type":"back","compatible":{"ignoreVersion":true},"titleText":"支付感谢费","titleSize":"36upx","titleColor":"#333333"}},{"path":"/pages/Order/paySuccess","meta":{},"window":{"navigationBarTitleText":"支付成功","navigationBarBackgroundColor":"#fff","type":"back","compatible":{"ignoreVersion":true},"titleText":"支付成功","titleSize":"36upx","titleColor":"#333333"}},{"path":"/pages/index/optCity","meta":{},"window":{"navigationBarTitleText":"选择城市","navigationBarBackgroundColor":"#fff","type":"back","compatible":{"ignoreVersion":true},"titleText":"选择城市","titleSize":"36upx","titleColor":"#333333"}},{"path":"/pages/My/inAudit","meta":{},"window":{"navigationBarTitleText":"审核中","navigationBarBackgroundColor":"#fff","type":"back","compatible":{"ignoreVersion":true},"titleText":"审核中","titleSize":"36upx","titleColor":"#333333"}},{"path":"/pages/My/auditPass","meta":{},"window":{"navigationBarTitleText":"个人信息","navigationBarBackgroundColor":"#fff","type":"back","compatible":{"ignoreVersion":true},"titleText":"个人信息","titleSize":"36upx","titleColor":"#333333"}}];
__uniConfig.onReady=function(callback){if(__uniConfig.ready){callback()}else{onReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"ready",{get:function(){return isReady},set:function(val){isReady=val;if(!isReady){return}const callbacks=onReadyCallbacks.slice(0);onReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
__uniConfig.onServiceReady=function(callback){if(__uniConfig.serviceReady){callback()}else{onServiceReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"serviceReady",{get:function(){return isServiceReady},set:function(val){isServiceReady=val;if(!isServiceReady){return}const callbacks=onServiceReadyCallbacks.slice(0);onServiceReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
service.register("uni-app-config",{create(a,b,c){if(!__uniConfig.viewport){var d=b.weex.config.env.scale,e=b.weex.config.env.deviceWidth,f=Math.ceil(e/d);Object.assign(__uniConfig,{viewport:f,defaultFontSize:Math.round(f/20)})}return{instance:{__uniConfig:__uniConfig,__uniRoutes:__uniRoutes,global:void 0,window:void 0,document:void 0,frames:void 0,self:void 0,location:void 0,navigator:void 0,localStorage:void 0,history:void 0,Caches:void 0,screen:void 0,alert:void 0,confirm:void 0,prompt:void 0,fetch:void 0,XMLHttpRequest:void 0,WebSocket:void 0,webkit:void 0,print:void 0}}}});
