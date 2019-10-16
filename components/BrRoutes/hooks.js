//路由离开的时候调用
import { matchUnforcedListRefresh } from "./refresh";
import { historyQueue } from "./history";

export function routeLeave(opts = {}) {
  const { history } = opts;
  const { to, from } = history.navigator;
  const { meta } = from;
  const { refresh } = meta;
  const { unforcedList } = refresh;

  if (!historyQueue.isEmpty()) {
    //如果是back
    refresh.status = true;
    //回到初始化的query和params
    meta.query = null;
    meta.params = null;
    historyQueue.useMethod('shift');
  }

  //非强制刷新的列表
  if (refresh.status !== true && (unforcedList && unforcedList.length > 0)) {
    refresh.status = matchUnforcedListRefresh({
      fromRoute: from,
      toRoute: to
    });
  }

  console.log(from.path, refresh.status);
}