"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tPipelineTemplateFindByType = tPipelineTemplateFindByType;
exports.getPipelineList = getPipelineList;
exports.templateTypeListXXX = templateTypeListXXX;
exports.tTaskTemplatePage = tTaskTemplatePage;

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// 流水线模板
function tPipelineTemplateFindByType(query) {
  return (0, _axios["default"])({
    url: '/api/tPipelineTemplate/findByType',
    method: 'get',
    params: query
  });
} // 流水线列表


function getPipelineList(query) {
  return (0, _axios["default"])({
    url: '/api/gPipeline/allPipelineList',
    method: 'get',
    params: query
  });
} // 任务模板


function templateTypeListXXX(query) {
  return (0, _axios["default"])({
    url: '/api/templateType/list/' + query,
    method: 'get'
  });
}

function tTaskTemplatePage(query) {
  return (0, _axios["default"])({
    url: '/api/tTaskTemplate/page',
    method: 'get',
    params: query
  });
} // 步骤模板