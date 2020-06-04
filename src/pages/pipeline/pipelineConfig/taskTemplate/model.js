import {
  templateTypeListXXX,
  tTaskTemplatePage,
  tTaskTemplategetTaskTemplate,
  tTaskTemplatedeleteTaskTemplate
} from '@/services/pipeline';

const Model = {
  namespace: 'taskTemplate',
  state: {
    list: [],
  },
  effects: {
    *initType({ payload }, { call, put }) {
      const response = yield call(templateTypeListXXX, payload);
      yield put({
        type: 'queryType',
        payload: response.data.data,
      });
    },
    *initList({ payload }, { call, put }) {
      const response = yield call(tTaskTemplatePage, payload);
      yield put({
        type: 'queryList',
        payload: response.data.data,
      });
    },
  },
  reducers: {
    queryType(state, action) {
      return { ...state, type: action.payload };
    },
    queryList(state, action) {
      return { ...state, list: action.payload };
    },
  },
};
export default Model;
