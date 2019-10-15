import React, { useState } from 'react';
import BrLayoutView from '@components/public/BrLayoutView';
import BrHeader from '$components/BrHeader';
import { Link } from 'react-router-dom';
import { useCache } from '$components/BrRoutes';

function Children(props) {

  const {
    setState,
    getState
  } = useCache();

  const [count, setCount] = useState(getState('count', 0));

  //设置缓存
  setState({
    count
  });

  return (
    <BrLayoutView routes={props.routes}>

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

      <div className="bc-t-c bc-pd-tb-50">
        <Link to="/index-children-1" className="bc-pd-10">
          link to Index Children-1
        </Link>
      </div>

    </BrLayoutView>
  )
}

export default Children;