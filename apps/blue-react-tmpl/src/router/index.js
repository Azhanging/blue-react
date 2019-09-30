import { createBrowserHistory } from 'history';

//绑定路由的实例，方便外部使用
const history = createBrowserHistory();

history.listen((location, action) => {

});

export default history;