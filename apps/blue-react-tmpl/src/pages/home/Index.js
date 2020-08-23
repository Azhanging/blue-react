import React, { useState } from 'react';
import { useCacheState } from '$components/BrRoutes';
import { Link } from 'react-router-dom';
import BrView from '$components/BrView';
import BrHeader from '$components/BrHeader';
import BrLayer from '$components/BrLayer';

function List() {
  const list = [];
  for (let i = 0; i < 30; i++) {
    list.push((
      <div className="bz-t-c bz-pd-50" key={i}>
        {i}
      </div>
    ));
  }

  return (
    <ul className="bz-reset-ul">
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
  const [showLayer, setShowLayer] = useState(getState('showLayer', false));

  setState({
    count,
    showState,
    showLayer
  });

  return (
    <BrView routes={props.routes}>

      <BrHeader centerControl={{
        title: 'HOME'
      }}/>

      {/*弹层组件*/}
      <BrLayer showStatus={showLayer} click={() => {
        setShowLayer(!showLayer);
      }}>
        <div className={"bz-pd-15 bz-bg-white"}>
          123
        </div>
      </BrLayer>

      <div className={"bz-pd-14 bz-t-c"}>
        <button className={"bz-btn bz-btn-primary"} onClick={() => {
          setShowLayer(!showLayer);
        }}>
          toggleLayer
        </button>
      </div>

      <div>
        <div className="bz-pd-14 bz-t-c">
          Home Index
        </div>

        {showState && (
          <div className={"bz-t-c"}>
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

        <div className="bz-t-c bz-pd-tb-50">
          <Link to="/index-children" className="bz-pd-10">
            link to Index Children
          </Link>
        </div>

        <div className="bz-t-c bz-pd-tb-50">
          <Link to="/formik" className="bz-pd-10">
            Formik
          </Link>
        </div>

        <div className="bz-t-c bz-pd-tb-50">
          <Link to="/components" className="bz-pd-10">
            link to Components
          </Link>
        </div>

        <div className="bz-t-c bz-pd-tb-50">
          <Link to="/components/2/3" className="bz-pd-10">
            link to Components
          </Link>
        </div>

        <div className="bz-t-c bz-pd-10">
          <button type="button" className="bz-btn bz-btn-primary" onClick={(e) => {
            React.$antd.showLoading();
          }}>
            loading...
          </button>
        </div>
        <List/>
      </div>
    </BrView>
  );
}

export default Index;