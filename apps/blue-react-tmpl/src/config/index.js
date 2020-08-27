import publicConfig from '$config';
import utils from 'blue-utils';
//环境
const env = require('./env');

const config = utils.extend(publicConfig, {
  view: {
    title: "我是项目默认标题",
    tabBar: {
      name: `home`
    }
  },
  env,
  path: {
    base: window.location.origin,
    static: window.location.origin
  },
  share: {
    title: "blue-react-tmpl",
    deps: "blue-react-tmpl is vue public template",
    imgUrl: ""
  },

  debug: true
});

export default config;