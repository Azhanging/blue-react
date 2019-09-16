const path = require('path');

function resolve(_path) {
  return path.join(__dirname, '../src', _path);
}

//@开头为项目文件，$开头为公共文件
const webpackConfig = {
  resolve: {
    alias: {
      '@': resolve(''),
      //资源别名
      '@assets': resolve('assets'),
      //页面别名
      '@pages': resolve('pages'),
      //路由别名
      '@router': resolve('router'),

      '$assets': resolve('public-assets'),
      '$components': resolve('public-component'),
    }
  }
};

module.exports = webpackConfig;