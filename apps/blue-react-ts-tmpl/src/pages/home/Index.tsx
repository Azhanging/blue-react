import React, { useState } from 'react';
import { useCacheState } from '$components/BrRoutes';
import { Link } from 'react-router-dom';
import BrView from '$components/BrView';
import BrHeader from '$components/BrHeader';
import BrLayer from '$components/BrLayer';
import * as antd from '$extend-in-react/antd';

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

function Index(props:any) {

  const {
    setState,
    getState
  } = useCacheState();

  const [showLayer, setShowLayer] = useState(getState('showLayer', false));

  setState({
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
            antd.showLoading();
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