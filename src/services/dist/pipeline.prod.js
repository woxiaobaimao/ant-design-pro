'use strict';
Object.defineProperty(exports, '__esModule', { value: !0 }),
  (exports.getPipelineList = getPipelineList),
  (exports.templateTypeListXXX = templateTypeListXXX),
  (exports.tTaskTemplatePage = tTaskTemplatePage);
var _axios = _interopRequireDefault(require('axios'));
function _interopRequireDefault(e) {
  return e && e.__esModule ? e : { default: e };
}
function getPipelineList(e) {
  return (0, _axios.default)({ url: '/api/gPipeline/allPipelineList', method: 'get', params: e });
}
function templateTypeListXXX(e) {
  return (0, _axios.default)({ url: '/api/templateType/list/' + e, method: 'get' });
}
function tTaskTemplatePage(e) {
  return (0, _axios.default)({ url: '/api/tTaskTemplate/page', method: 'get', params: e });
}
