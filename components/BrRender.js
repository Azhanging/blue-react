import React from 'react';
import { renderProps } from "$assets/js/render";

//渲染的children和render
function BrRender(_props) {
  const { props, render, children } = _props;
  return (
    <>
      {renderProps({
        render,
        props
      })}
      {children}
    </>
  );
}

export default BrRender;