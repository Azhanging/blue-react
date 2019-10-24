import axios from 'axios';
import config from '@config';
import utils from 'blue-utils';
import { Toast } from 'antd-mobile';
import code from '$code/code';    //错误码
import { codeHandler } from '$code';   //错误码处理
import { showLoading, hideLoading } from "./antd/toast";
import history, { routerMeta } from '@router';
import { redirect } from '$assets/js/redirect';

//设置header中的token
function setHeaderToken(axiosConfig) {
  const { headers } = axiosConfig;
  utils.each(config.login.storage, (key) => {
    const getItem = localStorage.getItem(key);
    if (getItem) {
      headers[key] = getItem;
    }
  });
}

//set x-www-form-urlencoded data
function setFormData(axiosConfig) {
  axiosConfig.data = utils.stringifyParams(axiosConfig.data);
}

const $axios = axios.create({
  baseURL: '/api',
  timeout: config.axios.timeout,
  headers: {
    'X-Requested-With': 'XMLHttpRequest'
  }
});

//拦截器request
$axios.interceptors.request.use((axiosConfig) => {
  const { isShowLoading } = axiosConfig;
  //把路由当前路由的id设置给axios config中
  axiosConfig.routeID = routerMeta.getCurrentRouteID();
  //设置头Token
  setHeaderToken(axiosConfig);
  //set form data type
  setFormData(axiosConfig);
  //是否loading显示
  if (isShowLoading === undefined || isShowLoading === true) {
    //设置当前的loading的id
    showLoading();
  }
  return axiosConfig;
}, (error) => {
  return Promise.reject(error);
});

//拦截器response
$axios.interceptors.response.use((res) => {
  const status = res.status;
  const axiosConfig = res.config;
  const isShowLoading = axiosConfig.isShowLoading;
  if (isShowLoading === undefined || isShowLoading === true) {
    hideLoading();
  }
  //success http request state
  if (status === 200) {
    const { code: requestCode, message } = res.data;
    //success code
    if (requestCode === code.SUCCESS) {
      return res.data;
    } else if (requestCode === code.REDIRECT) {    //作为重定向跳转
      let redirectTime = 0;
      //存在重定向信息
      if (message) {
        Toast.info(message);
        redirectTime = 1000;
      }
      setTimeout(() => {
        redirect(res.data);
      }, redirectTime);
      return Promise.reject(res.data);
    } else {
      //code处理
      codeHandler(res.data);
      //避免原来then上的业务，走reject
      return Promise.reject(res.data);
    }
  }
}, (error) => {
  const axiosConfig = error.config;
  const isTimeout = /timeout/ig.test(error.message);
  const status = isTimeout ? 'timeout' : error.response.status;
  const errorConfig = config.error;
  hideLoading();

  //检查当前的路由标识和当前路由中的id标识是否一样
  //不一样不去执行后面异步的操作
  if (!routerMeta.isCurrentRouteID(axiosConfig.routeID)) {
    return Promise.reject(error);
  }

  //处理超时信息，重写信息,只有超时有提示
  if (isTimeout) {
    Toast.info(error.message = '请求超时，请刷新页面');
  }

  //跳转指定的错误状态页
  if (status >= 400 && status < 600 && !config.debug) {
    const errorPath = errorConfig[status] ? errorConfig[status].path : errorConfig[404].path;
    history.replace(errorPath);
  }

  return Promise.reject(error);
});

//在react中扩展
export function useAxiosInReact(React) {
  React.$axios = React.Component.prototype.$axios = $axios;
}

export default $axios;
