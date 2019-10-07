import publicConfig from '$config';
import utils from 'blue-utils';
//环境
const env = require('./env');

const config = utils.extend(publicConfig, {
  view: {
    title: "我是项目默认标题",
    tabBar: 'home',
    keepAlive: {
      exclude: [
        'validate'
      ]
    }
  },
  env,
  path: {
    base: window.location.origin,
    static: window.location.origin
  },
  share: {
    title: "blue-vue-tmpl",
    deps: "blue-vue-tmpl is vue public template",
    imgUrl: ""
  },
  login: {
    mode: `token`
  }
});

export default config;