import utils from 'blue-utils';

//设置
export function setMeta(route) {
  !route.meta && (route.meta = {});
  //设置状态
  route.meta = utils.extend({
    refresh: {
      //刷新状态
      status: false,
      //强制刷新的列表
      unforcedList: []
    }
  }, route.meta || {});
}