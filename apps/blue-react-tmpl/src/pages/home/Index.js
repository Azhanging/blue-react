import React, { useState } from 'react';
import { useCacheState } from '$components/BrRoutes';
import { Link } from 'react-router-dom';
import BrLayoutView from '@components/public/BrLayoutView';
import BrHeader from '$components/BrHeader';

function List() {
  const list = [];
  for (let i = 0; i < 30; i++) {
    list.push((
      <div className="bc-t-c bc-pd-50" key={i}>
        {i}
      </div>
    ));
  }

  return (
    <ul className="bc-reset-ul">
      {list}
    </ul>
  );
}

function Index(props) {

  const {
    setState,
    getState
  } = useCacheState();

  const [count, setCount] = useState(getState('count', 0));
  const [showState, setShowState] = useState(getState('showState', true));

  setState({
    count,
    showState
  });

  return (
    <BrLayoutView routes={props.routes}>

      <BrHeader centerControl={{
        title: 'HOME'
      }}/>

      <div>
        <div className="bc-pd-14 bc-t-c">
          Home Index
        </div>

        {showState && (
          <div className={"bc-t-c"}>
            <div>
              <button onClick={() => {
                setCount(count + 1)
              }}>
                count {count}
              </button>
            </div>
          </div>
        )}

        <div>
          <button onClick={() => {
            setShowState(!showState)
          }}>
            toggle show
          </button>
        </div>

        <div className="bc-t-c bc-pd-tb-50">
          <Link to="/index-children" className="bc-pd-10">
            link to Index Children
          </Link>
        </div>

        <div className="bc-t-c bc-pd-tb-50">
          <Link to="/formik" className="bc-pd-10">
            Formik
          </Link>
        </div>

        <div className="bc-t-c bc-pd-tb-50">
          <Link to="/components" className="bc-pd-10">
            link to Components
          </Link>
        </div>

        <div className="bc-t-c bc-pd-tb-50">
          <Link to="/components/2/3" className="bc-pd-10">
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
        <List/>
      </div>
    </BrLayoutView>
  );
}

export default Index;