require('./copy-dir');
const path = require('path');
const utils = require('blue-utils');
const publicReactConfig = require('../../../react-config');

function resolve(_path) {
	return path.join(__dirname, '../src', _path);
}

//@开头为项目文件，$开头为公共文件
const webpackConfig = utils.extend(publicReactConfig, {
	resolve: {
		alias: {
			'@': resolve(''),
			//资源别名
			'@assets': resolve('assets'),
			//页面别名
			'@pages': resolve('pages'),
			//路由别名
			'@router': resolve('router'),
			//状态管理
			'@store': resolve('store'),
			//配置信息
			'@config': resolve('config'),
			//公共组件
			'$components': resolve('public-components'),
		}
	}
});

module.exports = webpackConfig;