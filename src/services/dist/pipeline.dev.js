"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tPipelineTemplateFindByType = tPipelineTemplateFindByType;
exports.tPipelineTemplateId = tPipelineTemplateId;
exports.deleteTemplate = deleteTemplate;
exports.getPipelineList = getPipelineList;
exports.deletePipelineData = deletePipelineData;
exports.gPipelineRunpipelineRun = gPipelineRunpipelineRun;
exports.ePipelineCreatePipeline = ePipelineCreatePipeline;
exports.templateTypeListXXX = templateTypeListXXX;
exports.tTaskTemplatePage = tTaskTemplatePage;
exports.tTaskTemplategetTaskTemplate = tTaskTemplategetTaskTemplate;
exports.tTaskTemplatedeleteTaskTemplate = tTaskTemplatedeleteTaskTemplate;
exports.tTaskTemplateAddTaskTemplate = tTaskTemplateAddTaskTemplate;

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// 流水线模板
function tPipelineTemplateFindByType(query) {
  return (0, _axios["default"])({
    url: '/api/tPipelineTemplate/findByType',
    method: 'get',
    params: query
  });
}

function tPipelineTemplateId(id) {
  return (0, _axios["default"])({
    url: '/pipeline/tPipelineTemplate/' + id,
    method: 'post'
  });
}

function deleteTemplate(id) {
  return (0, _axios["default"])({
    url: '/api///tPipelineTemplate/' + id,
    method: 'get'
  });
} // 流水线列表


function getPipelineList(query) {
  return (0, _axios["default"])({
    url: '/api/gPipeline/allPipelineList',
    method: 'get',
    params: query
  });
}

function deletePipelineData(query) {
  return (0, _axios["default"])({
    url: '/api/gPipeline/deletePipelineData/' + query,
    method: 'delete'
  });
}

function gPipelineRunpipelineRun(id, obj) {
  return (0, _axios["default"])({
    url: '/api/gPipeline/pipelineRun/' + id,
    method: 'post',
    data: obj
  });
}

function ePipelineCreatePipeline(id, obj) {
  return (0, _axios["default"])({
    url: '/api/ePipeline/createPipeline/' + id,
    method: 'post',
    data: obj
  });
} // 任务模板


function templateTypeListXXX(query) {
  return regeneratorRuntime.async(function templateTypeListXXX$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          return _context.abrupt("return", (0, _axios["default"])({
            url: '/api/templateType/list/' + query,
            method: 'get'
          }));

        case 1:
        case "end":
          return _context.stop();
      }
    }
  });
}

function tTaskTemplatePage(query) {
  return regeneratorRuntime.async(function tTaskTemplatePage$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          return _context2.abrupt("return", (0, _axios["default"])({
            url: '/api/tTaskTemplate/page',
            method: 'get',
            params: query
          }));

        case 1:
        case "end":
          return _context2.stop();
      }
    }
  });
}

function tTaskTemplategetTaskTemplate(query) {
  return regeneratorRuntime.async(function tTaskTemplategetTaskTemplate$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          return _context3.abrupt("return", (0, _axios["default"])({
            url: '/api/tTaskTemplate/getTaskTemplate/' + query,
            method: 'get'
          }));

        case 1:
        case "end":
          return _context3.stop();
      }
    }
  });
}

function tTaskTemplatedeleteTaskTemplate(obj) {
  return regeneratorRuntime.async(function tTaskTemplatedeleteTaskTemplate$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          return _context4.abrupt("return", (0, _axios["default"])({
            url: '/api/tTaskTemplate/deleteTaskTemplate',
            method: 'post',
            data: obj
          }));

        case 1:
        case "end":
          return _context4.stop();
      }
    }
  });
}

function tTaskTemplateAddTaskTemplate(obj) {
  return regeneratorRuntime.async(function tTaskTemplateAddTaskTemplate$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          return _context5.abrupt("return", (0, _axios["default"])({
            url: '/api/tTaskTemplate/addTaskTemplate',
            method: 'post',
            data: obj
          }));

        case 1:
        case "end":
          return _context5.stop();
      }
    }
  });
} // 步骤模板