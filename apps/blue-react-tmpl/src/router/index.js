import { createBrowserHistory } from 'history';
import { useInReactRouter } from "$use-in-react-router";

//绑定路由的实例，方便外部使用
const history = createBrowserHistory();

//扩展router
useInReactRouter(history);

history.listen((location, action) => {

});

export default history;