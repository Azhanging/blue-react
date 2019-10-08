import { Toast } from 'antd-mobile';
import { unLogin, loginExpire } from '$assets/js/login';
import { bindPhone } from '$assets/js/bind';
import code from './code';

//错误码处理
export function codeHandler(opts = {}) {
  const { code: requestCode, message } = opts;
  switch (requestCode) {

    //未登录处理
    case code.UN_LOGIN:
      unLogin();
      break;

    //未绑定手机号
    case code.BIND_PHONE:
      bindPhone();
      break;

    //只做消息提醒
    case code.MESSAGE:
      Toast.info(message);
      break;

    //登录超时
    case code.LOGIN_EXPIRE:
      loginExpire();
      break;

    //default
    default:
      ;
  }
}



