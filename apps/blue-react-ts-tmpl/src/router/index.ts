import config from '@config';
import {createHistory} from "$components/BrRoutes/history";
import RouterID from '$extend-in-react-router/router-id';
import routerBefore from '$extend-in-react-router/router-before';
import routerAfter from '$extend-in-react-router/router-after';

//绑定路由的实例，方便外部使用
const history = createHistory({
	mode: config.router.mode
});

history.listen(( route, state ) => {
	//页面进入
	if (state === 'PUSH') {
		routerBefore();
		setTimeout(()=>{
			routerAfter({
				history
			});
		});
	}
});

//路由标记
export const routerID = new RouterID();

export default history;