import React, { useState } from 'react';
import BrView from '$components/BrView';
import BrHeader from '$components/BrHeader';
import { Link } from 'react-router-dom';
import { useCacheState } from '$components/BrRoutes';

function Children(props) {

  const {
    setState,
    getState
  } = useCacheState();

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

      <div className="bz-t-c bz-pd-14rp">
        index children
      </div>

      <div className="bz-t-c bz-pd-14rp">
        <button onClick={() => {
          setCount(count + 1);
        }}>
          count {count}
        </button>
      </div>

      <div className="bz-t-c bz-pd-14rp">
        <Link to="/index-children/index-children-children">
          index-children
        </Link>
      </div>

      <div className="bz-t-c bz-pd-tb-50">
        <Link to="/" className="bz-pd-10">
          home
        </Link>
      </div>

      {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
        <div className={"bz-pd-50 bz-t-c"} key={item}>{item}</div>
      ))}

    </BrView>
  )
}

export default Children;