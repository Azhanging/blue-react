import axios from 'axios';
import config from '@config';
import utils from 'blue-utils';
import { showLoading, closeLoading } from "./antd/activity-indicator";
import history from '@router';

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
  timeout: config.axios.timeout,
  headers: {
    'X-Requested-With': 'XMLHttpRequest'
  }
});

//拦截器request
$axios.interceptors.request.use((axiosConfig) => {
  const { isShowLoading } = axiosConfig;
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
  return res.data;
}, (error) => {
  const axiosConfig = error.config;
  const isTimeout = /timeout/ig.test(error.message);
  const status = isTimeout ? 'timeout' : error.response.status;
  const errorConfig = config.error;
  closeLoading();

  //检查当前的路由标识和当前路由中的id标识是否一样
  //不一样不去执行后面异步的操作
  /*if (!routerMeta.isCurrentRouteID(axiosConfig.routeID)) {
    return Promise.reject(error);
  }*/

  //处理超时信息，重写信息,只有超时有提示
  if (isTimeout) {
    error.message = '请求超时，请刷新页面';
    $toast({
      message: error.message
    });
  }

  //跳转指定的错误状态页
  if (status >= 400 && status < 600 && !config.debug) {
    const errorPath = errorConfig[status] ? errorConfig[status].path : errorConfig[404].path;
    history.push(errorPath);
  }

  return Promise.reject(error);
});

//在react中扩展
export function useAxiosInReact(React) {
  React.Component.prototype.$axios = $axios;
}

export default $axios;
