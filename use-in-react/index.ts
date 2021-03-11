import { useAxiosInReact } from './axios';
import { useAntdInReact } from './antd/extend';
import { useWeChatInReact } from './wechat';
//nprogress样式
import "nprogress/nprogress.css";
import NProgress from 'nprogress';

//进度条
NProgress.configure({
  showSpinner: false
});

export function useInReact(React) {
  useAxiosInReact(React);
  useAntdInReact(React);
  useWeChatInReact(React);
}