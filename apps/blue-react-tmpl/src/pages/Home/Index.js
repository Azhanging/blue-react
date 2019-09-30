import React from 'react';
import { Link } from 'react-router-dom';
import BrView from '$components/BrView/BrView';

function Index(props) {
  return (
    <BrView routes={props.routes}>
      <div>
        <div className="bc-pd-14 bc-t-c">
          Home Index
        </div>

        <div className="bc-t-c">
          <Link to="/index-children" className="bc-pd-10">
            link to Index Children
          </Link>
        </div>

        <div className="bc-t-c">
          <Link to="/components" className="bc-pd-10">
            link to Components
          </Link>
        </div>

        <div className="bc-t-c bc-pd-10">
          <button type="button" className="bc-btn bc-btn-primary" onClick={(e) => {
            React.$antd.showLoading();
          }}>
            loading...
          </button>
        </div>
      </div>
    </BrView>
  );
}

export default Index;