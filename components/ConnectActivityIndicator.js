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
    }, mapDispatchToProps = (dispatch) => {
      return {
        changeActivityIndicator(state) {
          dispatch({
            type: 'CHANGE_INDICATOR',
            payload: state
          });
        }
      }
    }
  } = opts;
  return connect(mapStateToProps, mapDispatchToProps)(component);
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

