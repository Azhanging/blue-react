/*react中方向代理处理*/
const path = require('path');
const proxy = require('http-proxy-middleware');
const mockServer = require('blue-mock-server');
const port = require('../react-config/port');

function resolve(dir) {
  return path.join(__dirname, dir);
}

function proxyHandler(app) {

  //mock-server
  /*mockServer({
    app,
    mockDir: resolve('../mock'),          //mock路径，用于更新path使用,
    apiFilePath: resolve('../mock/api')     //api路径，用于更新path使用
  });*/

  //接口代理
  app.use(proxy("/api", {
    target: "http://localhost:3000",
    changeOrigin: true
  }));

  //模拟数据
  app.use(proxy("/mock", {
    target: `http:localhost:${port}/mock`,
  }));
}

module.exports = proxyHandler;