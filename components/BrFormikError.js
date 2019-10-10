import React from 'react';
/*
* 校验错误使用的组件
* */
function BrFormikError(props) {
  const { errors, touched, name, children } = props;
  return (
    <>
      {errors[name] && touched[name] && children}
    </>
  );
}

export default BrFormikError;