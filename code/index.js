import code from './code';

//错误码处理
export function codeHandler(opts = {}) {
  const { code: requestCode, message } = opts;
  switch (requestCode) {

    //未登录处理
    case code.UN_LOGIN:

      break;

    //未绑定手机号
    case code.BIND_PHONE:

      break;

    //只做消息提醒
    case code.MESSAGE:

      break;

    //登录超时
    case code.LOGIN_EXPIRE:

      break;

    //default
    default:
      ;
  }
}



