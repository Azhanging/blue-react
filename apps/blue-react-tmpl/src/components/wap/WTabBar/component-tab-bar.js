import history from '@router';

const componentTabBar = {
  list: {
    items: [{
      content: {
        value: '首页',
        fontSize: 10
      },
      icon: {
        src: 'https://www.dtb315.com/Static/wap/home/images/bottom_btn/allclass.png',                       //没选中的src图片
        /*fontClassName:''  font icon class name*/
        /*activeFontClassName:'' active font icon class name*/
        activeSrc: 'https://www.dtb315.com/Static/wap/home/images/bottom_btn/allclass-active.png',
        direction: 'Left',
        style: {
          width: `20px`,
          height: '20px'
        }
      },
      to: '/',
      className: 'bz-pd-6'
    }, {
      content: {
        value: 'scroll',
        fontSize: 10
      },
      icon: {
        src: 'https://www.dtb315.com/Static/wap/home/images/bottom_btn/allclass.png',                       //没选中的src图片
        activeSrc: 'https://www.dtb315.com/Static/wap/home/images/bottom_btn/allclass-active.png',
        direction: 'Right',
        style: {
          width: `20px`,
          height: '20px'
        }
      },
      className: 'bz-pd-6',
      children: {
        style: {
          backgroundColor: `#ca9f75`
        },
        unActiveClassName: 'bz-t-white',
        list: {
          items: [{
            content: {
              value: '子菜单子菜单1'
            },
            className: 'bz-bd-b-white',
            to: '/'
          }, {
            content: {
              value: '子菜单2'
            }
          }],
          style: {
            border: `1px solid white`
          }
        },
        arrow: {
          background: '#ca9f75'
        }
      }
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
          width: `20px`,
          height: '20px'
        }
      },
      className: 'bz-pd-6',
      children: {
        style: {
          backgroundColor: 'white',
          border: `1px solid #e5e5e5`
        },
        unActiveClassName: 'bz-t-danger',
        list: {
          items: [{
            content: {
              value: '子菜单子菜单4'
            },
            className: 'bz-bd-b-white',
            to: '/'
          }, {
            content: {
              value: '子菜单子菜单5',
            },
            to: '/',
            className: 'bz-bd-b-white'
          }, {
            content: {
              value: '子菜单6'
            },
            to: '/'
          }],
          style: {
            border: `1px solid #e5e5e5`
          }
        },
        arrow: {
          background: '#333'
        }
      }
    }]
  },
  active(opts = {}) {
    const { setActiveIndex } = opts;
    if (history.$matchRoutes([
        /^\/components\/scroll/,    //组件滑动路由
      ])) {
      setActiveIndex(1);
    } else {
      setActiveIndex(2)
    }
  }
};

export default componentTabBar;