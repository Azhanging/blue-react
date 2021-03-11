//路由离开的时候调用
import { matchUnforcedListRefresh } from "./refresh";
import { historyQueue } from "./history";
import { cache } from './cache';

export function routeLeave(opts = {}) {
  const { history } = opts;
  const { to, from } = history.navigator;
  const { meta } = from;
  const { refresh } = meta;
  const { unforcedList } = refresh;

  /*
    back的时候，都会在当前的queue里面push一项，
    到leave时候可以判定当前的路由为back，强制refresh.status为true
  */
  if (!historyQueue.isEmpty()) {
    //如果是back
    refresh.status = true;
    //回到初始化的query和params
    meta.query = null;
    meta.params = null;
    historyQueue.useMethod('shift');
  }

  //非强制刷新的列表
  /*
  * 如果通过浏览器导航触发的前进后退，back不会写进queue中，
  * 状态会保持为refresh.statue = false;
  * 如果通过过滤列表处理可以有效处理当前的缓存状态。
  * unforcedList：过滤列表有涉及到导航前进的问题，
  * 下一跳过滤是否保留缓存（导航操作会出现的问题，back 按钮操作都会处理为true）
  * */
  if (refresh.status !== true && (unforcedList && unforcedList.length > 0)) {
    refresh.status = matchUnforcedListRefresh({
      fromRoute: from,
      toRoute: to
    });
  }

  //删除缓存
  if (refresh.status === true) {
    cache.remove({
      routeKey: from.key
    });
  }

}