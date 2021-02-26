(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["common/vendor"],{

/***/ 1:
/*!************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.createApp = createApp;exports.createComponent = createComponent;exports.createPage = createPage;exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _iterableToArrayLimit(arr, i) {if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _iterableToArray(iter) {if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) return _arrayLikeToArray(arr);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}

var _toString = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;

function isFn(fn) {
  return typeof fn === 'function';
}

function isStr(str) {
  return typeof str === 'string';
}

function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}

function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}

function noop() {}

/**
                    * Create a cached version of a pure function.
                    */
function cached(fn) {
  var cache = Object.create(null);
  return function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}

/**
   * Camelize a hyphen-delimited string.
   */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) {return c ? c.toUpperCase() : '';});
});

var HOOKS = [
'invoke',
'success',
'fail',
'complete',
'returnValue'];


var globalInterceptors = {};
var scopedInterceptors = {};

function mergeHook(parentVal, childVal) {
  var res = childVal ?
  parentVal ?
  parentVal.concat(childVal) :
  Array.isArray(childVal) ?
  childVal : [childVal] :
  parentVal;
  return res ?
  dedupeHooks(res) :
  res;
}

function dedupeHooks(hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res;
}

function removeHook(hooks, hook) {
  var index = hooks.indexOf(hook);
  if (index !== -1) {
    hooks.splice(index, 1);
  }
}

function mergeInterceptorHook(interceptor, option) {
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      interceptor[hook] = mergeHook(interceptor[hook], option[hook]);
    }
  });
}

function removeInterceptorHook(interceptor, option) {
  if (!interceptor || !option) {
    return;
  }
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      removeHook(interceptor[hook], option[hook]);
    }
  });
}

function addInterceptor(method, option) {
  if (typeof method === 'string' && isPlainObject(option)) {
    mergeInterceptorHook(scopedInterceptors[method] || (scopedInterceptors[method] = {}), option);
  } else if (isPlainObject(method)) {
    mergeInterceptorHook(globalInterceptors, method);
  }
}

function removeInterceptor(method, option) {
  if (typeof method === 'string') {
    if (isPlainObject(option)) {
      removeInterceptorHook(scopedInterceptors[method], option);
    } else {
      delete scopedInterceptors[method];
    }
  } else if (isPlainObject(method)) {
    removeInterceptorHook(globalInterceptors, method);
  }
}

function wrapperHook(hook) {
  return function (data) {
    return hook(data) || data;
  };
}

function isPromise(obj) {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}

function queue(hooks, data) {
  var promise = false;
  for (var i = 0; i < hooks.length; i++) {
    var hook = hooks[i];
    if (promise) {
      promise = Promise.resolve(wrapperHook(hook));
    } else {
      var res = hook(data);
      if (isPromise(res)) {
        promise = Promise.resolve(res);
      }
      if (res === false) {
        return {
          then: function then() {} };

      }
    }
  }
  return promise || {
    then: function then(callback) {
      return callback(data);
    } };

}

function wrapperOptions(interceptor) {var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  ['success', 'fail', 'complete'].forEach(function (name) {
    if (Array.isArray(interceptor[name])) {
      var oldCallback = options[name];
      options[name] = function callbackInterceptor(res) {
        queue(interceptor[name], res).then(function (res) {
          /* eslint-disable no-mixed-operators */
          return isFn(oldCallback) && oldCallback(res) || res;
        });
      };
    }
  });
  return options;
}

function wrapperReturnValue(method, returnValue) {
  var returnValueHooks = [];
  if (Array.isArray(globalInterceptors.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(globalInterceptors.returnValue));
  }
  var interceptor = scopedInterceptors[method];
  if (interceptor && Array.isArray(interceptor.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(interceptor.returnValue));
  }
  returnValueHooks.forEach(function (hook) {
    returnValue = hook(returnValue) || returnValue;
  });
  return returnValue;
}

function getApiInterceptorHooks(method) {
  var interceptor = Object.create(null);
  Object.keys(globalInterceptors).forEach(function (hook) {
    if (hook !== 'returnValue') {
      interceptor[hook] = globalInterceptors[hook].slice();
    }
  });
  var scopedInterceptor = scopedInterceptors[method];
  if (scopedInterceptor) {
    Object.keys(scopedInterceptor).forEach(function (hook) {
      if (hook !== 'returnValue') {
        interceptor[hook] = (interceptor[hook] || []).concat(scopedInterceptor[hook]);
      }
    });
  }
  return interceptor;
}

function invokeApi(method, api, options) {for (var _len = arguments.length, params = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {params[_key - 3] = arguments[_key];}
  var interceptor = getApiInterceptorHooks(method);
  if (interceptor && Object.keys(interceptor).length) {
    if (Array.isArray(interceptor.invoke)) {
      var res = queue(interceptor.invoke, options);
      return res.then(function (options) {
        return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
      });
    } else {
      return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
    }
  }
  return api.apply(void 0, [options].concat(params));
}

var promiseInterceptor = {
  returnValue: function returnValue(res) {
    if (!isPromise(res)) {
      return res;
    }
    return res.then(function (res) {
      return res[1];
    }).catch(function (res) {
      return res[0];
    });
  } };


var SYNC_API_RE =
/^\$|sendNativeEvent|restoreGlobal|getCurrentSubNVue|getMenuButtonBoundingClientRect|^report|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64/;

var CONTEXT_API_RE = /^create|Manager$/;

// Context例外情况
var CONTEXT_API_RE_EXC = ['createBLEConnection'];

// 同步例外情况
var ASYNC_API = ['createBLEConnection'];

var CALLBACK_API_RE = /^on|^off/;

function isContextApi(name) {
  return CONTEXT_API_RE.test(name) && CONTEXT_API_RE_EXC.indexOf(name) === -1;
}
function isSyncApi(name) {
  return SYNC_API_RE.test(name) && ASYNC_API.indexOf(name) === -1;
}

function isCallbackApi(name) {
  return CALLBACK_API_RE.test(name) && name !== 'onPush';
}

function handlePromise(promise) {
  return promise.then(function (data) {
    return [null, data];
  }).
  catch(function (err) {return [err];});
}

function shouldPromise(name) {
  if (
  isContextApi(name) ||
  isSyncApi(name) ||
  isCallbackApi(name))
  {
    return false;
  }
  return true;
}

/* eslint-disable no-extend-native */
if (!Promise.prototype.finally) {
  Promise.prototype.finally = function (callback) {
    var promise = this.constructor;
    return this.then(
    function (value) {return promise.resolve(callback()).then(function () {return value;});},
    function (reason) {return promise.resolve(callback()).then(function () {
        throw reason;
      });});

  };
}

function promisify(name, api) {
  if (!shouldPromise(name)) {
    return api;
  }
  return function promiseApi() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};for (var _len2 = arguments.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {params[_key2 - 1] = arguments[_key2];}
    if (isFn(options.success) || isFn(options.fail) || isFn(options.complete)) {
      return wrapperReturnValue(name, invokeApi.apply(void 0, [name, api, options].concat(params)));
    }
    return wrapperReturnValue(name, handlePromise(new Promise(function (resolve, reject) {
      invokeApi.apply(void 0, [name, api, Object.assign({}, options, {
        success: resolve,
        fail: reject })].concat(
      params));
    })));
  };
}

var EPS = 1e-4;
var BASE_DEVICE_WIDTH = 750;
var isIOS = false;
var deviceWidth = 0;
var deviceDPR = 0;

function checkDeviceWidth() {var _wx$getSystemInfoSync =




  wx.getSystemInfoSync(),platform = _wx$getSystemInfoSync.platform,pixelRatio = _wx$getSystemInfoSync.pixelRatio,windowWidth = _wx$getSystemInfoSync.windowWidth; // uni=>wx runtime 编译目标是 uni 对象，内部不允许直接使用 uni

  deviceWidth = windowWidth;
  deviceDPR = pixelRatio;
  isIOS = platform === 'ios';
}

function upx2px(number, newDeviceWidth) {
  if (deviceWidth === 0) {
    checkDeviceWidth();
  }

  number = Number(number);
  if (number === 0) {
    return 0;
  }
  var result = number / BASE_DEVICE_WIDTH * (newDeviceWidth || deviceWidth);
  if (result < 0) {
    result = -result;
  }
  result = Math.floor(result + EPS);
  if (result === 0) {
    if (deviceDPR === 1 || !isIOS) {
      result = 1;
    } else {
      result = 0.5;
    }
  }
  return number < 0 ? -result : result;
}

var interceptors = {
  promiseInterceptor: promiseInterceptor };


var baseApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  upx2px: upx2px,
  addInterceptor: addInterceptor,
  removeInterceptor: removeInterceptor,
  interceptors: interceptors });


function findExistsPageIndex(url) {
  var pages = getCurrentPages();
  var len = pages.length;
  while (len--) {
    var page = pages[len];
    if (page.$page && page.$page.fullPath === url) {
      return len;
    }
  }
  return -1;
}

var redirectTo = {
  name: function name(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.delta) {
      return 'navigateBack';
    }
    return 'redirectTo';
  },
  args: function args(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.url) {
      var existsPageIndex = findExistsPageIndex(fromArgs.url);
      if (existsPageIndex !== -1) {
        var delta = getCurrentPages().length - 1 - existsPageIndex;
        if (delta > 0) {
          fromArgs.delta = delta;
        }
      }
    }
  } };


var previewImage = {
  args: function args(fromArgs) {
    var currentIndex = parseInt(fromArgs.current);
    if (isNaN(currentIndex)) {
      return;
    }
    var urls = fromArgs.urls;
    if (!Array.isArray(urls)) {
      return;
    }
    var len = urls.length;
    if (!len) {
      return;
    }
    if (currentIndex < 0) {
      currentIndex = 0;
    } else if (currentIndex >= len) {
      currentIndex = len - 1;
    }
    if (currentIndex > 0) {
      fromArgs.current = urls[currentIndex];
      fromArgs.urls = urls.filter(
      function (item, index) {return index < currentIndex ? item !== urls[currentIndex] : true;});

    } else {
      fromArgs.current = urls[0];
    }
    return {
      indicator: false,
      loop: false };

  } };


// import navigateTo from 'uni-helpers/navigate-to'

function addSafeAreaInsets(result) {
  if (result.safeArea) {
    var safeArea = result.safeArea;
    result.safeAreaInsets = {
      top: safeArea.top,
      left: safeArea.left,
      right: result.windowWidth - safeArea.right,
      bottom: result.windowHeight - safeArea.bottom };

  }
}
var protocols = {
  redirectTo: redirectTo,
  // navigateTo,  // 由于在微信开发者工具的页面参数，会显示__id__参数，因此暂时关闭mp-weixin对于navigateTo的AOP
  previewImage: previewImage,
  getSystemInfo: {
    returnValue: addSafeAreaInsets },

  getSystemInfoSync: {
    returnValue: addSafeAreaInsets } };


var todos = [
'vibrate',
'preloadPage',
'unPreloadPage',
'loadSubPackage'];

var canIUses = [];

var CALLBACKS = ['success', 'fail', 'cancel', 'complete'];

function processCallback(methodName, method, returnValue) {
  return function (res) {
    return method(processReturnValue(methodName, res, returnValue));
  };
}

function processArgs(methodName, fromArgs) {var argsOption = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};var returnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};var keepFromArgs = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  if (isPlainObject(fromArgs)) {// 一般 api 的参数解析
    var toArgs = keepFromArgs === true ? fromArgs : {}; // returnValue 为 false 时，说明是格式化返回值，直接在返回值对象上修改赋值
    if (isFn(argsOption)) {
      argsOption = argsOption(fromArgs, toArgs) || {};
    }
    for (var key in fromArgs) {
      if (hasOwn(argsOption, key)) {
        var keyOption = argsOption[key];
        if (isFn(keyOption)) {
          keyOption = keyOption(fromArgs[key], fromArgs, toArgs);
        }
        if (!keyOption) {// 不支持的参数
          console.warn("\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F ".concat(methodName, "\u6682\u4E0D\u652F\u6301").concat(key));
        } else if (isStr(keyOption)) {// 重写参数 key
          toArgs[keyOption] = fromArgs[key];
        } else if (isPlainObject(keyOption)) {// {name:newName,value:value}可重新指定参数 key:value
          toArgs[keyOption.name ? keyOption.name : key] = keyOption.value;
        }
      } else if (CALLBACKS.indexOf(key) !== -1) {
        if (isFn(fromArgs[key])) {
          toArgs[key] = processCallback(methodName, fromArgs[key], returnValue);
        }
      } else {
        if (!keepFromArgs) {
          toArgs[key] = fromArgs[key];
        }
      }
    }
    return toArgs;
  } else if (isFn(fromArgs)) {
    fromArgs = processCallback(methodName, fromArgs, returnValue);
  }
  return fromArgs;
}

function processReturnValue(methodName, res, returnValue) {var keepReturnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  if (isFn(protocols.returnValue)) {// 处理通用 returnValue
    res = protocols.returnValue(methodName, res);
  }
  return processArgs(methodName, res, returnValue, {}, keepReturnValue);
}

function wrapper(methodName, method) {
  if (hasOwn(protocols, methodName)) {
    var protocol = protocols[methodName];
    if (!protocol) {// 暂不支持的 api
      return function () {
        console.error("\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F \u6682\u4E0D\u652F\u6301".concat(methodName));
      };
    }
    return function (arg1, arg2) {// 目前 api 最多两个参数
      var options = protocol;
      if (isFn(protocol)) {
        options = protocol(arg1);
      }

      arg1 = processArgs(methodName, arg1, options.args, options.returnValue);

      var args = [arg1];
      if (typeof arg2 !== 'undefined') {
        args.push(arg2);
      }
      if (isFn(options.name)) {
        methodName = options.name(arg1);
      } else if (isStr(options.name)) {
        methodName = options.name;
      }
      var returnValue = wx[methodName].apply(wx, args);
      if (isSyncApi(methodName)) {// 同步 api
        return processReturnValue(methodName, returnValue, options.returnValue, isContextApi(methodName));
      }
      return returnValue;
    };
  }
  return method;
}

var todoApis = Object.create(null);

var TODOS = [
'onTabBarMidButtonTap',
'subscribePush',
'unsubscribePush',
'onPush',
'offPush',
'share'];


function createTodoApi(name) {
  return function todoApi(_ref)


  {var fail = _ref.fail,complete = _ref.complete;
    var res = {
      errMsg: "".concat(name, ":fail:\u6682\u4E0D\u652F\u6301 ").concat(name, " \u65B9\u6CD5") };

    isFn(fail) && fail(res);
    isFn(complete) && complete(res);
  };
}

TODOS.forEach(function (name) {
  todoApis[name] = createTodoApi(name);
});

var providers = {
  oauth: ['weixin'],
  share: ['weixin'],
  payment: ['wxpay'],
  push: ['weixin'] };


function getProvider(_ref2)




{var service = _ref2.service,success = _ref2.success,fail = _ref2.fail,complete = _ref2.complete;
  var res = false;
  if (providers[service]) {
    res = {
      errMsg: 'getProvider:ok',
      service: service,
      provider: providers[service] };

    isFn(success) && success(res);
  } else {
    res = {
      errMsg: 'getProvider:fail:服务[' + service + ']不存在' };

    isFn(fail) && fail(res);
  }
  isFn(complete) && complete(res);
}

var extraApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  getProvider: getProvider });


var getEmitter = function () {
  var Emitter;
  return function getUniEmitter() {
    if (!Emitter) {
      Emitter = new _vue.default();
    }
    return Emitter;
  };
}();

function apply(ctx, method, args) {
  return ctx[method].apply(ctx, args);
}

function $on() {
  return apply(getEmitter(), '$on', Array.prototype.slice.call(arguments));
}
function $off() {
  return apply(getEmitter(), '$off', Array.prototype.slice.call(arguments));
}
function $once() {
  return apply(getEmitter(), '$once', Array.prototype.slice.call(arguments));
}
function $emit() {
  return apply(getEmitter(), '$emit', Array.prototype.slice.call(arguments));
}

var eventApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  $on: $on,
  $off: $off,
  $once: $once,
  $emit: $emit });


var api = /*#__PURE__*/Object.freeze({
  __proto__: null });


var MPPage = Page;
var MPComponent = Component;

var customizeRE = /:/g;

var customize = cached(function (str) {
  return camelize(str.replace(customizeRE, '-'));
});

function initTriggerEvent(mpInstance) {
  {
    if (!wx.canIUse('nextTick')) {
      return;
    }
  }
  var oldTriggerEvent = mpInstance.triggerEvent;
  mpInstance.triggerEvent = function (event) {for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {args[_key3 - 1] = arguments[_key3];}
    return oldTriggerEvent.apply(mpInstance, [customize(event)].concat(args));
  };
}

function initHook(name, options) {
  var oldHook = options[name];
  if (!oldHook) {
    options[name] = function () {
      initTriggerEvent(this);
    };
  } else {
    options[name] = function () {
      initTriggerEvent(this);for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {args[_key4] = arguments[_key4];}
      return oldHook.apply(this, args);
    };
  }
}

Page = function Page() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  initHook('onLoad', options);
  return MPPage(options);
};

Component = function Component() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  initHook('created', options);
  return MPComponent(options);
};

var PAGE_EVENT_HOOKS = [
'onPullDownRefresh',
'onReachBottom',
'onAddToFavorites',
'onShareTimeline',
'onShareAppMessage',
'onPageScroll',
'onResize',
'onTabItemTap'];


function initMocks(vm, mocks) {
  var mpInstance = vm.$mp[vm.mpType];
  mocks.forEach(function (mock) {
    if (hasOwn(mpInstance, mock)) {
      vm[mock] = mpInstance[mock];
    }
  });
}

function hasHook(hook, vueOptions) {
  if (!vueOptions) {
    return true;
  }

  if (_vue.default.options && Array.isArray(_vue.default.options[hook])) {
    return true;
  }

  vueOptions = vueOptions.default || vueOptions;

  if (isFn(vueOptions)) {
    if (isFn(vueOptions.extendOptions[hook])) {
      return true;
    }
    if (vueOptions.super &&
    vueOptions.super.options &&
    Array.isArray(vueOptions.super.options[hook])) {
      return true;
    }
    return false;
  }

  if (isFn(vueOptions[hook])) {
    return true;
  }
  var mixins = vueOptions.mixins;
  if (Array.isArray(mixins)) {
    return !!mixins.find(function (mixin) {return hasHook(hook, mixin);});
  }
}

function initHooks(mpOptions, hooks, vueOptions) {
  hooks.forEach(function (hook) {
    if (hasHook(hook, vueOptions)) {
      mpOptions[hook] = function (args) {
        return this.$vm && this.$vm.__call_hook(hook, args);
      };
    }
  });
}

function initVueComponent(Vue, vueOptions) {
  vueOptions = vueOptions.default || vueOptions;
  var VueComponent;
  if (isFn(vueOptions)) {
    VueComponent = vueOptions;
  } else {
    VueComponent = Vue.extend(vueOptions);
  }
  vueOptions = VueComponent.options;
  return [VueComponent, vueOptions];
}

function initSlots(vm, vueSlots) {
  if (Array.isArray(vueSlots) && vueSlots.length) {
    var $slots = Object.create(null);
    vueSlots.forEach(function (slotName) {
      $slots[slotName] = true;
    });
    vm.$scopedSlots = vm.$slots = $slots;
  }
}

function initVueIds(vueIds, mpInstance) {
  vueIds = (vueIds || '').split(',');
  var len = vueIds.length;

  if (len === 1) {
    mpInstance._$vueId = vueIds[0];
  } else if (len === 2) {
    mpInstance._$vueId = vueIds[0];
    mpInstance._$vuePid = vueIds[1];
  }
}

function initData(vueOptions, context) {
  var data = vueOptions.data || {};
  var methods = vueOptions.methods || {};

  if (typeof data === 'function') {
    try {
      data = data.call(context); // 支持 Vue.prototype 上挂的数据
    } catch (e) {
      if (Object({"NODE_ENV":"development","VUE_APP_NAME":"好葫芦-用户端","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.warn('根据 Vue 的 data 函数初始化小程序 data 失败，请尽量确保 data 函数中不访问 vm 对象，否则可能影响首次数据渲染速度。', data);
      }
    }
  } else {
    try {
      // 对 data 格式化
      data = JSON.parse(JSON.stringify(data));
    } catch (e) {}
  }

  if (!isPlainObject(data)) {
    data = {};
  }

  Object.keys(methods).forEach(function (methodName) {
    if (context.__lifecycle_hooks__.indexOf(methodName) === -1 && !hasOwn(data, methodName)) {
      data[methodName] = methods[methodName];
    }
  });

  return data;
}

var PROP_TYPES = [String, Number, Boolean, Object, Array, null];

function createObserver(name) {
  return function observer(newVal, oldVal) {
    if (this.$vm) {
      this.$vm[name] = newVal; // 为了触发其他非 render watcher
    }
  };
}

function initBehaviors(vueOptions, initBehavior) {
  var vueBehaviors = vueOptions.behaviors;
  var vueExtends = vueOptions.extends;
  var vueMixins = vueOptions.mixins;

  var vueProps = vueOptions.props;

  if (!vueProps) {
    vueOptions.props = vueProps = [];
  }

  var behaviors = [];
  if (Array.isArray(vueBehaviors)) {
    vueBehaviors.forEach(function (behavior) {
      behaviors.push(behavior.replace('uni://', "wx".concat("://")));
      if (behavior === 'uni://form-field') {
        if (Array.isArray(vueProps)) {
          vueProps.push('name');
          vueProps.push('value');
        } else {
          vueProps.name = {
            type: String,
            default: '' };

          vueProps.value = {
            type: [String, Number, Boolean, Array, Object, Date],
            default: '' };

        }
      }
    });
  }
  if (isPlainObject(vueExtends) && vueExtends.props) {
    behaviors.push(
    initBehavior({
      properties: initProperties(vueExtends.props, true) }));


  }
  if (Array.isArray(vueMixins)) {
    vueMixins.forEach(function (vueMixin) {
      if (isPlainObject(vueMixin) && vueMixin.props) {
        behaviors.push(
        initBehavior({
          properties: initProperties(vueMixin.props, true) }));


      }
    });
  }
  return behaviors;
}

function parsePropType(key, type, defaultValue, file) {
  // [String]=>String
  if (Array.isArray(type) && type.length === 1) {
    return type[0];
  }
  return type;
}

function initProperties(props) {var isBehavior = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;var file = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var properties = {};
  if (!isBehavior) {
    properties.vueId = {
      type: String,
      value: '' };

    // 用于字节跳动小程序模拟抽象节点
    properties.generic = {
      type: Object,
      value: null };

    properties.vueSlots = { // 小程序不能直接定义 $slots 的 props，所以通过 vueSlots 转换到 $slots
      type: null,
      value: [],
      observer: function observer(newVal, oldVal) {
        var $slots = Object.create(null);
        newVal.forEach(function (slotName) {
          $slots[slotName] = true;
        });
        this.setData({
          $slots: $slots });

      } };

  }
  if (Array.isArray(props)) {// ['title']
    props.forEach(function (key) {
      properties[key] = {
        type: null,
        observer: createObserver(key) };

    });
  } else if (isPlainObject(props)) {// {title:{type:String,default:''},content:String}
    Object.keys(props).forEach(function (key) {
      var opts = props[key];
      if (isPlainObject(opts)) {// title:{type:String,default:''}
        var value = opts.default;
        if (isFn(value)) {
          value = value();
        }

        opts.type = parsePropType(key, opts.type);

        properties[key] = {
          type: PROP_TYPES.indexOf(opts.type) !== -1 ? opts.type : null,
          value: value,
          observer: createObserver(key) };

      } else {// content:String
        var type = parsePropType(key, opts);
        properties[key] = {
          type: PROP_TYPES.indexOf(type) !== -1 ? type : null,
          observer: createObserver(key) };

      }
    });
  }
  return properties;
}

function wrapper$1(event) {
  // TODO 又得兼容 mpvue 的 mp 对象
  try {
    event.mp = JSON.parse(JSON.stringify(event));
  } catch (e) {}

  event.stopPropagation = noop;
  event.preventDefault = noop;

  event.target = event.target || {};

  if (!hasOwn(event, 'detail')) {
    event.detail = {};
  }

  if (hasOwn(event, 'markerId')) {
    event.detail = typeof event.detail === 'object' ? event.detail : {};
    event.detail.markerId = event.markerId;
  }

  if (isPlainObject(event.detail)) {
    event.target = Object.assign({}, event.target, event.detail);
  }

  return event;
}

function getExtraValue(vm, dataPathsArray) {
  var context = vm;
  dataPathsArray.forEach(function (dataPathArray) {
    var dataPath = dataPathArray[0];
    var value = dataPathArray[2];
    if (dataPath || typeof value !== 'undefined') {// ['','',index,'disable']
      var propPath = dataPathArray[1];
      var valuePath = dataPathArray[3];

      var vFor;
      if (Number.isInteger(dataPath)) {
        vFor = dataPath;
      } else if (!dataPath) {
        vFor = context;
      } else if (typeof dataPath === 'string' && dataPath) {
        if (dataPath.indexOf('#s#') === 0) {
          vFor = dataPath.substr(3);
        } else {
          vFor = vm.__get_value(dataPath, context);
        }
      }

      if (Number.isInteger(vFor)) {
        context = value;
      } else if (!propPath) {
        context = vFor[value];
      } else {
        if (Array.isArray(vFor)) {
          context = vFor.find(function (vForItem) {
            return vm.__get_value(propPath, vForItem) === value;
          });
        } else if (isPlainObject(vFor)) {
          context = Object.keys(vFor).find(function (vForKey) {
            return vm.__get_value(propPath, vFor[vForKey]) === value;
          });
        } else {
          console.error('v-for 暂不支持循环数据：', vFor);
        }
      }

      if (valuePath) {
        context = vm.__get_value(valuePath, context);
      }
    }
  });
  return context;
}

function processEventExtra(vm, extra, event) {
  var extraObj = {};

  if (Array.isArray(extra) && extra.length) {
    /**
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *'test'
                                              */
    extra.forEach(function (dataPath, index) {
      if (typeof dataPath === 'string') {
        if (!dataPath) {// model,prop.sync
          extraObj['$' + index] = vm;
        } else {
          if (dataPath === '$event') {// $event
            extraObj['$' + index] = event;
          } else if (dataPath === 'arguments') {
            if (event.detail && event.detail.__args__) {
              extraObj['$' + index] = event.detail.__args__;
            } else {
              extraObj['$' + index] = [event];
            }
          } else if (dataPath.indexOf('$event.') === 0) {// $event.target.value
            extraObj['$' + index] = vm.__get_value(dataPath.replace('$event.', ''), event);
          } else {
            extraObj['$' + index] = vm.__get_value(dataPath);
          }
        }
      } else {
        extraObj['$' + index] = getExtraValue(vm, dataPath);
      }
    });
  }

  return extraObj;
}

function getObjByArray(arr) {
  var obj = {};
  for (var i = 1; i < arr.length; i++) {
    var element = arr[i];
    obj[element[0]] = element[1];
  }
  return obj;
}

function processEventArgs(vm, event) {var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];var extra = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];var isCustom = arguments.length > 4 ? arguments[4] : undefined;var methodName = arguments.length > 5 ? arguments[5] : undefined;
  var isCustomMPEvent = false; // wxcomponent 组件，传递原始 event 对象
  if (isCustom) {// 自定义事件
    isCustomMPEvent = event.currentTarget &&
    event.currentTarget.dataset &&
    event.currentTarget.dataset.comType === 'wx';
    if (!args.length) {// 无参数，直接传入 event 或 detail 数组
      if (isCustomMPEvent) {
        return [event];
      }
      return event.detail.__args__ || event.detail;
    }
  }

  var extraObj = processEventExtra(vm, extra, event);

  var ret = [];
  args.forEach(function (arg) {
    if (arg === '$event') {
      if (methodName === '__set_model' && !isCustom) {// input v-model value
        ret.push(event.target.value);
      } else {
        if (isCustom && !isCustomMPEvent) {
          ret.push(event.detail.__args__[0]);
        } else {// wxcomponent 组件或内置组件
          ret.push(event);
        }
      }
    } else {
      if (Array.isArray(arg) && arg[0] === 'o') {
        ret.push(getObjByArray(arg));
      } else if (typeof arg === 'string' && hasOwn(extraObj, arg)) {
        ret.push(extraObj[arg]);
      } else {
        ret.push(arg);
      }
    }
  });

  return ret;
}

var ONCE = '~';
var CUSTOM = '^';

function isMatchEventType(eventType, optType) {
  return eventType === optType ||

  optType === 'regionchange' && (

  eventType === 'begin' ||
  eventType === 'end');


}

function getContextVm(vm) {
  var $parent = vm.$parent;
  // 父组件是 scoped slots 或者其他自定义组件时继续查找
  while ($parent && $parent.$parent && ($parent.$options.generic || $parent.$parent.$options.generic || $parent.$scope._$vuePid)) {
    $parent = $parent.$parent;
  }
  return $parent && $parent.$parent;
}

