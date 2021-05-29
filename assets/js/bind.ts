import config from '@config';
import store from '@store';
import history from "@router";

//绑定手机
export function bindPhone() {
  const userInfo = store.getState().userInfo;
  const phone = userInfo.phone;
  const bindPhonePath = config.path.bindPhone;
  const pathname = history.location.pathname;
  //没有绑定手机跳转到指定的链接，指定的链接必须存在
  if (!phone && bindPhonePath && (pathname !== bindPhonePath)) {
    history.replace(`${bindPhonePath}?backUrl=${encodeURIComponent(pathname)}`);
  }
}