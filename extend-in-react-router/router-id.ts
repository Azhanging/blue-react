//路由id
class RouterID {
	id: number;

	constructor () {
		this.id = 0;
	}

	//设置添加当前id
	setCurrentID () {
		++this.id;
	}

	//获取当前id
	getCurrentID (): number {
		return this.id;
	}

	//判断是否符合当前id
	isCurrentID ( id: number ) {
		return this.id === id;
	}
}

export default RouterID;