function handleEvent(event) {var _this = this;
  event = wrapper$1(event);

  // [['tap',[['handle',[1,2,a]],['handle1',[1,2,a]]]]]
  var dataset = (event.currentTarget || event.target).dataset;
  if (!dataset) {
    return console.warn('事件信息不存在');
  }
  var eventOpts = dataset.eventOpts || dataset['event-opts']; // 支付宝 web-view 组件 dataset 非驼峰
  if (!eventOpts) {
    return console.warn('事件信息不存在');
  }

  // [['handle',[1,2,a]],['handle1',[1,2,a]]]
  var eventType = event.type;

  var ret = [];

  eventOpts.forEach(function (eventOpt) {
    var type = eventOpt[0];
    var eventsArray = eventOpt[1];

    var isCustom = type.charAt(0) === CUSTOM;
    type = isCustom ? type.slice(1) : type;
    var isOnce = type.charAt(0) === ONCE;
    type = isOnce ? type.slice(1) : type;

    if (eventsArray && isMatchEventType(eventType, type)) {
      eventsArray.forEach(function (eventArray) {
        var methodName = eventArray[0];
        if (methodName) {
          var handlerCtx = _this.$vm;
          if (handlerCtx.$options.generic) {// mp-weixin,mp-toutiao 抽象节点模拟 scoped slots
            handlerCtx = getContextVm(handlerCtx) || handlerCtx;
          }
          if (methodName === '$emit') {
            handlerCtx.$emit.apply(handlerCtx,
            processEventArgs(
            _this.$vm,
            event,
            eventArray[1],
            eventArray[2],
            isCustom,
            methodName));

            return;
          }
          var handler = handlerCtx[methodName];
          if (!isFn(handler)) {
            throw new Error(" _vm.".concat(methodName, " is not a function"));
          }
          if (isOnce) {
            if (handler.once) {
              return;
            }
            handler.once = true;
          }
          var params = processEventArgs(
          _this.$vm,
          event,
          eventArray[1],
          eventArray[2],
          isCustom,
          methodName);

          // 参数尾部增加原始事件对象用于复杂表达式内获取额外数据
          // eslint-disable-next-line no-sparse-arrays
          ret.push(handler.apply(handlerCtx, (Array.isArray(params) ? params : []).concat([,,,,,,,,,, event])));
        }
      });
    }
  });

  if (
  eventType === 'input' &&
  ret.length === 1 &&
  typeof ret[0] !== 'undefined')
  {
    return ret[0];
  }
}

var hooks = [
'onShow',
'onHide',
'onError',
'onPageNotFound',
'onThemeChange',
'onUnhandledRejection'];


function parseBaseApp(vm, _ref3)


{var mocks = _ref3.mocks,initRefs = _ref3.initRefs;
  if (vm.$options.store) {
    _vue.default.prototype.$store = vm.$options.store;
  }

  _vue.default.prototype.mpHost = "mp-weixin";

  _vue.default.mixin({
    beforeCreate: function beforeCreate() {
      if (!this.$options.mpType) {
        return;
      }

      this.mpType = this.$options.mpType;

      this.$mp = _defineProperty({
        data: {} },
      this.mpType, this.$options.mpInstance);


      this.$scope = this.$options.mpInstance;

      delete this.$options.mpType;
      delete this.$options.mpInstance;

      if (this.mpType !== 'app') {
        initRefs(this);
        initMocks(this, mocks);
      }
    } });


  var appOptions = {
    onLaunch: function onLaunch(args) {
      if (this.$vm) {// 已经初始化过了，主要是为了百度，百度 onShow 在 onLaunch 之前
        return;
      }
      {
        if (!wx.canIUse('nextTick')) {// 事实 上2.2.3 即可，简单使用 2.3.0 的 nextTick 判断
          console.error('当前微信基础库版本过低，请将 微信开发者工具-详情-项目设置-调试基础库版本 更换为`2.3.0`以上');
        }
      }

      this.$vm = vm;

      this.$vm.$mp = {
        app: this };


      this.$vm.$scope = this;
      // vm 上也挂载 globalData
      this.$vm.globalData = this.globalData;

      this.$vm._isMounted = true;
      this.$vm.__call_hook('mounted', args);

      this.$vm.__call_hook('onLaunch', args);
    } };


  // 兼容旧版本 globalData
  appOptions.globalData = vm.$options.globalData || {};
  // 将 methods 中的方法挂在 getApp() 中
  var methods = vm.$options.methods;
  if (methods) {
    Object.keys(methods).forEach(function (name) {
      appOptions[name] = methods[name];
    });
  }

  initHooks(appOptions, hooks);

  return appOptions;
}

var mocks = ['__route__', '__wxExparserNodeId__', '__wxWebviewId__'];

function findVmByVueId(vm, vuePid) {
  var $children = vm.$children;
  // 优先查找直属(反向查找:https://github.com/dcloudio/uni-app/issues/1200)
  for (var i = $children.length - 1; i >= 0; i--) {
    var childVm = $children[i];
    if (childVm.$scope._$vueId === vuePid) {
      return childVm;
    }
  }
  // 反向递归查找
  var parentVm;
  for (var _i = $children.length - 1; _i >= 0; _i--) {
    parentVm = findVmByVueId($children[_i], vuePid);
    if (parentVm) {
      return parentVm;
    }
  }
}

function initBehavior(options) {
  return Behavior(options);
}

function isPage() {
  return !!this.route;
}

function initRelation(detail) {
  this.triggerEvent('__l', detail);
}

function selectAllComponents(mpInstance, selector, $refs) {
  var components = mpInstance.selectAllComponents(selector);
  components.forEach(function (component) {
    var ref = component.dataset.ref;
    $refs[ref] = component.$vm || component;
    {
      if (component.dataset.vueGeneric === 'scoped') {
        component.selectAllComponents('.scoped-ref').forEach(function (scopedComponent) {
          selectAllComponents(scopedComponent, selector, $refs);
        });
      }
    }
  });
}

function initRefs(vm) {
  var mpInstance = vm.$scope;
  Object.defineProperty(vm, '$refs', {
    get: function get() {
      var $refs = {};
      selectAllComponents(mpInstance, '.vue-ref', $refs);
      // TODO 暂不考虑 for 中的 scoped
      var forComponents = mpInstance.selectAllComponents('.vue-ref-in-for');
      forComponents.forEach(function (component) {
        var ref = component.dataset.ref;
        if (!$refs[ref]) {
          $refs[ref] = [];
        }
        $refs[ref].push(component.$vm || component);
      });
      return $refs;
    } });

}

function handleLink(event) {var _ref4 =



  event.detail || event.value,vuePid = _ref4.vuePid,vueOptions = _ref4.vueOptions; // detail 是微信,value 是百度(dipatch)

  var parentVm;

  if (vuePid) {
    parentVm = findVmByVueId(this.$vm, vuePid);
  }

  if (!parentVm) {
    parentVm = this.$vm;
  }

  vueOptions.parent = parentVm;
}

function parseApp(vm) {
  return parseBaseApp(vm, {
    mocks: mocks,
    initRefs: initRefs });

}

var eventChannels = {};

var eventChannelStack = [];

function getEventChannel(id) {
  if (id) {
    var eventChannel = eventChannels[id];
    delete eventChannels[id];
    return eventChannel;
  }
  return eventChannelStack.shift();
}

function createApp(vm) {
  _vue.default.prototype.getOpenerEventChannel = function () {
    // 微信小程序使用自身getOpenerEventChannel
    {
      return this.$scope.getOpenerEventChannel();
    }
  };
  var callHook = _vue.default.prototype.__call_hook;
  _vue.default.prototype.__call_hook = function (hook, args) {
    if (hook === 'onLoad' && args && args.__id__) {
      this.__eventChannel__ = getEventChannel(args.__id__);
      delete args.__id__;
    }
    return callHook.call(this, hook, args);
  };
  App(parseApp(vm));
  return vm;
}

var encodeReserveRE = /[!'()*]/g;
var encodeReserveReplacer = function encodeReserveReplacer(c) {return '%' + c.charCodeAt(0).toString(16);};
var commaRE = /%2C/g;

// fixed encodeURIComponent which is more conformant to RFC3986:
// - escapes [!'()*]
// - preserve commas
var encode = function encode(str) {return encodeURIComponent(str).
  replace(encodeReserveRE, encodeReserveReplacer).
  replace(commaRE, ',');};

function stringifyQuery(obj) {var encodeStr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : encode;
  var res = obj ? Object.keys(obj).map(function (key) {
    var val = obj[key];

    if (val === undefined) {
      return '';
    }

    if (val === null) {
      return encodeStr(key);
    }

    if (Array.isArray(val)) {
      var result = [];
      val.forEach(function (val2) {
        if (val2 === undefined) {
          return;
        }
        if (val2 === null) {
          result.push(encodeStr(key));
        } else {
          result.push(encodeStr(key) + '=' + encodeStr(val2));
        }
      });
      return result.join('&');
    }

    return encodeStr(key) + '=' + encodeStr(val);
  }).filter(function (x) {return x.length > 0;}).join('&') : null;
  return res ? "?".concat(res) : '';
}

function parseBaseComponent(vueComponentOptions)


{var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},isPage = _ref5.isPage,initRelation = _ref5.initRelation;var _initVueComponent =
  initVueComponent(_vue.default, vueComponentOptions),_initVueComponent2 = _slicedToArray(_initVueComponent, 2),VueComponent = _initVueComponent2[0],vueOptions = _initVueComponent2[1];

  var options = _objectSpread({
    multipleSlots: true,
    addGlobalClass: true },
  vueOptions.options || {});


  {
    // 微信 multipleSlots 部分情况有 bug，导致内容顺序错乱 如 u-list，提供覆盖选项
    if (vueOptions['mp-weixin'] && vueOptions['mp-weixin'].options) {
      Object.assign(options, vueOptions['mp-weixin'].options);
    }
  }

  var componentOptions = {
    options: options,
    data: initData(vueOptions, _vue.default.prototype),
    behaviors: initBehaviors(vueOptions, initBehavior),
    properties: initProperties(vueOptions.props, false, vueOptions.__file),
    lifetimes: {
      attached: function attached() {
        var properties = this.properties;

        var options = {
          mpType: isPage.call(this) ? 'page' : 'component',
          mpInstance: this,
          propsData: properties };


        initVueIds(properties.vueId, this);

        // 处理父子关系
        initRelation.call(this, {
          vuePid: this._$vuePid,
          vueOptions: options });


        // 初始化 vue 实例
        this.$vm = new VueComponent(options);

        // 处理$slots,$scopedSlots（暂不支持动态变化$slots）
        initSlots(this.$vm, properties.vueSlots);

        // 触发首次 setData
        this.$vm.$mount();
      },
      ready: function ready() {
        // 当组件 props 默认值为 true，初始化时传入 false 会导致 created,ready 触发, 但 attached 不触发
        // https://developers.weixin.qq.com/community/develop/doc/00066ae2844cc0f8eb883e2a557800
        if (this.$vm) {
          this.$vm._isMounted = true;
          this.$vm.__call_hook('mounted');
          this.$vm.__call_hook('onReady');
        }
      },
      detached: function detached() {
        this.$vm && this.$vm.$destroy();
      } },

    pageLifetimes: {
      show: function show(args) {
        this.$vm && this.$vm.__call_hook('onPageShow', args);
      },
      hide: function hide() {
        this.$vm && this.$vm.__call_hook('onPageHide');
      },
      resize: function resize(size) {
        this.$vm && this.$vm.__call_hook('onPageResize', size);
      } },

    methods: {
      __l: handleLink,
      __e: handleEvent } };


  // externalClasses
  if (vueOptions.externalClasses) {
    componentOptions.externalClasses = vueOptions.externalClasses;
  }

  if (Array.isArray(vueOptions.wxsCallMethods)) {
    vueOptions.wxsCallMethods.forEach(function (callMethod) {
      componentOptions.methods[callMethod] = function (args) {
        return this.$vm[callMethod](args);
      };
    });
  }

  if (isPage) {
    return componentOptions;
  }
  return [componentOptions, VueComponent];
}

function parseComponent(vueComponentOptions) {
  return parseBaseComponent(vueComponentOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

var hooks$1 = [
'onShow',
'onHide',
'onUnload'];


hooks$1.push.apply(hooks$1, PAGE_EVENT_HOOKS);

function parseBasePage(vuePageOptions, _ref6)


{var isPage = _ref6.isPage,initRelation = _ref6.initRelation;
  var pageOptions = parseComponent(vuePageOptions);

  initHooks(pageOptions.methods, hooks$1, vuePageOptions);

  pageOptions.methods.onLoad = function (query) {
    this.options = query;
    var copyQuery = Object.assign({}, query);
    delete copyQuery.__id__;
    this.$page = {
      fullPath: '/' + (this.route || this.is) + stringifyQuery(copyQuery) };

    this.$vm.$mp.query = query; // 兼容 mpvue
    this.$vm.__call_hook('onLoad', query);
  };

  return pageOptions;
}

function parsePage(vuePageOptions) {
  return parseBasePage(vuePageOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

function createPage(vuePageOptions) {
  {
    return Component(parsePage(vuePageOptions));
  }
}

function createComponent(vueOptions) {
  {
    return Component(parseComponent(vueOptions));
  }
}

todos.forEach(function (todoApi) {
  protocols[todoApi] = false;
});

canIUses.forEach(function (canIUseApi) {
  var apiName = protocols[canIUseApi] && protocols[canIUseApi].name ? protocols[canIUseApi].name :
  canIUseApi;
  if (!wx.canIUse(apiName)) {
    protocols[canIUseApi] = false;
  }
});

var uni = {};

if (typeof Proxy !== 'undefined' && "mp-weixin" !== 'app-plus') {
  uni = new Proxy({}, {
    get: function get(target, name) {
      if (hasOwn(target, name)) {
        return target[name];
      }
      if (baseApi[name]) {
        return baseApi[name];
      }
      if (api[name]) {
        return promisify(name, api[name]);
      }
      {
        if (extraApi[name]) {
          return promisify(name, extraApi[name]);
        }
        if (todoApis[name]) {
          return promisify(name, todoApis[name]);
        }
      }
      if (eventApi[name]) {
        return eventApi[name];
      }
      if (!hasOwn(wx, name) && !hasOwn(protocols, name)) {
        return;
      }
      return promisify(name, wrapper(name, wx[name]));
    },
    set: function set(target, name, value) {
      target[name] = value;
      return true;
    } });

} else {
  Object.keys(baseApi).forEach(function (name) {
    uni[name] = baseApi[name];
  });

  {
    Object.keys(todoApis).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
    Object.keys(extraApi).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
  }

  Object.keys(eventApi).forEach(function (name) {
    uni[name] = eventApi[name];
  });

  Object.keys(api).forEach(function (name) {
    uni[name] = promisify(name, api[name]);
  });

  Object.keys(wx).forEach(function (name) {
    if (hasOwn(wx, name) || hasOwn(protocols, name)) {
      uni[name] = promisify(name, wrapper(name, wx[name]));
    }
  });
}

wx.createApp = createApp;
wx.createPage = createPage;
wx.createComponent = createComponent;

var uni$1 = uni;var _default =

uni$1;exports.default = _default;

/***/ }),

/***/ 10:
/*!**********************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode, /* vue-cli only */
  components, // fixed by xxxxxx auto components
  renderjs // fixed by xxxxxx renderjs
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // fixed by xxxxxx auto components
  if (components) {
    if (!options.components) {
      options.components = {}
    }
    var hasOwn = Object.prototype.hasOwnProperty
    for (var name in components) {
      if (hasOwn.call(components, name) && !hasOwn.call(options.components, name)) {
        options.components[name] = components[name]
      }
    }
  }
  // fixed by xxxxxx renderjs
  if (renderjs) {
    (renderjs.beforeCreate || (renderjs.beforeCreate = [])).unshift(function() {
      this[renderjs.__module] = this
    });
    (options.mixins || (options.mixins = [])).push(renderjs)
  }

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ 190:
/*!*********************************************************************************************!*\
  !*** D:/MyXiangMu/myHaoHuLuo/font-haohuluo-user/haohulu_user/components/amap-wx/amap-wx.js ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function AMapWX(a) {this.key = a.key, this.requestConfig = { key: a.key, s: "rsx", platform: "WXJS", appname: a.key, sdkversion: "1.2.0", logversion: "2.0" };}AMapWX.prototype.getWxLocation = function (a, b) {wx.getLocation({ type: "gcj02", success: function success(a) {var c = a.longitude + "," + a.latitude;wx.setStorage({ key: "userLocation", data: c }), b(c);}, fail: function fail(c) {wx.getStorage({ key: "userLocation", success: function success(a) {a.data && b(a.data);} }), a.fail({ errCode: "0", errMsg: c.errMsg || "" });} });}, AMapWX.prototype.getRegeo = function (a) {function c(c) {var d = b.requestConfig;wx.request({ url: "https://restapi.amap.com/v3/geocode/regeo", data: { key: b.key, location: c, extensions: "all", s: d.s, platform: d.platform, appname: b.key, sdkversion: d.sdkversion, logversion: d.logversion }, method: "GET", header: { "content-type": "application/json" }, success: function success(b) {var d, e, f, g, h, i, j, k, l;b.data.status && "1" == b.data.status ? (d = b.data.regeocode, e = d.addressComponent, f = [], g = "", d && d.roads[0] && d.roads[0].name && (g = d.roads[0].name + "附近"), h = c.split(",")[0], i = c.split(",")[1], d.pois && d.pois[0] && (g = d.pois[0].name + "附近", j = d.pois[0].location, j && (h = parseFloat(j.split(",")[0]), i = parseFloat(j.split(",")[1]))), e.provice && f.push(e.provice), e.city && f.push(e.city), e.district && f.push(e.district), e.streetNumber && e.streetNumber.street && e.streetNumber.number ? (f.push(e.streetNumber.street), f.push(e.streetNumber.number)) : (k = "", d && d.roads[0] && d.roads[0].name && (k = d.roads[0].name), f.push(k)), f = f.join(""), l = [{ iconPath: a.iconPath, width: a.iconWidth, height: a.iconHeight, name: f, desc: g, longitude: h, latitude: i, id: 0, regeocodeData: d }], a.success(l)) : a.fail({ errCode: b.data.infocode, errMsg: b.data.info });}, fail: function fail(b) {a.fail({ errCode: "0", errMsg: b.errMsg || "" });} });}var b = this;a.location ? c(a.location) : b.getWxLocation(a, function (a) {c(a);});}, AMapWX.prototype.getWeather = function (a) {function d(d) {var e = "base";a.type && "forecast" == a.type && (e = "all"), wx.request({ url: "https://restapi.amap.com/v3/weather/weatherInfo", data: { key: b.key, city: d, extensions: e, s: c.s, platform: c.platform, appname: b.key, sdkversion: c.sdkversion, logversion: c.logversion }, method: "GET", header: { "content-type": "application/json" }, success: function success(b) {function c(a) {var b = { city: { text: "城市", data: a.city }, weather: { text: "天气", data: a.weather }, temperature: { text: "温度", data: a.temperature }, winddirection: { text: "风向", data: a.winddirection + "风" }, windpower: { text: "风力", data: a.windpower + "级" }, humidity: { text: "湿度", data: a.humidity + "%" } };return b;}var d, e;b.data.status && "1" == b.data.status ? b.data.lives ? (d = b.data.lives, d && d.length > 0 && (d = d[0], e = c(d), e["liveData"] = d, a.success(e))) : b.data.forecasts && b.data.forecasts[0] && a.success({ forecast: b.data.forecasts[0] }) : a.fail({ errCode: b.data.infocode, errMsg: b.data.info });}, fail: function fail(b) {a.fail({ errCode: "0", errMsg: b.errMsg || "" });} });}function e(e) {wx.request({ url: "https://restapi.amap.com/v3/geocode/regeo", data: { key: b.key, location: e, extensions: "all", s: c.s, platform: c.platform, appname: b.key, sdkversion: c.sdkversion, logversion: c.logversion }, method: "GET", header: { "content-type": "application/json" }, success: function success(b) {var c, e;b.data.status && "1" == b.data.status ? (e = b.data.regeocode, e.addressComponent ? c = e.addressComponent.adcode : e.aois && e.aois.length > 0 && (c = e.aois[0].adcode), d(c)) : a.fail({ errCode: b.data.infocode, errMsg: b.data.info });}, fail: function fail(b) {a.fail({ errCode: "0", errMsg: b.errMsg || "" });} });}var b = this,c = b.requestConfig;a.city ? d(a.city) : b.getWxLocation(a, function (a) {e(a);});}, AMapWX.prototype.getPoiAround = function (a) {function d(d) {var e = { key: b.key, location: d, s: c.s, platform: c.platform, appname: b.key, sdkversion: c.sdkversion, logversion: c.logversion };a.querytypes && (e["types"] = a.querytypes), a.querykeywords && (e["keywords"] = a.querykeywords), wx.request({ url: "https://restapi.amap.com/v3/place/around", data: e, method: "GET", header: { "content-type": "application/json" }, success: function success(b) {var c, d, e, f;if (b.data.status && "1" == b.data.status) {if (b = b.data, b && b.pois) {for (c = [], d = 0; d < b.pois.length; d++) {e = 0 == d ? a.iconPathSelected : a.iconPath, c.push({ latitude: parseFloat(b.pois[d].location.split(",")[1]), longitude: parseFloat(b.pois[d].location.split(",")[0]), iconPath: e, width: 22, height: 32, id: d, name: b.pois[d].name, address: b.pois[d].address });}f = { markers: c, poisData: b.pois }, a.success(f);}} else a.fail({ errCode: b.data.infocode, errMsg: b.data.info });}, fail: function fail(b) {a.fail({ errCode: "0", errMsg: b.errMsg || "" });} });}var b = this,c = b.requestConfig;a.location ? d(a.location) : b.getWxLocation(a, function (a) {d(a);});}, AMapWX.prototype.getStaticmap = function (a) {function f(b) {c.push("location=" + b), a.zoom && c.push("zoom=" + a.zoom), a.size && c.push("size=" + a.size), a.scale && c.push("scale=" + a.scale), a.markers && c.push("markers=" + a.markers), a.labels && c.push("labels=" + a.labels), a.paths && c.push("paths=" + a.paths), a.traffic && c.push("traffic=" + a.traffic);var e = d + c.join("&");a.success({ url: e });}var e,b = this,c = [],d = "https://restapi.amap.com/v3/staticmap?";c.push("key=" + b.key), e = b.requestConfig, c.push("s=" + e.s), c.push("platform=" + e.platform), c.push("appname=" + e.appname), c.push("sdkversion=" + e.sdkversion), c.push("logversion=" + e.logversion), a.location ? f(a.location) : b.getWxLocation(a, function (a) {f(a);});}, AMapWX.prototype.getInputtips = function (a) {var b = this,c = b.requestConfig,d = { key: b.key, s: c.s, platform: c.platform, appname: b.key, sdkversion: c.sdkversion, logversion: c.logversion };a.location && (d["location"] = a.location), a.keywords && (d["keywords"] = a.keywords), a.type && (d["type"] = a.type), a.city && (d["city"] = a.city), a.citylimit && (d["citylimit"] = a.citylimit), wx.request({ url: "https://restapi.amap.com/v3/assistant/inputtips", data: d, method: "GET", header: { "content-type": "application/json" }, success: function success(b) {b && b.data && b.data.tips && a.success({ tips: b.data.tips });}, fail: function fail(b) {a.fail({ errCode: "0", errMsg: b.errMsg || "" });} });}, AMapWX.prototype.getDrivingRoute = function (a) {var b = this,c = b.requestConfig,d = { key: b.key, s: c.s, platform: c.platform, appname: b.key, sdkversion: c.sdkversion, logversion: c.logversion };a.origin && (d["origin"] = a.origin), a.destination && (d["destination"] = a.destination), a.strategy && (d["strategy"] = a.strategy), a.waypoints && (d["waypoints"] = a.waypoints), a.avoidpolygons && (d["avoidpolygons"] = a.avoidpolygons), a.avoidroad && (d["avoidroad"] = a.avoidroad), wx.request({ url: "https://restapi.amap.com/v3/direction/driving", data: d, method: "GET", header: { "content-type": "application/json" }, success: function success(b) {b && b.data && b.data.route && a.success({ paths: b.data.route.paths, taxi_cost: b.data.route.taxi_cost || "" });}, fail: function fail(b) {a.fail({ errCode: "0", errMsg: b.errMsg || "" });} });}, AMapWX.prototype.getWalkingRoute = function (a) {var b = this,c = b.requestConfig,d = { key: b.key, s: c.s, platform: c.platform, appname: b.key, sdkversion: c.sdkversion, logversion: c.logversion };a.origin && (d["origin"] = a.origin), a.destination && (d["destination"] = a.destination), wx.request({ url: "https://restapi.amap.com/v3/direction/walking", data: d, method: "GET", header: { "content-type": "application/json" }, success: function success(b) {b && b.data && b.data.route && a.success({ paths: b.data.route.paths });}, fail: function fail(b) {a.fail({ errCode: "0", errMsg: b.errMsg || "" });} });}, AMapWX.prototype.getTransitRoute = function (a) {var b = this,c = b.requestConfig,d = { key: b.key, s: c.s, platform: c.platform, appname: b.key, sdkversion: c.sdkversion, logversion: c.logversion };a.origin && (d["origin"] = a.origin), a.destination && (d["destination"] = a.destination), a.strategy && (d["strategy"] = a.strategy), a.city && (d["city"] = a.city), a.cityd && (d["cityd"] = a.cityd), wx.request({ url: "https://restapi.amap.com/v3/direction/transit/integrated", data: d, method: "GET", header: { "content-type": "application/json" }, success: function success(b) {if (b && b.data && b.data.route) {var c = b.data.route;a.success({ distance: c.distance || "", taxi_cost: c.taxi_cost || "", transits: c.transits });}}, fail: function fail(b) {a.fail({ errCode: "0", errMsg: b.errMsg || "" });} });}, AMapWX.prototype.getRidingRoute = function (a) {var b = this,c = b.requestConfig,d = { key: b.key, s: c.s, platform: c.platform, appname: b.key, sdkversion: c.sdkversion, logversion: c.logversion };a.origin && (d["origin"] = a.origin), a.destination && (d["destination"] = a.destination), wx.request({ url: "https://restapi.amap.com/v4/direction/bicycling", data: d, method: "GET", header: { "content-type": "application/json" }, success: function success(b) {b && b.data && b.data.data && a.success({ paths: b.data.data.paths });}, fail: function fail(b) {a.fail({ errCode: "0", errMsg: b.errMsg || "" });} });}, module.exports.AMapWX = AMapWX;

/***/ }),

/***/ 199:
/*!*******************************************************************************!*\
  !*** D:/MyXiangMu/myHaoHuLuo/font-haohuluo-user/haohulu_user/pages/area.json ***!
  \*******************************************************************************/
