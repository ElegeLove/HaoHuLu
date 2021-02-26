(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["pages/My/allOrder"],{

/***/ 131:
/*!********************************************************************************************************!*\
  !*** D:/MyXiangMu/myHaoHuLuo/font-haohuluo-user/haohulu_user/main.js?{"page":"pages%2FMy%2FallOrder"} ***!
  \********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ 4);
var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));
var _allOrder = _interopRequireDefault(__webpack_require__(/*! ./pages/My/allOrder.vue */ 132));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_allOrder.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["createPage"]))

/***/ }),

/***/ 132:
/*!*************************************************************************************!*\
  !*** D:/MyXiangMu/myHaoHuLuo/font-haohuluo-user/haohulu_user/pages/My/allOrder.vue ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _allOrder_vue_vue_type_template_id_00118f27_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./allOrder.vue?vue&type=template&id=00118f27&scoped=true& */ 133);
/* harmony import */ var _allOrder_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./allOrder.vue?vue&type=script&lang=js& */ 135);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _allOrder_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _allOrder_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _allOrder_vue_vue_type_style_index_0_id_00118f27_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./allOrder.vue?vue&type=style&index=0&id=00118f27&scoped=true&lang=css& */ 137);
/* harmony import */ var _myAPP_HBuilderX_v2_5_1_20200103_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../../myAPP/HBuilderX_v2.5.1.20200103/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 10);

var renderjs





/* normalize component */

var component = Object(_myAPP_HBuilderX_v2_5_1_20200103_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _allOrder_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _allOrder_vue_vue_type_template_id_00118f27_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _allOrder_vue_vue_type_template_id_00118f27_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "00118f27",
  null,
  false,
  _allOrder_vue_vue_type_template_id_00118f27_scoped_true___WEBPACK_IMPORTED_MODULE_0__["components"],
  renderjs
)

component.options.__file = "pages/My/allOrder.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 133:
/*!********************************************************************************************************************************!*\
  !*** D:/MyXiangMu/myHaoHuLuo/font-haohuluo-user/haohulu_user/pages/My/allOrder.vue?vue&type=template&id=00118f27&scoped=true& ***!
  \********************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _myAPP_HBuilderX_v2_5_1_20200103_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_myAPP_HBuilderX_v2_5_1_20200103_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_myAPP_HBuilderX_v2_5_1_20200103_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_myAPP_HBuilderX_v2_5_1_20200103_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_myAPP_HBuilderX_v2_5_1_20200103_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_myAPP_HBuilderX_v2_5_1_20200103_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_allOrder_vue_vue_type_template_id_00118f27_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../myAPP/HBuilderX_v2.5.1.20200103/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../myAPP/HBuilderX_v2.5.1.20200103/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--16-0!../../../../../../myAPP/HBuilderX_v2.5.1.20200103/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!../../../../../../myAPP/HBuilderX_v2.5.1.20200103/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!../../../../../../myAPP/HBuilderX_v2.5.1.20200103/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../../myAPP/HBuilderX_v2.5.1.20200103/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./allOrder.vue?vue&type=template&id=00118f27&scoped=true& */ 134);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _myAPP_HBuilderX_v2_5_1_20200103_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_myAPP_HBuilderX_v2_5_1_20200103_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_myAPP_HBuilderX_v2_5_1_20200103_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_myAPP_HBuilderX_v2_5_1_20200103_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_myAPP_HBuilderX_v2_5_1_20200103_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_myAPP_HBuilderX_v2_5_1_20200103_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_allOrder_vue_vue_type_template_id_00118f27_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _myAPP_HBuilderX_v2_5_1_20200103_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_myAPP_HBuilderX_v2_5_1_20200103_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_myAPP_HBuilderX_v2_5_1_20200103_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_myAPP_HBuilderX_v2_5_1_20200103_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_myAPP_HBuilderX_v2_5_1_20200103_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_myAPP_HBuilderX_v2_5_1_20200103_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_allOrder_vue_vue_type_template_id_00118f27_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return _myAPP_HBuilderX_v2_5_1_20200103_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_myAPP_HBuilderX_v2_5_1_20200103_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_myAPP_HBuilderX_v2_5_1_20200103_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_myAPP_HBuilderX_v2_5_1_20200103_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_myAPP_HBuilderX_v2_5_1_20200103_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_myAPP_HBuilderX_v2_5_1_20200103_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_allOrder_vue_vue_type_template_id_00118f27_scoped_true___WEBPACK_IMPORTED_MODULE_0__["recyclableRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _myAPP_HBuilderX_v2_5_1_20200103_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_myAPP_HBuilderX_v2_5_1_20200103_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_myAPP_HBuilderX_v2_5_1_20200103_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_myAPP_HBuilderX_v2_5_1_20200103_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_myAPP_HBuilderX_v2_5_1_20200103_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_myAPP_HBuilderX_v2_5_1_20200103_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_allOrder_vue_vue_type_template_id_00118f27_scoped_true___WEBPACK_IMPORTED_MODULE_0__["components"]; });



/***/ }),

