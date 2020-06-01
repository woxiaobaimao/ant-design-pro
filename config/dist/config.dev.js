'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports['default'] = void 0;

var _os = _interopRequireDefault(require('os'));

var _router = _interopRequireDefault(require('./router.config'));

var _plugin = _interopRequireDefault(require('./plugin.config'));

var _defaultSettings = _interopRequireDefault(require('../src/defaultSettings'));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly)
      symbols = symbols.filter(function(sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
    keys.push.apply(keys, symbols);
  }
  return keys;
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    if (i % 2) {
      ownKeys(source, true).forEach(function(key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(source).forEach(function(key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }
  return target;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true,
    });
  } else {
    obj[key] = value;
  }
  return obj;
}

var plugins = [
  [
    'umi-plugin-react',
    _objectSpread(
      {
        antd: true,
        dva: {
          hmr: true,
        },
        targets: {
          ie: 11,
        },
        locale: {
          enable: true,
          // default false
          default: 'zh-CN',
          // default zh-CN
          baseNavigator: true, // default true, when it is true, will use `navigator.language` overwrite default
        },
        dynamicImport: {
          loadingComponent: './components/PageLoading/index',
        },
      },
      !process.env.TEST && _os['default'].platform() === 'darwin'
        ? {
            dll: {
              include: ['dva', 'dva/router', 'dva/saga', 'dva/fetch'],
              exclude: ['@babel/runtime'],
            },
            hardSource: true,
          }
        : {}
    ),
  ],
]; // judge add ga

if (process.env.APP_TYPE === 'site') {
  plugins.push([
    'umi-plugin-ga',
    {
      code: 'UA-72788897-6',
    },
  ]);
}

var _default = {
  // add for transfer to umi
  plugins: plugins,
  targets: {
    ie: 11,
  },
  define: {
    APP_TYPE: process.env.APP_TYPE || '',
  },
  // 路由配置
  routes: _router['default'],
  // Theme for antd
  // https://ant.design/docs/react/customize-theme-cn
  theme: {
    'primary-color': _defaultSettings['default'].primaryColor,
  },
  externals: {
    '@antv/data-set': 'DataSet',
  },
  proxy: {
    '/api/': {
      target: 'http://xpboot.cn:9878',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '',
      },
    },
  },
  ignoreMomentLocale: true,
  lessLoaderOptions: {
    javascriptEnabled: true,
  },
  disableRedirectHoist: true,
  cssLoaderOptions: {
    modules: true,
    getLocalIdent: function getLocalIdent(context, localIdentName, localName) {
      if (
        context.resourcePath.includes('node_modules') ||
        context.resourcePath.includes('ant.design.pro.less') ||
        context.resourcePath.includes('global.less')
      ) {
        return localName;
      }

      var match = context.resourcePath.match(/src(.*)/);

      if (match && match[1]) {
        var antdProPath = match[1].replace('.less', '');
        var arr = antdProPath
          .split('/')
          .map(function(a) {
            return a.replace(/([A-Z])/g, '-$1');
          })
          .map(function(a) {
            return a.toLowerCase();
          });
        return 'antd-pro'
          .concat(arr.join('-'), '-')
          .concat(localName)
          .replace(/--/g, '-');
      }

      return localName;
    },
  },
  manifest: {
    basePath: '/',
  },
  chainWebpack: _plugin['default'],
};
exports['default'] = _default;