/*! exports provided: list, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"list\":[{\"id\":2,\"pid\":1,\"shortname\":\"北京\",\"name\":\"北京市\",\"merger_name\":\"中国,北京,北京市\",\"pinyin\":\"beijing\",\"code\":\"010\",\"zip_code\":\"100000\",\"first\":\"B\",\"lng\":\"116.405285\",\"lat\":\"39.904989\"},{\"id\":20,\"pid\":19,\"shortname\":\"天津\",\"name\":\"天津市\",\"merger_name\":\"中国,天津,天津市\",\"pinyin\":\"tianjin\",\"code\":\"022\",\"zip_code\":\"300000\",\"first\":\"T\",\"lng\":\"117.190182\",\"lat\":\"39.125596\"},{\"id\":38,\"pid\":37,\"shortname\":\"石家庄\",\"name\":\"石家庄市\",\"merger_name\":\"中国,河北省,石家庄市\",\"pinyin\":\"shijiazhuang\",\"code\":\"0311\",\"zip_code\":\"050011\",\"first\":\"S\",\"lng\":\"114.502461\",\"lat\":\"38.045474\"},{\"id\":61,\"pid\":37,\"shortname\":\"唐山\",\"name\":\"唐山市\",\"merger_name\":\"中国,河北省,唐山市\",\"pinyin\":\"tangshan\",\"code\":\"0315\",\"zip_code\":\"063000\",\"first\":\"T\",\"lng\":\"118.175393\",\"lat\":\"39.635113\"},{\"id\":76,\"pid\":37,\"shortname\":\"秦皇岛\",\"name\":\"秦皇岛市\",\"merger_name\":\"中国,河北省,秦皇岛市\",\"pinyin\":\"qinhuangdao\",\"code\":\"0335\",\"zip_code\":\"066000\",\"first\":\"Q\",\"lng\":\"119.586579\",\"lat\":\"39.942531\"},{\"id\":84,\"pid\":37,\"shortname\":\"邯郸\",\"name\":\"邯郸市\",\"merger_name\":\"中国,河北省,邯郸市\",\"pinyin\":\"handan\",\"code\":\"0310\",\"zip_code\":\"056002\",\"first\":\"H\",\"lng\":\"114.490686\",\"lat\":\"36.612273\"},{\"id\":104,\"pid\":37,\"shortname\":\"邢台\",\"name\":\"邢台市\",\"merger_name\":\"中国,河北省,邢台市\",\"pinyin\":\"xingtai\",\"code\":\"0319\",\"zip_code\":\"054001\",\"first\":\"X\",\"lng\":\"114.508851\",\"lat\":\"37.0682\"},{\"id\":124,\"pid\":37,\"shortname\":\"保定\",\"name\":\"保定市\",\"merger_name\":\"中国,河北省,保定市\",\"pinyin\":\"baoding\",\"code\":\"0312\",\"zip_code\":\"071052\",\"first\":\"B\",\"lng\":\"115.482331\",\"lat\":\"38.867657\"},{\"id\":150,\"pid\":37,\"shortname\":\"张家口\",\"name\":\"张家口市\",\"merger_name\":\"中国,河北省,张家口市\",\"pinyin\":\"zhangjiakou\",\"code\":\"0313\",\"zip_code\":\"075000\",\"first\":\"Z\",\"lng\":\"114.884091\",\"lat\":\"40.811901\"},{\"id\":168,\"pid\":37,\"shortname\":\"承德\",\"name\":\"承德市\",\"merger_name\":\"中国,河北省,承德市\",\"pinyin\":\"chengde\",\"code\":\"0314\",\"zip_code\":\"067000\",\"first\":\"C\",\"lng\":\"117.939152\",\"lat\":\"40.976204\"},{\"id\":180,\"pid\":37,\"shortname\":\"沧州\",\"name\":\"沧州市\",\"merger_name\":\"中国,河北省,沧州市\",\"pinyin\":\"cangzhou\",\"code\":\"0317\",\"zip_code\":\"061001\",\"first\":\"C\",\"lng\":\"116.857461\",\"lat\":\"38.310582\"},{\"id\":197,\"pid\":37,\"shortname\":\"廊坊\",\"name\":\"廊坊市\",\"merger_name\":\"中国,河北省,廊坊市\",\"pinyin\":\"langfang\",\"code\":\"0316\",\"zip_code\":\"065000\",\"first\":\"L\",\"lng\":\"116.713873\",\"lat\":\"39.529244\"},{\"id\":208,\"pid\":37,\"shortname\":\"衡水\",\"name\":\"衡水市\",\"merger_name\":\"中国,河北省,衡水市\",\"pinyin\":\"hengshui\",\"code\":\"0318\",\"zip_code\":\"053000\",\"first\":\"H\",\"lng\":\"115.665993\",\"lat\":\"37.735097\"},{\"id\":221,\"pid\":220,\"shortname\":\"太原\",\"name\":\"太原市\",\"merger_name\":\"中国,山西省,太原市\",\"pinyin\":\"taiyuan\",\"code\":\"0351\",\"zip_code\":\"030082\",\"first\":\"T\",\"lng\":\"112.549248\",\"lat\":\"37.857014\"},{\"id\":232,\"pid\":220,\"shortname\":\"大同\",\"name\":\"大同市\",\"merger_name\":\"中国,山西省,大同市\",\"pinyin\":\"datong\",\"code\":\"0352\",\"zip_code\":\"037008\",\"first\":\"D\",\"lng\":\"113.295259\",\"lat\":\"40.09031\"},{\"id\":244,\"pid\":220,\"shortname\":\"阳泉\",\"name\":\"阳泉市\",\"merger_name\":\"中国,山西省,阳泉市\",\"pinyin\":\"yangquan\",\"code\":\"0353\",\"zip_code\":\"045000\",\"first\":\"Y\",\"lng\":\"113.583285\",\"lat\":\"37.861188\"},{\"id\":250,\"pid\":220,\"shortname\":\"长治\",\"name\":\"长治市\",\"merger_name\":\"中国,山西省,长治市\",\"pinyin\":\"changzhi\",\"code\":\"0355\",\"zip_code\":\"046000\",\"first\":\"C\",\"lng\":\"113.113556\",\"lat\":\"36.191112\"},{\"id\":264,\"pid\":220,\"shortname\":\"晋城\",\"name\":\"晋城市\",\"merger_name\":\"中国,山西省,晋城市\",\"pinyin\":\"jincheng\",\"code\":\"0356\",\"zip_code\":\"048000\",\"first\":\"J\",\"lng\":\"112.851274\",\"lat\":\"35.497553\"},{\"id\":271,\"pid\":220,\"shortname\":\"朔州\",\"name\":\"朔州市\",\"merger_name\":\"中国,山西省,朔州市\",\"pinyin\":\"shuozhou\",\"code\":\"0349\",\"zip_code\":\"038500\",\"first\":\"S\",\"lng\":\"112.433387\",\"lat\":\"39.331261\"},{\"id\":278,\"pid\":220,\"shortname\":\"晋中\",\"name\":\"晋中市\",\"merger_name\":\"中国,山西省,晋中市\",\"pinyin\":\"jinzhong\",\"code\":\"0354\",\"zip_code\":\"030600\",\"first\":\"J\",\"lng\":\"112.736465\",\"lat\":\"37.696495\"},{\"id\":290,\"pid\":220,\"shortname\":\"运城\",\"name\":\"运城市\",\"merger_name\":\"中国,山西省,运城市\",\"pinyin\":\"yuncheng\",\"code\":\"0359\",\"zip_code\":\"044000\",\"first\":\"Y\",\"lng\":\"111.003957\",\"lat\":\"35.022778\"},{\"id\":304,\"pid\":220,\"shortname\":\"忻州\",\"name\":\"忻州市\",\"merger_name\":\"中国,山西省,忻州市\",\"pinyin\":\"xinzhou\",\"code\":\"0350\",\"zip_code\":\"034000\",\"first\":\"X\",\"lng\":\"112.733538\",\"lat\":\"38.41769\"},{\"id\":319,\"pid\":220,\"shortname\":\"临汾\",\"name\":\"临汾市\",\"merger_name\":\"中国,山西省,临汾市\",\"pinyin\":\"linfen\",\"code\":\"0357\",\"zip_code\":\"041000\",\"first\":\"L\",\"lng\":\"111.517973\",\"lat\":\"36.08415\"},{\"id\":337,\"pid\":220,\"shortname\":\"吕梁\",\"name\":\"吕梁市\",\"merger_name\":\"中国,山西省,吕梁市\",\"pinyin\":\"lvliang\",\"code\":\"0358\",\"zip_code\":\"033000\",\"first\":\"L\",\"lng\":\"111.134335\",\"lat\":\"37.524366\"},{\"id\":352,\"pid\":351,\"shortname\":\"呼和浩特\",\"name\":\"呼和浩特市\",\"merger_name\":\"中国,内蒙古自治区,呼和浩特市\",\"pinyin\":\"hohhot\",\"code\":\"0471\",\"zip_code\":\"010000\",\"first\":\"H\",\"lng\":\"111.670801\",\"lat\":\"40.818311\"},{\"id\":362,\"pid\":351,\"shortname\":\"包头\",\"name\":\"包头市\",\"merger_name\":\"中国,内蒙古自治区,包头市\",\"pinyin\":\"baotou\",\"code\":\"0472\",\"zip_code\":\"014025\",\"first\":\"B\",\"lng\":\"109.840405\",\"lat\":\"40.658168\"},{\"id\":372,\"pid\":351,\"shortname\":\"乌海\",\"name\":\"乌海市\",\"merger_name\":\"中国,内蒙古自治区,乌海市\",\"pinyin\":\"wuhai\",\"code\":\"0473\",\"zip_code\":\"016000\",\"first\":\"W\",\"lng\":\"106.825563\",\"lat\":\"39.673734\"},{\"id\":376,\"pid\":351,\"shortname\":\"赤峰\",\"name\":\"赤峰市\",\"merger_name\":\"中国,内蒙古自治区,赤峰市\",\"pinyin\":\"chifeng\",\"code\":\"0476\",\"zip_code\":\"024000\",\"first\":\"C\",\"lng\":\"118.956806\",\"lat\":\"42.275317\"},{\"id\":389,\"pid\":351,\"shortname\":\"通辽\",\"name\":\"通辽市\",\"merger_name\":\"中国,内蒙古自治区,通辽市\",\"pinyin\":\"tongliao\",\"code\":\"0475\",\"zip_code\":\"028000\",\"first\":\"T\",\"lng\":\"122.263119\",\"lat\":\"43.617429\"},{\"id\":398,\"pid\":351,\"shortname\":\"鄂尔多斯\",\"name\":\"鄂尔多斯市\",\"merger_name\":\"中国,内蒙古自治区,鄂尔多斯市\",\"pinyin\":\"ordos\",\"code\":\"0477\",\"zip_code\":\"017004\",\"first\":\"E\",\"lng\":\"109.99029\",\"lat\":\"39.817179\"},{\"id\":407,\"pid\":351,\"shortname\":\"呼伦贝尔\",\"name\":\"呼伦贝尔市\",\"merger_name\":\"中国,内蒙古自治区,呼伦贝尔市\",\"pinyin\":\"hulunber\",\"code\":\"0470\",\"zip_code\":\"021008\",\"first\":\"H\",\"lng\":\"119.758168\",\"lat\":\"49.215333\"},{\"id\":422,\"pid\":351,\"shortname\":\"巴彦淖尔\",\"name\":\"巴彦淖尔市\",\"merger_name\":\"中国,内蒙古自治区,巴彦淖尔市\",\"pinyin\":\"bayannur\",\"code\":\"0478\",\"zip_code\":\"015001\",\"first\":\"B\",\"lng\":\"107.416959\",\"lat\":\"40.757402\"},{\"id\":430,\"pid\":351,\"shortname\":\"乌兰察布\",\"name\":\"乌兰察布市\",\"merger_name\":\"中国,内蒙古自治区,乌兰察布市\",\"pinyin\":\"ulanqab\",\"code\":\"0474\",\"zip_code\":\"012000\",\"first\":\"W\",\"lng\":\"113.114543\",\"lat\":\"41.034126\"},{\"id\":442,\"pid\":351,\"shortname\":\"兴安盟\",\"name\":\"兴安盟\",\"merger_name\":\"中国,内蒙古自治区,兴安盟\",\"pinyin\":\"hinggan\",\"code\":\"0482\",\"zip_code\":\"137401\",\"first\":\"X\",\"lng\":\"122.070317\",\"lat\":\"46.076268\"},{\"id\":449,\"pid\":351,\"shortname\":\"锡林郭勒盟\",\"name\":\"锡林郭勒盟\",\"merger_name\":\"中国,内蒙古自治区,锡林郭勒盟\",\"pinyin\":\"xilingol\",\"code\":\"0479\",\"zip_code\":\"026000\",\"first\":\"X\",\"lng\":\"116.090996\",\"lat\":\"43.944018\"},{\"id\":462,\"pid\":351,\"shortname\":\"阿拉善盟\",\"name\":\"阿拉善盟\",\"merger_name\":\"中国,内蒙古自治区,阿拉善盟\",\"pinyin\":\"alxa\",\"code\":\"0483\",\"zip_code\":\"750306\",\"first\":\"A\",\"lng\":\"105.706422\",\"lat\":\"38.844814\"},{\"id\":467,\"pid\":466,\"shortname\":\"沈阳\",\"name\":\"沈阳市\",\"merger_name\":\"中国,辽宁省,沈阳市\",\"pinyin\":\"shenyang\",\"code\":\"024\",\"zip_code\":\"110013\",\"first\":\"S\",\"lng\":\"123.429096\",\"lat\":\"41.796767\"},{\"id\":481,\"pid\":466,\"shortname\":\"大连\",\"name\":\"大连市\",\"merger_name\":\"中国,辽宁省,大连市\",\"pinyin\":\"dalian\",\"code\":\"0411\",\"zip_code\":\"116011\",\"first\":\"D\",\"lng\":\"121.618622\",\"lat\":\"38.91459\"},{\"id\":492,\"pid\":466,\"shortname\":\"鞍山\",\"name\":\"鞍山市\",\"merger_name\":\"中国,辽宁省,鞍山市\",\"pinyin\":\"anshan\",\"code\":\"0412\",\"zip_code\":\"114001\",\"first\":\"A\",\"lng\":\"122.995632\",\"lat\":\"41.110626\"},{\"id\":500,\"pid\":466,\"shortname\":\"抚顺\",\"name\":\"抚顺市\",\"merger_name\":\"中国,辽宁省,抚顺市\",\"pinyin\":\"fushun\",\"code\":\"024\",\"zip_code\":\"113008\",\"first\":\"F\",\"lng\":\"123.921109\",\"lat\":\"41.875956\"},{\"id\":508,\"pid\":466,\"shortname\":\"本溪\",\"name\":\"本溪市\",\"merger_name\":\"中国,辽宁省,本溪市\",\"pinyin\":\"benxi\",\"code\":\"0414\",\"zip_code\":\"117000\",\"first\":\"B\",\"lng\":\"123.770519\",\"lat\":\"41.297909\"},{\"id\":515,\"pid\":466,\"shortname\":\"丹东\",\"name\":\"丹东市\",\"merger_name\":\"中国,辽宁省,丹东市\",\"pinyin\":\"dandong\",\"code\":\"0415\",\"zip_code\":\"118000\",\"first\":\"D\",\"lng\":\"124.383044\",\"lat\":\"40.124296\"},{\"id\":522,\"pid\":466,\"shortname\":\"锦州\",\"name\":\"锦州市\",\"merger_name\":\"中国,辽宁省,锦州市\",\"pinyin\":\"jinzhou\",\"code\":\"0416\",\"zip_code\":\"121000\",\"first\":\"J\",\"lng\":\"121.135742\",\"lat\":\"41.119269\"},{\"id\":530,\"pid\":466,\"shortname\":\"营口\",\"name\":\"营口市\",\"merger_name\":\"中国,辽宁省,营口市\",\"pinyin\":\"yingkou\",\"code\":\"0417\",\"zip_code\":\"115003\",\"first\":\"Y\",\"lng\":\"122.235151\",\"lat\":\"40.667432\"},{\"id\":537,\"pid\":466,\"shortname\":\"阜新\",\"name\":\"阜新市\",\"merger_name\":\"中国,辽宁省,阜新市\",\"pinyin\":\"fuxin\",\"code\":\"0418\",\"zip_code\":\"123000\",\"first\":\"F\",\"lng\":\"121.648962\",\"lat\":\"42.011796\"},{\"id\":545,\"pid\":466,\"shortname\":\"辽阳\",\"name\":\"辽阳市\",\"merger_name\":\"中国,辽宁省,辽阳市\",\"pinyin\":\"liaoyang\",\"code\":\"0419\",\"zip_code\":\"111000\",\"first\":\"L\",\"lng\":\"123.18152\",\"lat\":\"41.269402\"},{\"id\":553,\"pid\":466,\"shortname\":\"盘锦\",\"name\":\"盘锦市\",\"merger_name\":\"中国,辽宁省,盘锦市\",\"pinyin\":\"panjin\",\"code\":\"0427\",\"zip_code\":\"124010\",\"first\":\"P\",\"lng\":\"122.06957\",\"lat\":\"41.124484\"},{\"id\":558,\"pid\":466,\"shortname\":\"铁岭\",\"name\":\"铁岭市\",\"merger_name\":\"中国,辽宁省,铁岭市\",\"pinyin\":\"tieling\",\"code\":\"024\",\"zip_code\":\"112000\",\"first\":\"T\",\"lng\":\"123.844279\",\"lat\":\"42.290585\"},{\"id\":566,\"pid\":466,\"shortname\":\"朝阳\",\"name\":\"朝阳市\",\"merger_name\":\"中国,辽宁省,朝阳市\",\"pinyin\":\"chaoyang\",\"code\":\"0421\",\"zip_code\":\"122000\",\"first\":\"C\",\"lng\":\"120.451176\",\"lat\":\"41.576758\"},{\"id\":574,\"pid\":466,\"shortname\":\"葫芦岛\",\"name\":\"葫芦岛市\",\"merger_name\":\"中国,辽宁省,葫芦岛市\",\"pinyin\":\"huludao\",\"code\":\"0429\",\"zip_code\":\"125000\",\"first\":\"H\",\"lng\":\"120.856394\",\"lat\":\"40.755572\"},{\"id\":581,\"pid\":466,\"shortname\":\"金普新区\",\"name\":\"金普新区\",\"merger_name\":\"中国,辽宁省,金普新区\",\"pinyin\":\"jinpuxinqu\",\"code\":\"0411\",\"zip_code\":\"116100\",\"first\":\"J\",\"lng\":\"121.789627\",\"lat\":\"39.055451\"},{\"id\":586,\"pid\":585,\"shortname\":\"长春\",\"name\":\"长春市\",\"merger_name\":\"中国,吉林省,长春市\",\"pinyin\":\"changchun\",\"code\":\"0431\",\"zip_code\":\"130022\",\"first\":\"C\",\"lng\":\"125.3245\",\"lat\":\"43.886841\"},{\"id\":597,\"pid\":585,\"shortname\":\"吉林\",\"name\":\"吉林市\",\"merger_name\":\"中国,吉林省,吉林市\",\"pinyin\":\"jilin\",\"code\":\"0432\",\"zip_code\":\"132011\",\"first\":\"J\",\"lng\":\"126.55302\",\"lat\":\"43.843577\"},{\"id\":607,\"pid\":585,\"shortname\":\"四平\",\"name\":\"四平市\",\"merger_name\":\"中国,吉林省,四平市\",\"pinyin\":\"siping\",\"code\":\"0434\",\"zip_code\":\"136000\",\"first\":\"S\",\"lng\":\"124.370785\",\"lat\":\"43.170344\"},{\"id\":614,\"pid\":585,\"shortname\":\"辽源\",\"name\":\"辽源市\",\"merger_name\":\"中国,吉林省,辽源市\",\"pinyin\":\"liaoyuan\",\"code\":\"0437\",\"zip_code\":\"136200\",\"first\":\"L\",\"lng\":\"125.145349\",\"lat\":\"42.902692\"},{\"id\":619,\"pid\":585,\"shortname\":\"通化\",\"name\":\"通化市\",\"merger_name\":\"中国,吉林省,通化市\",\"pinyin\":\"tonghua\",\"code\":\"0435\",\"zip_code\":\"134001\",\"first\":\"T\",\"lng\":\"125.936501\",\"lat\":\"41.721177\"},{\"id\":627,\"pid\":585,\"shortname\":\"白山\",\"name\":\"白山市\",\"merger_name\":\"中国,吉林省,白山市\",\"pinyin\":\"baishan\",\"code\":\"0439\",\"zip_code\":\"134300\",\"first\":\"B\",\"lng\":\"126.427839\",\"lat\":\"41.942505\"},{\"id\":634,\"pid\":585,\"shortname\":\"松原\",\"name\":\"松原市\",\"merger_name\":\"中国,吉林省,松原市\",\"pinyin\":\"songyuan\",\"code\":\"0438\",\"zip_code\":\"138000\",\"first\":\"S\",\"lng\":\"124.823608\",\"lat\":\"45.118243\"},{\"id\":640,\"pid\":585,\"shortname\":\"白城\",\"name\":\"白城市\",\"merger_name\":\"中国,吉林省,白城市\",\"pinyin\":\"baicheng\",\"code\":\"0436\",\"zip_code\":\"137000\",\"first\":\"B\",\"lng\":\"122.841114\",\"lat\":\"45.619026\"},{\"id\":646,\"pid\":585,\"shortname\":\"延边\",\"name\":\"延边朝鲜族自治州\",\"merger_name\":\"中国,吉林省,延边朝鲜族自治州\",\"pinyin\":\"yanbian\",\"code\":\"0433\",\"zip_code\":\"133000\",\"first\":\"Y\",\"lng\":\"129.513228\",\"lat\":\"42.904823\"},{\"id\":656,\"pid\":655,\"shortname\":\"哈尔滨\",\"name\":\"哈尔滨市\",\"merger_name\":\"中国,黑龙江省,哈尔滨市\",\"pinyin\":\"harbin\",\"code\":\"0451\",\"zip_code\":\"150010\",\"first\":\"H\",\"lng\":\"126.642464\",\"lat\":\"45.756967\"},{\"id\":675,\"pid\":655,\"shortname\":\"齐齐哈尔\",\"name\":\"齐齐哈尔市\",\"merger_name\":\"中国,黑龙江省,齐齐哈尔市\",\"pinyin\":\"qiqihar\",\"code\":\"0452\",\"zip_code\":\"161005\",\"first\":\"Q\",\"lng\":\"123.953486\",\"lat\":\"47.348079\"},{\"id\":692,\"pid\":655,\"shortname\":\"鸡西\",\"name\":\"鸡西市\",\"merger_name\":\"中国,黑龙江省,鸡西市\",\"pinyin\":\"jixi\",\"code\":\"0467\",\"zip_code\":\"158100\",\"first\":\"J\",\"lng\":\"130.975966\",\"lat\":\"45.300046\"},{\"id\":702,\"pid\":655,\"shortname\":\"鹤岗\",\"name\":\"鹤岗市\",\"merger_name\":\"中国,黑龙江省,鹤岗市\",\"pinyin\":\"hegang\",\"code\":\"0468\",\"zip_code\":\"154100\",\"first\":\"H\",\"lng\":\"130.277487\",\"lat\":\"47.332085\"},{\"id\":711,\"pid\":655,\"shortname\":\"双鸭山\",\"name\":\"双鸭山市\",\"merger_name\":\"中国,黑龙江省,双鸭山市\",\"pinyin\":\"shuangyashan\",\"code\":\"0469\",\"zip_code\":\"155100\",\"first\":\"S\",\"lng\":\"131.157304\",\"lat\":\"46.643442\"},{\"id\":720,\"pid\":655,\"shortname\":\"大庆\",\"name\":\"大庆市\",\"merger_name\":\"中国,黑龙江省,大庆市\",\"pinyin\":\"daqing\",\"code\":\"0459\",\"zip_code\":\"163000\",\"first\":\"D\",\"lng\":\"125.11272\",\"lat\":\"46.590734\"},{\"id\":730,\"pid\":655,\"shortname\":\"伊春\",\"name\":\"伊春市\",\"merger_name\":\"中国,黑龙江省,伊春市\",\"pinyin\":\"yichun\",\"code\":\"0458\",\"zip_code\":\"153000\",\"first\":\"Y\",\"lng\":\"128.899396\",\"lat\":\"47.724775\"},{\"id\":748,\"pid\":655,\"shortname\":\"佳木斯\",\"name\":\"佳木斯市\",\"merger_name\":\"中国,黑龙江省,佳木斯市\",\"pinyin\":\"jiamusi\",\"code\":\"0454\",\"zip_code\":\"154002\",\"first\":\"J\",\"lng\":\"130.361634\",\"lat\":\"46.809606\"},{\"id\":759,\"pid\":655,\"shortname\":\"七台河\",\"name\":\"七台河市\",\"merger_name\":\"中国,黑龙江省,七台河市\",\"pinyin\":\"qitaihe\",\"code\":\"0464\",\"zip_code\":\"154600\",\"first\":\"Q\",\"lng\":\"131.015584\",\"lat\":\"45.771266\"},{\"id\":764,\"pid\":655,\"shortname\":\"牡丹江\",\"name\":\"牡丹江市\",\"merger_name\":\"中国,黑龙江省,牡丹江市\",\"pinyin\":\"mudanjiang\",\"code\":\"0453\",\"zip_code\":\"157000\",\"first\":\"M\",\"lng\":\"129.618602\",\"lat\":\"44.582962\"},{\"id\":775,\"pid\":655,\"shortname\":\"黑河\",\"name\":\"黑河市\",\"merger_name\":\"中国,黑龙江省,黑河市\",\"pinyin\":\"heihe\",\"code\":\"0456\",\"zip_code\":\"164300\",\"first\":\"H\",\"lng\":\"127.499023\",\"lat\":\"50.249585\"},{\"id\":782,\"pid\":655,\"shortname\":\"绥化\",\"name\":\"绥化市\",\"merger_name\":\"中国,黑龙江省,绥化市\",\"pinyin\":\"suihua\",\"code\":\"0455\",\"zip_code\":\"152000\",\"first\":\"S\",\"lng\":\"126.99293\",\"lat\":\"46.637393\"},{\"id\":793,\"pid\":655,\"shortname\":\"大兴安岭\",\"name\":\"大兴安岭地区\",\"merger_name\":\"中国,黑龙江省,大兴安岭地区\",\"pinyin\":\"daxinganling\",\"code\":\"0457\",\"zip_code\":\"165000\",\"first\":\"D\",\"lng\":\"124.711526\",\"lat\":\"52.335262\"},{\"id\":802,\"pid\":801,\"shortname\":\"上海\",\"name\":\"上海市\",\"merger_name\":\"中国,上海,上海市\",\"pinyin\":\"shanghai\",\"code\":\"021\",\"zip_code\":\"200000\",\"first\":\"S\",\"lng\":\"121.472644\",\"lat\":\"31.231706\"},{\"id\":821,\"pid\":820,\"shortname\":\"南京\",\"name\":\"南京市\",\"merger_name\":\"中国,江苏省,南京市\",\"pinyin\":\"nanjing\",\"code\":\"025\",\"zip_code\":\"210008\",\"first\":\"N\",\"lng\":\"118.767413\",\"lat\":\"32.041544\"},{\"id\":833,\"pid\":820,\"shortname\":\"无锡\",\"name\":\"无锡市\",\"merger_name\":\"中国,江苏省,无锡市\",\"pinyin\":\"wuxi\",\"code\":\"0510\",\"zip_code\":\"214000\",\"first\":\"W\",\"lng\":\"120.301663\",\"lat\":\"31.574729\"},{\"id\":842,\"pid\":820,\"shortname\":\"徐州\",\"name\":\"徐州市\",\"merger_name\":\"中国,江苏省,徐州市\",\"pinyin\":\"xuzhou\",\"code\":\"0516\",\"zip_code\":\"221003\",\"first\":\"X\",\"lng\":\"117.184811\",\"lat\":\"34.261792\"},{\"id\":853,\"pid\":820,\"shortname\":\"常州\",\"name\":\"常州市\",\"merger_name\":\"中国,江苏省,常州市\",\"pinyin\":\"changzhou\",\"code\":\"0519\",\"zip_code\":\"213000\",\"first\":\"C\",\"lng\":\"119.946973\",\"lat\":\"31.772752\"},{\"id\":861,\"pid\":820,\"shortname\":\"苏州\",\"name\":\"苏州市\",\"merger_name\":\"中国,江苏省,苏州市\",\"pinyin\":\"suzhou\",\"code\":\"0512\",\"zip_code\":\"215002\",\"first\":\"S\",\"lng\":\"120.619585\",\"lat\":\"31.299379\"},{\"id\":871,\"pid\":820,\"shortname\":\"南通\",\"name\":\"南通市\",\"merger_name\":\"中国,江苏省,南通市\",\"pinyin\":\"nantong\",\"code\":\"0513\",\"zip_code\":\"226001\",\"first\":\"N\",\"lng\":\"120.864608\",\"lat\":\"32.016212\"},{\"id\":880,\"pid\":820,\"shortname\":\"连云港\",\"name\":\"连云港市\",\"merger_name\":\"中国,江苏省,连云港市\",\"pinyin\":\"lianyungang\",\"code\":\"0518\",\"zip_code\":\"222002\",\"first\":\"L\",\"lng\":\"119.178821\",\"lat\":\"34.600018\"},{\"id\":887,\"pid\":820,\"shortname\":\"淮安\",\"name\":\"淮安市\",\"merger_name\":\"中国,江苏省,淮安市\",\"pinyin\":\"huai'an\",\"code\":\"0517\",\"zip_code\":\"223001\",\"first\":\"H\",\"lng\":\"119.021265\",\"lat\":\"33.597506\"},{\"id\":896,\"pid\":820,\"shortname\":\"盐城\",\"name\":\"盐城市\",\"merger_name\":\"中国,江苏省,盐城市\",\"pinyin\":\"yancheng\",\"code\":\"0515\",\"zip_code\":\"224005\",\"first\":\"Y\",\"lng\":\"120.139998\",\"lat\":\"33.377631\"},{\"id\":906,\"pid\":820,\"shortname\":\"扬州\",\"name\":\"扬州市\",\"merger_name\":\"中国,江苏省,扬州市\",\"pinyin\":\"yangzhou\",\"code\":\"0514\",\"zip_code\":\"225002\",\"first\":\"Y\",\"lng\":\"119.421003\",\"lat\":\"32.393159\"},{\"id\":913,\"pid\":820,\"shortname\":\"镇江\",\"name\":\"镇江市\",\"merger_name\":\"中国,江苏省,镇江市\",\"pinyin\":\"zhenjiang\",\"code\":\"0511\",\"zip_code\":\"212004\",\"first\":\"Z\",\"lng\":\"119.452753\",\"lat\":\"32.204402\"},{\"id\":920,\"pid\":820,\"shortname\":\"泰州\",\"name\":\"泰州市\",\"merger_name\":\"中国,江苏省,泰州市\",\"pinyin\":\"taizhou\",\"code\":\"0523\",\"zip_code\":\"225300\",\"first\":\"T\",\"lng\":\"119.915176\",\"lat\":\"32.484882\"},{\"id\":927,\"pid\":820,\"shortname\":\"宿迁\",\"name\":\"宿迁市\",\"merger_name\":\"中国,江苏省,宿迁市\",\"pinyin\":\"suqian\",\"code\":\"0527\",\"zip_code\":\"223800\",\"first\":\"S\",\"lng\":\"118.293328\",\"lat\":\"33.945154\"},{\"id\":934,\"pid\":933,\"shortname\":\"杭州\",\"name\":\"杭州市\",\"merger_name\":\"中国,浙江省,杭州市\",\"pinyin\":\"hangzhou\",\"code\":\"0571\",\"zip_code\":\"310026\",\"first\":\"H\",\"lng\":\"120.153576\",\"lat\":\"30.287459\"},{\"id\":948,\"pid\":933,\"shortname\":\"宁波\",\"name\":\"宁波市\",\"merger_name\":\"中国,浙江省,宁波市\",\"pinyin\":\"ningbo\",\"code\":\"0574\",\"zip_code\":\"315000\",\"first\":\"N\",\"lng\":\"121.549792\",\"lat\":\"29.868388\"},{\"id\":960,\"pid\":933,\"shortname\":\"温州\",\"name\":\"温州市\",\"merger_name\":\"中国,浙江省,温州市\",\"pinyin\":\"wenzhou\",\"code\":\"0577\",\"zip_code\":\"325000\",\"first\":\"W\",\"lng\":\"120.672111\",\"lat\":\"28.000575\"},{\"id\":972,\"pid\":933,\"shortname\":\"嘉兴\",\"name\":\"嘉兴市\",\"merger_name\":\"中国,浙江省,嘉兴市\",\"pinyin\":\"jiaxing\",\"code\":\"0573\",\"zip_code\":\"314000\",\"first\":\"J\",\"lng\":\"120.750865\",\"lat\":\"30.762653\"},{\"id\":980,\"pid\":933,\"shortname\":\"湖州\",\"name\":\"湖州市\",\"merger_name\":\"中国,浙江省,湖州市\",\"pinyin\":\"huzhou\",\"code\":\"0572\",\"zip_code\":\"313000\",\"first\":\"H\",\"lng\":\"120.102398\",\"lat\":\"30.867198\"},{\"id\":986,\"pid\":933,\"shortname\":\"绍兴\",\"name\":\"绍兴市\",\"merger_name\":\"中国,浙江省,绍兴市\",\"pinyin\":\"shaoxing\",\"code\":\"0575\",\"zip_code\":\"312000\",\"first\":\"S\",\"lng\":\"120.582112\",\"lat\":\"29.997117\"},{\"id\":993,\"pid\":933,\"shortname\":\"金华\",\"name\":\"金华市\",\"merger_name\":\"中国,浙江省,金华市\",\"pinyin\":\"jinhua\",\"code\":\"0579\",\"zip_code\":\"321000\",\"first\":\"J\",\"lng\":\"119.649506\",\"lat\":\"29.089524\"},{\"id\":1003,\"pid\":933,\"shortname\":\"衢州\",\"name\":\"衢州市\",\"merger_name\":\"中国,浙江省,衢州市\",\"pinyin\":\"quzhou\",\"code\":\"0570\",\"zip_code\":\"324002\",\"first\":\"\",\"lng\":\"118.87263\",\"lat\":\"28.941708\"},{\"id\":1010,\"pid\":933,\"shortname\":\"舟山\",\"name\":\"舟山市\",\"merger_name\":\"中国,浙江省,舟山市\",\"pinyin\":\"zhoushan\",\"code\":\"0580\",\"zip_code\":\"316000\",\"first\":\"Z\",\"lng\":\"122.106863\",\"lat\":\"30.016028\"},{\"id\":1015,\"pid\":933,\"shortname\":\"台州\",\"name\":\"台州市\",\"merger_name\":\"中国,浙江省,台州市\",\"pinyin\":\"taizhou\",\"code\":\"0576\",\"zip_code\":\"318000\",\"first\":\"T\",\"lng\":\"121.428599\",\"lat\":\"28.661378\"},{\"id\":1025,\"pid\":933,\"shortname\":\"丽水\",\"name\":\"丽水市\",\"merger_name\":\"中国,浙江省,丽水市\",\"pinyin\":\"lishui\",\"code\":\"0578\",\"zip_code\":\"323000\",\"first\":\"L\",\"lng\":\"119.921786\",\"lat\":\"28.451993\"},{\"id\":1035,\"pid\":933,\"shortname\":\"舟山新区\",\"name\":\"舟山群岛新区\",\"merger_name\":\"中国,浙江省,舟山群岛新区\",\"pinyin\":\"zhoushan\",\"code\":\"0580\",\"zip_code\":\"316000\",\"first\":\"Z\",\"lng\":\"122.317657\",\"lat\":\"29.813242\"},{\"id\":1047,\"pid\":1046,\"shortname\":\"合肥\",\"name\":\"合肥市\",\"merger_name\":\"中国,安徽省,合肥市\",\"pinyin\":\"hefei\",\"code\":\"0551\",\"zip_code\":\"230001\",\"first\":\"H\",\"lng\":\"117.283042\",\"lat\":\"31.86119\"},{\"id\":1057,\"pid\":1046,\"shortname\":\"芜湖\",\"name\":\"芜湖市\",\"merger_name\":\"中国,安徽省,芜湖市\",\"pinyin\":\"wuhu\",\"code\":\"0551\",\"zip_code\":\"241000\",\"first\":\"W\",\"lng\":\"118.376451\",\"lat\":\"31.326319\"},{\"id\":1066,\"pid\":1046,\"shortname\":\"蚌埠\",\"name\":\"蚌埠市\",\"merger_name\":\"中国,安徽省,蚌埠市\",\"pinyin\":\"bengbu\",\"code\":\"0552\",\"zip_code\":\"233000\",\"first\":\"B\",\"lng\":\"117.36237\",\"lat\":\"32.934037\"},{\"id\":1074,\"pid\":1046,\"shortname\":\"淮南\",\"name\":\"淮南市\",\"merger_name\":\"中国,安徽省,淮南市\",\"pinyin\":\"huainan\",\"code\":\"0554\",\"zip_code\":\"232001\",\"first\":\"H\",\"lng\":\"117.025449\",\"lat\":\"32.645947\"},{\"id\":1081,\"pid\":1046,\"shortname\":\"马鞍山\",\"name\":\"马鞍山市\",\"merger_name\":\"中国,安徽省,马鞍山市\",\"pinyin\":\"ma'anshan\",\"code\":\"0555\",\"zip_code\":\"243001\",\"first\":\"M\",\"lng\":\"118.507906\",\"lat\":\"31.689362\"},{\"id\":1088,\"pid\":1046,\"shortname\":\"淮北\",\"name\":\"淮北市\",\"merger_name\":\"中国,安徽省,淮北市\",\"pinyin\":\"huaibei\",\"code\":\"0561\",\"zip_code\":\"235000\",\"first\":\"H\",\"lng\":\"116.794664\",\"lat\":\"33.971707\"},{\"id\":1093,\"pid\":1046,\"shortname\":\"铜陵\",\"name\":\"铜陵市\",\"merger_name\":\"中国,安徽省,铜陵市\",\"pinyin\":\"tongling\",\"code\":\"0562\",\"zip_code\":\"244000\",\"first\":\"T\",\"lng\":\"117.816576\",\"lat\":\"30.929935\"},{\"id\":1098,\"pid\":1046,\"shortname\":\"安庆\",\"name\":\"安庆市\",\"merger_name\":\"中国,安徽省,安庆市\",\"pinyin\":\"anqing\",\"code\":\"0556\",\"zip_code\":\"246001\",\"first\":\"A\",\"lng\":\"117.053571\",\"lat\":\"30.524816\"},{\"id\":1110,\"pid\":1046,\"shortname\":\"黄山\",\"name\":\"黄山市\",\"merger_name\":\"中国,安徽省,黄山市\",\"pinyin\":\"huangshan\",\"code\":\"0559\",\"zip_code\":\"245000\",\"first\":\"H\",\"lng\":\"118.317325\",\"lat\":\"29.709239\"},{\"id\":1118,\"pid\":1046,\"shortname\":\"滁州\",\"name\":\"滁州市\",\"merger_name\":\"中国,安徽省,滁州市\",\"pinyin\":\"chuzhou\",\"code\":\"0550\",\"zip_code\":\"239000\",\"first\":\"C\",\"lng\":\"118.316264\",\"lat\":\"32.303627\"},{\"id\":1127,\"pid\":1046,\"shortname\":\"阜阳\",\"name\":\"阜阳市\",\"merger_name\":\"中国,安徽省,阜阳市\",\"pinyin\":\"fuyang\",\"code\":\"0558\",\"zip_code\":\"236033\",\"first\":\"F\",\"lng\":\"115.819729\",\"lat\":\"32.896969\"},{\"id\":1136,\"pid\":1046,\"shortname\":\"宿州\",\"name\":\"宿州市\",\"merger_name\":\"中国,安徽省,宿州市\",\"pinyin\":\"suzhou\",\"code\":\"0557\",\"zip_code\":\"234000\",\"first\":\"S\",\"lng\":\"116.984084\",\"lat\":\"33.633891\"},{\"id\":1142,\"pid\":1046,\"shortname\":\"六安\",\"name\":\"六安市\",\"merger_name\":\"中国,安徽省,六安市\",\"pinyin\":\"lu'an\",\"code\":\"0564\",\"zip_code\":\"237000\",\"first\":\"L\",\"lng\":\"116.507676\",\"lat\":\"31.752889\"},{\"id\":1150,\"pid\":1046,\"shortname\":\"亳州\",\"name\":\"亳州市\",\"merger_name\":\"中国,安徽省,亳州市\",\"pinyin\":\"bozhou\",\"code\":\"0558\",\"zip_code\":\"236802\",\"first\":\"\",\"lng\":\"115.782939\",\"lat\":\"33.869338\"},{\"id\":1155,\"pid\":1046,\"shortname\":\"池州\",\"name\":\"池州市\",\"merger_name\":\"中国,安徽省,池州市\",\"pinyin\":\"chizhou\",\"code\":\"0566\",\"zip_code\":\"247100\",\"first\":\"C\",\"lng\":\"117.489157\",\"lat\":\"30.656037\"},{\"id\":1160,\"pid\":1046,\"shortname\":\"宣城\",\"name\":\"宣城市\",\"merger_name\":\"中国,安徽省,宣城市\",\"pinyin\":\"xuancheng\",\"code\":\"0563\",\"zip_code\":\"242000\",\"first\":\"X\",\"lng\":\"118.757995\",\"lat\":\"30.945667\"},{\"id\":1169,\"pid\":1168,\"shortname\":\"福州\",\"name\":\"福州市\",\"merger_name\":\"中国,福建省,福州市\",\"pinyin\":\"fuzhou\",\"code\":\"0591\",\"zip_code\":\"350001\",\"first\":\"F\",\"lng\":\"119.306239\",\"lat\":\"26.075302\"},{\"id\":1183,\"pid\":1168,\"shortname\":\"厦门\",\"name\":\"厦门市\",\"merger_name\":\"中国,福建省,厦门市\",\"pinyin\":\"xiamen\",\"code\":\"0592\",\"zip_code\":\"361003\",\"first\":\"X\",\"lng\":\"118.11022\",\"lat\":\"24.490474\"},{\"id\":1190,\"pid\":1168,\"shortname\":\"莆田\",\"name\":\"莆田市\",\"merger_name\":\"中国,福建省,莆田市\",\"pinyin\":\"putian\",\"code\":\"0594\",\"zip_code\":\"351100\",\"first\":\"P\",\"lng\":\"119.007558\",\"lat\":\"25.431011\"},{\"id\":1196,\"pid\":1168,\"shortname\":\"三明\",\"name\":\"三明市\",\"merger_name\":\"中国,福建省,三明市\",\"pinyin\":\"sanming\",\"code\":\"0598\",\"zip_code\":\"365000\",\"first\":\"S\",\"lng\":\"117.635001\",\"lat\":\"26.265444\"},{\"id\":1209,\"pid\":1168,\"shortname\":\"泉州\",\"name\":\"泉州市\",\"merger_name\":\"中国,福建省,泉州市\",\"pinyin\":\"quanzhou\",\"code\":\"0595\",\"zip_code\":\"362000\",\"first\":\"Q\",\"lng\":\"118.589421\",\"lat\":\"24.908853\"},{\"id\":1222,\"pid\":1168,\"shortname\":\"漳州\",\"name\":\"漳州市\",\"merger_name\":\"中国,福建省,漳州市\",\"pinyin\":\"zhangzhou\",\"code\":\"0596\",\"zip_code\":\"363005\",\"first\":\"Z\",\"lng\":\"117.661801\",\"lat\":\"24.510897\"},{\"id\":1234,\"pid\":1168,\"shortname\":\"南平\",\"name\":\"南平市\",\"merger_name\":\"中国,福建省,南平市\",\"pinyin\":\"nanping\",\"code\":\"0599\",\"zip_code\":\"353000\",\"first\":\"N\",\"lng\":\"118.178459\",\"lat\":\"26.635627\"},{\"id\":1245,\"pid\":1168,\"shortname\":\"龙岩\",\"name\":\"龙岩市\",\"merger_name\":\"中国,福建省,龙岩市\",\"pinyin\":\"longyan\",\"code\":\"0597\",\"zip_code\":\"364000\",\"first\":\"L\",\"lng\":\"117.02978\",\"lat\":\"25.091603\"},{\"id\":1253,\"pid\":1168,\"shortname\":\"宁德\",\"name\":\"宁德市\",\"merger_name\":\"中国,福建省,宁德市\",\"pinyin\":\"ningde\",\"code\":\"0593\",\"zip_code\":\"352100\",\"first\":\"N\",\"lng\":\"119.527082\",\"lat\":\"26.65924\"},{\"id\":1264,\"pid\":1263,\"shortname\":\"南昌\",\"name\":\"南昌市\",\"merger_name\":\"中国,江西省,南昌市\",\"pinyin\":\"nanchang\",\"code\":\"0791\",\"zip_code\":\"330008\",\"first\":\"N\",\"lng\":\"115.892151\",\"lat\":\"28.676493\"},{\"id\":1274,\"pid\":1263,\"shortname\":\"景德镇\",\"name\":\"景德镇市\",\"merger_name\":\"中国,江西省,景德镇市\",\"pinyin\":\"jingdezhen\",\"code\":\"0798\",\"zip_code\":\"333000\",\"first\":\"J\",\"lng\":\"117.214664\",\"lat\":\"29.29256\"},{\"id\":1279,\"pid\":1263,\"shortname\":\"萍乡\",\"name\":\"萍乡市\",\"merger_name\":\"中国,江西省,萍乡市\",\"pinyin\":\"pingxiang\",\"code\":\"0799\",\"zip_code\":\"337000\",\"first\":\"P\",\"lng\":\"113.852186\",\"lat\":\"27.622946\"},{\"id\":1285,\"pid\":1263,\"shortname\":\"九江\",\"name\":\"九江市\",\"merger_name\":\"中国,江西省,九江市\",\"pinyin\":\"jiujiang\",\"code\":\"0792\",\"zip_code\":\"332000\",\"first\":\"J\",\"lng\":\"115.992811\",\"lat\":\"29.712034\"},{\"id\":1299,\"pid\":1263,\"shortname\":\"新余\",\"name\":\"新余市\",\"merger_name\":\"中国,江西省,新余市\",\"pinyin\":\"xinyu\",\"code\":\"0790\",\"zip_code\":\"338025\",\"first\":\"X\",\"lng\":\"114.930835\",\"lat\":\"27.810834\"},{\"id\":1302,\"pid\":1263,\"shortname\":\"鹰潭\",\"name\":\"鹰潭市\",\"merger_name\":\"中国,江西省,鹰潭市\",\"pinyin\":\"yingtan\",\"code\":\"0701\",\"zip_code\":\"335000\",\"first\":\"Y\",\"lng\":\"117.033838\",\"lat\":\"28.238638\"},{\"id\":1306,\"pid\":1263,\"shortname\":\"赣州\",\"name\":\"赣州市\",\"merger_name\":\"中国,江西省,赣州市\",\"pinyin\":\"ganzhou\",\"code\":\"0797\",\"zip_code\":\"341000\",\"first\":\"G\",\"lng\":\"114.940278\",\"lat\":\"25.85097\"},{\"id\":1325,\"pid\":1263,\"shortname\":\"吉安\",\"name\":\"吉安市\",\"merger_name\":\"中国,江西省,吉安市\",\"pinyin\":\"ji'an\",\"code\":\"0796\",\"zip_code\":\"343000\",\"first\":\"J\",\"lng\":\"114.986373\",\"lat\":\"27.111699\"},{\"id\":1339,\"pid\":1263,\"shortname\":\"宜春\",\"name\":\"宜春市\",\"merger_name\":\"中国,江西省,宜春市\",\"pinyin\":\"yichun\",\"code\":\"0795\",\"zip_code\":\"336000\",\"first\":\"Y\",\"lng\":\"114.391136\",\"lat\":\"27.8043\"},{\"id\":1350,\"pid\":1263,\"shortname\":\"抚州\",\"name\":\"抚州市\",\"merger_name\":\"中国,江西省,抚州市\",\"pinyin\":\"fuzhou\",\"code\":\"0794\",\"zip_code\":\"344000\",\"first\":\"F\",\"lng\":\"116.358351\",\"lat\":\"27.98385\"},{\"id\":1362,\"pid\":1263,\"shortname\":\"上饶\",\"name\":\"上饶市\",\"merger_name\":\"中国,江西省,上饶市\",\"pinyin\":\"shangrao\",\"code\":\"0793\",\"zip_code\":\"334000\",\"first\":\"S\",\"lng\":\"117.971185\",\"lat\":\"28.44442\"},{\"id\":1376,\"pid\":1375,\"shortname\":\"济南\",\"name\":\"济南市\",\"merger_name\":\"中国,山东省,济南市\",\"pinyin\":\"jinan\",\"code\":\"0531\",\"zip_code\":\"250001\",\"first\":\"J\",\"lng\":\"117.000923\",\"lat\":\"36.675807\"},{\"id\":1387,\"pid\":1375,\"shortname\":\"青岛\",\"name\":\"青岛市\",\"merger_name\":\"中国,山东省,青岛市\",\"pinyin\":\"qingdao\",\"code\":\"0532\",\"zip_code\":\"266001\",\"first\":\"Q\",\"lng\":\"120.369557\",\"lat\":\"36.094406\"},{\"id\":1399,\"pid\":1375,\"shortname\":\"淄博\",\"name\":\"淄博市\",\"merger_name\":\"中国,山东省,淄博市\",\"pinyin\":\"zibo\",\"code\":\"0533\",\"zip_code\":\"255039\",\"first\":\"Z\",\"lng\":\"118.047648\",\"lat\":\"36.814939\"},{\"id\":1408,\"pid\":1375,\"shortname\":\"枣庄\",\"name\":\"枣庄市\",\"merger_name\":\"中国,山东省,枣庄市\",\"pinyin\":\"zaozhuang\",\"code\":\"0632\",\"zip_code\":\"277101\",\"first\":\"Z\",\"lng\":\"117.557964\",\"lat\":\"34.856424\"},{\"id\":1415,\"pid\":1375,\"shortname\":\"东营\",\"name\":\"东营市\",\"merger_name\":\"中国,山东省,东营市\",\"pinyin\":\"dongying\",\"code\":\"0546\",\"zip_code\":\"257093\",\"first\":\"D\",\"lng\":\"118.4963\",\"lat\":\"37.461266\"},{\"id\":1421,\"pid\":1375,\"shortname\":\"烟台\",\"name\":\"烟台市\",\"merger_name\":\"中国,山东省,烟台市\",\"pinyin\":\"yantai\",\"code\":\"0635\",\"zip_code\":\"264010\",\"first\":\"Y\",\"lng\":\"121.391382\",\"lat\":\"37.539297\"},{\"id\":1434,\"pid\":1375,\"shortname\":\"潍坊\",\"name\":\"潍坊市\",\"merger_name\":\"中国,山东省,潍坊市\",\"pinyin\":\"weifang\",\"code\":\"0536\",\"zip_code\":\"261041\",\"first\":\"W\",\"lng\":\"119.107078\",\"lat\":\"36.70925\"},{\"id\":1447,\"pid\":1375,\"shortname\":\"济宁\",\"name\":\"济宁市\",\"merger_name\":\"中国,山东省,济宁市\",\"pinyin\":\"jining\",\"code\":\"0537\",\"zip_code\":\"272119\",\"first\":\"J\",\"lng\":\"116.587245\",\"lat\":\"35.415393\"},{\"id\":1459,\"pid\":1375,\"shortname\":\"泰安\",\"name\":\"泰安市\",\"merger_name\":\"中国,山东省,泰安市\",\"pinyin\":\"tai'an\",\"code\":\"0538\",\"zip_code\":\"271000\",\"first\":\"T\",\"lng\":\"117.129063\",\"lat\":\"36.194968\"},{\"id\":1466,\"pid\":1375,\"shortname\":\"威海\",\"name\":\"威海市\",\"merger_name\":\"中国,山东省,威海市\",\"pinyin\":\"weihai\",\"code\":\"0631\",\"zip_code\":\"264200\",\"first\":\"W\",\"lng\":\"122.116394\",\"lat\":\"37.509691\"},{\"id\":1471,\"pid\":1375,\"shortname\":\"日照\",\"name\":\"日照市\",\"merger_name\":\"中国,山东省,日照市\",\"pinyin\":\"rizhao\",\"code\":\"0633\",\"zip_code\":\"276800\",\"first\":\"R\",\"lng\":\"119.461208\",\"lat\":\"35.428588\"},{\"id\":1476,\"pid\":1375,\"shortname\":\"莱芜\",\"name\":\"莱芜市\",\"merger_name\":\"中国,山东省,莱芜市\",\"pinyin\":\"laiwu\",\"code\":\"0634\",\"zip_code\":\"271100\",\"first\":\"L\",\"lng\":\"117.677736\",\"lat\":\"36.214397\"},{\"id\":1479,\"pid\":1375,\"shortname\":\"临沂\",\"name\":\"临沂市\",\"merger_name\":\"中国,山东省,临沂市\",\"pinyin\":\"linyi\",\"code\":\"0539\",\"zip_code\":\"253000\",\"first\":\"L\",\"lng\":\"118.326443\",\"lat\":\"35.065282\"},{\"id\":1492,\"pid\":1375,\"shortname\":\"德州\",\"name\":\"德州市\",\"merger_name\":\"中国,山东省,德州市\",\"pinyin\":\"dezhou\",\"code\":\"0534\",\"zip_code\":\"253000\",\"first\":\"D\",\"lng\":\"116.307428\",\"lat\":\"37.453968\"},{\"id\":1504,\"pid\":1375,\"shortname\":\"聊城\",\"name\":\"聊城市\",\"merger_name\":\"中国,山东省,聊城市\",\"pinyin\":\"liaocheng\",\"code\":\"0635\",\"zip_code\":\"252052\",\"first\":\"L\",\"lng\":\"115.980367\",\"lat\":\"36.456013\"},{\"id\":1513,\"pid\":1375,\"shortname\":\"滨州\",\"name\":\"滨州市\",\"merger_name\":\"中国,山东省,滨州市\",\"pinyin\":\"binzhou\",\"code\":\"0543\",\"zip_code\":\"256619\",\"first\":\"B\",\"lng\":\"118.016974\",\"lat\":\"37.383542\"},{\"id\":1522,\"pid\":1375,\"shortname\":\"菏泽\",\"name\":\"菏泽市\",\"merger_name\":\"中国,山东省,菏泽市\",\"pinyin\":\"heze\",\"code\":\"0530\",\"zip_code\":\"274020\",\"first\":\"H\",\"lng\":\"115.469381\",\"lat\":\"35.246531\"},{\"id\":1533,\"pid\":1532,\"shortname\":\"郑州\",\"name\":\"郑州市\",\"merger_name\":\"中国,河南省,郑州市\",\"pinyin\":\"zhengzhou\",\"code\":\"0371\",\"zip_code\":\"450000\",\"first\":\"Z\",\"lng\":\"113.665412\",\"lat\":\"34.757975\"},{\"id\":1546,\"pid\":1532,\"shortname\":\"开封\",\"name\":\"开封市\",\"merger_name\":\"中国,河南省,开封市\",\"pinyin\":\"kaifeng\",\"code\":\"0378\",\"zip_code\":\"475001\",\"first\":\"K\",\"lng\":\"114.341447\",\"lat\":\"34.797049\"},{\"id\":1556,\"pid\":1532,\"shortname\":\"洛阳\",\"name\":\"洛阳市\",\"merger_name\":\"中国,河南省,洛阳市\",\"pinyin\":\"luoyang\",\"code\":\"0379\",\"zip_code\":\"471000\",\"first\":\"L\",\"lng\":\"112.434468\",\"lat\":\"34.663041\"},{\"id\":1572,\"pid\":1532,\"shortname\":\"平顶山\",\"name\":\"平顶山市\",\"merger_name\":\"中国,河南省,平顶山市\",\"pinyin\":\"pingdingshan\",\"code\":\"0375\",\"zip_code\":\"467000\",\"first\":\"P\",\"lng\":\"113.307718\",\"lat\":\"33.735241\"},{\"id\":1583,\"pid\":1532,\"shortname\":\"安阳\",\"name\":\"安阳市\",\"merger_name\":\"中国,河南省,安阳市\",\"pinyin\":\"anyang\",\"code\":\"0372\",\"zip_code\":\"455000\",\"first\":\"A\",\"lng\":\"114.352482\",\"lat\":\"36.103442\"},{\"id\":1593,\"pid\":1532,\"shortname\":\"鹤壁\",\"name\":\"鹤壁市\",\"merger_name\":\"中国,河南省,鹤壁市\",\"pinyin\":\"hebi\",\"code\":\"0392\",\"zip_code\":\"458030\",\"first\":\"H\",\"lng\":\"114.295444\",\"lat\":\"35.748236\"},{\"id\":1599,\"pid\":1532,\"shortname\":\"新乡\",\"name\":\"新乡市\",\"merger_name\":\"中国,河南省,新乡市\",\"pinyin\":\"xinxiang\",\"code\":\"0373\",\"zip_code\":\"453000\",\"first\":\"X\",\"lng\":\"113.883991\",\"lat\":\"35.302616\"},{\"id\":1612,\"pid\":1532,\"shortname\":\"焦作\",\"name\":\"焦作市\",\"merger_name\":\"中国,河南省,焦作市\",\"pinyin\":\"jiaozuo\",\"code\":\"0391\",\"zip_code\":\"454002\",\"first\":\"J\",\"lng\":\"113.238266\",\"lat\":\"35.23904\"},{\"id\":1623,\"pid\":1532,\"shortname\":\"濮阳\",\"name\":\"濮阳市\",\"merger_name\":\"中国,河南省,濮阳市\",\"pinyin\":\"puyang\",\"code\":\"0393\",\"zip_code\":\"457000\",\"first\":\"\",\"lng\":\"115.041299\",\"lat\":\"35.768234\"},{\"id\":1630,\"pid\":1532,\"shortname\":\"许昌\",\"name\":\"许昌市\",\"merger_name\":\"中国,河南省,许昌市\",\"pinyin\":\"xuchang\",\"code\":\"0374\",\"zip_code\":\"461000\",\"first\":\"X\",\"lng\":\"113.826063\",\"lat\":\"34.022956\"},{\"id\":1637,\"pid\":1532,\"shortname\":\"漯河\",\"name\":\"漯河市\",\"merger_name\":\"中国,河南省,漯河市\",\"pinyin\":\"luohe\",\"code\":\"0395\",\"zip_code\":\"462000\",\"first\":\"\",\"lng\":\"114.026405\",\"lat\":\"33.575855\"},{\"id\":1643,\"pid\":1532,\"shortname\":\"三门峡\",\"name\":\"三门峡市\",\"merger_name\":\"中国,河南省,三门峡市\",\"pinyin\":\"sanmenxia\",\"code\":\"0398\",\"zip_code\":\"472000\",\"first\":\"S\",\"lng\":\"111.194099\",\"lat\":\"34.777338\"},{\"id\":1650,\"pid\":1532,\"shortname\":\"南阳\",\"name\":\"南阳市\",\"merger_name\":\"中国,河南省,南阳市\",\"pinyin\":\"nanyang\",\"code\":\"0377\",\"zip_code\":\"473002\",\"first\":\"N\",\"lng\":\"112.540918\",\"lat\":\"32.999082\"},{\"id\":1664,\"pid\":1532,\"shortname\":\"商丘\",\"name\":\"商丘市\",\"merger_name\":\"中国,河南省,商丘市\",\"pinyin\":\"shangqiu\",\"code\":\"0370\",\"zip_code\":\"476000\",\"first\":\"S\",\"lng\":\"115.650497\",\"lat\":\"34.437054\"},{\"id\":1674,\"pid\":1532,\"shortname\":\"信阳\",\"name\":\"信阳市\",\"merger_name\":\"中国,河南省,信阳市\",\"pinyin\":\"xinyang\",\"code\":\"0376\",\"zip_code\":\"464000\",\"first\":\"X\",\"lng\":\"114.075031\",\"lat\":\"32.123274\"},{\"id\":1685,\"pid\":1532,\"shortname\":\"周口\",\"name\":\"周口市\",\"merger_name\":\"中国,河南省,周口市\",\"pinyin\":\"zhoukou\",\"code\":\"0394\",\"zip_code\":\"466000\",\"first\":\"Z\",\"lng\":\"114.649653\",\"lat\":\"33.620357\"},{\"id\":1696,\"pid\":1532,\"shortname\":\"驻马店\",\"name\":\"驻马店市\",\"merger_name\":\"中国,河南省,驻马店市\",\"pinyin\":\"zhumadian\",\"code\":\"0396\",\"zip_code\":\"463000\",\"first\":\"Z\",\"lng\":\"114.024736\",\"lat\":\"32.980169\"},{\"id\":1707,\"pid\":1532,\"shortname\":\" \",\"name\":\"直辖县级\",\"merger_name\":\"中国,河南省,直辖县级\",\"pinyin\":\"\",\"code\":\"\",\"zip_code\":\"\",\"first\":\"Z\",\"lng\":\"113.665412\",\"lat\":\"34.757975\"},{\"id\":1710,\"pid\":1709,\"shortname\":\"武汉\",\"name\":\"武汉市\",\"merger_name\":\"中国,湖北省,武汉市\",\"pinyin\":\"wuhan\",\"code\":\"\",\"zip_code\":\"430014\",\"first\":\"W\",\"lng\":\"114.298572\",\"lat\":\"30.584355\"},{\"id\":1724,\"pid\":1709,\"shortname\":\"黄石\",\"name\":\"黄石市\",\"merger_name\":\"中国,湖北省,黄石市\",\"pinyin\":\"huangshi\",\"code\":\"0714\",\"zip_code\":\"435003\",\"first\":\"H\",\"lng\":\"115.077048\",\"lat\":\"30.220074\"},{\"id\":1731,\"pid\":1709,\"shortname\":\"十堰\",\"name\":\"十堰市\",\"merger_name\":\"中国,湖北省,十堰市\",\"pinyin\":\"shiyan\",\"code\":\"0719\",\"zip_code\":\"442000\",\"first\":\"S\",\"lng\":\"110.785239\",\"lat\":\"32.647017\"},{\"id\":1740,\"pid\":1709,\"shortname\":\"宜昌\",\"name\":\"宜昌市\",\"merger_name\":\"中国,湖北省,宜昌市\",\"pinyin\":\"yichang\",\"code\":\"0717\",\"zip_code\":\"443000\",\"first\":\"Y\",\"lng\":\"111.290843\",\"lat\":\"30.702636\"},{\"id\":1754,\"pid\":1709,\"shortname\":\"襄阳\",\"name\":\"襄阳市\",\"merger_name\":\"中国,湖北省,襄阳市\",\"pinyin\":\"xiangyang\",\"code\":\"0710\",\"zip_code\":\"441021\",\"first\":\"X\",\"lng\":\"112.144146\",\"lat\":\"32.042426\"},{\"id\":1764,\"pid\":1709,\"shortname\":\"鄂州\",\"name\":\"鄂州市\",\"merger_name\":\"中国,湖北省,鄂州市\",\"pinyin\":\"ezhou\",\"code\":\"0711\",\"zip_code\":\"436000\",\"first\":\"E\",\"lng\":\"114.890593\",\"lat\":\"30.396536\"},{\"id\":1768,\"pid\":1709,\"shortname\":\"荆门\",\"name\":\"荆门市\",\"merger_name\":\"中国,湖北省,荆门市\",\"pinyin\":\"jingmen\",\"code\":\"0724\",\"zip_code\":\"448000\",\"first\":\"J\",\"lng\":\"112.204251\",\"lat\":\"31.03542\"},{\"id\":1774,\"pid\":1709,\"shortname\":\"孝感\",\"name\":\"孝感市\",\"merger_name\":\"中国,湖北省,孝感市\",\"pinyin\":\"xiaogan\",\"code\":\"0712\",\"zip_code\":\"432100\",\"first\":\"X\",\"lng\":\"113.926655\",\"lat\":\"30.926423\"},{\"id\":1782,\"pid\":1709,\"shortname\":\"荆州\",\"name\":\"荆州市\",\"merger_name\":\"中国,湖北省,荆州市\",\"pinyin\":\"jingzhou\",\"code\":\"0716\",\"zip_code\":\"434000\",\"first\":\"J\",\"lng\":\"112.23813\",\"lat\":\"30.326857\"},{\"id\":1791,\"pid\":1709,\"shortname\":\"黄冈\",\"name\":\"黄冈市\",\"merger_name\":\"中国,湖北省,黄冈市\",\"pinyin\":\"huanggang\",\"code\":\"0713\",\"zip_code\":\"438000\",\"first\":\"H\",\"lng\":\"114.879365\",\"lat\":\"30.447711\"},{\"id\":1802,\"pid\":1709,\"shortname\":\"咸宁\",\"name\":\"咸宁市\",\"merger_name\":\"中国,湖北省,咸宁市\",\"pinyin\":\"xianning\",\"code\":\"0715\",\"zip_code\":\"437000\",\"first\":\"X\",\"lng\":\"114.328963\",\"lat\":\"29.832798\"},{\"id\":1809,\"pid\":1709,\"shortname\":\"随州\",\"name\":\"随州市\",\"merger_name\":\"中国,湖北省,随州市\",\"pinyin\":\"suizhou\",\"code\":\"0722\",\"zip_code\":\"441300\",\"first\":\"S\",\"lng\":\"113.37377\",\"lat\":\"31.717497\"},{\"id\":1813,\"pid\":1709,\"shortname\":\"恩施\",\"name\":\"恩施土家族苗族自治州\",\"merger_name\":\"中国,湖北省,恩施土家族苗族自治州\",\"pinyin\":\"enshi\",\"code\":\"0718\",\"zip_code\":\"445000\",\"first\":\"E\",\"lng\":\"109.48699\",\"lat\":\"30.283114\"},{\"id\":1822,\"pid\":1709,\"shortname\":\" \",\"name\":\"直辖县级\",\"merger_name\":\"中国,湖北省,直辖县级\",\"pinyin\":\"\",\"code\":\"\",\"zip_code\":\"\",\"first\":\"Z\",\"lng\":\"114.298572\",\"lat\":\"30.584355\"},{\"id\":1828,\"pid\":1827,\"shortname\":\"长沙\",\"name\":\"长沙市\",\"merger_name\":\"中国,湖南省,长沙市\",\"pinyin\":\"changsha\",\"code\":\"0731\",\"zip_code\":\"410005\",\"first\":\"C\",\"lng\":\"112.982279\",\"lat\":\"28.19409\"},{\"id\":1838,\"pid\":1827,\"shortname\":\"株洲\",\"name\":\"株洲市\",\"merger_name\":\"中国,湖南省,株洲市\",\"pinyin\":\"zhuzhou\",\"code\":\"0731\",\"zip_code\":\"412000\",\"first\":\"Z\",\"lng\":\"113.151737\",\"lat\":\"27.835806\"},{\"id\":1848,\"pid\":1827,\"shortname\":\"湘潭\",\"name\":\"湘潭市\",\"merger_name\":\"中国,湖南省,湘潭市\",\"pinyin\":\"xiangtan\",\"code\":\"0731\",\"zip_code\":\"411100\",\"first\":\"X\",\"lng\":\"112.925083\",\"lat\":\"27.846725\"},{\"id\":1854,\"pid\":1827,\"shortname\":\"衡阳\",\"name\":\"衡阳市\",\"merger_name\":\"中国,湖南省,衡阳市\",\"pinyin\":\"hengyang\",\"code\":\"0734\",\"zip_code\":\"421001\",\"first\":\"H\",\"lng\":\"112.607693\",\"lat\":\"26.900358\"},{\"id\":1867,\"pid\":1827,\"shortname\":\"邵阳\",\"name\":\"邵阳市\",\"merger_name\":\"中国,湖南省,邵阳市\",\"pinyin\":\"shaoyang\",\"code\":\"0739\",\"zip_code\":\"422000\",\"first\":\"S\",\"lng\":\"111.46923\",\"lat\":\"27.237842\"},{\"id\":1880,\"pid\":1827,\"shortname\":\"岳阳\",\"name\":\"岳阳市\",\"merger_name\":\"中国,湖南省,岳阳市\",\"pinyin\":\"yueyang\",\"code\":\"0730\",\"zip_code\":\"414000\",\"first\":\"Y\",\"lng\":\"113.132855\",\"lat\":\"29.37029\"},{\"id\":1890,\"pid\":1827,\"shortname\":\"常德\",\"name\":\"常德市\",\"merger_name\":\"中国,湖南省,常德市\",\"pinyin\":\"changde\",\"code\":\"0736\",\"zip_code\":\"415000\",\"first\":\"C\",\"lng\":\"111.691347\",\"lat\":\"29.040225\"},{\"id\":1900,\"pid\":1827,\"shortname\":\"张家界\",\"name\":\"张家界市\",\"merger_name\":\"中国,湖南省,张家界市\",\"pinyin\":\"zhangjiajie\",\"code\":\"0744\",\"zip_code\":\"427000\",\"first\":\"Z\",\"lng\":\"110.479921\",\"lat\":\"29.127401\"},{\"id\":1905,\"pid\":1827,\"shortname\":\"益阳\",\"name\":\"益阳市\",\"merger_name\":\"中国,湖南省,益阳市\",\"pinyin\":\"yiyang\",\"code\":\"0737\",\"zip_code\":\"413000\",\"first\":\"Y\",\"lng\":\"112.355042\",\"lat\":\"28.570066\"},{\"id\":1912,\"pid\":1827,\"shortname\":\"郴州\",\"name\":\"郴州市\",\"merger_name\":\"中国,湖南省,郴州市\",\"pinyin\":\"chenzhou\",\"code\":\"0735\",\"zip_code\":\"423000\",\"first\":\"C\",\"lng\":\"113.032067\",\"lat\":\"25.793589\"},{\"id\":1924,\"pid\":1827,\"shortname\":\"永州\",\"name\":\"永州市\",\"merger_name\":\"中国,湖南省,永州市\",\"pinyin\":\"yongzhou\",\"code\":\"0746\",\"zip_code\":\"425000\",\"first\":\"Y\",\"lng\":\"111.608019\",\"lat\":\"26.434516\"},{\"id\":1936,\"pid\":1827,\"shortname\":\"怀化\",\"name\":\"怀化市\",\"merger_name\":\"中国,湖南省,怀化市\",\"pinyin\":\"huaihua\",\"code\":\"0745\",\"zip_code\":\"418000\",\"first\":\"H\",\"lng\":\"109.97824\",\"lat\":\"27.550082\"},{\"id\":1949,\"pid\":1827,\"shortname\":\"娄底\",\"name\":\"娄底市\",\"merger_name\":\"中国,湖南省,娄底市\",\"pinyin\":\"loudi\",\"code\":\"0738\",\"zip_code\":\"417000\",\"first\":\"L\",\"lng\":\"112.008497\",\"lat\":\"27.728136\"},{\"id\":1955,\"pid\":1827,\"shortname\":\"湘西\",\"name\":\"湘西土家族苗族自治州\",\"merger_name\":\"中国,湖南省,湘西土家族苗族自治州\",\"pinyin\":\"xiangxi\",\"code\":\"0743\",\"zip_code\":\"416000\",\"first\":\"X\",\"lng\":\"109.739735\",\"lat\":\"28.314296\"},{\"id\":1965,\"pid\":1964,\"shortname\":\"广州\",\"name\":\"广州市\",\"merger_name\":\"中国,广东省,广州市\",\"pinyin\":\"guangzhou\",\"code\":\"020\",\"zip_code\":\"510032\",\"first\":\"G\",\"lng\":\"113.280637\",\"lat\":\"23.125178\"},{\"id\":1977,\"pid\":1964,\"shortname\":\"韶关\",\"name\":\"韶关市\",\"merger_name\":\"中国,广东省,韶关市\",\"pinyin\":\"shaoguan\",\"code\":\"0751\",\"zip_code\":\"512002\",\"first\":\"S\",\"lng\":\"113.591544\",\"lat\":\"24.801322\"},{\"id\":1988,\"pid\":1964,\"shortname\":\"深圳\",\"name\":\"深圳市\",\"merger_name\":\"中国,广东省,深圳市\",\"pinyin\":\"shenzhen\",\"code\":\"0755\",\"zip_code\":\"518035\",\"first\":\"S\",\"lng\":\"114.085947\",\"lat\":\"22.547\"},{\"id\":1999,\"pid\":1964,\"shortname\":\"珠海\",\"name\":\"珠海市\",\"merger_name\":\"中国,广东省,珠海市\",\"pinyin\":\"zhuhai\",\"code\":\"0756\",\"zip_code\":\"519000\",\"first\":\"Z\",\"lng\":\"113.552724\",\"lat\":\"22.255899\"},{\"id\":2003,\"pid\":1964,\"shortname\":\"汕头\",\"name\":\"汕头市\",\"merger_name\":\"中国,广东省,汕头市\",\"pinyin\":\"shantou\",\"code\":\"0754\",\"zip_code\":\"515041\",\"first\":\"S\",\"lng\":\"116.708463\",\"lat\":\"23.37102\"},{\"id\":2011,\"pid\":1964,\"shortname\":\"佛山\",\"name\":\"佛山市\",\"merger_name\":\"中国,广东省,佛山市\",\"pinyin\":\"foshan\",\"code\":\"0757\",\"zip_code\":\"528000\",\"first\":\"F\",\"lng\":\"113.122717\",\"lat\":\"23.028762\"},{\"id\":2017,\"pid\":1964,\"shortname\":\"江门\",\"name\":\"江门市\",\"merger_name\":\"中国,广东省,江门市\",\"pinyin\":\"jiangmen\",\"code\":\"0750\",\"zip_code\":\"529000\",\"first\":\"J\",\"lng\":\"113.094942\",\"lat\":\"22.590431\"},{\"id\":2025,\"pid\":1964,\"shortname\":\"湛江\",\"name\":\"湛江市\",\"merger_name\":\"中国,广东省,湛江市\",\"pinyin\":\"zhanjiang\",\"code\":\"0759\",\"zip_code\":\"524047\",\"first\":\"Z\",\"lng\":\"110.405529\",\"lat\":\"21.195338\"},{\"id\":2035,\"pid\":1964,\"shortname\":\"茂名\",\"name\":\"茂名市\",\"merger_name\":\"中国,广东省,茂名市\",\"pinyin\":\"maoming\",\"code\":\"0668\",\"zip_code\":\"525000\",\"first\":\"M\",\"lng\":\"110.919229\",\"lat\":\"21.659751\"},{\"id\":2041,\"pid\":1964,\"shortname\":\"肇庆\",\"name\":\"肇庆市\",\"merger_name\":\"中国,广东省,肇庆市\",\"pinyin\":\"zhaoqing\",\"code\":\"0758\",\"zip_code\":\"526040\",\"first\":\"Z\",\"lng\":\"112.472529\",\"lat\":\"23.051546\"},{\"id\":2050,\"pid\":1964,\"shortname\":\"惠州\",\"name\":\"惠州市\",\"merger_name\":\"中国,广东省,惠州市\",\"pinyin\":\"huizhou\",\"code\":\"0752\",\"zip_code\":\"516000\",\"first\":\"H\",\"lng\":\"114.412599\",\"lat\":\"23.079404\"},{\"id\":2056,\"pid\":1964,\"shortname\":\"梅州\",\"name\":\"梅州市\",\"merger_name\":\"中国,广东省,梅州市\",\"pinyin\":\"meizhou\",\"code\":\"0753\",\"zip_code\":\"514021\",\"first\":\"M\",\"lng\":\"116.117582\",\"lat\":\"24.299112\"},{\"id\":2065,\"pid\":1964,\"shortname\":\"汕尾\",\"name\":\"汕尾市\",\"merger_name\":\"中国,广东省,汕尾市\",\"pinyin\":\"shanwei\",\"code\":\"0660\",\"zip_code\":\"516600\",\"first\":\"S\",\"lng\":\"115.364238\",\"lat\":\"22.774485\"},{\"id\":2070,\"pid\":1964,\"shortname\":\"河源\",\"name\":\"河源市\",\"merger_name\":\"中国,广东省,河源市\",\"pinyin\":\"heyuan\",\"code\":\"0762\",\"zip_code\":\"517000\",\"first\":\"H\",\"lng\":\"114.697802\",\"lat\":\"23.746266\"},{\"id\":2077,\"pid\":1964,\"shortname\":\"阳江\",\"name\":\"阳江市\",\"merger_name\":\"中国,广东省,阳江市\",\"pinyin\":\"yangjiang\",\"code\":\"0662\",\"zip_code\":\"529500\",\"first\":\"Y\",\"lng\":\"111.975107\",\"lat\":\"21.859222\"},{\"id\":2082,\"pid\":1964,\"shortname\":\"清远\",\"name\":\"清远市\",\"merger_name\":\"中国,广东省,清远市\",\"pinyin\":\"qingyuan\",\"code\":\"0763\",\"zip_code\":\"511500\",\"first\":\"Q\",\"lng\":\"113.036779\",\"lat\":\"23.704188\"},{\"id\":2091,\"pid\":1964,\"shortname\":\"东莞\",\"name\":\"东莞市\",\"merger_name\":\"中国,广东省,东莞市\",\"pinyin\":\"dongguan\",\"code\":\"0769\",\"zip_code\":\"523888\",\"first\":\"D\",\"lng\":\"113.760234\",\"lat\":\"23.048884\"},{\"id\":2123,\"pid\":1964,\"shortname\":\"中山\",\"name\":\"中山市\",\"merger_name\":\"中国,广东省,中山市\",\"pinyin\":\"zhongshan\",\"code\":\"0760\",\"zip_code\":\"528403\",\"first\":\"Z\",\"lng\":\"113.382391\",\"lat\":\"22.521113\"},{\"id\":2146,\"pid\":1964,\"shortname\":\"潮州\",\"name\":\"潮州市\",\"merger_name\":\"中国,广东省,潮州市\",\"pinyin\":\"chaozhou\",\"code\":\"0768\",\"zip_code\":\"521000\",\"first\":\"C\",\"lng\":\"116.632301\",\"lat\":\"23.661701\"},{\"id\":2150,\"pid\":1964,\"shortname\":\"揭阳\",\"name\":\"揭阳市\",\"merger_name\":\"中国,广东省,揭阳市\",\"pinyin\":\"jieyang\",\"code\":\"0633\",\"zip_code\":\"522000\",\"first\":\"J\",\"lng\":\"116.355733\",\"lat\":\"23.543778\"},{\"id\":2156,\"pid\":1964,\"shortname\":\"云浮\",\"name\":\"云浮市\",\"merger_name\":\"中国,广东省,云浮市\",\"pinyin\":\"yunfu\",\"code\":\"0766\",\"zip_code\":\"527300\",\"first\":\"Y\",\"lng\":\"112.044439\",\"lat\":\"22.929801\"},{\"id\":2163,\"pid\":2162,\"shortname\":\"南宁\",\"name\":\"南宁市\",\"merger_name\":\"中国,广西壮族自治区,南宁市\",\"pinyin\":\"nanning\",\"code\":\"0771\",\"zip_code\":\"530028\",\"first\":\"N\",\"lng\":\"108.320004\",\"lat\":\"22.82402\"},{\"id\":2177,\"pid\":2162,\"shortname\":\"柳州\",\"name\":\"柳州市\",\"merger_name\":\"中国,广西壮族自治区,柳州市\",\"pinyin\":\"liuzhou\",\"code\":\"0772\",\"zip_code\":\"545001\",\"first\":\"L\",\"lng\":\"109.411703\",\"lat\":\"24.314617\"},{\"id\":2189,\"pid\":2162,\"shortname\":\"桂林\",\"name\":\"桂林市\",\"merger_name\":\"中国,广西壮族自治区,桂林市\",\"pinyin\":\"guilin\",\"code\":\"0773\",\"zip_code\":\"541100\",\"first\":\"G\",\"lng\":\"110.299121\",\"lat\":\"25.274215\"},{\"id\":2207,\"pid\":2162,\"shortname\":\"梧州\",\"name\":\"梧州市\",\"merger_name\":\"中国,广西壮族自治区,梧州市\",\"pinyin\":\"wuzhou\",\"code\":\"0774\",\"zip_code\":\"543002\",\"first\":\"W\",\"lng\":\"111.316229\",\"lat\":\"23.472309\"},{\"id\":2215,\"pid\":2162,\"shortname\":\"北海\",\"name\":\"北海市\",\"merger_name\":\"中国,广西壮族自治区,北海市\",\"pinyin\":\"beihai\",\"code\":\"0779\",\"zip_code\":\"536000\",\"first\":\"B\",\"lng\":\"109.119254\",\"lat\":\"21.473343\"},{\"id\":2220,\"pid\":2162,\"shortname\":\"防城港\",\"name\":\"防城港市\",\"merger_name\":\"中国,广西壮族自治区,防城港市\",\"pinyin\":\"fangchenggang\",\"code\":\"0770\",\"zip_code\":\"538001\",\"first\":\"F\",\"lng\":\"108.345478\",\"lat\":\"21.614631\"},{\"id\":2225,\"pid\":2162,\"shortname\":\"钦州\",\"name\":\"钦州市\",\"merger_name\":\"中国,广西壮族自治区,钦州市\",\"pinyin\":\"qinzhou\",\"code\":\"0777\",\"zip_code\":\"535099\",\"first\":\"Q\",\"lng\":\"108.624175\",\"lat\":\"21.967127\"},{\"id\":2230,\"pid\":2162,\"shortname\":\"贵港\",\"name\":\"贵港市\",\"merger_name\":\"中国,广西壮族自治区,贵港市\",\"pinyin\":\"guigang\",\"code\":\"0775\",\"zip_code\":\"537100\",\"first\":\"G\",\"lng\":\"109.602146\",\"lat\":\"23.0936\"},{\"id\":2236,\"pid\":2162,\"shortname\":\"玉林\",\"name\":\"玉林市\",\"merger_name\":\"中国,广西壮族自治区,玉林市\",\"pinyin\":\"yulin\",\"code\":\"0775\",\"zip_code\":\"537000\",\"first\":\"Y\",\"lng\":\"110.154393\",\"lat\":\"22.63136\"},{\"id\":2245,\"pid\":2162,\"shortname\":\"百色\",\"name\":\"百色市\",\"merger_name\":\"中国,广西壮族自治区,百色市\",\"pinyin\":\"baise\",\"code\":\"0776\",\"zip_code\":\"533000\",\"first\":\"B\",\"lng\":\"106.616285\",\"lat\":\"23.897742\"},{\"id\":2258,\"pid\":2162,\"shortname\":\"贺州\",\"name\":\"贺州市\",\"merger_name\":\"中国,广西壮族自治区,贺州市\",\"pinyin\":\"hezhou\",\"code\":\"0774\",\"zip_code\":\"542800\",\"first\":\"H\",\"lng\":\"111.552056\",\"lat\":\"24.414141\"},{\"id\":2264,\"pid\":2162,\"shortname\":\"河池\",\"name\":\"河池市\",\"merger_name\":\"中国,广西壮族自治区,河池市\",\"pinyin\":\"hechi\",\"code\":\"0778\",\"zip_code\":\"547000\",\"first\":\"H\",\"lng\":\"108.062105\",\"lat\":\"24.695899\"},{\"id\":2276,\"pid\":2162,\"shortname\":\"来宾\",\"name\":\"来宾市\",\"merger_name\":\"中国,广西壮族自治区,来宾市\",\"pinyin\":\"laibin\",\"code\":\"0772\",\"zip_code\":\"546100\",\"first\":\"L\",\"lng\":\"109.229772\",\"lat\":\"23.733766\"},{\"id\":2283,\"pid\":2162,\"shortname\":\"崇左\",\"name\":\"崇左市\",\"merger_name\":\"中国,广西壮族自治区,崇左市\",\"pinyin\":\"chongzuo\",\"code\":\"0771\",\"zip_code\":\"532299\",\"first\":\"C\",\"lng\":\"107.353926\",\"lat\":\"22.404108\"},{\"id\":2292,\"pid\":2291,\"shortname\":\"海口\",\"name\":\"海口市\",\"merger_name\":\"中国,海南省,海口市\",\"pinyin\":\"haikou\",\"code\":\"0898\",\"zip_code\":\"570000\",\"first\":\"H\",\"lng\":\"110.33119\",\"lat\":\"20.031971\"},{\"id\":2297,\"pid\":2291,\"shortname\":\"三亚\",\"name\":\"三亚市\",\"merger_name\":\"中国,海南省,三亚市\",\"pinyin\":\"sanya\",\"code\":\"0898\",\"zip_code\":\"572000\",\"first\":\"S\",\"lng\":\"109.508268\",\"lat\":\"18.247872\"},{\"id\":2302,\"pid\":2291,\"shortname\":\"三沙\",\"name\":\"三沙市\",\"merger_name\":\"中国,海南省,三沙市\",\"pinyin\":\"sansha\",\"code\":\"0898\",\"zip_code\":\"573199\",\"first\":\"S\",\"lng\":\"112.34882\",\"lat\":\"16.831039\"},{\"id\":2306,\"pid\":2291,\"shortname\":\" \",\"name\":\"直辖县级\",\"merger_name\":\"中国,海南省,直辖县级\",\"pinyin\":\"\",\"code\":\"\",\"zip_code\":\"\",\"first\":\"Z\",\"lng\":\"109.503479\",\"lat\":\"18.739906\"},{\"id\":2324,\"pid\":2323,\"shortname\":\"重庆\",\"name\":\"重庆市\",\"merger_name\":\"中国,重庆,重庆市\",\"pinyin\":\"chongqing\",\"code\":\"023\",\"zip_code\":\"400000\",\"first\":\"C\",\"lng\":\"106.504962\",\"lat\":\"29.533155\"},{\"id\":2363,\"pid\":2323,\"shortname\":\"两江新区\",\"name\":\"两江新区\",\"merger_name\":\"中国,重庆,两江新区\",\"pinyin\":\"liangjiangxinqu\",\"code\":\"023\",\"zip_code\":\"400000\",\"first\":\"L\",\"lng\":\"106.463344\",\"lat\":\"29.729153\"},{\"id\":2368,\"pid\":2367,\"shortname\":\"成都\",\"name\":\"成都市\",\"merger_name\":\"中国,四川省,成都市\",\"pinyin\":\"chengdu\",\"code\":\"028\",\"zip_code\":\"610015\",\"first\":\"C\",\"lng\":\"104.065735\",\"lat\":\"30.659462\"},{\"id\":2388,\"pid\":2367,\"shortname\":\"自贡\",\"name\":\"自贡市\",\"merger_name\":\"中国,四川省,自贡市\",\"pinyin\":\"zigong\",\"code\":\"0813\",\"zip_code\":\"643000\",\"first\":\"Z\",\"lng\":\"104.773447\",\"lat\":\"29.352765\"},{\"id\":2395,\"pid\":2367,\"shortname\":\"攀枝花\",\"name\":\"攀枝花市\",\"merger_name\":\"中国,四川省,攀枝花市\",\"pinyin\":\"panzhihua\",\"code\":\"0812\",\"zip_code\":\"617000\",\"first\":\"P\",\"lng\":\"101.716007\",\"lat\":\"26.580446\"},{\"id\":2401,\"pid\":2367,\"shortname\":\"泸州\",\"name\":\"泸州市\",\"merger_name\":\"中国,四川省,泸州市\",\"pinyin\":\"luzhou\",\"code\":\"0830\",\"zip_code\":\"646000\",\"first\":\"\",\"lng\":\"105.443348\",\"lat\":\"28.889138\"},{\"id\":2409,\"pid\":2367,\"shortname\":\"德阳\",\"name\":\"德阳市\",\"merger_name\":\"中国,四川省,德阳市\",\"pinyin\":\"deyang\",\"code\":\"0838\",\"zip_code\":\"618000\",\"first\":\"D\",\"lng\":\"104.398651\",\"lat\":\"31.127991\"},{\"id\":2416,\"pid\":2367,\"shortname\":\"绵阳\",\"name\":\"绵阳市\",\"merger_name\":\"中国,四川省,绵阳市\",\"pinyin\":\"mianyang\",\"code\":\"0816\",\"zip_code\":\"621000\",\"first\":\"M\",\"lng\":\"104.741722\",\"lat\":\"31.46402\"},{\"id\":2426,\"pid\":2367,\"shortname\":\"广元\",\"name\":\"广元市\",\"merger_name\":\"中国,四川省,广元市\",\"pinyin\":\"guangyuan\",\"code\":\"0839\",\"zip_code\":\"628000\",\"first\":\"G\",\"lng\":\"105.829757\",\"lat\":\"32.433668\"},{\"id\":2434,\"pid\":2367,\"shortname\":\"遂宁\",\"name\":\"遂宁市\",\"merger_name\":\"中国,四川省,遂宁市\",\"pinyin\":\"suining\",\"code\":\"0825\",\"zip_code\":\"629000\",\"first\":\"S\",\"lng\":\"105.571331\",\"lat\":\"30.513311\"},{\"id\":2440,\"pid\":2367,\"shortname\":\"内江\",\"name\":\"内江市\",\"merger_name\":\"中国,四川省,内江市\",\"pinyin\":\"neijiang\",\"code\":\"0832\",\"zip_code\":\"641000\",\"first\":\"N\",\"lng\":\"105.066138\",\"lat\":\"29.58708\"},{\"id\":2446,\"pid\":2367,\"shortname\":\"乐山\",\"name\":\"乐山市\",\"merger_name\":\"中国,四川省,乐山市\",\"pinyin\":\"leshan\",\"code\":\"0833\",\"zip_code\":\"614000\",\"first\":\"L\",\"lng\":\"103.761263\",\"lat\":\"29.582024\"},{\"id\":2458,\"pid\":2367,\"shortname\":\"南充\",\"name\":\"南充市\",\"merger_name\":\"中国,四川省,南充市\",\"pinyin\":\"nanchong\",\"code\":\"0817\",\"zip_code\":\"637000\",\"first\":\"N\",\"lng\":\"106.082974\",\"lat\":\"30.795281\"},{\"id\":2468,\"pid\":2367,\"shortname\":\"眉山\",\"name\":\"眉山市\",\"merger_name\":\"中国,四川省,眉山市\",\"pinyin\":\"meishan\",\"code\":\"028\",\"zip_code\":\"620020\",\"first\":\"M\",\"lng\":\"103.831788\",\"lat\":\"30.048318\"},{\"id\":2475,\"pid\":2367,\"shortname\":\"宜宾\",\"name\":\"宜宾市\",\"merger_name\":\"中国,四川省,宜宾市\",\"pinyin\":\"yibin\",\"code\":\"0831\",\"zip_code\":\"644000\",\"first\":\"Y\",\"lng\":\"104.630825\",\"lat\":\"28.760189\"},{\"id\":2486,\"pid\":2367,\"shortname\":\"广安\",\"name\":\"广安市\",\"merger_name\":\"中国,四川省,广安市\",\"pinyin\":\"guang'an\",\"code\":\"0826\",\"zip_code\":\"638000\",\"first\":\"G\",\"lng\":\"106.633369\",\"lat\":\"30.456398\"},{\"id\":2493,\"pid\":2367,\"shortname\":\"达州\",\"name\":\"达州市\",\"merger_name\":\"中国,四川省,达州市\",\"pinyin\":\"dazhou\",\"code\":\"0818\",\"zip_code\":\"635000\",\"first\":\"D\",\"lng\":\"107.502262\",\"lat\":\"31.209484\"},{\"id\":2501,\"pid\":2367,\"shortname\":\"雅安\",\"name\":\"雅安市\",\"merger_name\":\"中国,四川省,雅安市\",\"pinyin\":\"ya'an\",\"code\":\"0835\",\"zip_code\":\"625000\",\"first\":\"Y\",\"lng\":\"103.001033\",\"lat\":\"29.987722\"},{\"id\":2510,\"pid\":2367,\"shortname\":\"巴中\",\"name\":\"巴中市\",\"merger_name\":\"中国,四川省,巴中市\",\"pinyin\":\"bazhong\",\"code\":\"0827\",\"zip_code\":\"636000\",\"first\":\"B\",\"lng\":\"106.753669\",\"lat\":\"31.858809\"},{\"id\":2516,\"pid\":2367,\"shortname\":\"资阳\",\"name\":\"资阳市\",\"merger_name\":\"中国,四川省,资阳市\",\"pinyin\":\"ziyang\",\"code\":\"028\",\"zip_code\":\"641300\",\"first\":\"Z\",\"lng\":\"104.641917\",\"lat\":\"30.122211\"},{\"id\":2521,\"pid\":2367,\"shortname\":\"阿坝\",\"name\":\"阿坝藏族羌族自治州\",\"merger_name\":\"中国,四川省,阿坝藏族羌族自治州\",\"pinyin\":\"aba\",\"code\":\"0837\",\"zip_code\":\"624000\",\"first\":\"A\",\"lng\":\"102.221374\",\"lat\":\"31.899792\"},{\"id\":2535,\"pid\":2367,\"shortname\":\"甘孜\",\"name\":\"甘孜藏族自治州\",\"merger_name\":\"中国,四川省,甘孜藏族自治州\",\"pinyin\":\"garze\",\"code\":\"0836\",\"zip_code\":\"626000\",\"first\":\"G\",\"lng\":\"101.963815\",\"lat\":\"30.050663\"},{\"id\":2554,\"pid\":2367,\"shortname\":\"凉山\",\"name\":\"凉山彝族自治州\",\"merger_name\":\"中国,四川省,凉山彝族自治州\",\"pinyin\":\"liangshan\",\"code\":\"0834\",\"zip_code\":\"615000\",\"first\":\"L\",\"lng\":\"102.258746\",\"lat\":\"27.886762\"},{\"id\":2573,\"pid\":2572,\"shortname\":\"贵阳\",\"name\":\"贵阳市\",\"merger_name\":\"中国,贵州省,贵阳市\",\"pinyin\":\"guiyang\",\"code\":\"0851\",\"zip_code\":\"550001\",\"first\":\"G\",\"lng\":\"106.713478\",\"lat\":\"26.578343\"},{\"id\":2584,\"pid\":2572,\"shortname\":\"六盘水\",\"name\":\"六盘水市\",\"merger_name\":\"中国,贵州省,六盘水市\",\"pinyin\":\"liupanshui\",\"code\":\"0858\",\"zip_code\":\"553400\",\"first\":\"L\",\"lng\":\"104.846743\",\"lat\":\"26.584643\"},{\"id\":2589,\"pid\":2572,\"shortname\":\"遵义\",\"name\":\"遵义市\",\"merger_name\":\"中国,贵州省,遵义市\",\"pinyin\":\"zunyi\",\"code\":\"0852\",\"zip_code\":\"563000\",\"first\":\"Z\",\"lng\":\"106.937265\",\"lat\":\"27.706626\"},{\"id\":2604,\"pid\":2572,\"shortname\":\"安顺\",\"name\":\"安顺市\",\"merger_name\":\"中国,贵州省,安顺市\",\"pinyin\":\"anshun\",\"code\":\"0853\",\"zip_code\":\"561000\",\"first\":\"A\",\"lng\":\"105.932188\",\"lat\":\"26.245544\"},{\"id\":2611,\"pid\":2572,\"shortname\":\"毕节\",\"name\":\"毕节市\",\"merger_name\":\"中国,贵州省,毕节市\",\"pinyin\":\"bijie\",\"code\":\"0857\",\"zip_code\":\"551700\",\"first\":\"B\",\"lng\":\"105.28501\",\"lat\":\"27.301693\"},{\"id\":2620,\"pid\":2572,\"shortname\":\"铜仁\",\"name\":\"铜仁市\",\"merger_name\":\"中国,贵州省,铜仁市\",\"pinyin\":\"tongren\",\"code\":\"0856\",\"zip_code\":\"554300\",\"first\":\"T\",\"lng\":\"109.191555\",\"lat\":\"27.718346\"},{\"id\":2631,\"pid\":2572,\"shortname\":\"黔西南\",\"name\":\"黔西南布依族苗族自治州\",\"merger_name\":\"中国,贵州省,黔西南布依族苗族自治州\",\"pinyin\":\"qianxinan\",\"code\":\"0859\",\"zip_code\":\"562400\",\"first\":\"Q\",\"lng\":\"104.897971\",\"lat\":\"25.08812\"},{\"id\":2640,\"pid\":2572,\"shortname\":\"黔东南\",\"name\":\"黔东南苗族侗族自治州\",\"merger_name\":\"中国,贵州省,黔东南苗族侗族自治州\",\"pinyin\":\"qiandongnan\",\"code\":\"0855\",\"zip_code\":\"556000\",\"first\":\"Q\",\"lng\":\"107.977488\",\"lat\":\"26.583352\"},{\"id\":2657,\"pid\":2572,\"shortname\":\"黔南\",\"name\":\"黔南布依族苗族自治州\",\"merger_name\":\"中国,贵州省,黔南布依族苗族自治州\",\"pinyin\":\"qiannan\",\"code\":\"0854\",\"zip_code\":\"558000\",\"first\":\"Q\",\"lng\":\"107.517156\",\"lat\":\"26.258219\"},{\"id\":2671,\"pid\":2670,\"shortname\":\"昆明\",\"name\":\"昆明市\",\"merger_name\":\"中国,云南省,昆明市\",\"pinyin\":\"kunming\",\"code\":\"0871\",\"zip_code\":\"650500\",\"first\":\"K\",\"lng\":\"102.712251\",\"lat\":\"25.040609\"},{\"id\":2686,\"pid\":2670,\"shortname\":\"曲靖\",\"name\":\"曲靖市\",\"merger_name\":\"中国,云南省,曲靖市\",\"pinyin\":\"qujing\",\"code\":\"0874\",\"zip_code\":\"655000\",\"first\":\"Q\",\"lng\":\"103.797851\",\"lat\":\"25.501557\"},{\"id\":2696,\"pid\":2670,\"shortname\":\"玉溪\",\"name\":\"玉溪市\",\"merger_name\":\"中国,云南省,玉溪市\",\"pinyin\":\"yuxi\",\"code\":\"0877\",\"zip_code\":\"653100\",\"first\":\"Y\",\"lng\":\"102.543907\",\"lat\":\"24.350461\"},{\"id\":2706,\"pid\":2670,\"shortname\":\"保山\",\"name\":\"保山市\",\"merger_name\":\"中国,云南省,保山市\",\"pinyin\":\"baoshan\",\"code\":\"0875\",\"zip_code\":\"678000\",\"first\":\"B\",\"lng\":\"99.167133\",\"lat\":\"25.111802\"},{\"id\":2712,\"pid\":2670,\"shortname\":\"昭通\",\"name\":\"昭通市\",\"merger_name\":\"中国,云南省,昭通市\",\"pinyin\":\"zhaotong\",\"code\":\"0870\",\"zip_code\":\"657000\",\"first\":\"Z\",\"lng\":\"103.717216\",\"lat\":\"27.336999\"},{\"id\":2724,\"pid\":2670,\"shortname\":\"丽江\",\"name\":\"丽江市\",\"merger_name\":\"中国,云南省,丽江市\",\"pinyin\":\"lijiang\",\"code\":\"0888\",\"zip_code\":\"674100\",\"first\":\"L\",\"lng\":\"100.233026\",\"lat\":\"26.872108\"},{\"id\":2730,\"pid\":2670,\"shortname\":\"普洱\",\"name\":\"普洱市\",\"merger_name\":\"中国,云南省,普洱市\",\"pinyin\":\"pu'er\",\"code\":\"0879\",\"zip_code\":\"665000\",\"first\":\"P\",\"lng\":\"100.972344\",\"lat\":\"22.777321\"},{\"id\":2741,\"pid\":2670,\"shortname\":\"临沧\",\"name\":\"临沧市\",\"merger_name\":\"中国,云南省,临沧市\",\"pinyin\":\"lincang\",\"code\":\"0883\",\"zip_code\":\"677000\",\"first\":\"L\",\"lng\":\"100.08697\",\"lat\":\"23.886567\"},{\"id\":2750,\"pid\":2670,\"shortname\":\"楚雄\",\"name\":\"楚雄彝族自治州\",\"merger_name\":\"中国,云南省,楚雄彝族自治州\",\"pinyin\":\"chuxiong\",\"code\":\"0878\",\"zip_code\":\"675000\",\"first\":\"C\",\"lng\":\"101.546046\",\"lat\":\"25.041988\"},{\"id\":2761,\"pid\":2670,\"shortname\":\"红河\",\"name\":\"红河哈尼族彝族自治州\",\"merger_name\":\"中国,云南省,红河哈尼族彝族自治州\",\"pinyin\":\"honghe\",\"code\":\"0873\",\"zip_code\":\"661400\",\"first\":\"H\",\"lng\":\"103.384182\",\"lat\":\"23.366775\"},{\"id\":2775,\"pid\":2670,\"shortname\":\"文山\",\"name\":\"文山壮族苗族自治州\",\"merger_name\":\"中国,云南省,文山壮族苗族自治州\",\"pinyin\":\"wenshan\",\"code\":\"0876\",\"zip_code\":\"663000\",\"first\":\"W\",\"lng\":\"104.24401\",\"lat\":\"23.36951\"},{\"id\":2784,\"pid\":2670,\"shortname\":\"西双版纳\",\"name\":\"西双版纳傣族自治州\",\"merger_name\":\"中国,云南省,西双版纳傣族自治州\",\"pinyin\":\"xishuangbanna\",\"code\":\"0691\",\"zip_code\":\"666100\",\"first\":\"X\",\"lng\":\"100.797941\",\"lat\":\"22.001724\"},{\"id\":2788,\"pid\":2670,\"shortname\":\"大理\",\"name\":\"大理白族自治州\",\"merger_name\":\"中国,云南省,大理白族自治州\",\"pinyin\":\"dali\",\"code\":\"0872\",\"zip_code\":\"671000\",\"first\":\"D\",\"lng\":\"100.240037\",\"lat\":\"25.592765\"},{\"id\":2801,\"pid\":2670,\"shortname\":\"德宏\",\"name\":\"德宏傣族景颇族自治州\",\"merger_name\":\"中国,云南省,德宏傣族景颇族自治州\",\"pinyin\":\"dehong\",\"code\":\"0692\",\"zip_code\":\"678400\",\"first\":\"D\",\"lng\":\"98.578363\",\"lat\":\"24.436694\"},{\"id\":2807,\"pid\":2670,\"shortname\":\"怒江\",\"name\":\"怒江傈僳族自治州\",\"merger_name\":\"中国,云南省,怒江傈僳族自治州\",\"pinyin\":\"nujiang\",\"code\":\"0886\",\"zip_code\":\"673100\",\"first\":\"N\",\"lng\":\"98.854304\",\"lat\":\"25.850949\"},{\"id\":2812,\"pid\":2670,\"shortname\":\"迪庆\",\"name\":\"迪庆藏族自治州\",\"merger_name\":\"中国,云南省,迪庆藏族自治州\",\"pinyin\":\"deqen\",\"code\":\"0887\",\"zip_code\":\"674400\",\"first\":\"D\",\"lng\":\"99.706463\",\"lat\":\"27.826853\"},{\"id\":2817,\"pid\":2816,\"shortname\":\"拉萨\",\"name\":\"拉萨市\",\"merger_name\":\"中国,西藏自治区,拉萨市\",\"pinyin\":\"lhasa\",\"code\":\"0891\",\"zip_code\":\"850000\",\"first\":\"L\",\"lng\":\"91.132212\",\"lat\":\"29.660361\"},{\"id\":2826,\"pid\":2816,\"shortname\":\"日喀则\",\"name\":\"日喀则市\",\"merger_name\":\"中国,西藏自治区,日喀则市\",\"pinyin\":\"rikaze\",\"code\":\"0892\",\"zip_code\":\"857000\",\"first\":\"R\",\"lng\":\"88.884874\",\"lat\":\"29.263792\"},{\"id\":2845,\"pid\":2816,\"shortname\":\"昌都\",\"name\":\"昌都市\",\"merger_name\":\"中国,西藏自治区,昌都市\",\"pinyin\":\"qamdo\",\"code\":\"0895\",\"zip_code\":\"854000\",\"first\":\"C\",\"lng\":\"97.178452\",\"lat\":\"31.136875\"},{\"id\":2857,\"pid\":2816,\"shortname\":\"山南\",\"name\":\"山南地区\",\"merger_name\":\"中国,西藏自治区,山南地区\",\"pinyin\":\"shannan\",\"code\":\"0893\",\"zip_code\":\"856000\",\"first\":\"S\",\"lng\":\"91.766529\",\"lat\":\"29.236023\"},{\"id\":2870,\"pid\":2816,\"shortname\":\"那曲\",\"name\":\"那曲地区\",\"merger_name\":\"中国,西藏自治区,那曲地区\",\"pinyin\":\"nagqu\",\"code\":\"0896\",\"zip_code\":\"852000\",\"first\":\"N\",\"lng\":\"92.060214\",\"lat\":\"31.476004\"},{\"id\":2882,\"pid\":2816,\"shortname\":\"阿里\",\"name\":\"阿里地区\",\"merger_name\":\"中国,西藏自治区,阿里地区\",\"pinyin\":\"ngari\",\"code\":\"0897\",\"zip_code\":\"859000\",\"first\":\"A\",\"lng\":\"80.105498\",\"lat\":\"32.503187\"},{\"id\":2890,\"pid\":2816,\"shortname\":\"林芝\",\"name\":\"林芝地区\",\"merger_name\":\"中国,西藏自治区,林芝地区\",\"pinyin\":\"nyingchi\",\"code\":\"0894\",\"zip_code\":\"850400\",\"first\":\"L\",\"lng\":\"94.362348\",\"lat\":\"29.654693\"},{\"id\":2899,\"pid\":2898,\"shortname\":\"西安\",\"name\":\"西安市\",\"merger_name\":\"中国,陕西省,西安市\",\"pinyin\":\"xi'an\",\"code\":\"029\",\"zip_code\":\"710003\",\"first\":\"X\",\"lng\":\"108.948024\",\"lat\":\"34.263161\"},{\"id\":2913,\"pid\":2898,\"shortname\":\"铜川\",\"name\":\"铜川市\",\"merger_name\":\"中国,陕西省,铜川市\",\"pinyin\":\"tongchuan\",\"code\":\"0919\",\"zip_code\":\"727100\",\"first\":\"T\",\"lng\":\"108.963122\",\"lat\":\"34.90892\"},{\"id\":2918,\"pid\":2898,\"shortname\":\"宝鸡\",\"name\":\"宝鸡市\",\"merger_name\":\"中国,陕西省,宝鸡市\",\"pinyin\":\"baoji\",\"code\":\"0917\",\"zip_code\":\"721000\",\"first\":\"B\",\"lng\":\"107.14487\",\"lat\":\"34.369315\"},{\"id\":2931,\"pid\":2898,\"shortname\":\"咸阳\",\"name\":\"咸阳市\",\"merger_name\":\"中国,陕西省,咸阳市\",\"pinyin\":\"xianyang\",\"code\":\"029\",\"zip_code\":\"712000\",\"first\":\"X\",\"lng\":\"108.705117\",\"lat\":\"34.333439\"},{\"id\":2946,\"pid\":2898,\"shortname\":\"渭南\",\"name\":\"渭南市\",\"merger_name\":\"中国,陕西省,渭南市\",\"pinyin\":\"weinan\",\"code\":\"0913\",\"zip_code\":\"714000\",\"first\":\"W\",\"lng\":\"109.502882\",\"lat\":\"34.499381\"},{\"id\":2958,\"pid\":2898,\"shortname\":\"延安\",\"name\":\"延安市\",\"merger_name\":\"中国,陕西省,延安市\",\"pinyin\":\"yan'an\",\"code\":\"0911\",\"zip_code\":\"716000\",\"first\":\"Y\",\"lng\":\"109.49081\",\"lat\":\"36.596537\"},{\"id\":2972,\"pid\":2898,\"shortname\":\"汉中\",\"name\":\"汉中市\",\"merger_name\":\"中国,陕西省,汉中市\",\"pinyin\":\"hanzhong\",\"code\":\"0916\",\"zip_code\":\"723000\",\"first\":\"H\",\"lng\":\"107.028621\",\"lat\":\"33.077668\"},{\"id\":2984,\"pid\":2898,\"shortname\":\"榆林\",\"name\":\"榆林市\",\"merger_name\":\"中国,陕西省,榆林市\",\"pinyin\":\"yulin\",\"code\":\"0912\",\"zip_code\":\"719000\",\"first\":\"Y\",\"lng\":\"109.741193\",\"lat\":\"38.290162\"},{\"id\":2997,\"pid\":2898,\"shortname\":\"安康\",\"name\":\"安康市\",\"merger_name\":\"中国,陕西省,安康市\",\"pinyin\":\"ankang\",\"code\":\"0915\",\"zip_code\":\"725000\",\"first\":\"A\",\"lng\":\"109.029273\",\"lat\":\"32.6903\"},{\"id\":3008,\"pid\":2898,\"shortname\":\"商洛\",\"name\":\"商洛市\",\"merger_name\":\"中国,陕西省,商洛市\",\"pinyin\":\"shangluo\",\"code\":\"0914\",\"zip_code\":\"726000\",\"first\":\"S\",\"lng\":\"109.939776\",\"lat\":\"33.868319\"},{\"id\":3016,\"pid\":2898,\"shortname\":\"西咸\",\"name\":\"西咸新区\",\"merger_name\":\"中国,陕西省,西咸新区\",\"pinyin\":\"xixian\",\"code\":\"029\",\"zip_code\":\"712000\",\"first\":\"X\",\"lng\":\"108.810654\",\"lat\":\"34.307144\"},{\"id\":3023,\"pid\":3022,\"shortname\":\"兰州\",\"name\":\"兰州市\",\"merger_name\":\"中国,甘肃省,兰州市\",\"pinyin\":\"lanzhou\",\"code\":\"0931\",\"zip_code\":\"730030\",\"first\":\"L\",\"lng\":\"103.823557\",\"lat\":\"36.058039\"},{\"id\":3032,\"pid\":3022,\"shortname\":\"嘉峪关\",\"name\":\"嘉峪关市\",\"merger_name\":\"中国,甘肃省,嘉峪关市\",\"pinyin\":\"jiayuguan\",\"code\":\"0937\",\"zip_code\":\"735100\",\"first\":\"J\",\"lng\":\"98.277304\",\"lat\":\"39.786529\"},{\"id\":3036,\"pid\":3022,\"shortname\":\"金昌\",\"name\":\"金昌市\",\"merger_name\":\"中国,甘肃省,金昌市\",\"pinyin\":\"jinchang\",\"code\":\"0935\",\"zip_code\":\"737100\",\"first\":\"J\",\"lng\":\"102.187888\",\"lat\":\"38.514238\"},{\"id\":3039,\"pid\":3022,\"shortname\":\"白银\",\"name\":\"白银市\",\"merger_name\":\"中国,甘肃省,白银市\",\"pinyin\":\"baiyin\",\"code\":\"0943\",\"zip_code\":\"730900\",\"first\":\"B\",\"lng\":\"104.173606\",\"lat\":\"36.54568\"},{\"id\":3045,\"pid\":3022,\"shortname\":\"天水\",\"name\":\"天水市\",\"merger_name\":\"中国,甘肃省,天水市\",\"pinyin\":\"tianshui\",\"code\":\"0938\",\"zip_code\":\"741000\",\"first\":\"T\",\"lng\":\"105.724998\",\"lat\":\"34.578529\"},{\"id\":3053,\"pid\":3022,\"shortname\":\"武威\",\"name\":\"武威市\",\"merger_name\":\"中国,甘肃省,武威市\",\"pinyin\":\"wuwei\",\"code\":\"0935\",\"zip_code\":\"733000\",\"first\":\"W\",\"lng\":\"102.634697\",\"lat\":\"37.929996\"},{\"id\":3058,\"pid\":3022,\"shortname\":\"张掖\",\"name\":\"张掖市\",\"merger_name\":\"中国,甘肃省,张掖市\",\"pinyin\":\"zhangye\",\"code\":\"0936\",\"zip_code\":\"734000\",\"first\":\"Z\",\"lng\":\"100.455472\",\"lat\":\"38.932897\"},{\"id\":3065,\"pid\":3022,\"shortname\":\"平凉\",\"name\":\"平凉市\",\"merger_name\":\"中国,甘肃省,平凉市\",\"pinyin\":\"pingliang\",\"code\":\"0933\",\"zip_code\":\"744000\",\"first\":\"P\",\"lng\":\"106.684691\",\"lat\":\"35.54279\"},{\"id\":3073,\"pid\":3022,\"shortname\":\"酒泉\",\"name\":\"酒泉市\",\"merger_name\":\"中国,甘肃省,酒泉市\",\"pinyin\":\"jiuquan\",\"code\":\"0937\",\"zip_code\":\"735000\",\"first\":\"J\",\"lng\":\"98.510795\",\"lat\":\"39.744023\"},{\"id\":3081,\"pid\":3022,\"shortname\":\"庆阳\",\"name\":\"庆阳市\",\"merger_name\":\"中国,甘肃省,庆阳市\",\"pinyin\":\"qingyang\",\"code\":\"0934\",\"zip_code\":\"745000\",\"first\":\"Q\",\"lng\":\"107.638372\",\"lat\":\"35.734218\"},{\"id\":3090,\"pid\":3022,\"shortname\":\"定西\",\"name\":\"定西市\",\"merger_name\":\"中国,甘肃省,定西市\",\"pinyin\":\"dingxi\",\"code\":\"0932\",\"zip_code\":\"743000\",\"first\":\"D\",\"lng\":\"104.626294\",\"lat\":\"35.579578\"},{\"id\":3098,\"pid\":3022,\"shortname\":\"陇南\",\"name\":\"陇南市\",\"merger_name\":\"中国,甘肃省,陇南市\",\"pinyin\":\"longnan\",\"code\":\"0939\",\"zip_code\":\"746000\",\"first\":\"L\",\"lng\":\"104.929379\",\"lat\":\"33.388598\"},{\"id\":3108,\"pid\":3022,\"shortname\":\"临夏\",\"name\":\"临夏回族自治州\",\"merger_name\":\"中国,甘肃省,临夏回族自治州\",\"pinyin\":\"linxia\",\"code\":\"0930\",\"zip_code\":\"731100\",\"first\":\"L\",\"lng\":\"103.212006\",\"lat\":\"35.599446\"},{\"id\":3117,\"pid\":3022,\"shortname\":\"甘南\",\"name\":\"甘南藏族自治州\",\"merger_name\":\"中国,甘肃省,甘南藏族自治州\",\"pinyin\":\"gannan\",\"code\":\"0941\",\"zip_code\":\"747000\",\"first\":\"G\",\"lng\":\"102.911008\",\"lat\":\"34.986354\"},{\"id\":3127,\"pid\":3126,\"shortname\":\"西宁\",\"name\":\"西宁市\",\"merger_name\":\"中国,青海省,西宁市\",\"pinyin\":\"xining\",\"code\":\"0971\",\"zip_code\":\"810000\",\"first\":\"X\",\"lng\":\"101.778916\",\"lat\":\"36.623178\"},{\"id\":3135,\"pid\":3126,\"shortname\":\"海东\",\"name\":\"海东市\",\"merger_name\":\"中国,青海省,海东市\",\"pinyin\":\"haidong\",\"code\":\"0972\",\"zip_code\":\"810700\",\"first\":\"H\",\"lng\":\"102.10327\",\"lat\":\"36.502916\"},{\"id\":3142,\"pid\":3126,\"shortname\":\"海北\",\"name\":\"海北藏族自治州\",\"merger_name\":\"中国,青海省,海北藏族自治州\",\"pinyin\":\"haibei\",\"code\":\"0970\",\"zip_code\":\"812200\",\"first\":\"H\",\"lng\":\"100.901059\",\"lat\":\"36.959435\"},{\"id\":3147,\"pid\":3126,\"shortname\":\"黄南\",\"name\":\"黄南藏族自治州\",\"merger_name\":\"中国,青海省,黄南藏族自治州\",\"pinyin\":\"huangnan\",\"code\":\"0973\",\"zip_code\":\"811300\",\"first\":\"H\",\"lng\":\"102.019988\",\"lat\":\"35.517744\"},{\"id\":3152,\"pid\":3126,\"shortname\":\"海南\",\"name\":\"海南藏族自治州\",\"merger_name\":\"中国,青海省,海南藏族自治州\",\"pinyin\":\"hainan\",\"code\":\"0974\",\"zip_code\":\"813000\",\"first\":\"H\",\"lng\":\"100.619542\",\"lat\":\"36.280353\"},{\"id\":3158,\"pid\":3126,\"shortname\":\"果洛\",\"name\":\"果洛藏族自治州\",\"merger_name\":\"中国,青海省,果洛藏族自治州\",\"pinyin\":\"golog\",\"code\":\"0975\",\"zip_code\":\"814000\",\"first\":\"G\",\"lng\":\"100.242143\",\"lat\":\"34.4736\"},{\"id\":3165,\"pid\":3126,\"shortname\":\"玉树\",\"name\":\"玉树藏族自治州\",\"merger_name\":\"中国,青海省,玉树藏族自治州\",\"pinyin\":\"yushu\",\"code\":\"0976\",\"zip_code\":\"815000\",\"first\":\"Y\",\"lng\":\"97.008522\",\"lat\":\"33.004049\"},{\"id\":3172,\"pid\":3126,\"shortname\":\"海西\",\"name\":\"海西蒙古族藏族自治州\",\"merger_name\":\"中国,青海省,海西蒙古族藏族自治州\",\"pinyin\":\"haixi\",\"code\":\"0977\",\"zip_code\":\"817000\",\"first\":\"H\",\"lng\":\"97.370785\",\"lat\":\"37.374663\"},{\"id\":3179,\"pid\":3178,\"shortname\":\"银川\",\"name\":\"银川市\",\"merger_name\":\"中国,宁夏回族自治区,银川市\",\"pinyin\":\"yinchuan\",\"code\":\"0951\",\"zip_code\":\"750004\",\"first\":\"Y\",\"lng\":\"106.278179\",\"lat\":\"38.46637\"},{\"id\":3186,\"pid\":3178,\"shortname\":\"石嘴山\",\"name\":\"石嘴山市\",\"merger_name\":\"中国,宁夏回族自治区,石嘴山市\",\"pinyin\":\"shizuishan\",\"code\":\"0952\",\"zip_code\":\"753000\",\"first\":\"S\",\"lng\":\"106.376173\",\"lat\":\"39.01333\"},{\"id\":3190,\"pid\":3178,\"shortname\":\"吴忠\",\"name\":\"吴忠市\",\"merger_name\":\"中国,宁夏回族自治区,吴忠市\",\"pinyin\":\"wuzhong\",\"code\":\"0953\",\"zip_code\":\"751100\",\"first\":\"W\",\"lng\":\"106.199409\",\"lat\":\"37.986165\"},{\"id\":3196,\"pid\":3178,\"shortname\":\"固原\",\"name\":\"固原市\",\"merger_name\":\"中国,宁夏回族自治区,固原市\",\"pinyin\":\"guyuan\",\"code\":\"0954\",\"zip_code\":\"756000\",\"first\":\"G\",\"lng\":\"106.285241\",\"lat\":\"36.004561\"},{\"id\":3202,\"pid\":3178,\"shortname\":\"中卫\",\"name\":\"中卫市\",\"merger_name\":\"中国,宁夏回族自治区,中卫市\",\"pinyin\":\"zhongwei\",\"code\":\"0955\",\"zip_code\":\"751700\",\"first\":\"Z\",\"lng\":\"105.189568\",\"lat\":\"37.514951\"},{\"id\":3207,\"pid\":3206,\"shortname\":\"乌鲁木齐\",\"name\":\"乌鲁木齐市\",\"merger_name\":\"中国,新疆维吾尔自治区,乌鲁木齐市\",\"pinyin\":\"urumqi\",\"code\":\"0991\",\"zip_code\":\"830002\",\"first\":\"W\",\"lng\":\"87.617733\",\"lat\":\"43.792818\"},{\"id\":3216,\"pid\":3206,\"shortname\":\"克拉玛依\",\"name\":\"克拉玛依市\",\"merger_name\":\"中国,新疆维吾尔自治区,克拉玛依市\",\"pinyin\":\"karamay\",\"code\":\"0990\",\"zip_code\":\"834000\",\"first\":\"K\",\"lng\":\"84.873946\",\"lat\":\"45.595886\"},{\"id\":3221,\"pid\":3206,\"shortname\":\"吐鲁番\",\"name\":\"吐鲁番地区\",\"merger_name\":\"中国,新疆维吾尔自治区,吐鲁番地区\",\"pinyin\":\"turpan\",\"code\":\"0995\",\"zip_code\":\"838000\",\"first\":\"T\",\"lng\":\"89.184078\",\"lat\":\"42.947613\"},{\"id\":3225,\"pid\":3206,\"shortname\":\"哈密\",\"name\":\"哈密地区\",\"merger_name\":\"中国,新疆维吾尔自治区,哈密地区\",\"pinyin\":\"hami\",\"code\":\"0902\",\"zip_code\":\"839000\",\"first\":\"H\",\"lng\":\"93.51316\",\"lat\":\"42.833248\"},{\"id\":3229,\"pid\":3206,\"shortname\":\"昌吉\",\"name\":\"昌吉回族自治州\",\"merger_name\":\"中国,新疆维吾尔自治区,昌吉回族自治州\",\"pinyin\":\"changji\",\"code\":\"0994\",\"zip_code\":\"831100\",\"first\":\"C\",\"lng\":\"87.304012\",\"lat\":\"44.014577\"},{\"id\":3237,\"pid\":3206,\"shortname\":\"博尔塔拉\",\"name\":\"博尔塔拉蒙古自治州\",\"merger_name\":\"中国,新疆维吾尔自治区,博尔塔拉蒙古自治州\",\"pinyin\":\"bortala\",\"code\":\"0909\",\"zip_code\":\"833400\",\"first\":\"B\",\"lng\":\"82.074778\",\"lat\":\"44.903258\"},{\"id\":3242,\"pid\":3206,\"shortname\":\"巴音郭楞\",\"name\":\"巴音郭楞蒙古自治州\",\"merger_name\":\"中国,新疆维吾尔自治区,巴音郭楞蒙古自治州\",\"pinyin\":\"bayingol\",\"code\":\"0996\",\"zip_code\":\"841000\",\"first\":\"B\",\"lng\":\"86.150969\",\"lat\":\"41.768552\"},{\"id\":3252,\"pid\":3206,\"shortname\":\"阿克苏\",\"name\":\"阿克苏地区\",\"merger_name\":\"中国,新疆维吾尔自治区,阿克苏地区\",\"pinyin\":\"aksu\",\"code\":\"0997\",\"zip_code\":\"843000\",\"first\":\"A\",\"lng\":\"80.265068\",\"lat\":\"41.170712\"},{\"id\":3262,\"pid\":3206,\"shortname\":\"克孜勒苏\",\"name\":\"克孜勒苏柯尔克孜自治州\",\"merger_name\":\"中国,新疆维吾尔自治区,克孜勒苏柯尔克孜自治州\",\"pinyin\":\"kizilsu\",\"code\":\"0908\",\"zip_code\":\"845350\",\"first\":\"K\",\"lng\":\"76.172825\",\"lat\":\"39.713431\"},{\"id\":3267,\"pid\":3206,\"shortname\":\"喀什\",\"name\":\"喀什地区\",\"merger_name\":\"中国,新疆维吾尔自治区,喀什地区\",\"pinyin\":\"kashgar\",\"code\":\"0998\",\"zip_code\":\"844000\",\"first\":\"K\",\"lng\":\"75.989138\",\"lat\":\"39.467664\"},{\"id\":3280,\"pid\":3206,\"shortname\":\"和田\",\"name\":\"和田地区\",\"merger_name\":\"中国,新疆维吾尔自治区,和田地区\",\"pinyin\":\"hotan\",\"code\":\"0903\",\"zip_code\":\"848000\",\"first\":\"H\",\"lng\":\"79.92533\",\"lat\":\"37.110687\"},{\"id\":3289,\"pid\":3206,\"shortname\":\"伊犁\",\"name\":\"伊犁哈萨克自治州\",\"merger_name\":\"中国,新疆维吾尔自治区,伊犁哈萨克自治州\",\"pinyin\":\"ili\",\"code\":\"0999\",\"zip_code\":\"835100\",\"first\":\"Y\",\"lng\":\"81.317946\",\"lat\":\"43.92186\"},{\"id\":3301,\"pid\":3206,\"shortname\":\"塔城\",\"name\":\"塔城地区\",\"merger_name\":\"中国,新疆维吾尔自治区,塔城地区\",\"pinyin\":\"qoqek\",\"code\":\"0901\",\"zip_code\":\"834700\",\"first\":\"T\",\"lng\":\"82.985732\",\"lat\":\"46.746301\"},{\"id\":3309,\"pid\":3206,\"shortname\":\"阿勒泰\",\"name\":\"阿勒泰地区\",\"merger_name\":\"中国,新疆维吾尔自治区,阿勒泰地区\",\"pinyin\":\"altay\",\"code\":\"0906\",\"zip_code\":\"836500\",\"first\":\"A\",\"lng\":\"88.13963\",\"lat\":\"47.848393\"},{\"id\":3317,\"pid\":3206,\"shortname\":\" \",\"name\":\"直辖县级\",\"merger_name\":\"中国,新疆维吾尔自治区,直辖县级\",\"pinyin\":\"\",\"code\":\"\",\"zip_code\":\"\",\"first\":\"Z\",\"lng\":\"91.132212\",\"lat\":\"29.660361\"},{\"id\":3326,\"pid\":3325,\"shortname\":\"台北\",\"name\":\"台北市\",\"merger_name\":\"中国,台湾,台北市\",\"pinyin\":\"taipei\",\"code\":\"02\",\"zip_code\":\"1\",\"first\":\"T\",\"lng\":\"121.565170\",\"lat\":\"25.037798\"},{\"id\":3339,\"pid\":3325,\"shortname\":\"高雄\",\"name\":\"高雄市\",\"merger_name\":\"中国,台湾,高雄市\",\"pinyin\":\"kaohsiung\",\"code\":\"07\",\"zip_code\":\"8\",\"first\":\"G\",\"lng\":\"120.311922\",\"lat\":\"22.620856\"},{\"id\":3378,\"pid\":3325,\"shortname\":\"基隆\",\"name\":\"基隆市\",\"merger_name\":\"中国,台湾,基隆市\",\"pinyin\":\"keelung\",\"code\":\"02\",\"zip_code\":\"2\",\"first\":\"J\",\"lng\":\"121.746248\",\"lat\":\"25.130741\"},{\"id\":3386,\"pid\":3325,\"shortname\":\"台中\",\"name\":\"台中市\",\"merger_name\":\"中国,台湾,台中市\",\"pinyin\":\"taichung\",\"code\":\"04\",\"zip_code\":\"4\",\"first\":\"T\",\"lng\":\"120.679040\",\"lat\":\"24.138620\"},{\"id\":3416,\"pid\":3325,\"shortname\":\"台南\",\"name\":\"台南市\",\"merger_name\":\"中国,台湾,台南市\",\"pinyin\":\"tainan\",\"code\":\"06\",\"zip_code\":\"7\",\"first\":\"T\",\"lng\":\"120.279363\",\"lat\":\"23.172478\"},{\"id\":3454,\"pid\":3325,\"shortname\":\"新竹\",\"name\":\"新竹市\",\"merger_name\":\"中国,台湾,新竹市\",\"pinyin\":\"hsinchu\",\"code\":\"03\",\"zip_code\":\"3\",\"first\":\"X\",\"lng\":\"120.968798\",\"lat\":\"24.806738\"},{\"id\":3458,\"pid\":3325,\"shortname\":\"嘉义\",\"name\":\"嘉义市\",\"merger_name\":\"中国,台湾,嘉义市\",\"pinyin\":\"chiayi\",\"code\":\"05\",\"zip_code\":\"6\",\"first\":\"J\",\"lng\":\"120.452538\",\"lat\":\"23.481568\"},{\"id\":3461,\"pid\":3325,\"shortname\":\"新北\",\"name\":\"新北市\",\"merger_name\":\"中国,台湾,新北市\",\"pinyin\":\"newtaipei\",\"code\":\"02\",\"zip_code\":\"2\",\"first\":\"X\",\"lng\":\"121.465746\",\"lat\":\"25.012366\"},{\"id\":3491,\"pid\":3325,\"shortname\":\"宜兰\",\"name\":\"宜兰县\",\"merger_name\":\"中国,台湾,宜兰县\",\"pinyin\":\"yilan\",\"code\":\"03\",\"zip_code\":\"2\",\"first\":\"Y\",\"lng\":\"121.500000\",\"lat\":\"24.600000\"},{\"id\":3504,\"pid\":3325,\"shortname\":\"桃园\",\"name\":\"桃园县\",\"merger_name\":\"中国,台湾,桃园县\",\"pinyin\":\"taoyuan\",\"code\":\"03\",\"zip_code\":\"3\",\"first\":\"T\",\"lng\":\"121.083000\",\"lat\":\"25.000000\"},{\"id\":3518,\"pid\":3325,\"shortname\":\"新竹\",\"name\":\"新竹县\",\"merger_name\":\"中国,台湾,新竹县\",\"pinyin\":\"hsinchu\",\"code\":\"03\",\"zip_code\":\"3\",\"first\":\"X\",\"lng\":\"121.160000\",\"lat\":\"24.600000\"},{\"id\":3532,\"pid\":3325,\"shortname\":\"苗栗\",\"name\":\"苗栗县\",\"merger_name\":\"中国,台湾,苗栗县\",\"pinyin\":\"miaoli\",\"code\":\"037\",\"zip_code\":\"3\",\"first\":\"M\",\"lng\":\"120.750000\",\"lat\":\"24.500000\"},{\"id\":3551,\"pid\":3325,\"shortname\":\"彰化\",\"name\":\"彰化县\",\"merger_name\":\"中国,台湾,彰化县\",\"pinyin\":\"changhua\",\"code\":\"04\",\"zip_code\":\"5\",\"first\":\"Z\",\"lng\":\"120.416000\",\"lat\":\"24.000000\"},{\"id\":3578,\"pid\":3325,\"shortname\":\"南投\",\"name\":\"南投县\",\"merger_name\":\"中国,台湾,南投县\",\"pinyin\":\"nantou\",\"code\":\"049\",\"zip_code\":\"5\",\"first\":\"N\",\"lng\":\"120.830000\",\"lat\":\"23.830000\"},{\"id\":3592,\"pid\":3325,\"shortname\":\"云林\",\"name\":\"云林县\",\"merger_name\":\"中国,台湾,云林县\",\"pinyin\":\"yunlin\",\"code\":\"05\",\"zip_code\":\"6\",\"first\":\"Y\",\"lng\":\"120.250000\",\"lat\":\"23.750000\"},{\"id\":3613,\"pid\":3325,\"shortname\":\"嘉义\",\"name\":\"嘉义县\",\"merger_name\":\"中国,台湾,嘉义县\",\"pinyin\":\"chiayi\",\"code\":\"05\",\"zip_code\":\"6\",\"first\":\"J\",\"lng\":\"120.300000\",\"lat\":\"23.500000\"},{\"id\":3632,\"pid\":3325,\"shortname\":\"屏东\",\"name\":\"屏东县\",\"merger_name\":\"中国,台湾,屏东县\",\"pinyin\":\"pingtung\",\"code\":\"08\",\"zip_code\":\"9\",\"first\":\"P\",\"lng\":\"120.487928\",\"lat\":\"22.682802\"},{\"id\":3666,\"pid\":3325,\"shortname\":\"台东\",\"name\":\"台东县\",\"merger_name\":\"中国,台湾,台东县\",\"pinyin\":\"taitung\",\"code\":\"089\",\"zip_code\":\"9\",\"first\":\"T\",\"lng\":\"120.916000\",\"lat\":\"23.000000\"},{\"id\":3683,\"pid\":3325,\"shortname\":\"花莲\",\"name\":\"花莲县\",\"merger_name\":\"中国,台湾,花莲县\",\"pinyin\":\"hualien\",\"code\":\"03\",\"zip_code\":\"9\",\"first\":\"H\",\"lng\":\"121.300000\",\"lat\":\"23.830000\"},{\"id\":3697,\"pid\":3325,\"shortname\":\"澎湖\",\"name\":\"澎湖县\",\"merger_name\":\"中国,台湾,澎湖县\",\"pinyin\":\"penghu\",\"code\":\"06\",\"zip_code\":\"8\",\"first\":\"P\",\"lng\":\"119.566417\",\"lat\":\"23.569733\"},{\"id\":3704,\"pid\":3325,\"shortname\":\"金门\",\"name\":\"金门县\",\"merger_name\":\"中国,台湾,金门县\",\"pinyin\":\"jinmen\",\"code\":\"082\",\"zip_code\":\"8\",\"first\":\"J\",\"lng\":\"118.317089\",\"lat\":\"24.432706\"},{\"id\":3711,\"pid\":3325,\"shortname\":\"连江\",\"name\":\"连江县\",\"merger_name\":\"中国,台湾,连江县\",\"pinyin\":\"lienchiang\",\"code\":\"0836\",\"zip_code\":\"2\",\"first\":\"L\",\"lng\":\"119.539704\",\"lat\":\"26.197364\"},{\"id\":3717,\"pid\":3716,\"shortname\":\"香港岛\",\"name\":\"香港岛\",\"merger_name\":\"中国,香港特别行政区,香港岛\",\"pinyin\":\"hongkongisland\",\"code\":\"00852\",\"zip_code\":\"999077\",\"first\":\"X\",\"lng\":\"114.177314\",\"lat\":\"22.266416\"},{\"id\":3722,\"pid\":3716,\"shortname\":\"九龙\",\"name\":\"九龙\",\"merger_name\":\"中国,香港特别行政区,九龙\",\"pinyin\":\"kowloon\",\"code\":\"00852\",\"zip_code\":\"999077\",\"first\":\"J\",\"lng\":\"114.17495\",\"lat\":\"22.327115\"},{\"id\":3728,\"pid\":3716,\"shortname\":\"新界\",\"name\":\"新界\",\"merger_name\":\"中国,香港特别行政区,新界\",\"pinyin\":\"newterritories\",\"code\":\"00852\",\"zip_code\":\"999077\",\"first\":\"X\",\"lng\":\"114.202408\",\"lat\":\"22.341766\"},{\"id\":3739,\"pid\":3738,\"shortname\":\"澳门半岛\",\"name\":\"澳门半岛\",\"merger_name\":\"中国,澳门特别行政区,澳门半岛\",\"pinyin\":\"macaupeninsula\",\"code\":\"00853\",\"zip_code\":\"999078\",\"first\":\"A\",\"lng\":\"113.549134\",\"lat\":\"22.198751\"},{\"id\":3745,\"pid\":3738,\"shortname\":\"氹仔岛\",\"name\":\"氹仔岛\",\"merger_name\":\"中国,澳门特别行政区,氹仔岛\",\"pinyin\":\"taipa\",\"code\":\"00853\",\"zip_code\":\"999078\",\"first\":\"\",\"lng\":\"113.577669\",\"lat\":\"22.156838\"},{\"id\":3747,\"pid\":3738,\"shortname\":\"路环岛\",\"name\":\"路环岛\",\"merger_name\":\"中国,澳门特别行政区,路环岛\",\"pinyin\":\"coloane\",\"code\":\"00853\",\"zip_code\":\"999078\",\"first\":\"L\",\"lng\":\"113.564857\",\"lat\":\"22.116226\"}]}");

/***/ }),