/***/ 134:
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--16-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/MyXiangMu/myHaoHuLuo/font-haohuluo-user/haohulu_user/pages/My/allOrder.vue?vue&type=template&id=00118f27&scoped=true& ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return recyclableRender; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "components", function() { return components; });
var components
try {
  components = {
    uniLoadMore: function() {
      return __webpack_require__.e(/*! import() | components/uni-load-more/uni-load-more */ "components/uni-load-more/uni-load-more").then(__webpack_require__.bind(null, /*! @/components/uni-load-more/uni-load-more.vue */ 244))
    }
  }
} catch (e) {
  if (
    e.message.indexOf("Cannot find module") !== -1 &&
    e.message.indexOf(".vue") !== -1
  ) {
    console.error(e.message)
    console.error("1. 排查组件名称拼写是否正确")
    console.error(
      "2. 排查组件是否符合 easycom 规范，文档：https://uniapp.dcloud.net.cn/collocation/pages?id=easycom"
    )
    console.error(
      "3. 若组件不符合 easycom 规范，需手动引入，并在 components 中注册该组件"
    )
  } else {
    throw e
  }
}
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
}
var recyclableRender = false
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ 135:
/*!**************************************************************************************************************!*\
  !*** D:/MyXiangMu/myHaoHuLuo/font-haohuluo-user/haohulu_user/pages/My/allOrder.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _myAPP_HBuilderX_v2_5_1_20200103_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_myAPP_HBuilderX_v2_5_1_20200103_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_myAPP_HBuilderX_v2_5_1_20200103_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_myAPP_HBuilderX_v2_5_1_20200103_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_myAPP_HBuilderX_v2_5_1_20200103_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_allOrder_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../myAPP/HBuilderX_v2.5.1.20200103/plugins/uniapp-cli/node_modules/babel-loader/lib!../../../../../../myAPP/HBuilderX_v2.5.1.20200103/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!../../../../../../myAPP/HBuilderX_v2.5.1.20200103/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!../../../../../../myAPP/HBuilderX_v2.5.1.20200103/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../../myAPP/HBuilderX_v2.5.1.20200103/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./allOrder.vue?vue&type=script&lang=js& */ 136);
/* harmony import */ var _myAPP_HBuilderX_v2_5_1_20200103_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_myAPP_HBuilderX_v2_5_1_20200103_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_myAPP_HBuilderX_v2_5_1_20200103_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_myAPP_HBuilderX_v2_5_1_20200103_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_myAPP_HBuilderX_v2_5_1_20200103_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_allOrder_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_myAPP_HBuilderX_v2_5_1_20200103_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_myAPP_HBuilderX_v2_5_1_20200103_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_myAPP_HBuilderX_v2_5_1_20200103_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_myAPP_HBuilderX_v2_5_1_20200103_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_myAPP_HBuilderX_v2_5_1_20200103_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_allOrder_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _myAPP_HBuilderX_v2_5_1_20200103_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_myAPP_HBuilderX_v2_5_1_20200103_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_myAPP_HBuilderX_v2_5_1_20200103_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_myAPP_HBuilderX_v2_5_1_20200103_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_myAPP_HBuilderX_v2_5_1_20200103_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_allOrder_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _myAPP_HBuilderX_v2_5_1_20200103_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_myAPP_HBuilderX_v2_5_1_20200103_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_myAPP_HBuilderX_v2_5_1_20200103_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_myAPP_HBuilderX_v2_5_1_20200103_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_myAPP_HBuilderX_v2_5_1_20200103_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_allOrder_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_myAPP_HBuilderX_v2_5_1_20200103_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_myAPP_HBuilderX_v2_5_1_20200103_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_myAPP_HBuilderX_v2_5_1_20200103_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_myAPP_HBuilderX_v2_5_1_20200103_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_myAPP_HBuilderX_v2_5_1_20200103_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_allOrder_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 136:
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/MyXiangMu/myHaoHuLuo/font-haohuluo-user/haohulu_user/pages/My/allOrder.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var uniLoadMore = function uniLoadMore() {__webpack_require__.e(/*! require.ensure | components/uni-load-more/uni-load-more */ "components/uni-load-more/uni-load-more").then((function () {return resolve(__webpack_require__(/*! @/components/uni-load-more/uni-load-more.vue */ 244));}).bind(null, __webpack_require__)).catch(__webpack_require__.oe);};var _default =




































































