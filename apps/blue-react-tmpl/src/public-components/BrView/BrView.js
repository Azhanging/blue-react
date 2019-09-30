import './index.scss';
import React from 'react';

function BrView(props) {
  return (
    <div className="br-view">
      <div className="br-view-scroll">
        {props.children}
      </div>
      {/*子路由*/}
      {props.routes}
      {/*浮动相关*/}
      {props.suspend}
      {/*其他的组件*/}
      {props.other}
    </div>
  )
}

export default BrView;