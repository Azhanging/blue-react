const state = {
  views: {
    //浮层相关
    suspend: {
      status: false,
      distance: 0
    },
    tabBar: {
      name: '' //导航 String | Boolean
    },
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