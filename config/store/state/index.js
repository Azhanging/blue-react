const state = {
  view: {
    tabBar: '',          //导航   String | Boolean
    tabBarSubmenuIndex: -1,    //导航子菜单状态
    pageFixed: true      //独立页面中底部容器显示控制状态，在页面中的按钮可能因为表单的选中隐藏 Boolean
  },
  weChat: {
    appId: "",
    timestamp: '',
    nonceStr: '',
    signature: ''
  },
  userInfo: {}
};

export default state;