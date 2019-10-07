import history from '@router';

const homeTabBar = {
  list: {
    items: [{
      content: {
        value: '测试首页',
        fontSize: 10
      },
      icon: {
        src: 'https://www.dtb315.com/Static/wap/home/images/bottom_btn/home.png',
        activeSrc: 'https://www.dtb315.com/Static/wap/home/images/bottom_btn/home-active.png',
        style: {
          width: `20px`,
          height: `20px`
        },
        direction: 'Top'
      },
      to: '/',
      className: 'bc-pd-5 bc-bd-r-e5e'
    }, {
      content: {
        value: '首页',
        fontSize: 10
      },
      icon: {
        src: 'https://www.dtb315.com/Static/wap/home/images/bottom_btn/home.png',
        activeSrc: 'https://www.dtb315.com/Static/wap/home/images/bottom_btn/home-active.png',
        style: {
          width: `20px`,
          height: `20px`
        },
        direction: 'Bottom'
      },
      to: '/',
      className: 'bc-pd-5 bc-bd-r-e5e',
      fontSize: 10
    }, {
      content: {
        value: '组件',
        fontSize: 10
      },
      icon: {
        src: 'https://www.dtb315.com/Static/wap/home/images/bottom_btn/allclass.png',                       //没选中的src图片
        activeSrc: 'https://www.dtb315.com/Static/wap/home/images/bottom_btn/allclass-active.png',
        direction: 'Left',
        style: {
          width: '20px',
          height: '20px'
        }
      },
      to: '/components',
      className: 'bc-pd-5'
    }]
  },
  active(opts = {}) {
    const { setActiveIndex } = opts;
    if (history.$matchRoutes([
        /^\/component.*/,    //组件路由
      ])) {
      setActiveIndex(1);
    } else {
      setActiveIndex(0)
    }
  }
};

export default homeTabBar;