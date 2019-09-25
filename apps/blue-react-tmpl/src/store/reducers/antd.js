import utils from 'blue-utils';

//antd的状态存储
const initState = {
  //弹窗状态
  activityIndicator: {
    toast: true,
    text: ``,
    animating: false
  }
};

export function antd(state = initState, action) {
  const { type, payload } = action;
  switch (type) {
    case 'CHANGE_INDICATOR':
      return utils.extend(state, {
        activityIndicator: payload
      });
    default :
      return state;
  }
}