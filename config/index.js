import { getCurrentDevice } from '$assets/js/device';

const config = {

  //获取用户用户信息
  user: {
    url: ''
  },

  //视图相关
  view: {
    title: "blue-react-tmpl-title",       //默认的文档标题
    tabBar: {
      name: ``
    }
  },

  //路由相关
  router: {
    //路由模式
    mode: 'history',
    hooks: {
      //没有after hook执行
      unAfterHook() {
        console.log(`unAfterHook`);
      }
    }
  },

  //设备
  device: getCurrentDevice(),

  //环境相关
  env: {
    dev: true,                     //开发环境
    test: false,
    beta: false,                    //beta环境
    prod: false                     //生产环境
  },

  //路径相关
  path: {
    base: location.origin,                     //域名
    home: '/',                                  //首页地址
    indexPath: location.origin,                 //服务器的html入口
    static: location.origin,                    //静态资源域名
    login: ``,                                  //登陆地址
    bindPhone: ``                               //绑定手机地址
  },

  //登录状态
  login: {
    in: {
      url: ``,          //token的login api请求
    },
    //登录退出相关
    out: {
      url: ``,    //请求url
      backUrl: ``   //退出后到的路由地址，不存在跳回到首页
    },
    storage: {
      ['token']: `token`
    }
  },

  //微信相关
  weChat: {
    getConfig: {
      type: 'get',
      url: '/api/wechat_config/index',
      data: {}
    }
  },

  //公共的分享相关
  share: {
    origin: '',                         //分享的域名
    title: "blue-react-tmpl",             //分享的标题
    deps: "blue-react-tmpl is react public template",     //分享的简介
    imgUrl: "",                         //分享图片
    //分享相关的参数的
    params: {
      phone: 'n',                     //绑定参数
      backUrl: 'backUrl',    //绑定后重定向回来的参数
    }
  },

  //绑定相关
  bind: {

    //角色绑定
    relation: {
      url: ''
    },

    //绑定手机
    phone: {
      url: '/member/personal/deitor_phone'
    }
  },

  //错误相关
  error: {
    404: {
      path: '/error-page/error-page-404'
    }
  },

  //request相关
  request: {
    options: {
      timeout: 3000,
      showLoading: true,
      showToast: false
    }
  },

  /*
  * debug模式
  * 1.关闭axios跳转到错误页面
  * */
  debug: false

};

export default config;