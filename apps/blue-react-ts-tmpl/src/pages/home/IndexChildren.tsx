import React, { useState } from 'react';
import BrView from '$components/BrView';
import BrHeader from '$components/BrHeader';
import { Link } from 'react-router-dom';
import { useCacheState } from '$components/BrRoutes';

function Children(props:any) {

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

      <div className="ba-t-c ba-pd-14rp">
        index children
      </div>

      <div className="ba-t-c ba-pd-14rp">
        <button className="ba-btn ba-btn-base" onClick={() => {
          setCount(count + 1);
        }}>
          count {count}
        </button>
      </div>

      <div className="ba-t-c ba-pd-14rp">
        <Link to="/index-children/index-children-children">
          index-children
        </Link>
      </div>

      <div className="ba-t-c ba-pd-tb-50">
        <Link to="/" className="ba-pd-10">
          home
        </Link>
      </div>

      {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
        <div className={"ba-pd-50 ba-t-c"} key={item}>{item}</div>
      ))}

    </BrView>
  )
}

export default Children;