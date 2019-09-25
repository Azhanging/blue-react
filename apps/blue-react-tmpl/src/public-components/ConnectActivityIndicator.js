import React from 'react';
import { connect } from 'react-redux';
import { ActivityIndicator as ActivityIndicatorComponent } from 'antd-mobile';

//合并activityIndicator状态
function ConnectActivityIndicator(opts = {}) {
  const {
    component, mapStateToProps = (state) => {
      return {
        activityIndicator: state.antd.activityIndicator
      };
    }
  } = opts;
  return connect(mapStateToProps)(component);
}

//使用connect store
function ActivityIndicator(props) {
  console.log(props);
  return (
    <>
      <ActivityIndicatorComponent {...props.activityIndicator} />
    </>
  )
}

export const ConnectActivityIndicatorComponent = ConnectActivityIndicator({
  component: ActivityIndicator
});

export default ConnectActivityIndicator;

