import axios from 'axios';

// 流水线模板
export function getPipelineList(query) {
  return axios({
    url: '/api/gPipeline/allPipelineList',
    method: 'get',
    params: query,
  });
}

// 任务模板
export function templateTypeListXXX(query) {
  return axios({
    url: '/api/templateType/list/' + query,
    method: 'get',
  });
}

export function tTaskTemplatePage(query) {
  return axios({
    url: '/api/tTaskTemplate/page',
    method: 'get',
    params: query,
  });
}

// 步骤模板
