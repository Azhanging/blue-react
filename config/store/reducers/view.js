import types from '@store/types';
import utils from 'blue-utils';
import _state from '@store/state';

//视图相关的state
export function view(state = _state.view, action) {
  const { type, payload } = action;
  switch (type) {
    case types.SET_VIEW:
      return utils.extend(state, payload);
    default:
      return state;
  }
}