{
  components: {
    uniLoadMore: uniLoadMore },

  data: function data() {
    return {
      orderList: [],
      heights: '',
      status: 'more',
      pageNum: 1,
      statusTypes: [{
        value: 'more',
        text: '加载前' },
      {
        value: 'loading',
        text: '加载中' },
      {
        value: 'noMore',
        text: '没有更多' }],

      contentText: {
        contentdown: '查看更多',
        contentrefresh: '加载中...',
        contentnomore: '没有更多' } };


  },
  onLoad: function onLoad(option) {
    this.pageNum = 1;
    var that = this;
    uni.getSystemInfo({
      success: function success(res) {
        that.heights = uni.upx2px(res.windowHeight * 2) + 'px';
      } });

    this.getOrderList(this.pageNum, 5);
    // setTimeout(function(){  
    // 	uni.startPullDownRefresh();  
    // },300) 
  },
  //下拉刷新
  onPullDownRefresh: function onPullDownRefresh() {
    this.orderList = [];
    this.pageNum = 1;
    this.getOrderList(this.pageNum, 5);
    // setTimeout(function(){  
    // 	uni.stopPullDownRefresh();  
    // },1000)  
  },
  // 上拉加载
  onReachBottom: function onReachBottom() {
    var _self = this;
    if (_self.status != 'more') {//loadingType!=0;直接返回
      return false;
    }
    this.status = 'loading';
    uni.showNavigationBarLoading();

    // console.log('reach');
    // setTimeout(function() {
    // 	for (var i = 0; i < 10; i++) {
    // 		_self.list_array.push("000" + i)
    // 	}
    // 	_self.status = 'more'
    // 	uni.hideNavigationBarLoading()
    // }, 2000);
    _self.getOrderList(_self.pageNum, 5);
  },
  methods: {
    getOrderList: function getOrderList(pageNum, pageList) {
      var that = this;
      this.httpTokenRequest({
        url: "/member/order/get_order_list",
        method: "POST",
        dataType: 'jsonp',
        data: {
          "page_no": pageNum, //页码,
          "page_size": pageList },

        hideLoading: true }).
      then(
      function (res) {
        if (res.data.code == 1) {
          // that.orderList = res.data.data.list;
          if (res.data.data.list.length < 2) {
            uni.getSystemInfo({
              success: function success(res) {
                that.heights = uni.upx2px(res.windowHeight * 2) + 'px';
              } });

          }
          if (that.orderList.length == res.data.data.total) {//没有数据
            that.status = 'noMore';
            uni.hideNavigationBarLoading(); //关闭加载动画
            return false;
          } else {
            that.orderList = that.orderList.concat(res.data.data.list); //将数据拼接在一起
            that.pageNum++;
            // for(var i=that.orderList.length;i<res.data.data.total;i++){
            // }
            that.status = 'more'; //将loadingType归0重置
            uni.hideNavigationBarLoading(); //关闭加载动画
          }
          uni.stopPullDownRefresh();
        }
        uni.stopPullDownRefresh();
      }).
      catch(
      function (err) {
        console.log(err);

      });

    },
    GoOrderInfo: function GoOrderInfo(id) {
      uni.navigateTo({
        url: "/pages/My/orderInfo?orderId=" + id,
        success: function success(res) {},
        fail: function fail(err) {
          console.log(err);
        },
        complete: function complete() {} });

    } } };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 137:
