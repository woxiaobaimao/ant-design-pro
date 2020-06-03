import axios from 'axios';

// 流水线模板
export function tPipelineTemplateFindByType(query) {
  return axios({
    url: '/api/tPipelineTemplate/findByType',
    method: 'get',
    params: query
  })
}
// 流水线列表
export function getPipelineList(query) {
  return axios({
    url: '/api/gPipeline/allPipelineList',
    method: 'get',
    params: query,
  });
}

export function deletePipelineData(id) {
  return axios({
    url: '/api/gPipeline/deletePipelineData/' + id,
    method: 'delete',
  })
}


export function gPipelineRunpipelineRun(id, obj) {
  return axios({
    url: '/api/gPipeline/pipelineRun/' + id,
    method: 'post',
    data: obj
  })
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
