import React from 'react';
import { renderProps } from '$assets/js/render';
import './index.scss';

//回到顶部
function backToTop() {
  document.documentElement.scrollTop = 0;
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
          backToTop();
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