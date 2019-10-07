import React from 'react';
import BrView from '$components/BrView';
import BrSuspend from '$components/BrSuspend';

//初始化的backToTop
function initBackToTop() {
  return (
    <i className="bp-icon bp-icon-go-top bc-f-30 bc-t-666"/>
  );
}

//初始化的suspend
function initSuspend($props) {
  const {
    backToTop = initBackToTop, ...$$props
  } = $props;
  return (
    <BrSuspend {...$$props} backToTop={backToTop}/>
  );
}

//项目view层
function BrLayoutView(props) {
  const {
    suspend = initSuspend, ...$props
  } = props;
  return (
    <BrView {...$props} suspend={suspend}>
      {props.children}
    </BrView>
  );
}

export default BrLayoutView;

