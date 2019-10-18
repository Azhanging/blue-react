import utils from 'blue-utils';
import BlueQueuePipe from 'blue-queue-pipe';
import { setRouteNavigator } from "./navigator";

//历史队列
export const historyQueue = new BlueQueuePipe({
  methods: {
    shift() {
      return this.queue.shift();
    }
  }
});

//设置query
function setQuery(location) {
//设置参数
  location.query = utils.parseParams(utils.getLinkParams(location.search));
}

//设置route参数
function setRoute(opts = {}) {
  const {
    history,
    location,
    currentRoute,
    match
  } = opts;

  history.route = {
    key: location.key,
    ...match,
    query: utils.extend({}, location.query),
    meta: currentRoute.meta || {},
    raw: currentRoute
  };
}

//设置和扩展history
export function setHistory(opts = {}) {
  const { routeProps, currentRoute } = opts;
  const { history, match } = routeProps;
  const { location } = history;

  //设置query
  setQuery(location);

  //设置路由
  setRoute({
    history,
    location,
    currentRoute,
    match
  });

  //设置导航to和from
  setRouteNavigator(history);
}