import { axiosInReact } from './axios';
import { weChatInReact } from './wechat';
//nprogress样式
import "nprogress/nprogress.css";
import NProgress from 'nprogress';

//进度条
NProgress.configure({
  showSpinner: false
});

export function extendInReact(React) {
  axiosInReact(React);
  weChatInReact(React);
}