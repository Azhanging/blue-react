/*
* 重定向
* */
import history from '@router';

//304状态重定向
export function redirect(opts = {}) {
  const { url } = opts;
  const $url = url || '/';
  if (/^http/.test($url)) {
    location.href = $url;
  } else {
    history.replace($url);
  }
}