export interface TTabBarItem {
	text?: string;
	icon?: {
		font: string;
		activeFont: string;
	},
	to: Function | string;
}


export interface TTabBarList {
	list: {
		items: TTabBarItem[]
	},
	active?: Function;
}