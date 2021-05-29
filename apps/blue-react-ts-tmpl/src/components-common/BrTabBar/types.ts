//tabBar图标
export interface TabBarIcon {
	src?: string;
	activeSrc?: string;
	font?: string;
	activeFont?: string;
}

//tabBar项类型
export interface TabBarItem {
	//跳转
	to?: Function | string;
	//图标
	icon?: TabBarIcon;
	//文字描述
	text?: string;
}