/***/ 2:
/*!******************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * Vue.js v2.6.11
 * (c) 2014-2020 Evan You
 * Released under the MIT License.
 */
/*  */

var emptyObject = Object.freeze({});

// These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive.
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value, e.g., [object Object].
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

function isPromise (val) {
  return (
    isDef(val) &&
    typeof val.then === 'function' &&
    typeof val.catch === 'function'
  )
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if an attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array.
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether an object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind polyfill for environments that do not support it,
 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
 * since native bind is now performant enough in most browsers.
 * But removing it would mean breaking code that was able to run in
 * PhantomJS 1.x, so this must be kept for backward compatibility.
 */

/* istanbul ignore next */
function polyfillBind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }

  boundFn._length = fn.length;
  return boundFn
}

function nativeBind (fn, ctx) {
  return fn.bind(ctx)
}

var bind = Function.prototype.bind
  ? nativeBind
  : polyfillBind;

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/* eslint-disable no-unused-vars */

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/* eslint-enable no-unused-vars */

/**
 * Return the same value.
 */
var identity = function (_) { return _; };

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime()
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */
function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured',
  'serverPrefetch'
];

/*  */



var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Perform updates asynchronously. Intended to be used by Vue Test Utils
   * This will significantly reduce performance if set to false.
   */
  async: true,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