/*!**********************************************************************************************************************************************!*\
  !*** D:/MyXiangMu/myHaoHuLuo/font-haohuluo-user/haohulu_user/pages/My/allOrder.vue?vue&type=style&index=0&id=00118f27&scoped=true&lang=css& ***!
  \**********************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _myAPP_HBuilderX_v2_5_1_20200103_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_myAPP_HBuilderX_v2_5_1_20200103_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_myAPP_HBuilderX_v2_5_1_20200103_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_myAPP_HBuilderX_v2_5_1_20200103_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_myAPP_HBuilderX_v2_5_1_20200103_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_myAPP_HBuilderX_v2_5_1_20200103_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_myAPP_HBuilderX_v2_5_1_20200103_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_allOrder_vue_vue_type_style_index_0_id_00118f27_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../myAPP/HBuilderX_v2.5.1.20200103/plugins/uniapp-cli/node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!../../../../../../myAPP/HBuilderX_v2.5.1.20200103/plugins/uniapp-cli/node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!../../../../../../myAPP/HBuilderX_v2.5.1.20200103/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../myAPP/HBuilderX_v2.5.1.20200103/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-2!../../../../../../myAPP/HBuilderX_v2.5.1.20200103/plugins/uniapp-cli/node_modules/postcss-loader/src??ref--6-oneOf-1-3!../../../../../../myAPP/HBuilderX_v2.5.1.20200103/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../../myAPP/HBuilderX_v2.5.1.20200103/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./allOrder.vue?vue&type=style&index=0&id=00118f27&scoped=true&lang=css& */ 138);
/* harmony import */ var _myAPP_HBuilderX_v2_5_1_20200103_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_myAPP_HBuilderX_v2_5_1_20200103_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_myAPP_HBuilderX_v2_5_1_20200103_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_myAPP_HBuilderX_v2_5_1_20200103_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_myAPP_HBuilderX_v2_5_1_20200103_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_myAPP_HBuilderX_v2_5_1_20200103_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_myAPP_HBuilderX_v2_5_1_20200103_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_allOrder_vue_vue_type_style_index_0_id_00118f27_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_myAPP_HBuilderX_v2_5_1_20200103_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_myAPP_HBuilderX_v2_5_1_20200103_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_myAPP_HBuilderX_v2_5_1_20200103_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_myAPP_HBuilderX_v2_5_1_20200103_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_myAPP_HBuilderX_v2_5_1_20200103_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_myAPP_HBuilderX_v2_5_1_20200103_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_myAPP_HBuilderX_v2_5_1_20200103_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_allOrder_vue_vue_type_style_index_0_id_00118f27_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _myAPP_HBuilderX_v2_5_1_20200103_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_myAPP_HBuilderX_v2_5_1_20200103_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_myAPP_HBuilderX_v2_5_1_20200103_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_myAPP_HBuilderX_v2_5_1_20200103_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_myAPP_HBuilderX_v2_5_1_20200103_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_myAPP_HBuilderX_v2_5_1_20200103_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_myAPP_HBuilderX_v2_5_1_20200103_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_allOrder_vue_vue_type_style_index_0_id_00118f27_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _myAPP_HBuilderX_v2_5_1_20200103_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_myAPP_HBuilderX_v2_5_1_20200103_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_myAPP_HBuilderX_v2_5_1_20200103_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_myAPP_HBuilderX_v2_5_1_20200103_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_myAPP_HBuilderX_v2_5_1_20200103_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_myAPP_HBuilderX_v2_5_1_20200103_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_myAPP_HBuilderX_v2_5_1_20200103_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_allOrder_vue_vue_type_style_index_0_id_00118f27_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_myAPP_HBuilderX_v2_5_1_20200103_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_myAPP_HBuilderX_v2_5_1_20200103_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_myAPP_HBuilderX_v2_5_1_20200103_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_myAPP_HBuilderX_v2_5_1_20200103_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_myAPP_HBuilderX_v2_5_1_20200103_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_myAPP_HBuilderX_v2_5_1_20200103_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_myAPP_HBuilderX_v2_5_1_20200103_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_allOrder_vue_vue_type_style_index_0_id_00118f27_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 138:
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-2!./node_modules/postcss-loader/src??ref--6-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/MyXiangMu/myHaoHuLuo/font-haohuluo-user/haohulu_user/pages/My/allOrder.vue?vue&type=style&index=0&id=00118f27&scoped=true&lang=css& ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ })

},[[131,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/My/allOrder.js.map