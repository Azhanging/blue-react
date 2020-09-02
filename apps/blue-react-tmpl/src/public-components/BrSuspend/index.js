import React from 'react';
import { renderProps } from '$assets/js/render';
import './index.scss';

//回到顶部
function backToTop() {
  document.documentElement.scrollTop = 0;
}

//浮层
function BrSuspend(props) {
  const {
    distance = 200,
    scrollDistance,
    show
  } = props;
  return (
    <div className="br-suspend">
      {/*回到顶部*/}
      <div className="back-to-top" style={{
        'display': scrollDistance > distance && show ? `` : `none`
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