/**
 * unicode letters used for parsing html tags, component names and property paths.
 * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
 * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
 */
var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = new RegExp(("[^" + (unicodeRegExp.source) + ".$_\\d]"));
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
var isPhantomJS = UA && /phantomjs/.test(UA);
var isFF = UA && UA.match(/firefox\/(\d+)/);

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = /*@__PURE__*/(function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

if (true) {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    if (vm.$root === vm) {
      if (vm.$options && vm.$options.__file) { // fixed by xxxxxx
        return ('') + vm.$options.__file
      }
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm;
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm && vm.$options.name !== 'PageBody') {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        !vm.$options.isReserved && tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */

var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  this.id = uid++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.SharedObject.target) {
    Dep.SharedObject.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  if ( true && !config.async) {
    // subs aren't sorted in scheduler if not running async
    // we need to sort them now to make sure they fire in correct
    // order
    subs.sort(function (a, b) { return a.id - b.id; });
  }
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
// fixed by xxxxxx (nvue shared vuex)
/* eslint-disable no-undef */
Dep.SharedObject = {};
Dep.SharedObject.target = null;
Dep.SharedObject.targetStack = [];

function pushTarget (target) {
  Dep.SharedObject.targetStack.push(target);
  Dep.SharedObject.target = target;
  Dep.target = target;
}

function popTarget () {
  Dep.SharedObject.targetStack.pop();
  Dep.SharedObject.target = Dep.SharedObject.targetStack[Dep.SharedObject.targetStack.length - 1];
  Dep.target = Dep.SharedObject.target;
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    // #7975
    // clone children array to avoid mutating original in case of cloning
    // a child.
    vnode.children && vnode.children.slice(),
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);

var methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */
var shouldObserve = true;

function toggleObserving (value) {
  shouldObserve = value;
}

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    if (hasProto) {
      {// fixed by xxxxxx 微信小程序使用 plugins 之后，数组方法被直接挂载到了数组对象上，需要执行 copyAugment 逻辑
        if(value.push !== value.__proto__.push){
          copyAugment(value, arrayMethods, arrayKeys);
        } else {
          protoAugment(value, arrayMethods);
        }
      }
    } else {
      copyAugment(value, arrayMethods, arrayKeys);
    }
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through all properties and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment a target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.SharedObject.target) { // fixed by xxxxxx
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if ( true && customSetter) {
        customSetter();
      }
      // #7981: for accessor properties without setter
      if (getter && !setter) { return }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot set reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot delete reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (true) {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;

  var keys = hasSymbol
    ? Reflect.ownKeys(from)
    : Object.keys(from);

  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    // in case the object is already observed...
    if (key === '__ob__') { continue }
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (
      toVal !== fromVal &&
      isPlainObject(toVal) &&
      isPlainObject(fromVal)
    ) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
       true && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  var res = childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal;
  return res
    ? dedupeHooks(res)
    : res
}

function dedupeHooks (hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
     true && assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (true) {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && "development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName (name) {
  if (!new RegExp(("^[a-zA-Z][\\-\\.0-9_" + (unicodeRegExp.source) + "]*$")).test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'should conform to valid custom element name in html5 specification.'
    );
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    );
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (true) {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  if (!inject) { return }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def$$1 = dirs[key];
      if (typeof def$$1 === 'function') {
        dirs[key] = { bind: def$$1, update: def$$1 };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (true) {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);

  // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.
  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm);
    }
    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
    }
  }

  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if ( true && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */



function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // boolean casting
  var booleanIndex = getTypeIndex(Boolean, prop.type);
  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);
      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }
  if (
    true
  ) {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if ( true && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }

  if (!valid) {
    warn(
      getInvalidTypeMessage(name, value, expectedTypes),
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isSameType (a, b) {
  return getType(a) === getType(b)
}

function getTypeIndex (type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1
  }
  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i
    }
  }
  return -1
}

function getInvalidTypeMessage (name, value, expectedTypes) {
  var message = "Invalid prop: type check failed for prop \"" + name + "\"." +
    " Expected " + (expectedTypes.map(capitalize).join(', '));
  var expectedType = expectedTypes[0];
  var receivedType = toRawType(value);
  var expectedValue = styleValue(value, expectedType);
  var receivedValue = styleValue(value, receivedType);
  // check if we need to specify expected value
  if (expectedTypes.length === 1 &&
      isExplicable(expectedType) &&
      !isBoolean(expectedType, receivedType)) {
    message += " with value " + expectedValue;
  }
  message += ", got " + receivedType + " ";
  // check if we need to specify received value
  if (isExplicable(receivedType)) {
    message += "with value " + receivedValue + ".";
  }
  return message
}

function styleValue (value, type) {
  if (type === 'String') {
    return ("\"" + value + "\"")
  } else if (type === 'Number') {
    return ("" + (Number(value)))
  } else {
    return ("" + value)
  }
}

function isExplicable (value) {
  var explicitTypes = ['string', 'number', 'boolean'];
  return explicitTypes.some(function (elem) { return value.toLowerCase() === elem; })
}

function isBoolean () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return args.some(function (elem) { return elem.toLowerCase() === 'boolean'; })
}

