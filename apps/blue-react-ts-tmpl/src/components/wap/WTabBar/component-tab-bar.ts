import router from '@router';

const componentTabBar = {
  list: {
    items: [{
      text: '首页',
      icon: {
        font: 'bp-icon bp-icon-home',
        activeFont: 'bz-t-base'
      },
      to: '/'
    }, {
      text: 'scroll',
      icon: {
        font: 'bp-icon bp-icon-home',
        activeFont: 'bz-t-base'
      },
      to: '/'
    }, {
      text: '组件',
      icon: {
        font: 'bp-icon bp-icon-menu',
        activeFont: 'bz-t-base'
      },
      to: `/components`
    }]
  },
  active() {
    if (router.$matchRoutes([
      /^\/components\/scroll/,    //组件滑动路由
    ])) {
      return 1;
    } else {
      return 2;
    }
  }
};

export default componentTabBar;