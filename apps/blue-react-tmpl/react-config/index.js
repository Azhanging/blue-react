const path = require('path');

function resolve(_path) {
  return path.join(__dirname, '..', _path);
}

//@开头为项目文件，$开头为公共文件
const webpackConfig = {
  resolve: {
    alias: {
      '@assets': resolve('assets'),
      '$assets': resolve('public-assets'),
      '$components': resolve('public-component'),
    }
  }
};

module.exports = webpackConfig;