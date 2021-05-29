import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from '@router/AppRouter';
import { extendInReact } from '$extend-in-react';
import { device } from '$assets/js/device';
import { view } from '$assets/js/view';

//antd mobile全局樣式
import 'antd-mobile/dist/antd-mobile.css';
//使用全局scss
import '@assets/css/blue-atom.scss';

//扩展react
extendInReact(React);
//设备兼容性处理
device();
//设置试图相关
view();

ReactDOM.render(<AppRouter/>, document.getElementById('root'));
