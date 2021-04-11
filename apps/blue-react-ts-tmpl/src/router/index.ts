import config from '@config';
import {createHistory} from "$components/BrRoutes/history";
import RouterID from '$extend-in-react-router/router-id';

//绑定路由的实例，方便外部使用
const history = createHistory({
	mode: config.router.mode
});

//路由标记
export const routerID = new RouterID();

export default history;