/*  */

function handleError (err, vm, info) {
  // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
  // See: https://github.com/vuejs/vuex/issues/1505
  pushTarget();
  try {
    if (vm) {
      var cur = vm;
      while ((cur = cur.$parent)) {
        var hooks = cur.$options.errorCaptured;
        if (hooks) {
          for (var i = 0; i < hooks.length; i++) {
            try {
              var capture = hooks[i].call(cur, err, vm, info) === false;
              if (capture) { return }
            } catch (e) {
              globalHandleError(e, cur, 'errorCaptured hook');
            }
          }
        }
      }
    }
    globalHandleError(err, vm, info);
  } finally {
    popTarget();
  }
}

function invokeWithErrorHandling (
  handler,
  context,
  args,
  vm,
  info
) {
  var res;
  try {
    res = args ? handler.apply(context, args) : handler.call(context);
    if (res && !res._isVue && isPromise(res) && !res._handled) {
      res.catch(function (e) { return handleError(e, vm, info + " (Promise/async)"); });
      // issue #9511
      // avoid catch triggering multiple times when nested calls
      res._handled = true;
    }
  } catch (e) {
    handleError(e, vm, info);
  }
  return res
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      // if the user intentionally throws the original error in the handler,
      // do not log it twice
      if (e !== err) {
        logError(e, null, 'config.errorHandler');
      }
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  if (true) {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using microtasks.
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// (e.g. #6813, out-in transitions).
// Also, using (macro) tasks in event handler would cause some weird behaviors
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
// A major drawback of this tradeoff is that there are some scenarios
// where microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690, which have workarounds)
// or even between bubbling of the same event (#6566).
var timerFunc;

// The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  timerFunc = function () {
    p.then(flushCallbacks);
    // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  // PhantomJS and iOS 7.x
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  var counter = 1;
  var observer = new MutationObserver(flushCallbacks);
  var textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true
  });
  timerFunc = function () {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Technically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else {
  // Fallback to setTimeout.
  timerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    timerFunc();
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (true) {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var warnReservedPrefix = function (target, key) {
    warn(
      "Property \"" + key + "\" must be accessed with \"$data." + key + "\" because " +
      'properties starting with "$" or "_" are not proxied in the Vue instance to ' +
      'prevent conflicts with Vue internals. ' +
      'See: https://vuejs.org/v2/api/#data',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) ||
        (typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data));
      if (!has && !isAllowed) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

var mark;
var measure;

if (true) {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      // perf.clearMeasures(name)
    };
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns, vm) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
      }
    } else {
      // return handler return value for single handlers
      return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler")
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  createOnceHandler,
  vm
) {
  var name, def$$1, cur, old, event;
  for (name in on) {
    def$$1 = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
       true && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur, vm);
      }
      if (isTrue(event.once)) {
        cur = on[name] = createOnceHandler(event.name, cur, event.capture);
      }
      add(event.name, cur, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

/*  */

// fixed by xxxxxx (mp properties)
function extractPropertiesFromVNodeData(data, Ctor, res, context) {
  var propOptions = Ctor.options.mpOptions && Ctor.options.mpOptions.properties;
  if (isUndef(propOptions)) {
    return res
  }
  var externalClasses = Ctor.options.mpOptions.externalClasses || [];
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      var result = checkProp(res, props, key, altKey, true) ||
          checkProp(res, attrs, key, altKey, false);
      // externalClass
      if (
        result &&
        res[key] &&
        externalClasses.indexOf(altKey) !== -1 &&
        context[camelize(res[key])]
      ) {
        // 赋值 externalClass 真正的值(模板里 externalClass 的值可能是字符串)
        res[key] = context[camelize(res[key])];
      }
    }
  }
  return res
}

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag,
  context// fixed by xxxxxx
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    // fixed by xxxxxx
    return extractPropertiesFromVNodeData(data, Ctor, {}, context)
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (true) {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  // fixed by xxxxxx
  return extractPropertiesFromVNodeData(data, Ctor, res, context)
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (true) {
        defineReactive$$1(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {}
    });
    toggleObserving(true);
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject)
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      // #6574 in case the inject object is observed...
      if (key === '__ob__') { continue }
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else if (true) {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */



/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  if (!children || !children.length) {
    return {}
  }
  var slots = {};
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      // fixed by xxxxxx 临时 hack 掉 uni-app 中的异步 name slot page
      if(child.asyncMeta && child.asyncMeta.data && child.asyncMeta.data.slot === 'page'){
        (slots['page'] || (slots['page'] = [])).push(child);
      }else{
        (slots.default || (slots.default = [])).push(child);
      }
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
}

