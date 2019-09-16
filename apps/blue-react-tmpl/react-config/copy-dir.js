const {copyDir} = require('../../../react-config/copy-dir');
const path = require('path');
const chokidar = require('chokidar');

function resolve(_path) {
	return path.join(__dirname, '../src', _path);
}

//中间层路径
const middlewarePath = resolve('../../..');

//文件列表

const copyDirOpts = {
	blackList: [
		/blue-component/ig
	],
	dirList: [{
		dirPath: path.join(middlewarePath, 'components'),
		destPath: resolve(''),
		destDirName: 'public-components'
	}, {
		dirPath: path.join(middlewarePath, 'assets'),
		destPath: resolve(''),
		destDirName: 'public-assets'
	}]
};


function watchDir(copyDirOpts) {
	const {dirList} = copyDirOpts;
	(dirList || []).forEach((opts) => {
		const {dirPath} = opts;
		chokidar.watch(dirPath, {
			ignoreInitial: true
		}).on('all', (event, path) => {
			//插件文件的变化或者新增的文件
			if (event === 'change' || event === 'add') {
				//复制文件夹
				copyDir(copyDirOpts);
				console.log(`file change:`, path);
			}
		});
	});
}

//复制文件夹
copyDir(copyDirOpts);

//监听文件更新
watchDir(copyDirOpts);

