import {FC, ComponentType} from 'react';
import {History} from "history";

//路由配置
export interface TRoutesRoute {
	path: string;
	exact?: boolean;
	strict?: boolean;
	children?: TRoutesRoute[];
	component: FC<any> | ComponentType<any>;
	meta?: {
		[ propName: string ]: any;
	}
}

//history中的route类型
export interface THistoryRoute {
	//路由key
	key: string;
	//参数
	query: {
		[ propName: string ]: any;
	};
	//参数
	params: {
		[ propName: string ]: any;
	};
	//设置传值参
	meta: {
		refresh: {
			status: boolean;
			unforcedList: (string | RegExp)[];
		};
		[ propName: string ]: any;
	};
	//原始地址
	raw: string;
	fullPath: string;

	[ propName: string ]: any;
}

export interface THistory extends History {
	//当前的路由信息
	route?: THistoryRoute;
	//路由模式
	mode?: string;

	//获取原始地址
	$getFullPath? (): string;

	//后退
	$goBack? (): void;

	$matchRoutes? ( routesRegExp: RegExp[] ): boolean;

	$getParam? ( key: string ): string;

	$getMeta? (): any;

	$getModePath? (): string;

	$getHref? (): string;

	//路由导航
	navigator?: {
		to: THistoryRoute;
		from: THistoryRoute;
	}
}
