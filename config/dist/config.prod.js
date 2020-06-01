'use strict';
Object.defineProperty(exports, '__esModule', { value: !0 }), (exports.default = void 0);
var _os = _interopRequireDefault(require('os')),
  _router = _interopRequireDefault(require('./router.config')),
  _plugin = _interopRequireDefault(require('./plugin.config')),
  _defaultSettings = _interopRequireDefault(require('../src/defaultSettings'));
function _interopRequireDefault(e) {
  return e && e.__esModule ? e : { default: e };
}
function ownKeys(r, e) {
  var t,
    n = Object.keys(r);
  return (
    Object.getOwnPropertySymbols &&
      ((t = Object.getOwnPropertySymbols(r)),
      e &&
        (t = t.filter(function(e) {
          return Object.getOwnPropertyDescriptor(r, e).enumerable;
        })),
      n.push.apply(n, t)),
    n
  );
}
function _objectSpread(r) {
  for (var e = 1; e < arguments.length; e++) {
    var t = null != arguments[e] ? arguments[e] : {};
    e % 2
      ? ownKeys(t, !0).forEach(function(e) {
          _defineProperty(r, e, t[e]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(r, Object.getOwnPropertyDescriptors(t))
        : ownKeys(t).forEach(function(e) {
            Object.defineProperty(r, e, Object.getOwnPropertyDescriptor(t, e));
          });
  }
  return r;
}
function _defineProperty(e, r, t) {
  return (
    r in e
      ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 })
      : (e[r] = t),
    e
  );
}
var plugins = [
  [
    'umi-plugin-react',
    _objectSpread(
      {
        antd: !0,
        dva: { hmr: !0 },
        targets: { ie: 11 },
        locale: { enable: !0, default: 'zh-CN', baseNavigator: !0 },
        dynamicImport: { loadingComponent: './components/PageLoading/index' },
      },
      process.env.TEST || 'darwin' !== _os.default.platform()
        ? {}
        : {
            dll: {
              include: ['dva', 'dva/router', 'dva/saga', 'dva/fetch'],
              exclude: ['@babel/runtime'],
            },
            hardSource: !0,
          }
    ),
  ],
];
'site' === process.env.APP_TYPE && plugins.push(['umi-plugin-ga', { code: 'UA-72788897-6' }]);
var _default = {
  plugins: plugins,
  targets: { ie: 11 },
  define: { APP_TYPE: process.env.APP_TYPE || '' },
  routes: _router.default,
  theme: { 'primary-color': _defaultSettings.default.primaryColor },
  externals: { '@antv/data-set': 'DataSet' },
  proxy: {
    '/api/': { target: 'http://xpboot.cn:9878', changeOrigin: !0, pathRewrite: { '^/api': '' } },
  },
  ignoreMomentLocale: !0,
  lessLoaderOptions: { javascriptEnabled: !0 },
  disableRedirectHoist: !0,
  cssLoaderOptions: {
    modules: !0,
    getLocalIdent: function(e, r, t) {
      if (
        e.resourcePath.includes('node_modules') ||
        e.resourcePath.includes('ant.design.pro.less') ||
        e.resourcePath.includes('global.less')
      )
        return t;
      var n = e.resourcePath.match(/src(.*)/);
      if (n && n[1]) {
        var a = n[1]
          .replace('.less', '')
          .split('/')
          .map(function(e) {
            return e.replace(/([A-Z])/g, '-$1');
          })
          .map(function(e) {
            return e.toLowerCase();
          });
        return 'antd-pro'
          .concat(a.join('-'), '-')
          .concat(t)
          .replace(/--/g, '-');
      }
      return t;
    },
  },
  manifest: { basePath: '/' },
  chainWebpack: _plugin.default,
};
exports.default = _default;
