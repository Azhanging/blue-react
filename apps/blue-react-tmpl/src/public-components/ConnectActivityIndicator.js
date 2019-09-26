import React from 'react';
import { useSelector } from 'react-redux';
import { ActivityIndicator } from 'antd-mobile';

//使用connect store
function ActivityIndicatorComponent(props) {
  const activityIndicator = useSelector((state) => {
    return state.antd.activityIndicator;
  });
  return (
    <ActivityIndicator {...activityIndicator} />
  )
}

export default ActivityIndicatorComponent;

