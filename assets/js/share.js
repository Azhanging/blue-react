import config from '@config';
import history from '@router';
import store from '@store';
import utils from 'blue-utils';
import { Base64 } from 'js-base64';
import { Toast } from 'antd-mobile';

//分享的url可能是动态需要的配置，可以为String或者Function
export function shareLink() {
  //分享的域名配置
  const shareOrigin = config.share.origin || config.path.base;
  return `${shareOrigin}/?${shareLinkParams()}`;
}

//扩展分享链接参数
function shareLinkParams() {

  const share = config.share;
  const shareParams = share.params;
  //用户手机号
  const phone = store.state.userInfo.phone;

  const path = (() => {
    const { mode } = config.router;
    const { pathname } = router.location;
    if (mode === 'history') {
      return pathname;
    } else if (mode === 'hash') {
      return `/#${pathname}`;
    }
  })();

  const params = {
    [shareParams.phone]: phone ? Base64.encode(phone) : '',
    [shareParams.redirectUrl]: path,
    [shareParams.wantUrl]: `${config.path.indexPath}`     //业务需要，添加跳转链接
  };

  return utils.stringifyParams(params);

}

//公共的分享 app 分享 || 普通浏览器和微信提示分享操作
export function share(opts) {
  const device = config.device;
  const shareConfig = config.share;

  //webview分享
  if (config.device.isApp) {
    try {
      //todo嵌入web view app分享
      global.share(JSON.stringify({
        title: opts.title || shareConfig.title,
        descr: opts.descr || shareConfig.deps,
        thumImage: opts.thumImage || shareConfig.imgUrl,
        shareUrl: shareLink({
          link: opts.shareUrl
        })
      }));
    } catch (e) {
      console.warn(`share error:`, e);
    }
  } else if (device.isWeChat) {// 微信端
    Toast.info('点击右上角“...”分享按钮进行转发');
  } else if (device.isWap) {  // app端
    Toast.info('请通过浏览器自带分享功能进行转发');
  }
}