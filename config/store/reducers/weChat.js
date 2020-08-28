import types from '@store/types';
import utils from 'blue-utils';
import initState from '@store/state';

export function weChat(state = initState.weChat, action) {
  const { type, payload } = action;
  switch (type) {
    case types.WECHAT:
      return utils.extend(state, payload);
    default:
      return state;
  }
}
