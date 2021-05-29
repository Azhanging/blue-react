const path = require('path');

function resolve(_path) {
  return path.join(__dirname, '..', _path);
}

const reactConfig = {
  resolve: {
    alias: {
      '$config': resolve('config'),
      '$extend-in-react': resolve('extend-in-react'),
      '$extend-in-react-router': resolve('extend-in-react-router'),
      '$store': resolve('config/store'),
      '$assets': resolve('assets'),
      '$code': resolve('code'),
      '$wechat': resolve(`extend-in-react/wechat`),
      '$axios': resolve('extend-in-react/axios'),
      '$api': resolve('api'),
    }
  }
};

module.exports = reactConfig;