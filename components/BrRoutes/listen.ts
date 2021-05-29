import utils from 'blue-utils';

//设置监听
/*
export function setHistoryListen(opts = {}) {
  const { history, routerBefore } = opts;
  const unListen = history.listen(() => {
    //处理router before
    utils.hook(null, routerBefore, [{
      history
    }]);
  });
  //手动触发事件
  const { pathname, search } = history.location;
  //手动触发一次
  history.replace(`${pathname}${search}`, undefined, true);
  return unListen;
}*/
