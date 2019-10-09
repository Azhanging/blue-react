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
  mockServer({
    app,
    mockDir: resolve('../mock'),          //mock路径，用于更新path使用,
    apiFilePath: resolve('../mock/api')     //api路径，用于更新path使用
  });

  //接口代理
  app.use(proxy("/api", {
    target: "https://jiaxiao.dtb315.com",
    changeOrigin: true,
    //代理登录状态cookie
    onProxyReq(proxyReq) {
      proxyReq.setHeader('cookie', 'b72b76241459936962c978f326f7463b=%25B1%25B8%25BCe%25B1%259A%25AB%25AF; 9de70f6546b2452f6e7b98b46ac36070=f4a41c895ac4db9ab2d191674fc4f5c1; Hm_lvt_bdb7f9abf5cdbcb7d50419d7c6bd1be5=1554687182; PHPSESSID=btac5up10t4qi8ml8lvb1i9ai0; Hm_lvt_26e7ebdd6d0690ee128988fb6ebcdd4a=1553828518,1554259051,1554687183,1554706326; Hm_lpvt_26e7ebdd6d0690ee128988fb6ebcdd4a=1554706326; come_from=1; prev_page=aHR0cDovL2cuZHRiMzE1LmNvbS9tZW1iZXIvaW5kZXguaHRtbD9ib3R0b209MSZ0eXBlPW1lbWNhY2hl; visit_page=aHR0cDovL2cuZHRiMzE1LmNvbS9tZW1iZXIvbWVtYmVyL2NvbW1vbg%3D%3D');
    }
  }));

  //模拟数据
  app.use(proxy("/mock", {
    target: `http:localhost:${port}/mock`,
  }));
}

module.exports = proxyHandler;