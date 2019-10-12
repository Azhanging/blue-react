import React, { useState } from 'react';
import BrView from '$components/BrView';
import BrHeader from '$components/BrHeader';
import { Link } from 'react-router-dom';

function Children(props) {
  const { getState, setState } = props.cache;
  const [count, setCount] = useState(getState('count', 0));
  //设置缓存
  setState({
    count
  });
  return (
    <BrView routes={props.routes}>
      <BrHeader centerControl={{
        title: 'INDEX-CHILDREN'
      }}/>
      <div className="bc-t-c bc-pd-14rp">
        index children
      </div>
      <div className="bc-t-c bc-pd-14rp">
        <button onClick={() => {
          setCount(count + 1);
        }}>
          count {count}
        </button>
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