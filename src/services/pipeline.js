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

export function deletePipelineData(query) {
  return axios({
    url: '/api/gPipeline/deletePipelineData/' + query,
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
export async function templateTypeListXXX(query) {
  return axios({
    url: '/api/templateType/list/' + query,
    method: 'get',
  });
}

export async function tTaskTemplatePage(query) {
  return axios({
    url: '/api/tTaskTemplate/page',
    method: 'get',
    params: query,
  });
}

export async function tTaskTemplategetTaskTemplate(query) {
  return axios({
    url: '/api/tTaskTemplate/getTaskTemplate/' + query,
    method: 'get'
  })
}

export async function tTaskTemplatedeleteTaskTemplate(obj) {
  return axios({
    url: '/api/tTaskTemplate/deleteTaskTemplate',
    method: 'post',
    data: obj
  })
}

export async function tTaskTemplateAddTaskTemplate(obj) {
  return axios({
    url: '/api/tTaskTemplate/addTaskTemplate',
    method: 'post',
    data: obj
  })
}

// 步骤模板
