"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _pipeline = require("@/services/pipeline");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Model = {
  namespace: 'taskTemplate',
  state: {
    list: []
  },
  effects: {
    initType:
    /*#__PURE__*/
    regeneratorRuntime.mark(function initType(_ref, _ref2) {
      var payload, call, put, response;
      return regeneratorRuntime.wrap(function initType$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              payload = _ref.payload;
              call = _ref2.call, put = _ref2.put;
              _context.next = 4;
              return call(_pipeline.templateTypeListXXX, payload);

            case 4:
              response = _context.sent;
              _context.next = 7;
              return put({
                type: 'queryType',
                payload: response.data.data
              });

            case 7:
            case "end":
              return _context.stop();
          }
        }
      }, initType);
    }),
    initList:
    /*#__PURE__*/
    regeneratorRuntime.mark(function initList(_ref3, _ref4) {
      var payload, call, put, response;
      return regeneratorRuntime.wrap(function initList$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              payload = _ref3.payload;
              call = _ref4.call, put = _ref4.put;
              _context2.next = 4;
              return call(_pipeline.tTaskTemplatePage, payload);

            case 4:
              response = _context2.sent;
              _context2.next = 7;
              return put({
                type: 'queryList',
                payload: response.data.data
              });

            case 7:
            case "end":
              return _context2.stop();
          }
        }
      }, initList);
    })
  },
  reducers: {
    queryType: function queryType(state, action) {
      return _objectSpread({}, state, {
        type: action.payload
      });
    },
    queryList: function queryList(state, action) {
      return _objectSpread({}, state, {
        list: action.payload
      });
    }
  }
};
var _default = Model;
exports["default"] = _default;