import React from 'react';
import { renderProps } from '$assets/js/render';
import Velocity from 'velocity-animate';
import './index.scss';

//回到顶部
function backToTop(e, scrollElm) {
  const $scrollElm = scrollElm.current;
  Velocity($scrollElm, "scroll", {
    container: $scrollElm,
    duration: 180,
    MobileHA: true,
    offset: -$scrollElm.scrollTop
  });
  e.preventDefault();
}

//浮层
function BrSuspend(props) {
  return (
    <div className="br-suspend">
      {/*回到顶部*/}
      <div className="back-to-top" style={{
        'display': props.scroll.top > (props.distance || 100) ? '' : 'none'
      }}>
        <a onClick={(e) => {
          backToTop(e, props.scrollElm);
        }}>
          {renderProps(props.backToTop, props)}
        </a>
      </div>
    </div>
  );
}

export default BrSuspend;