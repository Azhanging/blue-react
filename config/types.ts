interface TUser {
	url?: string;
}

interface TViews {
	//默认的文档标题
	title: string;
	//默认tabBar-name
	tabBar: {
		name: string;
	}
}

//路由配置
interface TRouter {
	//路由模式
	mode: 'hash' | 'history';
	hooks: {
		//没有after hook执行
		unAfterHook? (): void;
	}
}

//设备相关
interface TDevice {
	//是否在微信端
	isWeChat: boolean;
	//是否为移动设备
	isWap: boolean;
	//是否iphone
	isIPhone: boolean;
	//是否ipad
	isIPad: boolean;
	//是否安卓
	isAndroid: boolean;
	//是否为电脑端
	isPc: boolean;
	//是否为app端webview
	isApp: boolean;
	//是否在服务器端 预留ssr处理
	isServer: boolean;
}

//地址相关
interface TPath {
	[ propName: string ]: any;
}

//登录相关
interface TLogin {
	//登录操作
	in?: {
		url: string;
	};
	//登出操作
	out?: {
		url: string;
		backUrl: string;
	};
	//登录存储
	storage: {
		[ propName: string ]: string;
	}
}

//微信相关
interface TWeChat {
	getConfig: {
		type: string;
		url: string;
		data: any;
	}
}

//分享相关
interface TShare {
	origin: string;
	title: string;
	deps: string;
	imgUrl: string;
	params: any;
}

//配置相关信息
export interface TConfig {
	//用户配置
	user?: TUser;
	//视图相关配置
	views?: TViews;
	//路由配置
	router?: TRouter;
	//设备相关
	device?: TDevice;
	//地址相关
	path?: TPath;
	//登录相关
	login?: TLogin;
	//微信相关
	weChat?: TWeChat;
	//分享相关
	share?: TShare;
	//错误相关
	error?: {
		[ propName: string ]: {
			path: string;
		};
	};
	//请求相关
	request?: {
		options: {
			timeout: number;
			showLoading: boolean;
			showToast: boolean;
		}
	};

	/*
	* debug模式
	* 1.关闭axios跳转到错误页面
	* */
	debug?: boolean;


	[ propName: string ]: any;
}