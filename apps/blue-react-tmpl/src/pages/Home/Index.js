import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

function Index(props) {
  return (
    <div>
      <div className="bc-pd-14 bc-t-c">
        Home Index
      </div>

      <div className="bc-t-c">
        <Link to="/components" className="bc-pd-10">
          link to Components
        </Link>
      </div>

      <div className="bc-t-c bc-pd-10">
        <button type="button" className="bc-btn bc-btn-primary" onClick={(e) => {
          props.changeActivityIndicator({
            animating: true
          });
        }}>
          打开loading
        </button>
      </div>

    </div>
  );
}

export default connect(null, (dispatch) => {
  return {
    changeActivityIndicator(state) {
      dispatch({
        type: 'CHANGE_INDICATOR',
        payload: state
      });
    }
  }
})(Index);