import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from '@router/AppRouter';
import * as serviceWorker from './serviceWorker';
import { extendInReact } from '$extend-in-react';
import { device } from '$assets/js/device';
import { view } from '$assets/js/view';

//antd mobile全局樣式
import 'antd-mobile/dist/antd-mobile.css';
//使用全局scss
import '@assets/css/blue-zone.scss';

//扩展react
extendInReact(React);
//设备兼容性处理
device();
//设置试图相关
view();

ReactDOM.render(<AppRouter/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