/*  */

function normalizeScopedSlots (
  slots,
  normalSlots,
  prevSlots
) {
  var res;
  var hasNormalSlots = Object.keys(normalSlots).length > 0;
  var isStable = slots ? !!slots.$stable : !hasNormalSlots;
  var key = slots && slots.$key;
  if (!slots) {
    res = {};
  } else if (slots._normalized) {
    // fast path 1: child component re-render only, parent did not change
    return slots._normalized
  } else if (
    isStable &&
    prevSlots &&
    prevSlots !== emptyObject &&
    key === prevSlots.$key &&
    !hasNormalSlots &&
    !prevSlots.$hasNormal
  ) {
    // fast path 2: stable scoped slots w/ no normal slots to proxy,
    // only need to normalize once
    return prevSlots
  } else {
    res = {};
    for (var key$1 in slots) {
      if (slots[key$1] && key$1[0] !== '$') {
        res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
      }
    }
  }
  // expose normal slots on scopedSlots
  for (var key$2 in normalSlots) {
    if (!(key$2 in res)) {
      res[key$2] = proxyNormalSlot(normalSlots, key$2);
    }
  }
  // avoriaz seems to mock a non-extensible $scopedSlots object
  // and when that is passed down this would cause an error
  if (slots && Object.isExtensible(slots)) {
    (slots)._normalized = res;
  }
  def(res, '$stable', isStable);
  def(res, '$key', key);
  def(res, '$hasNormal', hasNormalSlots);
  return res
}

function normalizeScopedSlot(normalSlots, key, fn) {
  var normalized = function () {
    var res = arguments.length ? fn.apply(null, arguments) : fn({});
    res = res && typeof res === 'object' && !Array.isArray(res)
      ? [res] // single vnode
      : normalizeChildren(res);
    return res && (
      res.length === 0 ||
      (res.length === 1 && res[0].isComment) // #9658
    ) ? undefined
      : res
  };
  // this is a slot using the new v-slot syntax without scope. although it is
  // compiled as a scoped slot, render fn users would expect it to be present
  // on this.$slots because the usage is semantically a normal slot.
  if (fn.proxy) {
    Object.defineProperty(normalSlots, key, {
      get: normalized,
      enumerable: true,
      configurable: true
    });
  }
  return normalized
}

function proxyNormalSlot(slots, key) {
  return function () { return slots[key]; }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i, i, i); // fixed by xxxxxx
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i, i, i); // fixed by xxxxxx
    }
  } else if (isObject(val)) {
    if (hasSymbol && val[Symbol.iterator]) {
      ret = [];
      var iterator = val[Symbol.iterator]();
      var result = iterator.next();
      while (!result.done) {
        ret.push(render(result.value, ret.length, i++, i)); // fixed by xxxxxx
        result = iterator.next();
      }
    } else {
      keys = Object.keys(val);
      ret = new Array(keys.length);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i, i); // fixed by xxxxxx
      }
    }
  }
  if (!isDef(ret)) {
    ret = [];
  }
  (ret)._isVList = true;
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if ( true && !isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    // fixed by xxxxxx app-plus scopedSlot
    nodes = scopedSlotFn(props, this, props._i) || fallback;
  } else {
    nodes = this.$slots[name] || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

function isKeyNotMatch (expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1
  } else {
    return expect !== actual
  }
}

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInKeyCode,
  eventKeyName,
  builtInKeyName
) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName)
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode)
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
       true && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        var camelizedKey = camelize(key);
        var hyphenatedKey = hyphenate(key);
        if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.
  if (tree && !isInFor) {
    return tree
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  );
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
       true && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function resolveScopedSlots (
  fns, // see flow/vnode
  res,
  // the following are added in 2.6
  hasDynamicKeys,
  contentHashKey
) {
  res = res || { $stable: !hasDynamicKeys };
  for (var i = 0; i < fns.length; i++) {
    var slot = fns[i];
    if (Array.isArray(slot)) {
      resolveScopedSlots(slot, res, hasDynamicKeys);
    } else if (slot) {
      // marker for reverse proxying v-slot without scope on this.$slots
      if (slot.proxy) {
        slot.fn.proxy = true;
      }
      res[slot.key] = slot.fn;
    }
  }
  if (contentHashKey) {
    (res).$key = contentHashKey;
  }
  return res
}

/*  */

function bindDynamicKeys (baseObj, values) {
  for (var i = 0; i < values.length; i += 2) {
    var key = values[i];
    if (typeof key === 'string' && key) {
      baseObj[values[i]] = values[i + 1];
    } else if ( true && key !== '' && key !== null) {
      // null is a special value for explicitly removing a binding
      warn(
        ("Invalid value for dynamic directive argument (expected string or null): " + key),
        this
      );
    }
  }
  return baseObj
}

