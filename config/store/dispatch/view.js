import types from '@store/types';
import store from '@store';

//dispatch修改view状态
export function SET_VIEW(payload) {
  store.dispatch({
    type: types.SET_VIEW,
    payload
  });
}
