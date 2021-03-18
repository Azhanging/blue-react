import utils from 'blue-utils';
import history from '@router';
import config from '@config';
import {Toast} from 'antd-mobile';

//跳转到登录页面
export function routerToLogin () {
	const {backUrl}: { backUrl: string } = history.config.params;
	history.replace(`${config.path.login}?${backUrl}=${encodeURIComponent(history.location.pathname)}`);
}

//未登录
export function unLogin () {
	Toast.info('跳转登录中...', 6000);
	//跳转到登录
	routerToLogin();
}

//登录超时
export function loginExpire () {
	clearLoginStorage();
	routerToLogin();
}

//设置登录状态到本地存储
export function setLoginStorage ( data: { [ propName: string ]: string; } ) {
	utils.each(config.login.storage, ( key: string ) => {
		(key in data) && localStorage.setItem(key, data[ key ]);
	});
}

//删除登录态
export function clearLoginStorage () {
	utils.each(config.login.storage, ( key: string ) => {
		localStorage.removeItem(key);
	});
}