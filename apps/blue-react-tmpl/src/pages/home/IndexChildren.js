import React from 'react';
import BrView from '$components/BrView';
import BrHeader from '$components/BrHeader';
import { Link } from 'react-router-dom';

function Children(props) {
  return (
    <BrView routes={props.routes}>
      <BrHeader centerControl={{
        title: '子页面'
      }}/>
      <div className="bc-t-c bc-pd-14rp">
        index children
      </div>
      <div className="bc-t-c bc-pd-14rp">
        <Link to="/index-children/index-children-children">
          index-children
        </Link>
      </div>
    </BrView>
  )
}

export default Children;