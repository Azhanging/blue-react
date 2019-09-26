import React, { useReducer } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as action from '@store/action';

function Index(props) {

  const dispatch = useDispatch();

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
          dispatch(action.TOGGLE_ACTIVITY_INDICATOR({
            animating: true
          }));
        }}>
          loading...
        </button>
      </div>
    </div>
  );
}

export default Index;