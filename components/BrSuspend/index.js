import React from 'react';
import { renderProps } from '$assets/js/render';
import Velocity from 'velocity-animate';
import './index.scss';

//回到顶部
function backToTop(e) {
  const elm = document.documentElement;
  Velocity(document.documentElement, "scroll", {
    container: elm,
    duration: 180,
    MobileHA: true,
    offset: -elm.scrollTop
  });
  e.preventDefault();
}

//浮层
function BrSuspend(props) {
  return (
    <div className="br-suspend">
      {/*回到顶部*/}
      <div className="back-to-top" style={{
        'display': props.scrollDistance && props.show
      }}>
        <a onClick={(e) => {
          backToTop(e, props.scrollElm);
        }}>
          {renderProps({
            render: props.backToTop,
            props
          })}
        </a>
      </div>
    </div>
  );
}

export default BrSuspend;