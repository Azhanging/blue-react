import utils from 'blue-utils';
import {TRoutesRoute, THistoryRouteMeta} from './types';

//设置
export function setMeta ( route: TRoutesRoute ) {
	!route.meta && ((route.meta = {} as THistoryRouteMeta));
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