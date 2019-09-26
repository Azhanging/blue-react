import types from '../types';

//返回修改类型
export function TOGGLE_ACTIVITY_INDICATOR(payload) {
  return {
    type: types.TOGGLE_ACTIVITY_INDICATOR,
    payload
  }
}