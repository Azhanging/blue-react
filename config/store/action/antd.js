import types from '../types';
import utils from 'blue-utils';
import { initActivityIndicatorState } from '../reducers/antd';

//返回修改类型
export function TOGGLE_ACTIVITY_INDICATOR(payload) {
  return {
    type: types.TOGGLE_ACTIVITY_INDICATOR,
    payload: utils.extend(initActivityIndicatorState(), payload)
  }
}