import React from 'react';
import { connect } from 'react-redux';

function Test() {
  return (
    <div>
      test
    </div>
  )
}

function Connect(Component) {
  return connect(() => {
    return {
      a: 1
    }
  })(Component);
}

export default Connect(Test);