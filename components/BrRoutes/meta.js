import utils from 'blue-utils';

//设置
export function setMeta(route) {
  const { meta } = route;
  //设置状态
  meta.refresh = utils.extend({
    //刷新状态
    status: false,
    //强制刷新的列表
    unforcedList: []
  }, meta.refresh || {});
}