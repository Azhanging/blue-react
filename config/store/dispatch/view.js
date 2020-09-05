import types from '@store/types';
import store from '@store';

//dispatch修改view状态
export function VIEW(payload) {
  store.dispatch({
    type: types.VIEW,
    payload
  });
}