// helper to dynamically append modifier runtime markers to event names.
// ensure only append when value is already string, otherwise it will be cast
// to string and cause the type check to miss.
function prependModifier (value, symbol) {
  return typeof value === 'string' ? symbol + value : value
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
  target._d = bindDynamicKeys;
  target._p = prependModifier;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var this$1 = this;

  var options = Ctor.options;
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm;
  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent);
    // $flow-disable-line
    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent;
    // $flow-disable-line
    parent = parent._original;
  }
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () {
    if (!this$1.$slots) {
      normalizeScopedSlots(
        data.scopedSlots,
        this$1.$slots = resolveSlots(children, parent)
      );
    }
    return this$1.$slots
  };

  Object.defineProperty(this, 'scopedSlots', ({
    enumerable: true,
    get: function get () {
      return normalizeScopedSlots(data.scopedSlots, this.slots())
    }
  }));

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext)
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);
    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
    }
    return res
  }
}

function cloneAndMarkFunctionalResult (vnode, data, contextVm, options, renderContext) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;
  if (true) {
    (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext = renderContext;
  }
  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }
  return clone
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

/*  */

/*  */

/*  */

// inline hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (vnode, hydrating) {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      callHook(componentInstance, 'onServiceCreated');
      callHook(componentInstance, 'onServiceAttached');
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (true) {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag, context); // fixed by xxxxxx

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // install component management hooks onto the placeholder node
  installComponentHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );

  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent // activeInstance in lifecycle state
) {
  var options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent: parent
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function installComponentHooks (data) {
  var hooks = data.hook || (data.hook = {});
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var existing = hooks[key];
    var toMerge = componentVNodeHooks[key];
    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
    }
  }
}

function mergeHook$1 (f1, f2) {
  var merged = function (a, b) {
    // flow complains about extra args which is why we use any
    f1(a, b);
    f2(a, b);
  };
  merged._merged = true;
  return merged
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input'
  ;(data.attrs || (data.attrs = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  var existing = on[event];
  var callback = data.model.callback;
  if (isDef(existing)) {
    if (
      Array.isArray(existing)
        ? existing.indexOf(callback) === -1
        : existing !== callback
    ) {
      on[event] = [callback].concat(existing);
    }
  } else {
    on[event] = callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
     true && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if ( true &&
    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    {
      warn(
        'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
        context
      );
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      if ( true && isDef(data) && isDef(data.nativeOn)) {
        warn(
          ("The .native modifier for v-on is only valid on components but it was used on <" + tag + ">."),
          context
        );
      }
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (Array.isArray(vnode)) {
    return vnode
  } else if (isDef(vnode)) {
    if (isDef(ns)) { applyNS(vnode, ns); }
    if (isDef(data)) { registerDeepBindings(data); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (
        isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
        applyNS(child, ns, force);
      }
    }
  }
}

// ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes
function registerDeepBindings (data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }
  if (isObject(data.class)) {
    traverse(data.class);
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  if (true) {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {}
}

var currentRenderingInstance = null;

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (_parentVnode) {
      vm.$scopedSlots = normalizeScopedSlots(
        _parentVnode.data.scopedSlots,
        vm.$slots,
        vm.$scopedSlots
      );
    }

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      // There's no need to maintain a stack because all render fns are called
      // separately from one another. Nested component's render fns are called
      // when parent component is patched.
      currentRenderingInstance = vm;
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if ( true && vm.$options.renderError) {
        try {
          vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
        } catch (e) {
          handleError(e, vm, "renderError");
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    } finally {
      currentRenderingInstance = null;
    }
    // if the returned array contains only a single node, allow it
    if (Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0];
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if ( true && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  var owner = currentRenderingInstance;
  if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
    // already pending
    factory.owners.push(owner);
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (owner && !isDef(factory.owners)) {
    var owners = factory.owners = [owner];
    var sync = true;
    var timerLoading = null;
    var timerTimeout = null

    ;(owner).$on('hook:destroyed', function () { return remove(owners, owner); });

    var forceRender = function (renderCompleted) {
      for (var i = 0, l = owners.length; i < l; i++) {
        (owners[i]).$forceUpdate();
      }

      if (renderCompleted) {
        owners.length = 0;
        if (timerLoading !== null) {
          clearTimeout(timerLoading);
          timerLoading = null;
        }
        if (timerTimeout !== null) {
          clearTimeout(timerTimeout);
          timerTimeout = null;
        }
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender(true);
      } else {
        owners.length = 0;
      }
    });

    var reject = once(function (reason) {
       true && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender(true);
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (isPromise(res)) {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isPromise(res.component)) {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            timerLoading = setTimeout(function () {
              timerLoading = null;
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender(false);
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          timerTimeout = setTimeout(function () {
            timerTimeout = null;
            if (isUndef(factory.resolved)) {
              reject(
                 true
                  ? ("timeout (" + (res.timeout) + "ms)")
                  : undefined
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn) {
  target.$on(event, fn);
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function createOnceHandler (event, fn) {
  var _target = target;
  return function onceHandler () {
    var res = fn.apply(null, arguments);
    if (res !== null) {
      _target.$off(event, onceHandler);
    }
  }
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        vm.$off(event[i$1], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (true) {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      var info = "event handler for \"" + event + "\"";
      for (var i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info);
      }
    }
    return vm
  };
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function setActiveInstance(vm) {
  var prevActiveInstance = activeInstance;
  activeInstance = vm;
  return function () {
    activeInstance = prevActiveInstance;
  }
}

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var restoreActiveInstance = setActiveInstance(vm);
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    restoreActiveInstance();
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  if (true) {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren.

  // check if there are dynamic scopedSlots (hand-written or compiled but with
  // dynamic slot names). Static scoped slots compiled from template has the
  // "$stable" marker.
  var newScopedSlots = parentVnode.data.scopedSlots;
  var oldScopedSlots = vm.$scopedSlots;
  var hasDynamicScopedSlot = !!(
    (newScopedSlots && !newScopedSlots.$stable) ||
    (oldScopedSlots !== emptyObject && !oldScopedSlots.$stable) ||
    (newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key)
  );

  // Any static slot children from the parent may have changed during parent's
  // update. Dynamic scoped slots may also have changed. In such cases, a forced
  // update is necessary to ensure correctness.
  var needsForceUpdate = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    hasDynamicScopedSlot
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?
      props[key] = validateProp(key, propOptions, propsData, vm);
    }
    toggleObserving(true);
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }
  
  // fixed by xxxxxx update properties(mp runtime)
  vm._$updateProperties && vm._$updateProperties(vm);
  
  // update listeners
  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners);

  // resolve slots + force update if has children
  if (needsForceUpdate) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if (true) {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  var info = hook + " hook";
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info);
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
  popTarget();
}

/*  */

var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if (true) {
    circular = {};
  }
  waiting = flushing = false;
}

// Async edge case #6566 requires saving the timestamp when event listeners are
// attached. However, calling performance.now() has a perf overhead especially
// if the page has thousands of event listeners. Instead, we take a timestamp
// every time the scheduler flushes and use that for all event listeners
// attached during that flush.
var currentFlushTimestamp = 0;

// Async edge case fix requires storing an event listener's attach timestamp.
var getNow = Date.now;

// Determine what event timestamp the browser is using. Annoyingly, the
// timestamp can either be hi-res (relative to page load) or low-res
// (relative to UNIX epoch), so in order to compare time we have to use the
// same timestamp type when saving the flush timestamp.
// All IE versions use low-res event timestamps, and have problematic clock
// implementations (#9632)
if (inBrowser && !isIE) {
  var performance = window.performance;
  if (
    performance &&
    typeof performance.now === 'function' &&
    getNow() > document.createEvent('Event').timeStamp
  ) {
    // if the event timestamp, although evaluated AFTER the Date.now(), is
    // smaller than it, it means the event is using a hi-res timestamp,
    // and we need to use the hi-res version for event listener timestamps as
    // well.
    getNow = function () { return performance.now(); };
  }
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  currentFlushTimestamp = getNow();
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    if (watcher.before) {
      watcher.before();
    }
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if ( true && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;

      if ( true && !config.async) {
        flushSchedulerQueue();
        return
      }
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */



var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
    this.before = options.before;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression =  true
    ? expOrFn.toString()
    : undefined;
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = noop;
       true && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
  var i = this.deps.length;
  while (i--) {
    var dep = this.deps[i];
    if (!this.newDepIds.has(dep.id)) {
      dep.removeSub(this);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
  var i = this.deps.length;
  while (i--) {
    this.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this.deps[i].removeSub(this);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  if (!isRoot) {
    toggleObserving(false);
  }
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (true) {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive$$1(props, key, value, function () {
        if (!isRoot && !isUpdatingChildComponent) {
          {
            if(vm.mpHost === 'mp-baidu'){//百度 observer 在 setData callback 之后触发，直接忽略该 warn
                return
            }
            //fixed by xxxxxx __next_tick_pending,uni://form-field 时不告警
            if(
                key === 'value' && 
                Array.isArray(vm.$options.behaviors) &&
                vm.$options.behaviors.indexOf('uni://form-field') !== -1
              ){
              return
            }
            if(vm._getFormData){
              return
            }
            var $parent = vm.$parent;
            while($parent){
              if($parent.__next_tick_pending){
                return  
              }
              $parent = $parent.$parent;
            }
          }
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {}
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  toggleObserving(true);
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
     true && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (true) {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
       true && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if ( true && getter == null) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (true) {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : createGetterInvoker(userDef.get)
      : noop;
    sharedPropertyDefinition.set = userDef.set || noop;
  }
  if ( true &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.SharedObject.target) {// fixed by xxxxxx
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function createGetterInvoker(fn) {
  return function computedGetter () {
    return fn.call(this, this)
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    if (true) {
      if (typeof methods[key] !== 'function') {
        warn(
          "Method \"" + key + "\" has type \"" + (typeof methods[key]) + "\" in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  expOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (true) {
    dataDef.set = function () {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      try {
        cb.call(vm, watcher.value);
      } catch (error) {
        handleError(error, vm, ("callback for immediate watcher \"" + (watcher.expression) + "\""));
      }
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

var uid$3 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$3++;

    var startTag, endTag;
    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (true) {
      initProxy(vm);
    } else {}
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    !vm._$fallback && initInjections(vm); // resolve injections before data/props  
    initState(vm);
    !vm._$fallback && initProvide(vm); // resolve provide after data/props
    !vm._$fallback && callHook(vm, 'created');      

    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = latest[key];
    }
  }
  return modified
}

function Vue (options) {
  if ( true &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if ( true && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if ( true && type === 'component') {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */



function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    for (var key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },

  mounted: function mounted () {
    var this$1 = this;

    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) { return matches(val, name); });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) { return !matches(val, name); });
    });
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (true) {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  // 2.6 explicit observable API
  Vue.observable = function (obj) {
    observe(obj);
    return obj
  };

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});

Vue.version = '2.6.11';

/**
 * https://raw.githubusercontent.com/Tencent/westore/master/packages/westore/utils/diff.js
 */
var ARRAYTYPE = '[object Array]';
var OBJECTTYPE = '[object Object]';
// const FUNCTIONTYPE = '[object Function]'

function diff(current, pre) {
    var result = {};
    syncKeys(current, pre);
    _diff(current, pre, '', result);
    return result
}

function syncKeys(current, pre) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE && rootPreType == OBJECTTYPE) {
        if(Object.keys(current).length >= Object.keys(pre).length){
            for (var key in pre) {
                var currentValue = current[key];
                if (currentValue === undefined) {
                    current[key] = null;
                } else {
                    syncKeys(currentValue, pre[key]);
                }
            }
        }
    } else if (rootCurrentType == ARRAYTYPE && rootPreType == ARRAYTYPE) {
        if (current.length >= pre.length) {
            pre.forEach(function (item, index) {
                syncKeys(current[index], item);
            });
        }
    }
}

function _diff(current, pre, path, result) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE) {
        if (rootPreType != OBJECTTYPE || Object.keys(current).length < Object.keys(pre).length) {
            setResult(result, path, current);
        } else {
            var loop = function ( key ) {
                var currentValue = current[key];
                var preValue = pre[key];
                var currentType = type(currentValue);
                var preType = type(preValue);
                if (currentType != ARRAYTYPE && currentType != OBJECTTYPE) {
                    if (currentValue != pre[key]) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    }
                } else if (currentType == ARRAYTYPE) {
                    if (preType != ARRAYTYPE) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        if (currentValue.length < preValue.length) {
                            setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                        } else {
                            currentValue.forEach(function (item, index) {
                                _diff(item, preValue[index], (path == '' ? '' : path + ".") + key + '[' + index + ']', result);
                            });
                        }
                    }
                } else if (currentType == OBJECTTYPE) {
                    if (preType != OBJECTTYPE || Object.keys(currentValue).length < Object.keys(preValue).length) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        for (var subKey in currentValue) {
                            _diff(currentValue[subKey], preValue[subKey], (path == '' ? '' : path + ".") + key + '.' + subKey, result);
                        }
                    }
                }
            };

            for (var key in current) loop( key );
        }
    } else if (rootCurrentType == ARRAYTYPE) {
        if (rootPreType != ARRAYTYPE) {
            setResult(result, path, current);
        } else {
            if (current.length < pre.length) {
                setResult(result, path, current);
            } else {
                current.forEach(function (item, index) {
                    _diff(item, pre[index], path + '[' + index + ']', result);
                });
            }
        }
    } else {
        setResult(result, path, current);
    }
}

function setResult(result, k, v) {
    // if (type(v) != FUNCTIONTYPE) {
        result[k] = v;
    // }
}

function type(obj) {
    return Object.prototype.toString.call(obj)
}

/*  */

function flushCallbacks$1(vm) {
    if (vm.__next_tick_callbacks && vm.__next_tick_callbacks.length) {
        if (Object({"NODE_ENV":"development","VUE_APP_NAME":"好葫芦-用户端","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:flushCallbacks[' + vm.__next_tick_callbacks.length + ']');
        }
        var copies = vm.__next_tick_callbacks.slice(0);
        vm.__next_tick_callbacks.length = 0;
        for (var i = 0; i < copies.length; i++) {
            copies[i]();
        }
    }
}

function hasRenderWatcher(vm) {
    return queue.find(function (watcher) { return vm._watcher === watcher; })
}

function nextTick$1(vm, cb) {
    //1.nextTick 之前 已 setData 且 setData 还未回调完成
    //2.nextTick 之前存在 render watcher
    if (!vm.__next_tick_pending && !hasRenderWatcher(vm)) {
        if(Object({"NODE_ENV":"development","VUE_APP_NAME":"好葫芦-用户端","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:nextVueTick');
        }
        return nextTick(cb, vm)
    }else{
        if(Object({"NODE_ENV":"development","VUE_APP_NAME":"好葫芦-用户端","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance$1 = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance$1.is || mpInstance$1.route) + '][' + vm._uid +
                ']:nextMPTick');
        }
    }
    var _resolve;
    if (!vm.__next_tick_callbacks) {
        vm.__next_tick_callbacks = [];
    }
    vm.__next_tick_callbacks.push(function () {
        if (cb) {
            try {
                cb.call(vm);
            } catch (e) {
                handleError(e, vm, 'nextTick');
            }
        } else if (_resolve) {
            _resolve(vm);
        }
    });
    // $flow-disable-line
    if (!cb && typeof Promise !== 'undefined') {
        return new Promise(function (resolve) {
            _resolve = resolve;
        })
    }
}

/*  */

function cloneWithData(vm) {
  // 确保当前 vm 所有数据被同步
  var ret = Object.create(null);
  var dataKeys = [].concat(
    Object.keys(vm._data || {}),
    Object.keys(vm._computedWatchers || {}));

  dataKeys.reduce(function(ret, key) {
    ret[key] = vm[key];
    return ret
  }, ret);

  // vue-composition-api
  var compositionApiState = vm.__composition_api_state__ || vm.__secret_vfa_state__;
  var rawBindings = compositionApiState && compositionApiState.rawBindings;
  if (rawBindings) {
    Object.keys(rawBindings).forEach(function (key) {
      ret[key] = vm[key];
    });
  }

  //TODO 需要把无用数据处理掉，比如 list=>l0 则 list 需要移除，否则多传输一份数据
  Object.assign(ret, vm.$mp.data || {});
  if (
    Array.isArray(vm.$options.behaviors) &&
    vm.$options.behaviors.indexOf('uni://form-field') !== -1
  ) { //form-field
    ret['name'] = vm.name;
    ret['value'] = vm.value;
  }

  return JSON.parse(JSON.stringify(ret))
}

var patch = function(oldVnode, vnode) {
  var this$1 = this;

  if (vnode === null) { //destroy
    return
  }
  if (this.mpType === 'page' || this.mpType === 'component') {
    var mpInstance = this.$scope;
    var data = Object.create(null);
    try {
      data = cloneWithData(this);
    } catch (err) {
      console.error(err);
    }
    data.__webviewId__ = mpInstance.data.__webviewId__;
    var mpData = Object.create(null);
    Object.keys(data).forEach(function (key) { //仅同步 data 中有的数据
      mpData[key] = mpInstance.data[key];
    });
    var diffData = this.$shouldDiffData === false ? data : diff(data, mpData);
    if (Object.keys(diffData).length) {
      if (Object({"NODE_ENV":"development","VUE_APP_NAME":"好葫芦-用户端","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + this._uid +
          ']差量更新',
          JSON.stringify(diffData));
      }
      this.__next_tick_pending = true;
      mpInstance.setData(diffData, function () {
        this$1.__next_tick_pending = false;
        flushCallbacks$1(this$1);
      });
    } else {
      flushCallbacks$1(this);
    }
  }
};

/*  */

function createEmptyRender() {

}

function mountComponent$1(
  vm,
  el,
  hydrating
) {
  if (!vm.mpType) {//main.js 中的 new Vue
    return vm
  }
  if (vm.mpType === 'app') {
    vm.$options.render = createEmptyRender;
  }
  if (!vm.$options.render) {
    vm.$options.render = createEmptyRender;
    if (true) {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  
  !vm._$fallback && callHook(vm, 'beforeMount');

  var updateComponent = function () {
    vm._update(vm._render(), hydrating);
  };

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, {
    before: function before() {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate');
      }
    }
  }, true /* isRenderWatcher */);
  hydrating = false;
  return vm
}

/*  */

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/*  */

var MP_METHODS = ['createSelectorQuery', 'createIntersectionObserver', 'selectAllComponents', 'selectComponent'];

function getTarget(obj, path) {
  var parts = path.split('.');
  var key = parts[0];
  if (key.indexOf('__$n') === 0) { //number index
    key = parseInt(key.replace('__$n', ''));
  }
  if (parts.length === 1) {
    return obj[key]
  }
  return getTarget(obj[key], parts.slice(1).join('.'))
}

function internalMixin(Vue) {

  Vue.config.errorHandler = function(err, vm, info) {
    Vue.util.warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
    console.error(err);
    /* eslint-disable no-undef */
    var app = getApp();
    if (app && app.onError) {
      app.onError(err);
    }
  };

  var oldEmit = Vue.prototype.$emit;

  Vue.prototype.$emit = function(event) {
    if (this.$scope && event) {
      this.$scope['triggerEvent'](event, {
        __args__: toArray(arguments, 1)
      });
    }
    return oldEmit.apply(this, arguments)
  };

  Vue.prototype.$nextTick = function(fn) {
    return nextTick$1(this, fn)
  };

  MP_METHODS.forEach(function (method) {
    Vue.prototype[method] = function(args) {
      if (this.$scope && this.$scope[method]) {
        return this.$scope[method](args)
      }
      // mp-alipay
      if (typeof my === 'undefined') {
        return
      }
      if (method === 'createSelectorQuery') {
        /* eslint-disable no-undef */
        return my.createSelectorQuery(args)
      } else if (method === 'createIntersectionObserver') {
        /* eslint-disable no-undef */
        return my.createIntersectionObserver(args)
      }
      // TODO mp-alipay 暂不支持 selectAllComponents,selectComponent
    };
  });

  Vue.prototype.__init_provide = initProvide;

  Vue.prototype.__init_injections = initInjections;

  Vue.prototype.__call_hook = function(hook, args) {
    var vm = this;
    // #7573 disable dep collection when invoking lifecycle hooks
    pushTarget();
    var handlers = vm.$options[hook];
    var info = hook + " hook";
    var ret;
    if (handlers) {
      for (var i = 0, j = handlers.length; i < j; i++) {
        ret = invokeWithErrorHandling(handlers[i], vm, args ? [args] : null, vm, info);
      }
    }
    if (vm._hasHookEvent) {
      vm.$emit('hook:' + hook, args);
    }
    popTarget();
    return ret
  };

  Vue.prototype.__set_model = function(target, key, value, modifiers) {
    if (Array.isArray(modifiers)) {
      if (modifiers.indexOf('trim') !== -1) {
        value = value.trim();
      }
      if (modifiers.indexOf('number') !== -1) {
        value = this._n(value);
      }
    }
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__set_sync = function(target, key, value) {
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__get_orig = function(item) {
    if (isPlainObject(item)) {
      return item['$orig'] || item
    }
    return item
  };

  Vue.prototype.__get_value = function(dataPath, target) {
    return getTarget(target || this, dataPath)
  };


  Vue.prototype.__get_class = function(dynamicClass, staticClass) {
    return renderClass(staticClass, dynamicClass)
  };

  Vue.prototype.__get_style = function(dynamicStyle, staticStyle) {
    if (!dynamicStyle && !staticStyle) {
      return ''
    }
    var dynamicStyleObj = normalizeStyleBinding(dynamicStyle);
    var styleObj = staticStyle ? extend(staticStyle, dynamicStyleObj) : dynamicStyleObj;
    return Object.keys(styleObj).map(function (name) { return ((hyphenate(name)) + ":" + (styleObj[name])); }).join(';')
  };

  Vue.prototype.__map = function(val, iteratee) {
    //TODO 暂不考虑 string
    var ret, i, l, keys, key;
    if (Array.isArray(val)) {
      ret = new Array(val.length);
      for (i = 0, l = val.length; i < l; i++) {
        ret[i] = iteratee(val[i], i);
      }
      return ret
    } else if (isObject(val)) {
      keys = Object.keys(val);
      ret = Object.create(null);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[key] = iteratee(val[key], key, i);
      }
      return ret
    } else if (typeof val === 'number') {
      ret = new Array(val);
      for (i = 0, l = val; i < l; i++) {
        // 第一个参数暂时仍和小程序一致
        ret[i] = iteratee(i, i);
      }
      return ret
    }
    return []
  };

}

/*  */

var LIFECYCLE_HOOKS$1 = [
    //App
    'onLaunch',
    'onShow',
    'onHide',
    'onUniNViewMessage',
    'onPageNotFound',
    'onThemeChange',
    'onError',
    'onUnhandledRejection',
    //Page
    'onLoad',
    // 'onShow',
    'onReady',
    // 'onHide',
    'onUnload',
    'onPullDownRefresh',
    'onReachBottom',
    'onTabItemTap',
    'onAddToFavorites',
    'onShareTimeline',
    'onShareAppMessage',
    'onResize',
    'onPageScroll',
    'onNavigationBarButtonTap',
    'onBackPress',
    'onNavigationBarSearchInputChanged',
    'onNavigationBarSearchInputConfirmed',
    'onNavigationBarSearchInputClicked',
    //Component
    // 'onReady', // 兼容旧版本，应该移除该事件
    'onPageShow',
    'onPageHide',
    'onPageResize'
];
function lifecycleMixin$1(Vue) {

    //fixed vue-class-component
    var oldExtend = Vue.extend;
    Vue.extend = function(extendOptions) {
        extendOptions = extendOptions || {};

        var methods = extendOptions.methods;
        if (methods) {
            Object.keys(methods).forEach(function (methodName) {
                if (LIFECYCLE_HOOKS$1.indexOf(methodName)!==-1) {
                    extendOptions[methodName] = methods[methodName];
                    delete methods[methodName];
                }
            });
        }

        return oldExtend.call(this, extendOptions)
    };

    var strategies = Vue.config.optionMergeStrategies;
    var mergeHook = strategies.created;
    LIFECYCLE_HOOKS$1.forEach(function (hook) {
        strategies[hook] = mergeHook;
    });

    Vue.prototype.__lifecycle_hooks__ = LIFECYCLE_HOOKS$1;
}

/*  */

// install platform patch function
Vue.prototype.__patch__ = patch;

// public mount method
Vue.prototype.$mount = function(
    el ,
    hydrating 
) {
    return mountComponent$1(this, el, hydrating)
};

lifecycleMixin$1(Vue);
internalMixin(Vue);

/*  */

/* harmony default export */ __webpack_exports__["default"] = (Vue);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ 3)))

/***/ }),

/***/ 263:
/*!*********************************************************************************************!*\
  !*** D:/MyXiangMu/myHaoHuLuo/font-haohuluo-user/haohulu_user/components/uni-icons/icons.js ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = {
  "pulldown": "\uE588",
  "refreshempty": "\uE461",
  "back": "\uE471",
  "forward": "\uE470",
  "more": "\uE507",
  "more-filled": "\uE537",
  "scan": "\uE612",
  "qq": "\uE264",
  "weibo": "\uE260",
  "weixin": "\uE261",
  "pengyouquan": "\uE262",
  "loop": "\uE565",
  "refresh": "\uE407",
  "refresh-filled": "\uE437",
  "arrowthindown": "\uE585",
  "arrowthinleft": "\uE586",
  "arrowthinright": "\uE587",
  "arrowthinup": "\uE584",
  "undo-filled": "\uE7D6",
  "undo": "\uE406",
  "redo": "\uE405",
  "redo-filled": "\uE7D9",
  "bars": "\uE563",
  "chatboxes": "\uE203",
  "camera": "\uE301",
  "chatboxes-filled": "\uE233",
  "camera-filled": "\uE7EF",
  "cart-filled": "\uE7F4",
  "cart": "\uE7F5",
  "checkbox-filled": "\uE442",
  "checkbox": "\uE7FA",
  "arrowleft": "\uE582",
  "arrowdown": "\uE581",
  "arrowright": "\uE583",
  "smallcircle-filled": "\uE801",
  "arrowup": "\uE580",
  "circle": "\uE411",
  "eye-filled": "\uE568",
  "eye-slash-filled": "\uE822",
  "eye-slash": "\uE823",
  "eye": "\uE824",
  "flag-filled": "\uE825",
  "flag": "\uE508",
  "gear-filled": "\uE532",
  "reload": "\uE462",
  "gear": "\uE502",
  "hand-thumbsdown-filled": "\uE83B",
  "hand-thumbsdown": "\uE83C",
  "hand-thumbsup-filled": "\uE83D",
  "heart-filled": "\uE83E",
  "hand-thumbsup": "\uE83F",
  "heart": "\uE840",
  "home": "\uE500",
  "info": "\uE504",
  "home-filled": "\uE530",
  "info-filled": "\uE534",
  "circle-filled": "\uE441",
  "chat-filled": "\uE847",
  "chat": "\uE263",
  "mail-open-filled": "\uE84D",
  "email-filled": "\uE231",
  "mail-open": "\uE84E",
  "email": "\uE201",
  "checkmarkempty": "\uE472",
  "list": "\uE562",
  "locked-filled": "\uE856",
  "locked": "\uE506",
  "map-filled": "\uE85C",
  "map-pin": "\uE85E",
  "map-pin-ellipse": "\uE864",
  "map": "\uE364",
  "minus-filled": "\uE440",
  "mic-filled": "\uE332",
  "minus": "\uE410",
  "micoff": "\uE360",
  "mic": "\uE302",
  "clear": "\uE434",
  "smallcircle": "\uE868",
  "close": "\uE404",
  "closeempty": "\uE460",
  "paperclip": "\uE567",
  "paperplane": "\uE503",
  "paperplane-filled": "\uE86E",
  "person-filled": "\uE131",
  "contact-filled": "\uE130",
  "person": "\uE101",
  "contact": "\uE100",
  "images-filled": "\uE87A",
  "phone": "\uE200",
  "images": "\uE87B",
  "image": "\uE363",
  "image-filled": "\uE877",
  "location-filled": "\uE333",
  "location": "\uE303",
  "plus-filled": "\uE439",
  "plus": "\uE409",
  "plusempty": "\uE468",
  "help-filled": "\uE535",
  "help": "\uE505",
  "navigate-filled": "\uE884",
  "navigate": "\uE501",
  "mic-slash-filled": "\uE892",
  "search": "\uE466",
  "settings": "\uE560",
  "sound": "\uE590",
  "sound-filled": "\uE8A1",
  "spinner-cycle": "\uE465",
  "download-filled": "\uE8A4",
  "personadd-filled": "\uE132",
  "videocam-filled": "\uE8AF",
  "personadd": "\uE102",
  "upload": "\uE402",
  "upload-filled": "\uE8B1",
  "starhalf": "\uE463",
  "star-filled": "\uE438",
  "star": "\uE408",
  "trash": "\uE401",
  "phone-filled": "\uE230",
  "compose": "\uE400",
  "videocam": "\uE300",
  "trash-filled": "\uE8DC",
  "download": "\uE403",
  "chatbubble-filled": "\uE232",
  "chatbubble": "\uE202",
  "cloud-download": "\uE8E4",
  "cloud-upload-filled": "\uE8E5",
  "cloud-upload": "\uE8E6",
  "cloud-download-filled": "\uE8E9",
  "headphones": "\uE8BF",
  "shop": "\uE609" };exports.default = _default;

/***/ }),

/***/ 3:
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ 4:
/*!**************************************************************************!*\
  !*** D:/MyXiangMu/myHaoHuLuo/font-haohuluo-user/haohulu_user/pages.json ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ })

}]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/vendor.js.map